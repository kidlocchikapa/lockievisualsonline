// src/migrations/[timestamp]-AddUuidToUsers.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUuidToUsers1640995200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Drop existing users table if it exists
    await queryRunner.query(`DROP TABLE IF EXISTS "users"`);

    // Create new users table with UUID
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "fullName" varchar NOT NULL,
        "email" varchar NOT NULL UNIQUE,
        "phoneNumber" varchar NOT NULL UNIQUE,
        "password" varchar NOT NULL,
        "termsAccepted" boolean NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now()
      )
    `);

    // Enable UUID extension if not already enabled
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}