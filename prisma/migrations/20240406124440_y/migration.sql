/*
  Warnings:

  - You are about to drop the `TrainingDay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TrainingProgram` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ExerciceToTrainingDay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TrainingDay" DROP CONSTRAINT "TrainingDay_trainingProgramId_fkey";

-- DropForeignKey
ALTER TABLE "TrainingProgram" DROP CONSTRAINT "TrainingProgram_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciceToTrainingDay" DROP CONSTRAINT "_ExerciceToTrainingDay_A_fkey";

-- DropForeignKey
ALTER TABLE "_ExerciceToTrainingDay" DROP CONSTRAINT "_ExerciceToTrainingDay_B_fkey";

-- DropTable
DROP TABLE "TrainingDay";

-- DropTable
DROP TABLE "TrainingProgram";

-- DropTable
DROP TABLE "_ExerciceToTrainingDay";
