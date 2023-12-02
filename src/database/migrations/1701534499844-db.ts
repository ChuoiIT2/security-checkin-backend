import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1701534499844 implements MigrationInterface {
  name = 'Db1701534499844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "locations" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "longitude" character varying NOT NULL, "latitude" character varying NOT NULL, "address" character varying, "description" character varying, "qrCode" character varying NOT NULL, CONSTRAINT "PK_7cc1c9e3853b94816c094825e74" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "locations"`);
  }
}
