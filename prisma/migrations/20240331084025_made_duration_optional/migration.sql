/*
  Warnings:

  - Added the required column `category` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "duration" DROP NOT NULL;
