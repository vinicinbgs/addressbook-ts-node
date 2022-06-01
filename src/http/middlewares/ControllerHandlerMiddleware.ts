import { Request, Response, NextFunction } from 'express';

const ControllerHandlerMiddleware =
  (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.log.info('request start');
      await fn(req, res, next);
    } catch (e) {
      next(e);
    }
  };

export default ControllerHandlerMiddleware;
