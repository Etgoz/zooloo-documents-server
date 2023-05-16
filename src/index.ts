import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { config } from './config';
import * as morgan from 'morgan';
import { Document } from './entities/Documents';
import { User } from './entities/Users';

function handleError(err, req: Request, res: Response, next: NextFunction) {
	res.status(err.statusCode || 500).send({ message: err.message });
}

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(morgan('tiny'));
		app.use(express.json());

		// register express routes from defined application routes
		Routes.forEach((route) => {
			(app as any)[route.method](
				route.route,
				async (req: Request, res: Response, next: Function) => {
					try {
						const result = await new (route.controller as any)()[route.action](req, res, next);
						res.json(result);
					} catch (error) {
						next(error);
					}
				}
			);
		});

		// setup express app here
		// ...
		const documents = [
			{ title: 'doc1', description: 'doc1', approvalStatus: 1 },
			{ title: 'doc2', description: 'doc2', approvalStatus: 1 },
			{ title: 'doc3', description: 'doc3', approvalStatus: 1 },
			{ title: 'doc4', description: 'doc4', approvalStatus: 0 },
			{ title: 'doc5', description: 'doc5', approvalStatus: 1 },
			{ title: 'doc6', description: 'doc6', approvalStatus: 1 },
			{ title: 'doc7', description: 'doc7', approvalStatus: 0 },
			{ title: 'doc8', description: 'doc8', approvalStatus: 1 },
			{ title: 'doc9', description: 'doc9', approvalStatus: 1 },
			{ title: 'doc10', description: 'doc10', approvalStatus: 1 },
		];

		AppDataSource.createQueryBuilder()
			.insert()
			.into(Document)
			.values(documents)
			.orUpdate(['description', 'approvalStatus'], ['title'], { skipUpdateIfNoValuesChanged: true })
			.execute();

		const users = [
			{ name: 'John Doe', email: 'example1@example.com' },
			{ name: 'Jane Doe', email: 'example2@example.com' },
			{ name: 'Jim Don', email: 'example3@example.com' },
		];

		AppDataSource.createQueryBuilder()
			.insert()
			.into(User)
			.values(users)
			.orUpdate(['name'], ['email'], { skipUpdateIfNoValuesChanged: true })
			.execute();

		app.use(handleError);

		// start express server
		app.listen(config.server.port);

		console.log(
			`Express server has started on port ${config.server.port}. Open http://localhost:3000/users to see results`
		);
	})
	.catch((error) => console.log(error));
