/*
  Warnings:

  - Made the column `userId` on table `friends` required. This step will fail if there are existing NULL values in that column.
  - Made the column `friendId` on table `friends` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "friends" DROP CONSTRAINT "friends_userId_fkey";

-- AlterTable
ALTER TABLE "friends" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "friendId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "friends" ADD CONSTRAINT "friends_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
