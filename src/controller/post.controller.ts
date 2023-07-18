import { Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { AppDataSource } from '../datasource';
import { NextFunction, Request, Response } from 'express';

export class PostController {
	private readonly postRepository: Repository<PostEntity> =
		AppDataSource.getRepository(PostEntity);

	public async getAll(req: Request, res: Response, next: NextFunction) {
		const post = await this.postRepository.find();

		if (!post) {
			return 'unregistered user';
		}
		return post;
	}

	public async getById(req: Request, res: Response, next: NextFunction) {
		const id = parseInt(req.params.id);

		const post = await this.postRepository.findOne({
			where: { id },
		});

		if (!post) {
			return 'unregistered user';
		}
		return post;
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
}
