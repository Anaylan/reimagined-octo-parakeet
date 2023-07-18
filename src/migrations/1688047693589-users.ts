import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1688047693589 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// queryRunner.query(``)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		// queryRunner.dropColumn(`users`, ``)
	}
}
