-- DropForeignKey
ALTER TABLE "rate_log" DROP CONSTRAINT "rate_log_promotionId_fkey";

-- AddForeignKey
ALTER TABLE "rate_log" ADD CONSTRAINT "rate_log_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
