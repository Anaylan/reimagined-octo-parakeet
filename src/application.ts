import express, { Express, Request, Response } from 'express';
import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Routes } from './routes';
import { serve, setup } from 'swagger-ui-express';
import swDocument from './openapi';
import { errorMiddleware } from './middleware/errors.midleware';
import compression from 'compression';

export const prefix: string = '/api';

export class Application {
	private _server: Express;
	constructor() {
		this._server = express();
		this._server.set('host', process.env.HOST || 'localhost');
		this._server.set('port', process.env.PORT || 8000);
		this._server.use(compression())
		this._server.use(json());
		this._server.use(urlencoded({ extended: true }));
		this._server.use(cookieParser());
		this._server.use(cors());
		this._server.use(errorMiddleware);
	}

	public async bootstrap(): Promise<void> {
		const host: string = this._server.get('host');
		const port: number = this._server.get('port');
		this._server.listen(port, host, () => {
			console.log(`Server started at http://${host}:${port}`);
		});
		Routes.forEach((route) => {
			(this._server as any)[route.method](
				prefix + '/' + route.prefix + '/' + route.route,
				...route.middlewares,
				(req: Request, res: Response, next: Function) => {
					const result = new (route.controller as any)()[route.action](
						req,
						res,
						next
					);
					if (result instanceof Promise) {
						result.then((result) =>
							result !== null && result !== undefined
								? res.send(result)
								: undefined
						);
					} else if (result !== null || result !== undefined) {
						res.json(result);
					}
				}
			);
		});
		// TODO: configure api routes to swagger
		this._server.use('/api-docs', serve, setup(swDocument));
		this._server.get('*', (req: Request, res: Response) => {
			res.status(404).json({
				errorCode: 'Not Found',
				description: 'This page is not found',
			});
		});
	}
}
