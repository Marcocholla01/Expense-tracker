CREATE DATABASE IF NOT EXISTS expenses-tracker;

USE expenses-tracker;

CREATE TABLE IF NOT EXISTS users (
    userId VARCHAR(200) NOT NULL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(5000) NOT NULL,
    email VARCHAR(255) NOT NULL,
    isVerified TINYINT(1) DEFAULT 0,
    isActive TINYINT(1) DEFAULT 1,
    role ENUM('user', 'admin') DEFAULT 'user',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS expenses (
    expenseId VARCHAR(200) NOT NULL PRIMARY KEY,
    userId VARCHAR(200) NOT NULL,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    category VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS income (
    incomeId VARCHAR(200) NOT NULL PRIMARY KEY,
    userId VARCHAR(200) NOT NULL,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE NOT NULL,
    source VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);
