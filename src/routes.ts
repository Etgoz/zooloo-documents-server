import { DocumentController } from './controller/DocumentController';

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
];
