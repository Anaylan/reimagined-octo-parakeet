import { FindOptionsWhere, Repository } from "typeorm";
import { AppDataSource } from "../datasource";
import { PostEntity } from "../entities/post.entity";
import { ApiError } from "../exceptions/api.error";

export class PostService {
    private readonly postRepository: Repository<PostEntity> =
        AppDataSource.getRepository(PostEntity);

    /**
     * find
     */
    public async find() {
        const post = await this.postRepository.find();
        if (!post) {
            // throw ApiError.BadRequest("Записи не найдены или что-то пошло не так.");
        }
        return post;
    }

    public async findOne(options: FindOptionsWhere<PostEntity>) {
        const post = await this.postRepository.findOneBy({ ...options });
        if (!post) {
            throw ApiError.BadRequest("Записи не найдены или что-то пошло не так.");
        }
        // console.log(post);
        // 
        return post
    }
}