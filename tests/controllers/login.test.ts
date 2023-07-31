import { Request, Response } from 'express';
import login from '../../controllers/login';

const testUsername = 'a123';
const testPassword = 'p123';
process.env.ADMIN_USERNAME = testUsername;
process.env.ADMIN_PASSWORD = testPassword;

const mockRequest = {
    body: {
        username: testUsername,
        password: testPassword,
    },
} as Request;

const mockUnauthRequest = {
    body: {
        username: 'wrongUser',
        password: 'wrongPass',
    },
} as Request;

/**
 * A utility method for functionally mocking the express response object
 * @param statusCallback
 * @param messageCallback
 */
const mockResponseFactory = (statusCallback, messageCallback) => {
    return {
        status: (response) => {
            statusCallback(response);
            return { json: (message) => messageCallback(message), send: (message) => messageCallback(message) };
        },
    } as Response;
};

describe('Test login.ts', () => {
    test('Should return a JWT authorization header', async () => {
        let statusCode;
        let responseContent;

        const request = await login.login(
            mockRequest,
            mockResponseFactory(
                (status) => {
                    statusCode = status;
                },
                (message) => {
                    responseContent = message;
                },
            ),
        );

        expect(statusCode).toEqual(200);
        expect(responseContent.Authorization.slice(0, 6)).toEqual('Bearer');
        expect(responseContent.Authorization.length).toBeGreaterThan(50);
    });

    test('Should return a 400 error for unauthorized requests', async () => {
        let statusCode;
        let responseContent;

        const request = await login.login(
            mockUnauthRequest,
            mockResponseFactory(
                (status) => {
                    statusCode = status;
                },
                (message) => {
                    responseContent = message;
                },
            ),
        );

        expect(statusCode).toEqual(400);
        expect(responseContent).toEqual('Incorrect username or password');
    });
});
