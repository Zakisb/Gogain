/*
  Warnings:

  - Added the required column `embedCode` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailUrl` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "embedCode" TEXT NOT NULL,
ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
