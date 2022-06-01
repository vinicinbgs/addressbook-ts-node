import { UserEntity } from '../../databases/entities/User.entity';
import { User } from '../../models/User';
import { IUserRepository } from '../UsersRepository';
import UniqueEmailException from '../../exceptions/UniqueEmailException';
import { instanceToPlain } from 'class-transformer';
import { relationalDB } from '../../databases';

class UserPostgresRepository implements IUserRepository {
  private user: UserEntity;

  constructor() {
    this.user = new UserEntity();
  }

  add = async (data: User): Promise<User> => {
    const { email, password } = data;

    const repository = await this.initRepository();

    this.user.email = email;
    this.user.password = password;

    try {
      const checkUserExist = await repository.manager.query(
        'SELECT id, email from users where LOWER(email)=$1 LIMIT 1',
        [email.toLowerCase()]
      );

      if (checkUserExist.length) {
        throw new UniqueEmailException(null, {
          email,
        });
      }

      const newUser = await repository.manager.save(this.user);

      delete newUser.password;

      return instanceToPlain(newUser) as User;
    } catch (e) {
      throw new UniqueEmailException(e, {
        email,
      });
    }
  };

  getByEmail = async (email: string): Promise<User> => {
    const repository = await this.initRepository();

    const user = await repository.manager.findOne(UserEntity, {
      select: {
        password: true,
        email: true,
      },
      where: {
        email: email,
      },
    });

    return instanceToPlain(user) as User;
  };

  private initRepository = async () => {
    const connection = await relationalDB;
    return connection.getRepository(User);
  };
}

export default UserPostgresRepository;
