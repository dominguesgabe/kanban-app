import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserBoardTables1733535992838 implements MigrationInterface {
    name = 'CreateUserBoardTables1733535992838'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "ownerId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "FK_72a2bd5f275784b6bfa940c0ab6" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_board"("id", "name", "content", "ownerId") SELECT "id", "name", "content", "ownerId" FROM "board"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`ALTER TABLE "temporary_board" RENAME TO "board"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer, CONSTRAINT "FK_3c1ebe36479ec7348ebed9fc2db" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a08e6af137cd4049e8f2673623e" FOREIGN KEY ("boardId") REFERENCES "board" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_user_board"("id", "permission", "userId", "boardId") SELECT "id", "permission", "userId", "boardId" FROM "user_board"`);
        await queryRunner.query(`DROP TABLE "user_board"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_board" RENAME TO "user_board"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_board" RENAME TO "temporary_user_board"`);
        await queryRunner.query(`CREATE TABLE "user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer)`);
        await queryRunner.query(`INSERT INTO "user_board"("id", "permission", "userId", "boardId") SELECT "id", "permission", "userId", "boardId" FROM "temporary_user_board"`);
        await queryRunner.query(`DROP TABLE "temporary_user_board"`);
        await queryRunner.query(`ALTER TABLE "board" RENAME TO "temporary_board"`);
        await queryRunner.query(`CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "content" varchar NOT NULL, "ownerId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "board"("id", "name", "content", "ownerId") SELECT "id", "name", "content", "ownerId" FROM "temporary_board"`);
        await queryRunner.query(`DROP TABLE "temporary_board"`);
        await queryRunner.query(`DROP TABLE "user_board"`);
        await queryRunner.query(`DROP TABLE "board"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
