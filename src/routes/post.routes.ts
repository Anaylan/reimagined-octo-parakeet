import { PostController } from '../controller/post.controller';

export const PostRoutes = [
	{
		method: 'get',
		route: 'posts',
		controller: PostController,
		action: 'getAll',
		middlewares: [],
		prefix: 'v1'
	},
	{
		method: 'get',
		route: 'posts/:id',
		controller: PostController,
		action: 'getById',
		middlewares: [],
		prefix: 'v1'
	},
	{
		method: 'post',
		route: 'posts/',
		controller: PostController,
		action: 'save',
		middlewares: [],
		prefix: 'v1'
	},
	{
		method: 'delete',
		route: 'posts/:id',
		controller: PostController,
		action: 'remove',
		middlewares: [],
		prefix: 'v1'
	},
];
