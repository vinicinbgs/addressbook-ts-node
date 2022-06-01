import { Request, Response, NextFunction } from 'express';
import { User } from '../../../models/User';
import { registerResponse, authResponse } from '../responses/AuthResponse';
import AuthValidator from '../validators/AuthValidator';
import RegisterService from '../../../services/users/RegisterService';
import AuthenticateService from '../../../services/users/AuthenticateService';
import UserPostgresRepository from '../../../repositories/postgres/UsersPostgresRepository';

const register = async (req: Request, res: Response) => {
  const registerService = new RegisterService(new UserPostgresRepository());

  const { email, password } = new AuthValidator().registerValidation(req);

  const token = await registerService.execute({
    email,
    password,
  } as User);

  return registerResponse({
    res,
    status: 200,
    params: {
      email: email,
      token,
    },
  });
};

const auth = async (req: Request, res: Response) => {
  const authenticateService = new AuthenticateService(
    new UserPostgresRepository()
  );

  const { email, password } = new AuthValidator().authValidation(req);

  const token = await authenticateService.execute({
    email,
    password,
  } as User);

  return authResponse({
    res,
    status: 200,
    params: {
      email: email,
      token,
    },
  });
};

export { register, auth };
