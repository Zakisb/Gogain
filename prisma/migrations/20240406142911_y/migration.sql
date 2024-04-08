-- CreateTable
CREATE TABLE "TrainingProgram" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrainingProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainingDay" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "trainingProgramId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TrainingDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ExerciceToTrainingDay" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciceToTrainingDay_AB_unique" ON "_ExerciceToTrainingDay"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciceToTrainingDay_B_index" ON "_ExerciceToTrainingDay"("B");

-- AddForeignKey
ALTER TABLE "TrainingProgram" ADD CONSTRAINT "TrainingProgram_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrainingDay" ADD CONSTRAINT "TrainingDay_trainingProgramId_fkey" FOREIGN KEY ("trainingProgramId") REFERENCES "TrainingProgram"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciceToTrainingDay" ADD CONSTRAINT "_ExerciceToTrainingDay_A_fkey" FOREIGN KEY ("A") REFERENCES "Exercice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciceToTrainingDay" ADD CONSTRAINT "_ExerciceToTrainingDay_B_fkey" FOREIGN KEY ("B") REFERENCES "TrainingDay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
