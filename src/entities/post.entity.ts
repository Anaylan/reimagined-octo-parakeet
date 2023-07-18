import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('posts')
export class PostEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@ManyToOne(() => UserEntity, (user: UserEntity) => user.posts)
	user: UserEntity;
}
