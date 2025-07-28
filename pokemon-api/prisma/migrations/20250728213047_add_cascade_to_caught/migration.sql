-- DropForeignKey
ALTER TABLE "Caught" DROP CONSTRAINT "Caught_userId_fkey";

-- AddForeignKey
ALTER TABLE "Caught" ADD CONSTRAINT "Caught_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
