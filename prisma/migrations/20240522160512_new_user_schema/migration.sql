/*
  Warnings:

  - You are about to drop the column `employeeAttributesId` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `employeeAttributesId` on the `TrainingProgram` table. All the data in the column will be lost.
  - You are about to drop the column `attributes` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `isOnboarded` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `onboarded` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdminAttributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CoachAttributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeAttributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HrAttributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AdminAttributes" DROP CONSTRAINT "AdminAttributes_userId_fkey";

-- DropForeignKey
ALTER TABLE "CoachAttributes" DROP CONSTRAINT "CoachAttributes_userId_fkey";

-- DropForeignKey
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_employeeAttributesId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeAttributes" DROP CONSTRAINT "EmployeeAttributes_userId_fkey";

-- DropForeignKey
ALTER TABLE "HrAttributes" DROP CONSTRAINT "HrAttributes_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProgram" DROP CONSTRAINT "TrainingProgram_employeeAttributesId_fkey";

-- DropForeignKey
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_userId_fkey";

-- AlterTable
ALTER TABLE "DietPlan" DROP COLUMN "employeeAttributesId",
ADD COLUMN     "employeeProfileId" INTEGER;

-- AlterTable
ALTER TABLE "TrainingProgram" DROP COLUMN "employeeAttributesId",
ADD COLUMN     "employeeProfileId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "attributes",
DROP COLUMN "isOnboarded",
DROP COLUMN "onboarded";

-- DropTable
DROP TABLE "AdminAttributes";

-- DropTable
DROP TABLE "CoachAttributes";

-- DropTable
DROP TABLE "EmployeeAttributes";

-- DropTable
DROP TABLE "HrAttributes";

-- DropTable
DROP TABLE "UserRole";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'EMPLOYEE',
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "attributes" JSONB,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminProfile" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "AdminProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachProfile" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "CoachProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HrProfile" (
    "id" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "HrProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeProfile" (
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

    CONSTRAINT "EmployeeProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminProfile_accountId_key" ON "AdminProfile"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachProfile_accountId_key" ON "CoachProfile"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "HrProfile_accountId_key" ON "HrProfile"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_accountId_key" ON "EmployeeProfile"("accountId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminProfile" ADD CONSTRAINT "AdminProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachProfile" ADD CONSTRAINT "CoachProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HrProfile" ADD CONSTRAINT "HrProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietPlan" ADD CONSTRAINT "DietPlan_employeeProfileId_fkey" FOREIGN KEY ("employeeProfileId") REFERENCES "EmployeeProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_employeeProfileId_fkey" FOREIGN KEY ("employeeProfileId") REFERENCES "EmployeeProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
