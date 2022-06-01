import BaseException from './BaseException';

class AuthException extends BaseException {
  constructor(contexts: object) {
    const message = 'AuthException';

    super(message, contexts);

    this.type = 'response';
    this.status = 400;
    this.finalMessage = 'Email or Password incorrect';
  }
}

export default AuthException;
