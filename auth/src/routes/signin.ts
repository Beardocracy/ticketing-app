import express, { Request, Response } from 'express';
import {body} from 'express-validator';
import { User } from "../models/user";
import jwt from 'jsonwebtoken';
import {validateRequest, BadRequestError} from "@tbearden-dev/common";
import { Password } from "../services/password";

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
    async (req: Request, res: Response) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new BadRequestError('Invalid credentials.');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials.');
        }

        // Generate JWT
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
        }, process.env.JWT_KEY!);

        // Store it on session object
        req.session = {
            jwt: userJwt
        }

        res.status(200).send(existingUser);
});

export { router as signinRouter };