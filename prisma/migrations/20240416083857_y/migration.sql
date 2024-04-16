/*
  Warnings:

  - The values [upcoming] on the enum `TrainingDayStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TrainingDayStatus_new" AS ENUM ('UPCOMING', 'SKIPPED', 'MISSED', 'COMPLETED');
ALTER TABLE "TrainingDay" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "TrainingDay" ALTER COLUMN "status" TYPE "TrainingDayStatus_new" USING ("status"::text::"TrainingDayStatus_new");
ALTER TYPE "TrainingDayStatus" RENAME TO "TrainingDayStatus_old";
ALTER TYPE "TrainingDayStatus_new" RENAME TO "TrainingDayStatus";
DROP TYPE "TrainingDayStatus_old";
ALTER TABLE "TrainingDay" ALTER COLUMN "status" SET DEFAULT 'UPCOMING';
COMMIT;
