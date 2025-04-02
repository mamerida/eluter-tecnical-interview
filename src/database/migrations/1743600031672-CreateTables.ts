import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1743600031672 implements MigrationInterface {
    name = 'CreateTables1743600031672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "account_balances" ("id" SERIAL NOT NULL, "debit" double precision, "credit" double precision, "created_at" TIMESTAMP DEFAULT now(), "deleted_at" TIMESTAMP, "account_id" integer, CONSTRAINT "PK_919c1ceca951a4fd7b93532a3b1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), "company_id" integer, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "companies" ("id" SERIAL NOT NULL, "company_name" character varying NOT NULL, "society" character varying NOT NULL, "cuit" integer NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "UQ_ea066a580662dbe1d4fe3778147" UNIQUE ("cuit"), CONSTRAINT "PK_d4bc3e82a314fa9e29f652c2c22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "account_balances" ADD CONSTRAINT "FK_8b991d69e7b47a9deb483b91dfa" FOREIGN KEY ("account_id") REFERENCES "accounts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_b22c8136b3e83352b0013224801" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_b22c8136b3e83352b0013224801"`);
        await queryRunner.query(`ALTER TABLE "account_balances" DROP CONSTRAINT "FK_8b991d69e7b47a9deb483b91dfa"`);
        await queryRunner.query(`DROP TABLE "companies"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "account_balances"`);
    }

}
