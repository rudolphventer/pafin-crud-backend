import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config';

const JWT_SECRET: string | undefined = process.env.JWT_SECRET!;

/**
 * Method to check if a user used a valid username and password
 * Hard coding the credentials in the environment for now as the requirements
 * did not give any details about implementation of the JWT authentication
 * @param userName
 * @param password
 */
const checkUserCredentials = (userName: string, password: string) => {
    return userName === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD;
};

/**
 * Generates a signed JWT to return to the user after successful login
 * @param userName
 * @param password
 */
export const generateJWT = (userName: string, password: string): string | undefined => {
    return checkUserCredentials(userName, password)
        ? jsonwebtoken.sign({ user: process.env.ADMIN_USERNAME }, JWT_SECRET)
        : undefined;
};
/**
 * Proxying the jsonwebtoken.verify request for better separation of concerns
 * @param jwt
 */
export const isJWTValid = (jwt: string): any => jsonwebtoken.verify(jwt, JWT_SECRET);
