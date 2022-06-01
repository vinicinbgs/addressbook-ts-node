import jwt, { SignOptions, Algorithm, JwtPayload } from 'jsonwebtoken';
import configJWT from '../config/jwt';

const privateKey = configJWT.private_key || 'a1b2c3e4_strv';

const defaultExpiration = '12h';

const options: SignOptions = {
  algorithm: (configJWT.algorithm as Algorithm) || 'HS256',
  expiresIn: defaultExpiration,
};

function generateToken(data: object, opt?: SignOptions) {
  return jwt.sign(data, privateKey, { ...options, ...opt });
}

const verifyToken = (token: string): JwtPayload | string => {
  return jwt.verify(token, privateKey, options);
};

interface IJWT {
  id: string;
  iat: number;
  exp: number;
}

export { generateToken, verifyToken, IJWT };
