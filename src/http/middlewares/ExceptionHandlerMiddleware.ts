import { Request, Response, NextFunction } from 'express';
import BaseException, { IBaseException } from '../../exceptions/BaseException';

const ExceptionHandlerMiddleware = (
  err: IBaseException,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseException) {
    return res.status(err.getStatus()).send({
      code: err.getStatus(),
      message: err.getFinalMessage() || err.message,
    });
  }

  if (err) {
    return res.sendStatus(500);
  }

  next();
};

export default ExceptionHandlerMiddleware;
