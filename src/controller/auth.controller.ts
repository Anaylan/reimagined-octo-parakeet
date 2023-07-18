import { NextFunction, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { validationResult } from 'express-validator';
import { ApiError } from '../exceptions/api.error';

export class AuthController {
	private readonly userService: UserService = new UserService();

	// login method
	public async signin(req: Request, res: Response, next: NextFunction) {
		try {
			const user = this.userService.signin(req.body.email, req.body.password);
			res.cookie('refreshToken', (await user).refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			await user.then((data) =>
				res.status(200).send({ accessToken: data.accessToken, user: data.user })
			);
		} catch (e) {
			res.json({ message: `${e}` })
			return next(e);
		}
	}

	// register method
	public async signup(req: Request, res: Response, next: NextFunction) {
		try {
			const err = validationResult(req);

			if (!err.isEmpty()) {
				res.json(err)
				return next(ApiError.BadRequest("Ошибка при валидации", err.array()));
			}

			const user = this.userService.signup(req.body);
			res.cookie('refreshToken', (await user).refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			await user.then((data) =>
				res.status(200).send({ accessToken: data.accessToken, user: data.user })
			);
		} catch (e) {
			res.json({ message: `${e}` })
			return next(e);
		}
	}

	public async forgotPassword(req: Request, res: Response, next: NextFunction) {
		res.json('this is recover password method');
	}

	public async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies;
			const token = await this.userService.logout(refreshToken);
			res.clearCookie('refreshToken');
			res.send(token);
		} catch (e) {
			// console.error(e);
			res.json({ message: `${e}` })
			return next(e);

		}
	}

	public async refreshToken(req: Request, res: Response, next: NextFunction) {
		try {
			const { oldRefreshToken } = req.cookies;
			this.userService.refresh(oldRefreshToken).then((data) => {

				res.cookie('refreshToken', data.refreshToken, {
					maxAge: 30 * 24 * 60 * 60 * 1000,
					httpOnly: true,
				});
				res.status(200).send({ accesToken: data.accessToken, user: data.user })
			});

		} catch (e) {
			// console.error(e);
			res.json({ message: `${e}` })
			return next(e);

		}
	}
}
