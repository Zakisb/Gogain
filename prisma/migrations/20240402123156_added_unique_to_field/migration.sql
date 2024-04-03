/*
  Warnings:

  - A unique constraint covering the columns `[videoExternalId]` on the table `Video` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Video_videoExternalId_key" ON "Video"("videoExternalId");
