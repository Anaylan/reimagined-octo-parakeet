import { UserController } from '../controller/user.controller';
import { isAuth } from '../middleware/auth.middleware';

export const UserRoutes = [
	{
		method: 'get',
		route: 'users',
		controller: UserController,
		action: 'getAll',
		middlewares: [isAuth],
		prefix: "v1"
	},
	{
		method: 'get',
		route: 'users/:id',
		controller: UserController,
		action: 'getById',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'post',
		route: 'users',
		controller: UserController,
		action: 'save',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'delete',
		route: 'users/:id',
		controller: UserController,
		action: 'remove',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'get',
		route: 'users/activate/:link',
		controller: UserController,
		action: 'submit',
		middlewares: [],
		prefix: "v1"
	},
];
