const swagger = {
	openapi: '3.1.0',
	info: {
		title: 'Express API with Swager',
		version: '0.1.0a',
		description:
			'This is a simple CRUD API application made with Express and documented with Swagger',
	},
	servers: [
		{
			url: 'http://localhost:8000',
			description: 'Development server',
		},
	],
	apis: ['./routes/*.ts'],
};

export default swagger;
