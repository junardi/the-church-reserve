-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Mar 09, 2025 at 04:10 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `church`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `booking_id` int(11) UNSIGNED NOT NULL,
  `details` text,
  `user_id` int(11) DEFAULT NULL,
  `status` varchar(175) DEFAULT NULL,
  `paid` tinyint(1) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` varchar(175) DEFAULT NULL,
  `event` varchar(255) NOT NULL,
  `amount` int(10) UNSIGNED DEFAULT NULL,
  `transaction_code` varchar(175) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`booking_id`, `details`, `user_id`, `status`, `paid`, `date`, `time`, `event`, `amount`, `transaction_code`) VALUES
(2, 'Sample details, Beride is dfdf dfdfdfdf', 3, 'approved', 1, '2024-11-11', '9:00 AM - 10:30 AM', 'Baptismal', 1000, '20X50485H8102691F'),
(3, 'Sample details', 3, 'approved', 0, '2024-11-27', '11:00 AM - 12:30 AM', 'Burial', 300, NULL),
(4, 'sdsdsd', 4, 'pending', 0, '2025-03-12', '1:00 PM - 2:30 PM', 'Wedding', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_birth` date NOT NULL,
  `contact_no` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(11) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `gender`, `date_of_birth`, `contact_no`, `address`, `email`, `password`, `role`) VALUES
(1, 'ddfdf', 'dfdfdf', 'male', '2024-11-23', '09450025521', 'Janiuay, Iloilo', 'dfdfdf@gmail.com', '$2a$12$eqfTD8P8.R1klzP4ewDBke1Pe57UECCm1zsznPVEbLz0TRGMWrcHC', 'user'),
(2, 'Test', 'Test', 'Male', '2024-11-14', '09450025521', 'Janiuay, Iloilo', 'test@gmail.com', '$2a$12$wNifsz86ZQb.zl6.0bQnueTLwzYwG2oscfke1nhmaCISjJ66nITOa', 'user'),
(3, 'Jake', 'Brillo', 'Male', '2024-11-22', '+639662385023', 'Janiuay, Iloilo', 'jake.brillo@gmail.com', '$2a$12$pPYhV8zHKKB4i2P0f72njun2SxZLAms0gZqHUDJRF5Gx/.eqrhvC6', 'user'),
(4, 'admin', 'admin', 'Male', '2024-11-20', '+639562490328', 'Janiuay, Iloilo', 'admin@gmail.com', '$2a$12$pPYhV8zHKKB4i2P0f72njun2SxZLAms0gZqHUDJRF5Gx/.eqrhvC6', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`booking_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `booking_id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
