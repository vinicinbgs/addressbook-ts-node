import { User } from '../../../src/models/User';
import UserPostgresRepository from '../../../src/repositories/postgres/UsersPostgresRepository';
import UsersRepository from '../../../src/repositories/UsersRepository';

jest.mock('../../../src/repositories/postgres/UsersPostgresRepository');

const mockUserPostgresRepository = UserPostgresRepository as jest.Mock;

const userPayload = {
  email: 'test@test.com',
  password: '12345678',
} as User;

describe('UserRepository', () => {
  beforeEach(() => {
    mockUserPostgresRepository.mockImplementation(() => {
      return {
        add: (userPayload: User) => userPayload,
        getByEmail: () => userPayload,
      };
    });
  });

  it('should execute add successfully', async () => {
    const mockImplementationRepository = new UserPostgresRepository();

    const repository = new UsersRepository(mockImplementationRepository);

    const result = await repository.add(userPayload);

    expect(result).toBe(userPayload);
  });

  it('should execute getByEmail successfully', async () => {
    const mockImplementationRepository = new UserPostgresRepository();

    const repository = new UsersRepository(mockImplementationRepository);

    const result = await repository.getByEmail({
      email: userPayload.email,
    });

    expect(result).toBe(userPayload);
  });
});
