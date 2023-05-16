import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Document } from './entity/Documents';
import { config } from './config';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: 'localhost',
	port: 5432,
	username: config.db.username,
	password: config.db.password,
	database: 'postgres',
	synchronize: true,
	logging: false,
	entities: [Document],
	migrations: [],
	subscribers: [],
});
