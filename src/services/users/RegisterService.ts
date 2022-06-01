import UsersRepository, {
  IUserRepository,
} from '../../repositories/UsersRepository';
import { User } from '../../models/User';
import { generateToken } from '../../libs/jwt';
import { hash } from '../../libs/encrypt';

class RegisterService {
  private repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = new UsersRepository(repository);
  }

  execute = async (data: User): Promise<string> => {
    data.password = await hash(data.password);

    const userRegistered = await this.repository.add(data);

    return generateToken(userRegistered as User);
  };
}

export default RegisterService;
