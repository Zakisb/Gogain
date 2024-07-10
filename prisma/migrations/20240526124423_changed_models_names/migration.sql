/*
  Warnings:

  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SessionParticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_coachAccountId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "SessionParticipant" DROP CONSTRAINT "SessionParticipant_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "SessionParticipant" DROP CONSTRAINT "SessionParticipant_userId_fkey";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "SessionParticipant";

-- CreateTable
CREATE TABLE "CoachingSession" (
    "id" SERIAL NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "day" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionType" TEXT NOT NULL,
    "coachAccountId" INTEGER,

    CONSTRAINT "CoachingSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoachingSessionParticipant" (
    "id" SERIAL NOT NULL,
    "coachingSessionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoachingSessionParticipant_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoachingSession" ADD CONSTRAINT "CoachingSession_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingSession" ADD CONSTRAINT "CoachingSession_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingSessionParticipant" ADD CONSTRAINT "CoachingSessionParticipant_coachingSessionId_fkey" FOREIGN KEY ("coachingSessionId") REFERENCES "CoachingSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoachingSessionParticipant" ADD CONSTRAINT "CoachingSessionParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
