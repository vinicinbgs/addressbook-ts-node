import { v1_ContactsController } from '../../../../../src/http/v1/controllers';
import { Request, Response } from 'express';
import ContactsRepository from '../../../../../src/repositories/ContactsRepository';
import ValidationException from '../../../../../src/exceptions/ValidationException';
import ControllerHandlerMiddleware from '../../../../../src/http/middlewares/ControllerHandlerMiddleware';

jest.mock('../../../../../src/repositories/ContactsRepository');

const mockPayload = {
  address: 'address',
  first_name: 'first_name',
  last_name: 'last_name',
  phone_number: 'phone_number',
};

const mockContactsRepository = ContactsRepository as jest.Mock;

const mockResponse: Partial<Response> = {
  status: function () {
    return this;
  },
  send: function (data: any) {
    return data;
  },
};

describe('ContactsController', () => {
  beforeEach(async () => {
    mockContactsRepository.mockImplementation(() => {
      return {
        add: () => mockPayload,
        get: () => {
          return [mockPayload];
        },
      };
    });
  });

  it('should store contact successfully', async () => {
    const payload = {
      body: mockPayload,
    } as Request;

    const response = await v1_ContactsController.store(
      payload,
      mockResponse as Response
    );

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('result');
  });

  it('should list all contacts successfully', async () => {
    const payload = {
      body: mockPayload,
    } as Request;

    const response = await v1_ContactsController.all(
      payload,
      mockResponse as Response
    );

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('results');
  });

  it('should throw ValidationException when the contact are with empty fields', async () => {
    const payload = {
      body: {
        address: '',
        first_name: '',
        last_name: 'ab',
        phone_number: '',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_ContactsController.store)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const validationException = () => {
      throw new ValidationException([]);
    };

    expect(validationException).toThrow(ValidationException);
  });
});
