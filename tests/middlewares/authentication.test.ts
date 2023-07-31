import { Request, Response } from 'express';
import { verifyToken } from '../../middlewares/authentication';


const JWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYWRtaW4iLCJpYXQiOjE2OTA4MzAyNTR9.0ViKLwqGnjL1OiEwDeNEusn9kQi_yD1Qkr__GOTBSJ8';

const mockRequestNoAuth = {
    headers: {authorization: ''}
} as Request;

const mockRequestAuth = {
    headers: {authorization: JWT}
} as Request;

const mockRequestBadAuth = {
    headers: {authorization: 'Bearer xyz'}
} as Request;

const mockResponseFactory = (statusCallback, messageCallback) => {
    return {
        status: (response) => { 
            statusCallback(response);
            return { json: (message) => messageCallback(message), send: (message) => messageCallback(message) }
        }
    } as Response;
};

describe("Test authentication.ts", () => {

    test("The middleware should execute the next function on success", async () => {
        let statusCode;
        let responseContent;
        const mockNext = jest.fn((() => true));

        const request = await verifyToken(mockRequestAuth, mockResponseFactory(
            (status) => {statusCode = status}, 
            (message) => {responseContent = message} 
        ), mockNext)

        expect(statusCode).toBeNull;
        expect(responseContent).toBeNull;
        expect(mockNext.mock.calls.length).toEqual(1);
    });

    test("The middleware should throw a 403 error if auth header is missing", async () => {
        let statusCode;
        let responseContent;
        const mockNext = jest.fn((() => true));

        const request = await verifyToken(mockRequestNoAuth, mockResponseFactory(
            (status) => {statusCode = status}, 
            (message) => {responseContent = message} 
        ), mockNext)

        expect(statusCode).toEqual(403);
        expect(responseContent).toEqual('A token is required for authentication');
        expect(mockNext.mock.calls.length).toEqual(0);
    });

    test("The middleware should throw a 401 error if auth token is invalid", async () => {
        let statusCode;
        let responseContent;
        const mockNext = jest.fn((() => true));

        const request = await verifyToken(mockRequestBadAuth, mockResponseFactory(
            (status) => {statusCode = status}, 
            (message) => {responseContent = message} 
        ), mockNext)

        expect(statusCode).toEqual(401);
        expect(responseContent).toEqual('Invalid Token');
        expect(mockNext.mock.calls.length).toEqual(0);
    });


});