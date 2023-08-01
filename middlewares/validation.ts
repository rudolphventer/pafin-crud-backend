import { body, param } from 'express-validator';
export { validationResult } from 'express-validator';
/**
 * Validation middleware for each route that accepts user input
 * https://express-validator.github.io/docs
 */

export const createUserValidator = [
    body('name')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User name is required')
        .isString()
        .withMessage('User name should be string'),
    body('password')
        .exists()
        .trim()
        .escape()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password should be string')
        .isLength({ min: 5 })
        .withMessage('Password should be at least 5 characters'),
    body('email').isEmail().trim().escape().normalizeEmail().withMessage('Provide valid email'),
];

export const getUserValidator = [
    param('id')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User id is required')
        .isNumeric()
        .withMessage('User id should be a number'),
];

export const updateUserValidator = [
    param('id')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User id is required')
        .isNumeric()
        .withMessage('User id should be a number'),
    body('name')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User name is required')
        .isString()
        .withMessage('User name should be string'),
    body('password')
        .exists()
        .trim()
        .escape()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password should be string')
        .isLength({ min: 5 })
        .withMessage('Password should be at least 5 characters'),
    body('email').isEmail().trim().escape().normalizeEmail().withMessage('Provide valid email'),
];

export const deleteUserValidator = [
    param('id')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User id is required')
        .isNumeric()
        .withMessage('User id should be a number'),
];

export const loginValidator = [
    body('username')
        .exists({ checkFalsy: true })
        .trim()
        .escape()
        .withMessage('User name is required')
        .isString()
        .withMessage('User name should be string'),
    body('password')
        .trim()
        .escape()
        .exists()
        .withMessage('Password is required')
        .isString()
        .withMessage('Password should be string')
        .isLength({ min: 5 })
        .withMessage('Password should be at least 5 characters'),
];
