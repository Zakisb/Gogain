/*
  Warnings:

  - You are about to drop the column `numberOfUsers` on the `LicenseType` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "License" ADD COLUMN     "numberOfUsers" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "LicenseType" DROP COLUMN "numberOfUsers";
