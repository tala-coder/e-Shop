-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.22 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             11.0.0.5919
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for aplikacija
DROP DATABASE IF EXISTS `aplikacija`;
CREATE DATABASE IF NOT EXISTS `aplikacija` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `aplikacija`;

-- Dumping structure for table aplikacija.administrator
DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `administrator_id` int unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`administrator_id`),
  UNIQUE KEY `uq_administrator_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.administrator: ~0 rows (approximately)
DELETE FROM `administrator`;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;

-- Dumping structure for table aplikacija.article
DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL DEFAULT '0',
  `excerpt` varchar(255) NOT NULL DEFAULT '0',
  `description` text NOT NULL,
  `status` enum('available','visible','hidden') NOT NULL DEFAULT 'available',
  `is_promoted` tinyint unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_id`),
  KEY `fk_article_category_id` (`category_id`),
  CONSTRAINT `fk_article_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.article: ~0 rows (approximately)
DELETE FROM `article`;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

-- Dumping structure for table aplikacija.article_feature
DROP TABLE IF EXISTS `article_feature`;
CREATE TABLE IF NOT EXISTS `article_feature` (
  `article_feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `feature_id` int unsigned NOT NULL DEFAULT '0',
  `value` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`article_feature_id`),
  UNIQUE KEY `uq_article_feature_article_id_feature_id` (`article_id`,`feature_id`),
  KEY `fk_article_feature_feature_id` (`feature_id`),
  CONSTRAINT `fk_article_feature_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_article_feature_feature_id` FOREIGN KEY (`feature_id`) REFERENCES `feature` (`feature_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.article_feature: ~0 rows (approximately)
DELETE FROM `article_feature`;
/*!40000 ALTER TABLE `article_feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_feature` ENABLE KEYS */;

-- Dumping structure for table aplikacija.article_price
DROP TABLE IF EXISTS `article_price`;
CREATE TABLE IF NOT EXISTS `article_price` (
  `article_price_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`article_price_id`),
  KEY `fk_article_price_article_id` (`article_id`),
  CONSTRAINT `fk_article_price_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.article_price: ~0 rows (approximately)
DELETE FROM `article_price`;
/*!40000 ALTER TABLE `article_price` DISABLE KEYS */;
/*!40000 ALTER TABLE `article_price` ENABLE KEYS */;

-- Dumping structure for table aplikacija.cart
DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`),
  KEY `fk_cart_user_id` (`user_id`),
  CONSTRAINT `fk_cart_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.cart: ~0 rows (approximately)
DELETE FROM `cart`;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;

-- Dumping structure for table aplikacija.cart_article
DROP TABLE IF EXISTS `cart_article`;
CREATE TABLE IF NOT EXISTS `cart_article` (
  `cart_article_id` int unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `quantity` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`cart_article_id`),
  UNIQUE KEY `uq_cart_article_cart_id_article_id` (`cart_id`,`article_id`),
  KEY `fk_cart_article_article_id` (`article_id`),
  CONSTRAINT `fk_cart_article_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_article_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.cart_article: ~0 rows (approximately)
DELETE FROM `cart_article`;
/*!40000 ALTER TABLE `cart_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_article` ENABLE KEYS */;

-- Dumping structure for table aplikacija.category
DROP TABLE IF EXISTS `category`;
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  `parent__category_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `uq_category_name` (`name`),
  UNIQUE KEY `uq_category_image_path` (`image_path`),
  KEY `fk_category_parent__category_id` (`parent__category_id`),
  CONSTRAINT `fk_category_parent__category_id` FOREIGN KEY (`parent__category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.category: ~0 rows (approximately)
DELETE FROM `category`;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table aplikacija.feature
DROP TABLE IF EXISTS `feature`;
CREATE TABLE IF NOT EXISTS `feature` (
  `feature_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL DEFAULT '0',
  `category_id` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`feature_id`),
  UNIQUE KEY `uq_feature_name_category_id` (`name`,`category_id`),
  KEY `fk_feature_category_id` (`category_id`),
  CONSTRAINT `fk_feature_category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.feature: ~0 rows (approximately)
DELETE FROM `feature`;
/*!40000 ALTER TABLE `feature` DISABLE KEYS */;
/*!40000 ALTER TABLE `feature` ENABLE KEYS */;

-- Dumping structure for table aplikacija.order
DROP TABLE IF EXISTS `order`;
CREATE TABLE IF NOT EXISTS `order` (
  `order_id` int unsigned NOT NULL AUTO_INCREMENT,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cart_id` int unsigned NOT NULL DEFAULT '0',
  `status` enum('rejected','accepted','shipped','pending') NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `uq_order_cart_id` (`cart_id`),
  CONSTRAINT `fk_order_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.order: ~0 rows (approximately)
DELETE FROM `order`;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Dumping structure for table aplikacija.photo
DROP TABLE IF EXISTS `photo`;
CREATE TABLE IF NOT EXISTS `photo` (
  `photo_id` int unsigned NOT NULL AUTO_INCREMENT,
  `article_id` int unsigned NOT NULL DEFAULT '0',
  `image_path` varchar(128) NOT NULL DEFAULT '0',
  PRIMARY KEY (`photo_id`),
  UNIQUE KEY `uq_photo_image_path` (`image_path`),
  KEY `fk_photo_article_id` (`article_id`),
  CONSTRAINT `fk_photo_article_id` FOREIGN KEY (`article_id`) REFERENCES `article` (`article_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.photo: ~0 rows (approximately)
DELETE FROM `photo`;
/*!40000 ALTER TABLE `photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `photo` ENABLE KEYS */;

-- Dumping structure for table aplikacija.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL DEFAULT '0',
  `password_hash` varchar(128) NOT NULL DEFAULT '0',
  `forename` varchar(64) NOT NULL DEFAULT '0',
  `surname` varchar(64) NOT NULL DEFAULT '0',
  `phone_number` varchar(24) NOT NULL DEFAULT '0',
  `postal_address` text NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_phone_number` (`phone_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table aplikacija.user: ~0 rows (approximately)
DELETE FROM `user`;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
article_priceadministratorarticleadministrator