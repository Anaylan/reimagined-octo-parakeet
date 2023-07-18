import { sign, verify } from 'jsonwebtoken';
import { TokenEntity } from '../entities/token.entity';
import { Repository } from 'typeorm';
import { AppDataSource } from '../datasource';

export class TokenService {
	private readonly tokenRepository: Repository<TokenEntity> =
		AppDataSource.getRepository(TokenEntity);

	public async generate(payload: any) {
		const accessToken = sign(payload, `${process.env.JWT_ACCESS_KEY}`, {
			expiresIn: process.env.JWT_ACCESS_EXPIREDIN,
		});
		const refreshToken = sign(payload, `${process.env.JWT_REFRESH_KEY}`, {
			expiresIn: process.env.JWT_REFRESH_EXPIREDIN,
		});

		return { accessToken, refreshToken };
	}

	public async save(uid: any, refreshToken: string) {
		const tokenData = await this.tokenRepository.findOne({
			where: { user: uid },
		});

		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return this.tokenRepository.save(tokenData);
		}

		const newToken = Object.assign(new TokenEntity(), {
			user: uid,
			refreshToken,
		});

		this.tokenRepository.save(newToken);

		return await newToken;
	}

	public async remove(token: string) {
		return await this.tokenRepository.delete({ refreshToken: token });
	}

	public validate(token: string, tokenType: 'access' | 'refresh') {
		try {
			const type: string =
				tokenType === 'access'
					? `${process.env.JWT_ACCESS_KEY}`
					: `${process.env.JWT_REFRESH_KEY}`;
			const data = verify(token, type);
			return data;
		} catch (error) {
			return null;
		}
	}

	public find(token: string) {
		const tokenData = this.tokenRepository.findOne({
			where: {
				refreshToken: token,
			},
		});
		return tokenData;
	}
}
