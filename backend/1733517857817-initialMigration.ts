import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1733517857817 implements MigrationInterface {
    name = 'InitialMigration1733517857817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_c9951f13af7909d37c0e2aec484" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_board"("id", "name", "content", "userId") SELECT "id", "name", "content", "userId" FROM "board"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`ALTER TABLE "temporary_board" RENAME TO "board"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" RENAME TO "temporary_board"`);
        await queryRunner.query(`CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "board"("id", "name", "content", "userId") SELECT "id", "name", "content", "userId" FROM "temporary_board"`);
        await queryRunner.query(`DROP TABLE "temporary_board"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "board"`);
    }

}
