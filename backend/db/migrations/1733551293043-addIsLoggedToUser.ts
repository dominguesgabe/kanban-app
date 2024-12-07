import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIsLoggedToUser1733551293043 implements MigrationInterface {
  name = 'AddIsLoggedToUser1733551293043';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD COLUMN "is_logged" boolean NOT NULL DEFAULT (0)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "is_logged"`);
  }
}
