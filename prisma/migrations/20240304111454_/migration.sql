/*
  Warnings:

  - You are about to drop the column `dailyEnvironmentHabits` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `historyCurrentHealth` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "dailyEnvironmentHabits",
DROP COLUMN "historyCurrentHealth";
