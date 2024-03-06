/*
  Warnings:

  - You are about to drop the `DailyEnvironmentHabits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GeneralLifestyleHealthHabits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistoryCurrentHealth` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyEnvironmentHabits" DROP CONSTRAINT "DailyEnvironmentHabits_userId_fkey";

-- DropForeignKey
ALTER TABLE "GeneralLifestyleHealthHabits" DROP CONSTRAINT "GeneralLifestyleHealthHabits_userId_fkey";

-- DropForeignKey
ALTER TABLE "HistoryCurrentHealth" DROP CONSTRAINT "HistoryCurrentHealth_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dailyEnvironmentHabits" JSONB,
ADD COLUMN     "generalLifestyleHealthHabits" JSONB,
ADD COLUMN     "historyCurrentHealth" JSONB;

-- DropTable
DROP TABLE "DailyEnvironmentHabits";

-- DropTable
DROP TABLE "GeneralLifestyleHealthHabits";

-- DropTable
DROP TABLE "HistoryCurrentHealth";
