import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UserEntity } from '../entities/user.entity';
import { PostEntity } from '../entities/post.entity';
import { TokenEntity } from '../entities/token.entity';

config();

export const AppDataSource = new DataSource({
	type: 'mysql',
	host: process.env.DB_HOST,
	port: 3306,
	driver: require('mysql2'),
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	charset: 'utf8mb4',
	entities: [UserEntity, PostEntity, TokenEntity],
	synchronize: true,
	migrations: [],
	subscribers: [],
	migrationsTableName: 'migration_table',
});
