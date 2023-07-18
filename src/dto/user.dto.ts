import { UserEntity } from '../entities/user.entity';

export class UserDto {
	public id: number;
	public firstname: string;
	public secondname: string;
	public username: string;
	public email: string;
	public isActivated: boolean;

	constructor(initData: UserEntity) {
		this.id = initData.id;
		this.firstname = initData.firstname;
		this.secondname = initData.secondname;
		this.username = initData.username;
		this.email = initData.email;
		this.isActivated = initData.isActivated;
	}
}
