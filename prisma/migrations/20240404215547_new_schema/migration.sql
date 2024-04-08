/*
  Warnings:

  - You are about to drop the `Meal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Meal" DROP CONSTRAINT "Meal_dietPlanId_fkey";

-- AlterTable
ALTER TABLE "DietPlan" ADD COLUMN     "meals" JSONB[];

-- DropTable
DROP TABLE "Meal";
