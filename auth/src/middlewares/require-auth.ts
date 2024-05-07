import { Request, Response, NextFunction } from 'express';
import {NotAuthorizedError} from "../errors/not-authorized-error";

export const requireAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // We are assuming the current-user middleware has been called before this
    if (!req.currentUser) {
        throw new NotAuthorizedError();
    }

    next();
}