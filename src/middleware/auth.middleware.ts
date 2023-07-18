import { Response, NextFunction } from 'express';
import { ApiError } from '../exceptions/api.error';
import { TokenService } from '../services/token.service';
import { UserRequest } from '../types';

export const isAuth = (req: UserRequest, res: Response, next: NextFunction) => {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			res.json({ message: "Пользователь не авторизован" })
			return next(ApiError.UnauthorizedError());
		}

		const token = authHeader?.split(' ')[1];
		if (!token) {
			res.json({ message: "Пользователь не авторизован" })
			return next(ApiError.UnauthorizedError());
		}

		const userData = new TokenService().validate(token, 'access');
		if (!userData) {
			res.json({ message: "Пользователь не авторизован" })
			return next(ApiError.UnauthorizedError());
		}

		req.user = userData;
		next();
	} catch (error) {
		return next(ApiError.UnauthorizedError());
	}
};
