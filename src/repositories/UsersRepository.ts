import { User } from '../models/User';

export interface IUserRepository {
  getByEmail(where: object | string): Promise<any>;
  add(data: User): Promise<User>;
}
class UsersRepository implements IUserRepository {
  repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this.repository = repository;
  }

  async add(data: User): Promise<User> {
    const result = await this.repository.add(data);
    // add log
    return result;
  }

  async getByEmail(where: string | object): Promise<User[]> {
    const result = await this.repository.getByEmail(where);
    // add log
    return result;
  }
}

export default UsersRepository;
