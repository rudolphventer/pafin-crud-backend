import { Request, Response, NextFunction } from 'express';
import { dbClient } from '../services/database';
import { hashPassword } from '../services/passwordTools';

interface user {
    id: string;
    name: string;
    email: string;
    password: string;
}

/**
 * Controller for the get all users request
 * @param request
 * @param response
 */
const getUsers = (request: Request, response: Response) => {
    dbClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            response.status(500).send(`Could not get users`);
            throw error;
        }
        let resData: user[] = results.rows;
        if (results.rowCount > 0) {
            response.status(200).json(resData);
        } else {
            response.status(400).send(`Could not get users`);
        }
    });
};

/**
 * Controller for the create user request
 * The password is hashed before being stored
 * @param request
 * @param response
 */
const createUser = async (request: Request, response: Response) => {
    const { name, email, password } = request.body;
    const passwordHash: string = await hashPassword(password);

    dbClient.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, passwordHash],
        (error, results) => {
            if (error) {
                throw error;
            }
            if (error) {
                response.status(500).send(`Could not create user`);
                throw error;
            }
            if (results.rowCount > 0) {
                response.status(200).send(`Created user ID:${results.rows[0].id}`);
            } else {
                response.status(400).send(`Could not create user`);
            }
        },
    );
};

/**
 * Controller for fetching a single user by ID
 * @param request
 * @param response
 */
const getUserById = (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    if (Number.isNaN(id)) {
        return response.status(400).send('Invalid user ID');
    }
    dbClient.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(`Could not get ID:${id}`);
            throw error;
        }
        let resData: user[] = results.rows;
        if (results.rowCount > 0) {
            response.status(200).json(resData);
        } else {
            response.status(400).send(`Could not get user ID:${id}`);
        }
    });
};

/**
 * Controller for updating a single user record's details by ID
 * The password is hashed before being stored
 * @param request
 * @param response
 */
const updateUserById = async (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    if (Number.isNaN(id)) {
        return response.status(400).send('Invalid user ID');
    }
    const { name, email, password } = request.body;
    const passwordHash: string = await hashPassword(password);

    dbClient.query(
        'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
        [name, email, passwordHash, id],
        (error, results) => {
            if (error) {
                response.status(500).send(`Could not update user ID:${id}`);
                throw error;
            }
            if (results.rowCount > 0) {
                response.status(200).send(`Updated user ID:${id}`);
            } else {
                response.status(400).send(`Could not update user ID:${id}`);
            }
        },
    );
};

/**
 * Controller for deleting a single user by ID
 * @param request
 * @param response
 */
const deleteUserById = (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    if (Number.isNaN(id)) {
        return response.status(400).send('Invalid user ID');
    }

    dbClient.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
        if (error) {
            response.status(500).send(`Could not delete user ID:${id}`);
            throw error;
        }
        if (results.rowCount > 0) {
            response.status(200).send(`Deleted user ID:${id}`);
        } else {
            response.status(400).send(`Could not delete user ID:${id}`);
        }
    });
};

export default { getUsers, createUser, getUserById, updateUserById, deleteUserById };
