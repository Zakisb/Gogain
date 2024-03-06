-- CreateTable
CREATE TABLE "GeneralLifestyleHealthHabits" (
    "id" SERIAL NOT NULL,
    "answers" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "GeneralLifestyleHealthHabits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyEnvironmentHabits" (
    "id" SERIAL NOT NULL,
    "answers" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DailyEnvironmentHabits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryCurrentHealth" (
    "id" SERIAL NOT NULL,
    "answers" JSONB,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "HistoryCurrentHealth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GeneralLifestyleHealthHabits_userId_key" ON "GeneralLifestyleHealthHabits"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyEnvironmentHabits_userId_key" ON "DailyEnvironmentHabits"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryCurrentHealth_userId_key" ON "HistoryCurrentHealth"("userId");

-- AddForeignKey
ALTER TABLE "GeneralLifestyleHealthHabits" ADD CONSTRAINT "GeneralLifestyleHealthHabits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyEnvironmentHabits" ADD CONSTRAINT "DailyEnvironmentHabits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryCurrentHealth" ADD CONSTRAINT "HistoryCurrentHealth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
