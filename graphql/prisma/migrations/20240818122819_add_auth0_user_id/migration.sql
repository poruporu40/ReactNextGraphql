-- Postテーブルにupdated_atカラムを追加
ALTER TABLE `Post` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3); -- デフォルト値を設定

-- Userテーブルにauth0_user_idとupdated_atカラムを追加
ALTER TABLE `User` ADD COLUMN `auth0_user_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3), -- デフォルト値を設定
    MODIFY `name` VARCHAR(191) NULL;

-- Userテーブルのauth0_user_idカラムにユニークインデックスを追加
CREATE UNIQUE INDEX `User_auth0_user_id_key` ON `User`(`auth0_user_id`);