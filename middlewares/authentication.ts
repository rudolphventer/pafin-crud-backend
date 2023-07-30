import { Request, Response, NextFunction } from 'express';
import { isJWTValid } from '../services/jwtAuth';

/**
 * Middleware to determine whether a request was made with a valid JWT
 * @param request 
 * @param response 
 * @param next 
 */
export const verifyToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;
    const token = authHeader?.split(' ')[1] || '';
    if (!token) {
      return response.status(403).send('A token is required for authentication');
    }
    try {
      isJWTValid(token);
    } catch (err) {
      return response.status(401).send('Invalid Token');
    }

  return next();
};