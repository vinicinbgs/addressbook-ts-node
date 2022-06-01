interface IBaseException {
  getType(): string;
  getStatus(): number;
  getFinalMessage(): string | object[];
}

abstract class BaseException extends Error implements IBaseException {
  protected type: string;
  protected contexts: object;
  protected status: number;
  protected finalMessage: string | object[];

  constructor(message: string, contexts: object) {
    super(message);

    Error.captureStackTrace(this, this.constructor);

    this.type = '';
    this.status = 400;
    this.finalMessage = 'default final message';
    this.contexts = contexts;
  }

  getType = () => {
    return this.type;
  };

  getStatus = () => {
    return this.status;
  };

  getFinalMessage = () => {
    return this.finalMessage;
  };
}

export default BaseException;

export { IBaseException };
