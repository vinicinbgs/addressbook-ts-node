import { Contact } from '../models/Contact';

export interface IContactsRepository {
  get(userId: string): Promise<Contact[]>;
  add(data: Contact): any;
}
class ContactsRepository implements IContactsRepository {
  repository: IContactsRepository;

  constructor(repository: IContactsRepository) {
    this.repository = repository;
  }

  add(data: Contact) {
    const result = this.repository.add(data);
    // add log
    return result;
  }

  get(userId: string): Promise<Contact[]> {
    const result = this.repository.get(userId);
    // add log
    return result;
  }
}

export default ContactsRepository;
