/*
  Warnings:

  - You are about to drop the column `userId` on the `DietPlan` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TrainingProgram` table. All the data in the column will be lost.
  - You are about to drop the column `dailyEnvironmentHabits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `generalLifestyleHealthHabits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `goal` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `historyCurrentHealth` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lifestyle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nutrition` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'COACH';

-- DropForeignKey
ALTER TABLE "DietPlan" DROP CONSTRAINT "DietPlan_userId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProgram" DROP CONSTRAINT "TrainingProgram_userId_fkey";

-- AlterTable
ALTER TABLE "DietPlan" DROP COLUMN "userId",
ADD COLUMN     "employeeAttributesId" INTEGER;

-- AlterTable
ALTER TABLE "TrainingProgram" DROP COLUMN "userId",
ADD COLUMN     "employeeAttributesId" INTEGER,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyEnvironmentHabits",
DROP COLUMN "gender",
DROP COLUMN "generalLifestyleHealthHabits",
DROP COLUMN "goal",
DROP COLUMN "height",
DROP COLUMN "historyCurrentHealth",
DROP COLUMN "lifestyle",
DROP COLUMN "nutrition",
DROP COLUMN "role",
DROP COLUMN "weight",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "UserRole" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminAttributes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AdminAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachAttributes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CoachAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HrAttributes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HrAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeAttributes" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "height" DOUBLE PRECISION,
    "weight" DOUBLE PRECISION,
    "gender" TEXT,
    "goal" JSONB,
    "generalLifestyleHealthHabits" JSONB,
    "nutrition" JSONB,
    "lifestyle" JSONB,
    "dailyEnvironmentHabits" JSONB,
    "historyCurrentHealth" JSONB,

    CONSTRAINT "EmployeeAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_role_key" ON "UserRole"("userId", "role");

-- CreateIndex
CREATE UNIQUE INDEX "AdminAttributes_userId_key" ON "AdminAttributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CoachAttributes_userId_key" ON "CoachAttributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HrAttributes_userId_key" ON "HrAttributes"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeAttributes_userId_key" ON "EmployeeAttributes"("userId");

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminAttributes" ADD CONSTRAINT "AdminAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachAttributes" ADD CONSTRAINT "CoachAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HrAttributes" ADD CONSTRAINT "HrAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeAttributes" ADD CONSTRAINT "EmployeeAttributes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DietPlan" ADD CONSTRAINT "DietPlan_employeeAttributesId_fkey" FOREIGN KEY ("employeeAttributesId") REFERENCES "EmployeeAttributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_employeeAttributesId_fkey" FOREIGN KEY ("employeeAttributesId") REFERENCES "EmployeeAttributes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
