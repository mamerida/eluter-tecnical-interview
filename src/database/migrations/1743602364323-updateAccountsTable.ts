import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAccountsTable1743602364323 implements MigrationInterface {
    name = 'UpdateAccountsTable1743602364323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "deleted_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" ALTER COLUMN "deleted_at" SET NOT NULL`);
    }

}
