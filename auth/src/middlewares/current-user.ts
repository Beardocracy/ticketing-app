import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string;
    email: string;
}

// Telling typescript we are adding an optional property to Requests, called currentUser with type UserPayload.
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

// This middleware adds the extracts the JWT data and adds currentUser property to requests.
export const currentUser = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Equivalent to (!req.session || !req.session.jwt)
    if (!req.session?.jwt) {
        return next();
    }

    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;
    } catch(err) {
    }

    next();
}