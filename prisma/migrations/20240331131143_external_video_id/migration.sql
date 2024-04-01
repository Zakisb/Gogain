/*
  Warnings:

  - You are about to drop the column `videoId` on the `Video` table. All the data in the column will be lost.
  - Added the required column `videoExternalId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Video" DROP COLUMN "videoId",
ADD COLUMN     "videoExternalId" TEXT NOT NULL;
