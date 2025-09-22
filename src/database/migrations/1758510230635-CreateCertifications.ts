import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCertifications1758510230635 implements MigrationInterface {
    name = 'CreateCertifications1758510230635'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" DROP COLUMN "vendor"`);
        await queryRunner.query(`ALTER TABLE "certifications" ADD "vender" character varying(100)`);
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "created_at" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "certifications" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "certifications" DROP COLUMN "vender"`);
        await queryRunner.query(`ALTER TABLE "certifications" ADD "vendor" character varying(100)`);
    }

}
