/*
  Warnings:

  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Video";

-- CreateTable
CREATE TABLE "Exercice" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "duration" INTEGER,
    "level" TEXT NOT NULL,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "videoExternalId" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "posterUrl" TEXT,
    "embedCode" TEXT NOT NULL,
    "videoSize" INTEGER NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'inspecting',

    CONSTRAINT "Exercice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exercice_videoExternalId_key" ON "Exercice"("videoExternalId");
