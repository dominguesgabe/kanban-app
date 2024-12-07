import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumnsTable1733610014655 implements MigrationInterface {
    name = 'AddColumnsTable1733610014655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL, CONSTRAINT "FK_7d6b58efcc37a760ffd108eec72" FOREIGN KEY ("boardId") REFERENCES "board" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_board_column"("id", "name", "boardId") SELECT "id", "name", "boardId" FROM "board_column"`);
        await queryRunner.query(`DROP TABLE "board_column"`);
        await queryRunner.query(`ALTER TABLE "temporary_board_column" RENAME TO "board_column"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board_column" RENAME TO "temporary_board_column"`);
        await queryRunner.query(`CREATE TABLE "board_column" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "boardId" integer NOT NULL)`);
        await queryRunner.query(`INSERT INTO "board_column"("id", "name", "boardId") SELECT "id", "name", "boardId" FROM "temporary_board_column"`);
        await queryRunner.query(`DROP TABLE "temporary_board_column"`);
        await queryRunner.query(`DROP TABLE "board_column"`);
    }

}
