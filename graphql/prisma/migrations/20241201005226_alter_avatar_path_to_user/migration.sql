/*
  Warnings:

  - You are about to drop the column `avatarPath` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Post` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `avatarPath`,
    ADD COLUMN `avatar_path` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
