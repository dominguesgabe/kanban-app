import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateItemEntity1733795331228 implements MigrationInterface {
    name = 'CreateItemEntity1733795331228'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_column_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "position" integer NOT NULL, "priority" varchar NOT NULL DEFAULT ('1'), "columnId" integer NOT NULL, CONSTRAINT "FK_cc9e02a1e2f260b96c9e34beae7" FOREIGN KEY ("columnId") REFERENCES "board_column" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_column_item"("id", "name", "description", "position", "priority", "columnId") SELECT "id", "name", "description", "position", "priority", "columnId" FROM "column_item"`);
        await queryRunner.query(`DROP TABLE "column_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_column_item" RENAME TO "column_item"`);
        await queryRunner.query(`CREATE TABLE "temporary_column_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "position" integer NOT NULL, "priority" text NOT NULL DEFAULT ('medium'), "columnId" integer NOT NULL, CONSTRAINT "FK_cc9e02a1e2f260b96c9e34beae7" FOREIGN KEY ("columnId") REFERENCES "board_column" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_column_item"("id", "name", "description", "position", "priority", "columnId") SELECT "id", "name", "description", "position", "priority", "columnId" FROM "column_item"`);
        await queryRunner.query(`DROP TABLE "column_item"`);
        await queryRunner.query(`ALTER TABLE "temporary_column_item" RENAME TO "column_item"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "column_item" RENAME TO "temporary_column_item"`);
        await queryRunner.query(`CREATE TABLE "column_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "position" integer NOT NULL, "priority" varchar NOT NULL DEFAULT ('1'), "columnId" integer NOT NULL, CONSTRAINT "FK_cc9e02a1e2f260b96c9e34beae7" FOREIGN KEY ("columnId") REFERENCES "board_column" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "column_item"("id", "name", "description", "position", "priority", "columnId") SELECT "id", "name", "description", "position", "priority", "columnId" FROM "temporary_column_item"`);
        await queryRunner.query(`DROP TABLE "temporary_column_item"`);
        await queryRunner.query(`ALTER TABLE "column_item" RENAME TO "temporary_column_item"`);
        await queryRunner.query(`CREATE TABLE "column_item" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar, "position" integer NOT NULL, "priority" varchar NOT NULL DEFAULT ('1'), "columnId" integer NOT NULL, CONSTRAINT "FK_cc9e02a1e2f260b96c9e34beae7" FOREIGN KEY ("columnId") REFERENCES "board_column" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "column_item"("id", "name", "description", "position", "priority", "columnId") SELECT "id", "name", "description", "position", "priority", "columnId" FROM "temporary_column_item"`);
        await queryRunner.query(`DROP TABLE "temporary_column_item"`);
    }

}
