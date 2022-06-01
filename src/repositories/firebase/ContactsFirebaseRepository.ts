import firebaseDB from '../../databases/firebase';
import { Contact } from '../../models/Contact';
import { IContactsRepository } from '../ContactsRepository';

class ContactsFirebaseRepository implements IContactsRepository {
  collection: string;
  queryBuilder: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>;

  constructor() {
    this.collection = 'contacts';
    this.queryBuilder = firebaseDB.collection(this.collection);
  }

  get = async (userId: string): Promise<Contact[]> => {
    const results = await this.queryBuilder
      .where('user_id', '==', userId)
      .get();
    const contacts = [];

    results.forEach((contact) => {
      contacts.push(contact.data());
    });

    return contacts;
  };

  add = async (data: Contact): Promise<Contact> => {
    const result = await this.queryBuilder.add(data);
    const contact = (await result.get()).data() as Contact;

    return contact;
  };
}

export default ContactsFirebaseRepository;
