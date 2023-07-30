import { Request, Response, NextFunction } from 'express';
import { dbClient } from '../services/database';
import { hashPassword } from '../services/passwordTools';

interface user {
	id: string,
	name: string,
	email: string,
	password: string
};


/**
 * Controller for the get all users request
 * @param request 
 * @param response 
 */
const getUsers = (request: Request, response: Response) => {
	dbClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
		if (error) {
			throw error
		}
		let resData: user[] = results.rows;
		response.status(200).json(resData)
	})
}

/**
 * Controller for the create user request
 * @param request 
 * @param response 
 */
const createUser = async (request: Request, response: Response) => {
	const { name, email, password } = request.body;
	const passwordHash: string = await hashPassword(password);
	dbClient.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, passwordHash], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`User added with ID: ${results.rows[0].id}`)
	})
}

// Getting a single user

// Updating a user

// Deleting a user

export default { getUsers, createUser };
