-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "coachAccountId" INTEGER;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_coachAccountId_fkey" FOREIGN KEY ("coachAccountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
