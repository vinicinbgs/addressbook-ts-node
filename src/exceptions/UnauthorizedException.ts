import BaseException from './BaseException';

class UnauthorizedException extends BaseException {
  constructor(contexts: object) {
    const message = 'UnauthorizedException';

    super(message, contexts);

    this.type = 'response';
    this.status = 401;
    this.finalMessage = 'Unauthenticated request, please make login';
  }
}

export default UnauthorizedException;
