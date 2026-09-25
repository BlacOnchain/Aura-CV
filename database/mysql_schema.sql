-- =====================================================================
-- AuraCV Studio — Production MySQL Relational Database Schema
-- Compatible with MySQL 5.7+, MySQL 8.0+, MariaDB 10.3+, and Laravel 10/11
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `languages`;
DROP TABLE IF EXISTS `certifications`;
DROP TABLE IF EXISTS `project_bullets`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `skills`;
DROP TABLE IF EXISTS `skill_categories`;
DROP TABLE IF EXISTS `education_courseworks`;
DROP TABLE IF EXISTS `educations`;
DROP TABLE IF EXISTS `experience_bullets`;
DROP TABLE IF EXISTS `experiences`;
DROP TABLE IF EXISTS `personal_infos`;
DROP TABLE IF EXISTS `resumes`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ---------------------------------------------------------------------
-- 1. Users Table (Compatible with Laravel standard authentication)
-- ---------------------------------------------------------------------
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `password` VARCHAR(255) NOT NULL,
  `remember_token` VARCHAR(100) NULL DEFAULT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 1b. Password Reset Tokens Table (Laravel Sanctum/Auth standard)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` VARCHAR(255) NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 2. Resumes Table
-- ---------------------------------------------------------------------
CREATE TABLE `resumes` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` VARCHAR(64) NOT NULL UNIQUE,
  `user_id` BIGINT UNSIGNED NULL,
  `name` VARCHAR(255) NOT NULL DEFAULT 'Untitled Resume',
  `target_role` VARCHAR(255) NULL,
  `summary` TEXT NULL,
  `template` VARCHAR(64) NOT NULL DEFAULT 'executive',
  `accent_color` VARCHAR(32) NOT NULL DEFAULT '#059669',
  `font_family` VARCHAR(32) NOT NULL DEFAULT 'sans',
  `font_size` VARCHAR(32) NOT NULL DEFAULT 'medium',
  `compact_spacing` TINYINT(1) NOT NULL DEFAULT 0,
  `page_margin` VARCHAR(32) NOT NULL DEFAULT 'normal',
  `show_projects` TINYINT(1) NOT NULL DEFAULT 1,
  `show_certifications` TINYINT(1) NOT NULL DEFAULT 1,
  `show_languages` TINYINT(1) NOT NULL DEFAULT 1,
  `show_references` TINYINT(1) NOT NULL DEFAULT 0,
  `references_text` TEXT NULL,
  `raw_json_data` LONGTEXT NULL COMMENT 'Complete serialized ResumeData JSON document',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_resumes_user_id` (`user_id`),
  INDEX `idx_resumes_uuid` (`uuid`),
  CONSTRAINT `fk_resumes_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 3. Personal Information Table
-- ---------------------------------------------------------------------
CREATE TABLE `personal_infos` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `full_name` VARCHAR(255) NOT NULL DEFAULT '',
  `title` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `phone` VARCHAR(64) NULL,
  `location` VARCHAR(255) NULL,
  `portfolio_url` VARCHAR(512) NULL,
  `linkedin_url` VARCHAR(512) NULL,
  `github_url` VARCHAR(512) NULL,
  `twitter_url` VARCHAR(512) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_personal_resume_id` (`resume_id`),
  CONSTRAINT `fk_personal_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 4. Experiences Table
-- ---------------------------------------------------------------------
CREATE TABLE `experiences` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `role` VARCHAR(255) NOT NULL,
  `company` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NULL,
  `start_date` VARCHAR(64) NOT NULL,
  `end_date` VARCHAR(64) NOT NULL,
  `is_current` TINYINT(1) NOT NULL DEFAULT 0,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_experiences_resume` (`resume_id`),
  CONSTRAINT `fk_experiences_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 5. Experience Description Bullets Table
-- ---------------------------------------------------------------------
CREATE TABLE `experience_bullets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `experience_id` BIGINT UNSIGNED NOT NULL,
  `bullet_text` TEXT NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_bullets_exp` (`experience_id`),
  CONSTRAINT `fk_bullets_exp` FOREIGN KEY (`experience_id`) REFERENCES `experiences` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 6. Education Table
-- ---------------------------------------------------------------------
CREATE TABLE `educations` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `degree` VARCHAR(255) NOT NULL,
  `institution` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NULL,
  `start_date` VARCHAR(64) NOT NULL,
  `end_date` VARCHAR(64) NOT NULL,
  `gpa_or_grade` VARCHAR(64) NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_educations_resume` (`resume_id`),
  CONSTRAINT `fk_educations_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 7. Education Coursework Bullets Table
-- ---------------------------------------------------------------------
CREATE TABLE `education_courseworks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `education_id` BIGINT UNSIGNED NOT NULL,
  `coursework_text` TEXT NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_courseworks_edu` (`education_id`),
  CONSTRAINT `fk_courseworks_edu` FOREIGN KEY (`education_id`) REFERENCES `educations` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 8. Skill Categories Table
-- ---------------------------------------------------------------------
CREATE TABLE `skill_categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `category_name` VARCHAR(255) NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_skill_categories_resume` (`resume_id`),
  CONSTRAINT `fk_skill_categories_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 9. Skills List Table
-- ---------------------------------------------------------------------
CREATE TABLE `skills` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `skill_category_id` BIGINT UNSIGNED NOT NULL,
  `skill_name` VARCHAR(255) NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_skills_category` (`skill_category_id`),
  CONSTRAINT `fk_skills_category` FOREIGN KEY (`skill_category_id`) REFERENCES `skill_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 10. Projects Table
-- ---------------------------------------------------------------------
CREATE TABLE `projects` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `role_or_tech` VARCHAR(255) NULL,
  `link` VARCHAR(512) NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_projects_resume` (`resume_id`),
  CONSTRAINT `fk_projects_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 11. Project Bullets Table
-- ---------------------------------------------------------------------
CREATE TABLE `project_bullets` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `project_id` BIGINT UNSIGNED NOT NULL,
  `bullet_text` TEXT NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_project_bullets` (`project_id`),
  CONSTRAINT `fk_project_bullets` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 12. Certifications Table
-- ---------------------------------------------------------------------
CREATE TABLE `certifications` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `issuer` VARCHAR(255) NOT NULL,
  `issue_date` VARCHAR(64) NULL,
  `credential_url` VARCHAR(512) NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_certifications_resume` (`resume_id`),
  CONSTRAINT `fk_certifications_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ---------------------------------------------------------------------
-- 13. Languages Table
-- ---------------------------------------------------------------------
CREATE TABLE `languages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `resume_id` BIGINT UNSIGNED NOT NULL,
  `language` VARCHAR(128) NOT NULL,
  `proficiency` VARCHAR(128) NOT NULL,
  `order_index` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_languages_resume` (`resume_id`),
  CONSTRAINT `fk_languages_resume` FOREIGN KEY (`resume_id`) REFERENCES `resumes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
