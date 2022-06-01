import BaseValidator from './BaseValidator';
import { Request } from 'express';
import validator from 'validator';
import { getNowWithDatabaseFormat } from '../../../libs/date';
import { Contact } from '../../../models/Contact';

class ContactValidator extends BaseValidator {
  public storeValidation = (req: Request): Contact => {
    let { user_id, address, first_name, last_name, phone_number } = req.body;

    const context = {
      user_id: user_id,
      address: this.checkValidString(address, 'address'),
      first_name: this.checkValidString(first_name, 'first_name'),
      last_name: this.checkValidString(last_name, 'last_name'),
      phone_number: this.checkValidString(phone_number, 'phone_number'),
      created_at: getNowWithDatabaseFormat(),
      updated_at: getNowWithDatabaseFormat(),
    };

    this.hasErrors(context);

    return context;
  };

  private checkValidString = (field: any, varname: string): string => {
    const message = {
      [varname]: `Provide a valid ${varname}, min 3 character and max 100`,
    };

    if (this.isUndefinedOrEmpty(field)) {
      this.setError(message);
      return field;
    }

    field = String(field) ?? '';

    const isValidLength = validator.isLength(field, {
      min: 3,
      max: 100,
    });

    if (!isValidLength) {
      this.setError(message);
    }

    return field;
  };
}

export default ContactValidator;
