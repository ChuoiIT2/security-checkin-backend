import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1701536258709 implements MigrationInterface {
  name = 'Db1701536258709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "createdById" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "updatedById" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "locations" ADD "deletedById" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "locations" DROP COLUMN "deletedById"`,
    );
    await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "locations" DROP COLUMN "updatedById"`,
    );
    await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "locations" DROP COLUMN "createdById"`,
    );
    await queryRunner.query(`ALTER TABLE "locations" DROP COLUMN "createdAt"`);
  }
}
