import { AuthController } from '../controller/auth.controller';
import { body } from 'express-validator';

export const AuthRoutes = [
	{
		method: 'post',
		route: 'auth/signup',
		controller: AuthController,
		action: 'signup',
		middlewares: [
			body('email').isEmail(),
			body('password').isLength({ min: 6 }),
		],
		prefix: "v1"
	},
	{
		method: 'post',
		route: 'auth/signin',
		controller: AuthController,
		action: 'signin',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'post',
		route: 'auth/forgot-password',
		controller: AuthController,
		action: 'forgotPassword',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'post',
		route: 'auth/logout',
		controller: AuthController,
		action: 'logout',
		middlewares: [],
		prefix: "v1"
	},
	{
		method: 'post',
		route: 'auth/refresh',
		controller: AuthController,
		action: 'refreshToken',
		middlewares: [],
		prefix: "v1"
	},
];
