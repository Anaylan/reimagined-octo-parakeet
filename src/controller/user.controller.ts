import { UserService } from '../services/user.service';
import { NextFunction, Request, Response } from 'express';

export class UserController {
	private readonly userService: UserService = new UserService();

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			this.userService.getAll(req.body).then(async (users) => {
				res.status(200).send(users);
			});
		} catch (error) {
			res.json(error)
			return next(error);

		}
	}

	public async getById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).json('get user by id');
		next();
	}

	public async remove(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).json('remove user');
		next();
	}

	public async save(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).json('save user');
		next();
	}

	public async submit(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			this.userService.activate(req.params.link);
			res.redirect(`${process.env.CLIENT_URL}`);
		} catch (e) {
			res.json({ message: `${e}` });
			return next(e);

		}
	}
}
