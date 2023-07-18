import { PostEntity } from '../entities/post.entity';
import { UserDto } from './user.dto';

export class PostDto {
    public id: number;
    public title: string;
    public description: string;
    public image: string;
    public created_at: Date;
    public updated_at: Date;
    public user: UserDto;

    constructor(initData: PostEntity) {
        this.id = initData.id;
        this.title = initData.title;
        this.description = initData.description;
        this.image = initData.image;
        this.created_at = initData.created_at;
        this.updated_at = initData.updated_at;
        this.user = new UserDto(initData.user);
    }
}
