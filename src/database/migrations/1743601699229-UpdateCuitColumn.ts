import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCuitColumn1743601699229 implements MigrationInterface {
  name = 'UpdateCuitColumn1743601699229';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "UQ_ea066a580662dbe1d4fe3778147"`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "cuit"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "cuit" character(11) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "UQ_ea066a580662dbe1d4fe3778147" UNIQUE ("cuit")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "companies" DROP CONSTRAINT "UQ_ea066a580662dbe1d4fe3778147"`,
    );
    await queryRunner.query(`ALTER TABLE "companies" DROP COLUMN "cuit"`);
    await queryRunner.query(
      `ALTER TABLE "companies" ADD "cuit" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "companies" ADD CONSTRAINT "UQ_ea066a580662dbe1d4fe3778147" UNIQUE ("cuit")`,
    );
  }
}
