import { NextFunction, Request, Response } from 'express';
import { PostService } from '../services/post.service';

export class PostController {

	private readonly postService: PostService = new PostService();

	public async getAll(req: Request, res: Response, next: NextFunction) {
		try {
			const posts = await this.postService.find();

			res.send(posts);
		} catch (error) {
			res.json({ message: `${error}` })
			return next(error);
		}
	}

	public async getById(req: Request, res: Response, next: NextFunction) {
		try {
			const params = { ...req.query, id: parseInt(req.params.id) };
			const post = await this.postService.findOne({ ...params });
			res.send(post);
		} catch (error) {
			res.json({ message: `${error}` })
			return next(error);
		}
	}

	public async remove(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).send('remove user');
		next();
	}

	public async save(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		res.status(200).send('save user');
		next();
	}
}
