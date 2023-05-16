import * as dotenv from 'dotenv';

dotenv.config();

const POSTGRES_USERNAME = process.env.POSTGRES_USERNAME || '';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
	server: {
		port: SERVER_PORT,
	},
	db: { username: POSTGRES_USERNAME, password: POSTGRES_PASSWORD },
};
