import ValidationException from '../../../exceptions/ValidationException';

class BaseValidator {
  protected errors: object[];

  constructor() {
    this.errors = [];
  }

  protected validationFail = (context?: object) => {
    throw new ValidationException(this.errors, context);
  };

  protected setError = (error: object) => {
    this.errors.push(error);
  };

  protected isUndefinedOrEmpty = (data: any): boolean => {
    return typeof data === 'undefined' || data === '';
  };

  protected hasErrors = (context?: object): void => {
    if (this.errors.length > 0) {
      this.validationFail(context ?? []);
    }
  };
}

export default BaseValidator;
