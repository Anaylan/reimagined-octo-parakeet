import {
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('token_user')
export class TokenEntity {
	@PrimaryGeneratedColumn({ unsigned: true })
	id: number;

	@OneToOne(() => UserEntity)
	@JoinColumn()
	user: UserEntity;

	@Column({ type: 'text' })
	refreshToken: string;
}
