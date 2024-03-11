/*
  Warnings:

  - You are about to drop the column `licenseKey` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfUsers` on the `License` table. All the data in the column will be lost.
  - Added the required column `licenseKeyId` to the `License` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "License_licenseKey_key";

-- AlterTable
ALTER TABLE "License" DROP COLUMN "licenseKey",
DROP COLUMN "numberOfUsers",
ADD COLUMN     "licenseKeyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "LicenseType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "numberOfUsers" INTEGER NOT NULL,

    CONSTRAINT "LicenseType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "License" ADD CONSTRAINT "License_licenseKeyId_fkey" FOREIGN KEY ("licenseKeyId") REFERENCES "LicenseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
