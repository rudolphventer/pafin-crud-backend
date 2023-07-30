import { Request, Response } from 'express';
import { generateJWT } from '../services/jwtAuth';

/**
 * Login controller
 * @param request 
 * @param response 
 */
const login = (request: Request, response: Response) => {
	const { username, password } = request.body;

	try {
		const JWT: string | undefined = generateJWT(username, password);
		response
			.status(200)
			.json({
				Authorization: `Bearer ${JWT}`
			});
	} catch (error) {
		return response.status(500).send(error);
	}

}

export default { login };
