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

/**
 * Controller for fetching a single user by ID
 * @param request 
 * @param response 
 */
const getUserById = (request: Request, response: Response) => {
	const id = parseInt(request.params.id)

	dbClient.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}
		let resData: user[] = results.rows;
		response.status(200).json(resData)
	})
}

/**
 * Controller for updating a single user record's details by ID
 * @param request 
 * @param response 
 */
const updateUserById = async (request: Request, response: Response) => {
	const id = parseInt(request.params.id)
	const { name, email, password } = request.body;
	const passwordHash: string = await hashPassword(password);

	dbClient.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',
    [name, email, passwordHash, id], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).send(`Updated user ID:${id}`)
	})
}

// Deleting a user

export default { getUsers, createUser, getUserById, updateUserById };
