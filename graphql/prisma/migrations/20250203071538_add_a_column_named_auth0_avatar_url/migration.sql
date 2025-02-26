-- AlterTable
ALTER TABLE `Post` ALTER COLUMN `updated_at` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `auth0_avatar_url` VARCHAR(191) NULL,
    ALTER COLUMN `updated_at` DROP DEFAULT;
