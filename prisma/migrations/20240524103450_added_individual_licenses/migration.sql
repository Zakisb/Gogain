/*
  Warnings:

  - The values [EMPLOYEE] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `employeeProfileId` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `employeeProfileId` on the `TrainingProgram` table. All the data in the column will be lost.
  - You are about to drop the `EmployeeProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HrProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[individualId]` on the table `License` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('ADMIN', 'COACH', 'HR', 'USER');
ALTER TABLE "Account" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "Account" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "Account" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_employeeProfileId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "HrProfile" DROP CONSTRAINT "HrProfile_accountId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProgram" DROP CONSTRAINT "TrainingProgram_employeeProfileId_fkey";

-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "role" SET DEFAULT 'USER';

-- AlterTable
ALTER TABLE "DietPlan" DROP COLUMN "employeeProfileId",
ADD COLUMN     "userProfileId" INTEGER;

-- AlterTable
ALTER TABLE "License" ADD COLUMN     "individualId" INTEGER;

-- AlterTable
ALTER TABLE "TrainingProgram" DROP COLUMN "employeeProfileId",
ADD COLUMN     "userProfileId" INTEGER;

-- DropTable
DROP TABLE "EmployeeProfile";

-- DropTable
DROP TABLE "HrProfile";

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "gender" TEXT,
    "goal" JSONB,
    "generalLifestyleHealthHabits" JSONB,
    "nutrition" JSONB,
    "lifestyle" JSONB,
    "dailyEnvironmentHabits" JSONB,
    "historyCurrentHealth" JSONB,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_accountId_key" ON "UserProfile"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "License_individualId_key" ON "License"("individualId");

-- CreateIndex
CREATE INDEX "License_organizationId_idx" ON "License"("organizationId");

-- CreateIndex
CREATE INDEX "License_individualId_idx" ON "License"("individualId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_individualId_fkey" FOREIGN KEY ("individualId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietPlan" ADD CONSTRAINT "DietPlan_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_userProfileId_fkey" FOREIGN KEY ("userProfileId") REFERENCES "UserProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
