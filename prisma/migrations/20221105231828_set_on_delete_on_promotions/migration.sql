-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_userId_fkey";

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
