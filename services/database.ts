import pg from 'pg';
import 'dotenv/config';

export const dbClient = new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(<string>process.env.DB_PORT, 10) || 5432,
  });
  