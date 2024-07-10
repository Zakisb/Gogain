/*
  Warnings:

  - You are about to drop the column `externalId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clerkUserId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_externalId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "externalId",
ALTER COLUMN "clerkUserId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkUserId_key" ON "User"("clerkUserId");
