import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1701442367145 implements MigrationInterface {
  name = 'Db1701442367145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "role" integer NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
  }
}
