import { Request, Response, NextFunction } from 'express';
import { dbClient } from '../services/database';

interface user {
    id: string,
    name: string,
    email: string,
    password: string
};


// Getting all users
const getUsers = (request: Request, response: Response) => {
    dbClient.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      let resData: user[] = results.rows;
      response.status(200).json(resData)
    })
  }

// Getting a single user

// Updating a user

// Deleting a user

export default { getUsers };
