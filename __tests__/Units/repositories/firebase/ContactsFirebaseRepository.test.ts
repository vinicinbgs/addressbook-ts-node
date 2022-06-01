import { Contact } from '../../../../src/models/Contact';
import ContactsFirebaseRepository from '../../../../src/repositories/firebase/ContactsFirebaseRepository';

jest.mock('../../../../src/databases/firebase', () => ({
  collection: () => ({
    add: (contactPayload: Contact) => ({
      get: () => ({
        data: () => contactPayload,
      }),
    }),
    where: () => ({
      get: () => [
        {
          data: () => contactPayload,
        },
      ],
    }),
  }),
}));

const contactPayload = {
  address: 'address',
  first_name: 'first_name',
  last_name: 'last_name',
  phone_number: 'phone_number',
} as Contact;

describe('ContactsFirebaseRepository', () => {
  beforeEach(() => {});

  it('should execute add successfully', async () => {
    const repository = new ContactsFirebaseRepository();

    const result = await repository.add(contactPayload);

    expect(result).toBe(contactPayload);
  });

  it('should execute get successfully', async () => {
    const repository = new ContactsFirebaseRepository();

    const result = await repository.get('userId');

    expect(result).toContain(contactPayload);
  });
});
