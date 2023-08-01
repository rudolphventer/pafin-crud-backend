import { Request, Response } from 'express';
import { generateJWT } from '../services/jwtAuth';
import { validationResult } from 'express-validator';

/**
 * Login controller
 * @param request
 * @param response
 */
const login = (request: Request, response: Response) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }

    const { username, password } = request.body;

    try {
        const JWT: string | undefined = generateJWT(username, password);
        if (JWT) {
            response.status(200).json({ Authorization: `Bearer ${JWT}` });
        } else {
            response.status(400).send(`Incorrect username or password`);
        }
    } catch (error) {
        return response.status(500).send(error);
    }
};

export default { login };
