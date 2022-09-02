import { MigrationInterface, QueryRunner } from "typeorm";

export class createForeignKeys1662072931149 implements MigrationInterface {
    name = 'createForeignKeys1662072931149'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "projects_backEnd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "image" character varying(300) NOT NULL, "description" character varying(500) NOT NULL, "repository" character varying(300) NOT NULL, "application" character varying(300) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "projectsId" uuid, CONSTRAINT "PK_8eb222b0e8be30694a91e62dcb5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "projects_frontEnd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "image" character varying(300) NOT NULL, "description" character varying(500) NOT NULL, "repository" character varying(300) NOT NULL, "application" character varying(300) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "projectsId" uuid, CONSTRAINT "PK_d9c908a941e8bb780b5a28123ce" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "frontEnd_backEnd" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), CONSTRAINT "PK_160bfa16389f66fd0c2d7b475ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(150) NOT NULL, "email" character varying(150) NOT NULL, "password" character varying(150) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "projectsId" uuid, CONSTRAINT "REL_f70055703ec59288a37182ccd1" UNIQUE ("projectsId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "projects_backEnd" ADD CONSTRAINT "FK_c8f684eee7a0cec5bc621ccdf20" FOREIGN KEY ("projectsId") REFERENCES "frontEnd_backEnd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "projects_frontEnd" ADD CONSTRAINT "FK_8fd5ab421957a199112b7eab8d7" FOREIGN KEY ("projectsId") REFERENCES "frontEnd_backEnd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f70055703ec59288a37182ccd14" FOREIGN KEY ("projectsId") REFERENCES "frontEnd_backEnd"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f70055703ec59288a37182ccd14"`);
        await queryRunner.query(`ALTER TABLE "projects_frontEnd" DROP CONSTRAINT "FK_8fd5ab421957a199112b7eab8d7"`);
        await queryRunner.query(`ALTER TABLE "projects_backEnd" DROP CONSTRAINT "FK_c8f684eee7a0cec5bc621ccdf20"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "frontEnd_backEnd"`);
        await queryRunner.query(`DROP TABLE "projects_frontEnd"`);
        await queryRunner.query(`DROP TABLE "projects_backEnd"`);
    }

}
