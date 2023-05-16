import * as dotenv from 'dotenv';

dotenv.config();

const DB_USERNAME = process.env.DB_USERNAME || '';
const DB_PASSWORD = process.env.DB_PASSWORD || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
	server: {
		port: SERVER_PORT,
	},
	db: { username: DB_USERNAME, password: DB_PASSWORD },
};
