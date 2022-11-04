/*
  Warnings:

  - You are about to drop the column `newFKey` on the `friends` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "friends" DROP COLUMN "newFKey",
ADD COLUMN     "friendId" TEXT;
