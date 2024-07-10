/*
  Warnings:

  - Added the required column `type` to the `LicenseType` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LicenseTypeEnum" AS ENUM ('INDIVIDUAL', 'ORGANIZATION');

-- AlterTable
ALTER TABLE "LicenseType" ADD COLUMN     "type" "LicenseTypeEnum" NOT NULL;
