/*
  Warnings:

  - You are about to drop the column `bingo` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "bingo",
ADD COLUMN     "gender" TEXT;
