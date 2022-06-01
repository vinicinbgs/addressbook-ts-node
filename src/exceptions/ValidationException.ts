import BaseException from './BaseException';

class ValidationException extends BaseException {
  constructor(errors: object[], context?: object) {
    const message = 'ValidationException';

    super(message, context);

    this.type = 'response';
    this.status = 422;
    this.finalMessage = errors;
  }
}

export default ValidationException;
