import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditingUserToUseSession1733621074769
  implements MigrationInterface
{
  name = 'EditingUserToUseSession1733621074769';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE IF NOT EXISTS "board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer, CONSTRAINT "FK_3c1ebe36479ec7348ebed9fc2db" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a08e6af137cd4049e8f2673623e" FOREIGN KEY ("boardId") REFERENCES "board" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_board"("id", "permission", "userId", "boardId") SELECT "id", "permission", "userId", "boardId" FROM "user_board"`,
    );
    await queryRunner.query(`DROP TABLE "user_board"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_board" RENAME TO "user_board"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer NOT NULL, CONSTRAINT "FK_72a2bd5f275784b6bfa940c0ab6" FOREIGN KEY ("ownerId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_board"("id", "name", "ownerId") SELECT "id", "name", "ownerId" FROM "board"`,
    );
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`ALTER TABLE "temporary_board" RENAME TO "board"`);
    await queryRunner.query(
      `CREATE TABLE "temporary_session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"), CONSTRAINT "FK_30e98e8746699fb9af235410aff" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_session"("id", "code", "user_id") SELECT "id", "code", "user_id" FROM "session"`,
    );
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_session" RENAME TO "session"`,
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL, CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_board_column"("id", "name", "boardId") SELECT "id", "name", "boardId" FROM "board_column"`,
    );
    await queryRunner.query(`DROP TABLE "board_column"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_board_column" RENAME TO "board_column"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board_column" RENAME TO "temporary_board_column"`,
    );
    await queryRunner.query(
      `CREATE TABLE "board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "board_column"("id", "name", "boardId") SELECT "id", "name", "boardId" FROM "temporary_board_column"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_board_column"`);
    await queryRunner.query(
      `ALTER TABLE "session" RENAME TO "temporary_session"`,
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "code" varchar NOT NULL, "user_id" integer, CONSTRAINT "REL_30e98e8746699fb9af235410af" UNIQUE ("user_id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "session"("id", "code", "user_id") SELECT "id", "code", "user_id" FROM "temporary_session"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_session"`);
    await queryRunner.query(`ALTER TABLE "board" RENAME TO "temporary_board"`);
    await queryRunner.query(
      `CREATE TABLE "board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "ownerId" integer NOT NULL)`,
    );
    await queryRunner.query(
      `INSERT INTO "board"("id", "name", "ownerId") SELECT "id", "name", "ownerId" FROM "temporary_board"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_board"`);
    await queryRunner.query(
      `ALTER TABLE "user_board" RENAME TO "temporary_user_board"`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_board" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "permission" varchar NOT NULL, "userId" integer, "boardId" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "user_board"("id", "permission", "userId", "boardId") SELECT "id", "permission", "userId", "boardId" FROM "temporary_user_board"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_user_board"`);
    await queryRunner.query(`DROP TABLE "board_column"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "board"`);
    await queryRunner.query(`DROP TABLE "user_board"`);
  }
}
