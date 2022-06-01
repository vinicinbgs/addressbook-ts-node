import { UserEntity } from '../../../../src/databases/entities/User.entity';
import { User } from '../../../../src/models/User';
import UserPostgresRepository from '../../../../src/repositories/postgres/UsersPostgresRepository';
import UniqueEmailException from '../../../../src/exceptions/UniqueEmailException';

const userPayload = {
  email: 'test@test.com',
  password: '12345678',
} as User;

const mockQuery = jest.fn();

jest.mock('../../../../src/databases/postgres', () => ({
  getRepository: () => ({
    manager: {
      query: mockQuery,
      save: (userPayload: User) => userPayload,
      findOne: (userPayload: User, {}) => ({
        email: 'test@test.com',
        id: 'uuid',
      }),
    },
  }),
}));

describe('UserRepository', () => {
  beforeEach(() => {
    jest.mock(
      '../../../../src/databases/entities/User.entity',
      () => userPayload
    );
    mockQuery.mockImplementation(() => []);
  });

  it('should execute add successfully', async () => {
    const repository = new UserPostgresRepository();

    const result = await repository.add(userPayload);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
  });

  it('should execute getByEmail successfully', async () => {
    const repository = new UserPostgresRepository();

    const result = (await repository.getByEmail(
      userPayload.email
    )) as UserEntity;

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('email');
  });

  it('should throw UniqueEmailException when try add with email that already exist', async () => {
    mockQuery.mockImplementation(() => [
      {
        email: 'test@test.com',
      },
    ]);

    const repository = new UserPostgresRepository();

    try {
      await repository.add(userPayload);
    } catch (e) {
      const uniqueEmailException = () => {
        throw new UniqueEmailException('', userPayload);
      };

      expect(uniqueEmailException).toThrow(UniqueEmailException);
    }
  });
});
