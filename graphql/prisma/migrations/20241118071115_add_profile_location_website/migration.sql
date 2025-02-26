-- AlterTable
ALTER TABLE `Post` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `location` VARCHAR(191) NULL,
    ADD COLUMN `profile` VARCHAR(191) NULL,
    ADD COLUMN `website` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
