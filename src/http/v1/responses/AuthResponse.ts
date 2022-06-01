import { Response } from 'express';

interface IResponseParams {
  res: Response;
  status: number;
  params: {
    token: string;
    email: string;
  };
}

const registerResponse = ({ res, status, params }: IResponseParams) => {
  return res.status(status).send({
    message: 'User created successfully',
    token: params.token,
    email: params.email,
  });
};

const authResponse = ({ res, status, params }: IResponseParams) => {
  return res.status(status).send({
    message: 'Login was successful',
    token: params.token,
    email: params.email,
  });
};

export { registerResponse, authResponse };
