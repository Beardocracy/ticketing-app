import express, { Request, Response } from 'express';
import {body, validationResult} from 'express-validator';
import {RequestValidationError} from "../errors/request-validation-error";
import {validateRequest} from "../middlewares/validate-request";

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email'),
        body('password')
            .trim()
            .notEmpty()
            .withMessage('Password must be supplied.')
    ],
    validateRequest,
    (req: Request, res: Response) => {
    
});

export { router as signinRouter };