/*
  Warnings:

  - The `status` column on the `TrainingDay` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "TrainingDayStatus" AS ENUM ('upcoming', 'UPCOMING', 'SKIPPED', 'MISSED', 'COMPLETED');

-- AlterTable
ALTER TABLE "TrainingDay" DROP COLUMN "status",
ADD COLUMN     "status" "TrainingDayStatus" NOT NULL DEFAULT 'UPCOMING';
