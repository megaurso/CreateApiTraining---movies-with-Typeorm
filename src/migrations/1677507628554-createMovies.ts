import { MigrationInterface, QueryRunner } from "typeorm";

export class createMovies1677507628554 implements MigrationInterface {
    name = 'createMovies1677507628554'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "movies" DROP COLUMN "deleteAt"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies" ADD "deleteAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movies" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}
