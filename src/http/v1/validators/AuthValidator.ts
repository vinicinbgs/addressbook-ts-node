import BaseValidator from './BaseValidator';
import { Request } from 'express';
import validator from 'validator';
interface IRegisterValidator {
  email: string;
  password: string;
}

class AuthValidator extends BaseValidator {
  public registerValidation = (req: Request): IRegisterValidator => {
    let { email, password } = req.body;

    email = this.checkValidEmail(email);

    password = this.checkValidPassword(password);

    this.hasErrors();

    return {
      email,
      password,
    };
  };

  public authValidation = (req: Request): IRegisterValidator => {
    let { email, password } = req.body;

    email = this.checkValidEmail(email);

    password = this.checkValidPassword(password);

    this.hasErrors();

    return {
      email,
      password,
    };
  };

  private checkValidEmail = (email: any): string => {
    const message = {
      email: 'Provide a valid email',
    };

    if (this.isUndefinedOrEmpty(email)) {
      this.setError(message);
      return email;
    }

    email = String(email) ?? '';

    const isEmail = validator.isEmail(email);

    const isValidLength = validator.isLength(email, {
      max: 120,
    });

    if (!isEmail || !isValidLength) {
      this.setError(message);
    }

    return email;
  };

  private checkValidPassword = (password: any): void => {
    const message = {
      password: 'Password is less than 8 characters',
    };

    if (this.isUndefinedOrEmpty(password)) {
      this.setError(message);
      return password;
    }

    password = String(password) ?? '';

    const isPasswordValidLength = validator.isLength(password, {
      min: 8,
    });

    if (!isPasswordValidLength) {
      this.setError(message);
    }

    return password;
  };
}

export default AuthValidator;
