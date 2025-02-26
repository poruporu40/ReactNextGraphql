-- AlterTable
ALTER TABLE `Post` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `avatarPath` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
