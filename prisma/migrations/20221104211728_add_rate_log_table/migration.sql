/*
  Warnings:

  - Added the required column `name` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promo_url` to the `promotions` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `promotions` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "promotions" DROP CONSTRAINT "promotions_userId_fkey";

-- AlterTable
ALTER TABLE "promotions" ADD COLUMN     "description" VARCHAR(256),
ADD COLUMN     "name" VARCHAR(64) NOT NULL,
ADD COLUMN     "price" DECIMAL(5,2) NOT NULL,
ADD COLUMN     "promo_url" TEXT NOT NULL,
ADD COLUMN     "shiny_meter" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "userId" SET NOT NULL;

-- CreateTable
CREATE TABLE "rate_log" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "like" BOOLEAN NOT NULL,
    "promotionId" TEXT NOT NULL,

    CONSTRAINT "rate_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "promotions" ADD CONSTRAINT "promotions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rate_log" ADD CONSTRAINT "rate_log_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
