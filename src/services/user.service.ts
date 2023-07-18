import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../datasource';
import { UserEntity } from '../entities/user.entity';
import { MailService } from './mail.service';
import { TokenService } from './token.service';
import { compare, hash } from 'bcrypt';
import { v4 } from 'uuid';
import { UserDto } from '../dto/user.dto';
import { prefix } from '../application';
import { ApiError } from '../exceptions/api.error';
import { JwtPayload } from 'jsonwebtoken';

export class UserService {
	private readonly userRepository: Repository<UserEntity> =
		AppDataSource.getRepository(UserEntity);
	private readonly mailService: MailService = new MailService();
	private readonly tokenService: TokenService = new TokenService();

	public async signup(data: UserEntity) {
		const candidate = await this.userRepository.findOneBy({
			email: data.email,
		});
		if (candidate) {
			throw ApiError.BadRequest(`Такой пользователь уже существует`);
		}

		// generate data
		const hashPwd: string = await hash(data.password, 4);
		const activationLink: string = v4();

		const user = Object.assign(new UserEntity(), {
			...data,
			password: hashPwd,
			activationLink,
		});
		await this.userRepository.save(user);
		await this.mailService.send(
			data.email,
			`${process.env.API_URL}${prefix}/users/activate/` + activationLink
		);

		return this.getWithToken(user);
	}

	public async signin(email: string, password: string) {
		const candidate = await this.userRepository.findOneBy({
			email
		});

		if (!candidate) {
			throw ApiError.BadRequest(`Такого пользователя не существует`);
		}

		await compare(password, candidate!.password).then(async (isUserCorrect) => {
			if (!isUserCorrect) {
				throw ApiError.BadRequest(`Неправильный логин/пароль`);
			}
		});


		return this.getWithToken(candidate);
	}

	public async activate(link: string) {
		const user = this.userRepository.findOne({
			where: { activationLink: link },
		});
		if (!user) {
			throw ApiError.BadRequest('Некоректная ссылка активации');
		}

		this.userRepository.update(
			{ activationLink: link },
			{ isActivated: true, activationLink: "" }
		);
	}

	public async logout(token: string) {
		await this.tokenService.remove(token);

		return token;
	}

	public async refresh(token: string) {
		if (!token) {
			throw ApiError.UnauthorizedError();
		}

		const userData = this.tokenService.validate(token, 'refresh');
		const isFound = await this.tokenService.find(token);
		if (!userData || !isFound) {
			throw ApiError.UnauthorizedError();
		}

		const user = Object.assign(new UserEntity(), {
			...this.userRepository.findOneBy({ id: (userData as JwtPayload).id }),
		});

		return await this.getWithToken(user);
	}

	public async getAll(
		filters: FindOptionsWhere<UserEntity>
	): Promise<UserDto[]> {
		const rawUsers = filters ? this.userRepository.findBy({ ...filters }) : this.userRepository.find();

		const users = new Array();
		(await rawUsers).forEach(async (user) =>
			users.push(this.getWithoutToken(user))
		);

		return users;
	}

	private async getWithToken(user: UserEntity) {
		const visibleColumns = new UserDto(user);
		const tokens = this.tokenService.generate({ ...visibleColumns });

		await this.tokenService.save(
			visibleColumns.id,
			(
				await tokens
			).refreshToken
		);

		return {
			accessToken: (await tokens).accessToken,
			refreshToken: (await tokens).refreshToken,
			user: visibleColumns,
		};
	}

	private getWithoutToken(user: UserEntity) {
		const visibleColumns = new UserDto(user);

		return { ...visibleColumns };
	}
}
