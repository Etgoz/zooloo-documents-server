import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Document } from './entities/Documents';
import { config } from './config';
import { User } from './entities/Users';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: config.db.username,
	password: config.db.password,
	database: 'postgres',
	synchronize: true,
	logging: false,
	entities: [Document, User],
	migrations: [],
	subscribers: [],
});
