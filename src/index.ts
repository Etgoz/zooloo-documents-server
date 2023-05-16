import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { AppDataSource } from './data-source';
import { Routes } from './routes';
import { config } from './config';

function handleError(err, req, res, next) {
	res.status(err.statusCode || 500).send({ message: err.message });
}

AppDataSource.initialize()
	.then(async () => {
		// create express app
		const app = express();
		app.use(bodyParser.json());

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

		app.use(handleError);

		// start express server
		app.listen(config.server.port);

		console.log(
			`Express server has started on port ${config.server.port}. Open http://localhost:3000/users to see results`
		);
	})
	.catch((error) => console.log(error));