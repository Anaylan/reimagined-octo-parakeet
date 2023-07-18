import 'reflect-metadata';
import { Application } from './application';
import { AppDataSource } from './datasource';

AppDataSource.initialize()
	.then(async (connection) => {
		console.log(
			'TypeORM connection successfully\nDriver: %s,\nDatabase: %s',
			connection.options.type,
			connection.options.database
		);
		const application: Application = new Application();
		await application.bootstrap();
	})
	.catch((error) => console.log('TypeORM connection error: ', error));
