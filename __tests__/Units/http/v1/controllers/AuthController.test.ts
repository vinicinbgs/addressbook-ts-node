import { v1_AuthController } from '../../../../../src/http/v1/controllers';
import { Request, Response } from 'express';
import { hash } from '../../../../../src/libs/encrypt';
import UsersRepository from '../../../../../src/repositories/UsersRepository';
import { faker } from '@faker-js/faker';
import ValidationException from '../../../../../src/exceptions/ValidationException';
import AuthException from '../../../../../src/exceptions/AuthException';
import UniqueEmailException from '../../../../../src/exceptions/UniqueEmailException';
import ControllerHandlerMiddleware from '../../../../../src/http/middlewares/ControllerHandlerMiddleware';

jest.mock('../../../../../src/repositories/UsersRepository');

const mockCredentials = {
  id: faker.datatype.uuid(),
  email: faker.internet.email(),
  password: '12345678',
};

const mockUserRepository = UsersRepository as jest.Mock;

const mockResponse: Partial<Response> = {
  status: function () {
    return this;
  },
  send: function (data: any) {
    return data;
  },
};

describe('AuthController', () => {
  beforeEach(async () => {
    const hashPassword = await hash(mockCredentials.password);

    mockUserRepository.mockImplementation(() => {
      return {
        add: () => mockCredentials,
        getByEmail: () => ({
          ...mockCredentials,
          ...{
            password: hashPassword,
          },
        }),
      };
    });
  });

  /**
   * Register Tests
   */
  it('should register user successfully', async () => {
    const payload = {
      body: mockCredentials,
    } as Request;

    const response = await v1_AuthController.register(
      payload,
      mockResponse as Response
    );

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('email');
  });

  it('should throw ValidationException when the user try register with invalid email and empty password', async () => {
    const payload = {
      body: {
        email: 'invalid_email',
        password: 'aaa',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_AuthController.register)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const validationException = () => {
      throw new ValidationException([]);
    };

    expect(validationException).toThrow(ValidationException);
  });

  it('should throw ValidationException when the user try register with invalid password', async () => {
    const payload = {
      body: {
        email: 'email@test.com',
        password: '123456',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_AuthController.register)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const validationException = () => {
      throw new ValidationException([]);
    };

    expect(validationException).toThrow(ValidationException);
  });

  it('should throw UniqueEmailException when register with email that already exist', async () => {
    mockUserRepository.mockImplementation(() => {
      return {
        getByEmail: () => {
          return new UniqueEmailException('Unique constraint failed', {});
        },
      };
    });

    const payload = {
      body: {
        email: 'abcefg@test.com',
        password: '12345678',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_AuthController.register)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const uniqueException = () => {
      throw new UniqueEmailException('Unique constraint failed', []);
    };

    expect(uniqueException).toThrow(UniqueEmailException);
  });

  /**
   * Auth Tests
   */
  it('should auth user successfully', async () => {
    const payload = {
      body: mockCredentials,
    } as Request;

    const response = await v1_AuthController.auth(
      payload,
      mockResponse as Response
    );

    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('email');
  });

  it('should throw ValidationException when the user try auth with empty email/password', async () => {
    const payload = {
      body: {
        email: '',
        password: '',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_AuthController.auth)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const validationException = () => {
      throw new ValidationException([]);
    };

    expect(validationException).toThrow(ValidationException);
  });

  it('should throw AuthException when not found user', async () => {
    mockUserRepository.mockImplementation(() => {
      return {
        getByEmail: () => {
          return null;
        },
      };
    });

    const payload = {
      body: {
        email: 'abcefg@test.com',
        password: '12345678',
      },
    } as Request;

    ControllerHandlerMiddleware(v1_AuthController.auth)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const authException = () => {
      throw new AuthException(payload);
    };

    expect(authException).toThrow(AuthException);
  });

  it('should throw AuthException when password not match', async () => {
    const payload = {
      body: {
        ...mockCredentials,
        password: 'PasswordNotMatch',
      },
    } as Request;

    await ControllerHandlerMiddleware(v1_AuthController.auth)(
      payload,
      mockResponse as Response,
      jest.fn()
    );

    const authException = () => {
      throw new AuthException(payload);
    };

    expect(authException).toThrow(AuthException);
  });
});
