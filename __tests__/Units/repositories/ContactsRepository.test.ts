import { Contact } from '../../../src/models/Contact';
import ContactsRepository from '../../../src/repositories/ContactsRepository';
import ContactsFirebaseRepository from '../../../src/repositories/firebase/ContactsFirebaseRepository';

jest.mock('../../../src/repositories/firebase/ContactsFirebaseRepository');

const mockContactsFirebaseRepository = ContactsFirebaseRepository as jest.Mock;

const contactPayload = {
  address: 'address',
  first_name: 'first_name',
  last_name: 'last_name',
  phone_number: 'phone_number',
} as Contact;

describe('ContactsRepository', () => {
  beforeEach(() => {
    mockContactsFirebaseRepository.mockImplementation(() => {
      return {
        add: (contactPayload: Contact) => contactPayload,
        get: () => {
          return [contactPayload];
        },
      };
    });
  });

  it('should execute add successfully', async () => {
    const mockImplementationRepository = new ContactsFirebaseRepository();

    const repository = new ContactsRepository(mockImplementationRepository);

    const result = await repository.add(contactPayload);

    expect(result).toBe(contactPayload);
  });

  it('should execute get successfully', async () => {
    const mockImplementationRepository = new ContactsFirebaseRepository();

    const repository = new ContactsRepository(mockImplementationRepository);

    const result = await repository.get('uuid-random');

    expect(result).toContainEqual(contactPayload);
  });
});
