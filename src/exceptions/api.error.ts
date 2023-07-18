export class ApiError extends Error {
	public status: number;
	public errors;

	constructor(status: number, message: string, errors: any = []) {
		super(message);

		this.status = status;
		this.errors = errors;
	}

	public static UnauthorizedError() {
		return new ApiError(401, 'Пользователь не авторизован');
	}

	public static BadRequest(message: string, errors: any = []) {
		return new ApiError(400, message, errors);
	}
}
