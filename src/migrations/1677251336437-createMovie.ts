import { MigrationInterface, QueryRunner } from "typeorm";

export class createMovie1677251336437 implements MigrationInterface {
    name = 'createMovie1677251336437'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "description"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "description" text`);
    }

}
