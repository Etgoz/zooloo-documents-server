import { DocumentController } from './controllers/DocumentController';
import { UserController } from './controllers/UserController';

export const Routes = [
	{
		method: 'get',
		route: '/documents',
		controller: DocumentController,
		action: 'all',
	},
	{
		method: 'get',
		route: '/documents/:id',
		controller: DocumentController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/documents',
		controller: DocumentController,
		action: 'save',
	},
	{
		method: 'delete',
		route: '/documents/:id',
		controller: DocumentController,
		action: 'remove',
	},
	{
		method: 'get',
		route: '/users',
		controller: UserController,
		action: 'all',
	},
	{
		method: 'get',
		route: 'users/:id',
		controller: UserController,
		action: 'one',
	},
	{
		method: 'post',
		route: '/users',
		controller: UserController,
		action: 'save',
	},
	{
		method: 'delete',
		route: 'users/:id',
		controller: UserController,
		action: 'remove',
	},
];
