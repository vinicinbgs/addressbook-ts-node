import ContactsRepository, {
  IContactsRepository,
} from '../../repositories/ContactsRepository';

class ListContactsService {
  private repository: IContactsRepository;

  constructor(repository: IContactsRepository) {
    this.repository = new ContactsRepository(repository);
  }

  execute = async (userId: string) => {
    return this.repository.get(userId);
  };
}

export default ListContactsService;
