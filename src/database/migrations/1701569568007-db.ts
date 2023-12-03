import { MigrationInterface, QueryRunner } from 'typeorm';

export class Db1701569568007 implements MigrationInterface {
  name = 'Db1701569568007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "check-ins" ("id" SERIAL NOT NULL, "time" TIMESTAMP NOT NULL DEFAULT now(), "locationId" integer, "userId" integer, CONSTRAINT "PK_709df3c44be27d463d6c78a0bbb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD CONSTRAINT "FK_8d190e9928a441ef7ae74c51678" FOREIGN KEY ("locationId") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" ADD CONSTRAINT "FK_3d757d934a38f5fb551f90aba01" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "check-ins" DROP CONSTRAINT "FK_3d757d934a38f5fb551f90aba01"`,
    );
    await queryRunner.query(
      `ALTER TABLE "check-ins" DROP CONSTRAINT "FK_8d190e9928a441ef7ae74c51678"`,
    );
    await queryRunner.query(`DROP TABLE "check-ins"`);
  }
}
