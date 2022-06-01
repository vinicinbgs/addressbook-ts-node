import { Response } from 'express';
import { Contact } from '../../../models/Contact';

interface IResponseParams {
  res: Response;
  status: number;
  params: Contact[] | Contact;
}

const addResponse = ({ res, status, params }: IResponseParams) => {
  return res.status(status).send({
    message: 'Contact created successfully',
    result: params,
  });
};

const allResponse = ({ res, status, params }: IResponseParams) => {
  return res.status(status).send({
    message: 'List all contacts successfully',
    results: params,
  });
};

export { addResponse, allResponse };
