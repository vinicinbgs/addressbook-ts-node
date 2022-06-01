import ContactsRepository, {
  IContactsRepository,
} from '../../repositories/ContactsRepository';
import { Contact } from '../../models/Contact';

class AddContactService {
  private repository: IContactsRepository;

  constructor(repository: IContactsRepository) {
    this.repository = new ContactsRepository(repository);
  }

  execute = async (contact: Contact) => {
    return await this.repository.add(contact);
  };
}

export default AddContactService;
