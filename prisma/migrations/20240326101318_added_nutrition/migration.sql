/*
  Warnings:

  - You are about to drop the column `resetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `resetTokenExpiry` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_resetToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "resetToken",
DROP COLUMN "resetTokenExpiry",
ADD COLUMN     "lifestyle" JSONB,
ADD COLUMN     "nutrition" JSONB;