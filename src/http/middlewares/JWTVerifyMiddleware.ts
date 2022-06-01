import { Request, Response, NextFunction } from 'express';
import { IJWT, verifyToken } from '../../libs/jwt';
import UnauthorizedException from '../../exceptions/UnauthorizedException';

const JWTVerifyMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers?.authorization;

  if (!authorization) {
    throw new UnauthorizedException(req.headers);
  }

  const token = getToken(authorization);

  try {
    const decode = verifyToken(token) as IJWT;

    req.body.user_id = decode.id;

    next();
  } catch (e) {
    throw new UnauthorizedException({ ...req.headers, ...{ token: token } });
  }
};

const getToken = (authentication: string) => {
  return authentication.replace('Bearer ', '');
};

export default JWTVerifyMiddleware;
