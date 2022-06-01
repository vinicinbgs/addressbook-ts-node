import UsersRepository, {
  IUserRepository,
} from '../../repositories/UsersRepository';
import { User } from '../../models/User';
import { generateToken } from '../../libs/jwt';
import { compare } from '../../libs/encrypt';
import AuthException from '../../exceptions/AuthException';

class AuthenticateService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = new UsersRepository(repository);
  }

  execute = async (data: User): Promise<string> => {
    const { email, password } = data;

    const user = await this.repository.getByEmail(email);

    if (!user || email !== user.email) {
      throw new AuthException(user);
    }

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AuthException(user);
    }

    delete user.password;

    return generateToken(user as User);
  };
}

export default AuthenticateService;
