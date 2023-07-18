import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@Column()
	firstname: string;

	@Column()
	secondname: string;

	@Column()
	username: string;

	@Column({ unique: true })
	email: string;

	@Column({ default: false })
	isActivated: boolean;

	@Column({ nullable: true })
	activationLink: string;

	@Column()
	password: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@OneToMany(() => PostEntity, (post: PostEntity) => post.user)
	posts: PostEntity[];
}
