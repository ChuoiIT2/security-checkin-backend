import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1701572160787 implements MigrationInterface {
  name = 'Db1701572160787';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "createdById" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "updatedById" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "deletedAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD "deletedById" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "check-ins" DROP COLUMN "deletedById"`,
    );
    await queryRunner.query(`ALTER TABLE "check-ins" DROP COLUMN "deletedAt"`);
    await queryRunner.query(
      `ALTER TABLE "check-ins" DROP COLUMN "updatedById"`,
    );
    await queryRunner.query(`ALTER TABLE "check-ins" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "check-ins" DROP COLUMN "createdById"`,
    );
    await queryRunner.query(`ALTER TABLE "check-ins" DROP COLUMN "createdAt"`);
  }
}
