/*
  Warnings:

  - You are about to alter the column `password` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "avatar_url" SET DATA TYPE TEXT,
ALTER COLUMN "password" SET DATA TYPE VARCHAR(128),
ALTER COLUMN "steam_user" SET DATA TYPE VARCHAR(32);
