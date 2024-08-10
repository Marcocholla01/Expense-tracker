-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.37 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for expense-tracker
DROP DATABASE IF EXISTS `expense-tracker`;
CREATE DATABASE IF NOT EXISTS `expense-tracker` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `expense-tracker`;

-- Dumping structure for table expense-tracker.expenses
DROP TABLE IF EXISTS `expenses`;
CREATE TABLE IF NOT EXISTS `expenses` (
  `expenseId` varchar(200) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`expenseId`),
  KEY `userId` (`userId`),
  CONSTRAINT `expenses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table expense-tracker.incomes
DROP TABLE IF EXISTS `incomes`;
CREATE TABLE IF NOT EXISTS `incomes` (
  `incomeId` varchar(200) NOT NULL,
  `userId` varchar(200) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `source` varchar(100) DEFAULT NULL,
  `description` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`incomeId`),
  KEY `userId` (`userId`),
  CONSTRAINT `incomes_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

-- Dumping structure for table expense-tracker.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `userId` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(5000) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isVerified` tinyint(1) DEFAULT '0',
  `isActive` tinyint(1) DEFAULT '1',
  `role` enum('user','admin') DEFAULT 'user',
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
