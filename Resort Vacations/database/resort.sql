-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Nov 19, 2025 at 09:46 PM
-- Server version: 9.5.0
-- PHP Version: 8.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `resort`
--
CREATE DATABASE IF NOT EXISTS `resort` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `resort`;

-- --------------------------------------------------------

--
-- Table structure for table `likers`
--

CREATE TABLE `likers` (
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `vacation_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `likers`
--

INSERT INTO `likers` (`user_id`, `vacation_id`, `created_at`, `updated_at`) VALUES
('cb48c075-bc77-11f0-9284-92bd85fa5acf', '2fc6884d-bc76-11f0-9284-92bd85fa5acf', '2025-11-15 13:40:18', '2025-11-15 13:40:18'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', '2fc691b7-bc76-11f0-9284-92bd85fa5acf', '2025-11-15 13:39:37', '2025-11-15 13:39:37'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', '3e42cc9f-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:40:08', '2025-11-15 13:40:08'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', 'b2b2f16e-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:39:58', '2025-11-15 13:39:58'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', 'b2b2fb37-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:39:47', '2025-11-15 13:39:47'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', 'b2b30464-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:39:26', '2025-11-15 13:39:26'),
('cb48c075-bc77-11f0-9284-92bd85fa5acf', 'ebb4c36f-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:39:11', '2025-11-15 13:39:11'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', '1e205c37-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:34:06', '2025-11-15 13:34:06'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', '2fc6884d-bc76-11f0-9284-92bd85fa5acf', '2025-11-15 13:35:30', '2025-11-15 13:35:30'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', '3e42cc9f-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:35:18', '2025-11-15 13:35:18'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', '7881b4f2-eb5e-4072-882d-16b3b9c312a7', '2025-11-15 13:34:48', '2025-11-15 13:34:48'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', 'b2b2fb37-bc75-11f0-9284-92bd85fa5acf', '2025-11-19 14:40:01', '2025-11-19 14:40:01'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', 'bbf7112f-bcf6-11f0-8552-7aaf1c767246', '2025-11-19 14:40:13', '2025-11-19 14:40:13'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', 'ebb4c36f-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:34:27', '2025-11-15 13:34:27'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', '1e205c37-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:36:51', '2025-11-15 13:36:51'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', '1e2065cb-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:37:47', '2025-11-15 13:37:47'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', '2fc6884d-bc76-11f0-9284-92bd85fa5acf', '2025-11-15 13:38:11', '2025-11-15 13:38:11'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', '2fc691b7-bc76-11f0-9284-92bd85fa5acf', '2025-11-15 13:37:24', '2025-11-15 13:37:24'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', '3e42cc9f-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:37:36', '2025-11-15 13:37:36'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', 'b2b30464-bc75-11f0-9284-92bd85fa5acf', '2025-11-15 13:37:04', '2025-11-15 13:37:04'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', 'bbf7112f-bcf6-11f0-8552-7aaf1c767246', '2025-11-15 13:37:14', '2025-11-15 13:37:14');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `role_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `role_name`, `created_at`, `updated_at`) VALUES
('6d8e8e2c-2e5a-e620-6d8e-cf59793fb15e', 'manager', '2025-11-08 07:44:55', '2025-11-08 07:44:55'),
('717d2b5b-ee87-ed4b-8629-ebcd13838628', 'normal', '2025-11-08 07:44:55', '2025-11-08 07:44:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `role_id`, `created_at`, `updated_at`) VALUES
('cb48c075-bc77-11f0-9284-92bd85fa5acf', 'Draco ', 'Malfoy', 'rich_basilisk@slytherine.com', 'f56dd547d5d4acd75ab84acb61b521fcb403c270c9002917e64bf7de3d2302f2', '717d2b5b-ee87-ed4b-8629-ebcd13838628', '2025-11-08 07:45:31', '2025-11-08 07:45:31'),
('cb48c9a3-bc77-11f0-9284-92bd85fa5acf', 'Harry', 'Potter', 'hogwarts_griffindor@hogwarts.com', 'cda0a70e9993c1deda25094bd0f2cb2470f082f6ba79f1bea85d6527ebb06f34', '717d2b5b-ee87-ed4b-8629-ebcd13838628', '2025-11-08 07:45:31', '2025-11-08 07:45:31'),
('cb48d252-bc77-11f0-9284-92bd85fa5acf', 'Severus', 'Snape', 'potion_master@slytherine.com', '5ecf79d5e973264c47b55d5eb3c4b1254237cbcbb8a5f8001152b64d71475bb0', '6d8e8e2c-2e5a-e620-6d8e-cf59793fb15e', '2025-11-08 07:45:31', '2025-11-08 07:45:31'),
('cb48d99d-bc77-11f0-9284-92bd85fa5acf', 'Hermione', 'Granger', 'harrys_girlfriend@hogwarts.com', '8d18eb9c00ef9bb9fdf50da51d1605a3a0a162c39de8ed0ba843e57316a66986', '717d2b5b-ee87-ed4b-8629-ebcd13838628', '2025-11-08 07:45:31', '2025-11-08 07:45:31');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `destination` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `beginning_date` datetime NOT NULL,
  `ending_date` datetime NOT NULL,
  `price` int NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`id`, `destination`, `description`, `beginning_date`, `ending_date`, `price`, `image_url`, `created_at`, `updated_at`) VALUES
('1e205c37-bc75-11f0-9284-92bd85fa5acf', 'Thailand', 'Resort in the south asia beach with local people with exotic food and a lot of adventures with the locals', '2025-11-13 07:29:20', '2025-11-28 07:29:20', 1800, 'frontend\\src\\assets\\thailand_waterfall.jpg', '2025-11-08 07:29:20', '2025-11-09 18:17:10'),
('1e2065cb-bc75-11f0-9284-92bd85fa5acf', 'Australia', 'Meet the beautiful aussies girls with the kangaroos in the whiteish sand you will never find anywhere on the globe', '2025-11-12 07:30:20', '2025-11-28 07:30:20', 3500, 'frontend/src/assets/beautiful_aussie_girl.webp', '2025-11-08 07:29:20', '2025-11-09 19:16:00'),
('2fc6884d-bc76-11f0-9284-92bd85fa5acf', 'Africa', 'Discover multiple giraffes in the wild savannahs of Afric!', '2025-11-08 05:38:35', '2025-12-08 05:38:35', 1999, 'frontend/src/assets/giraffes.jpeg', '2025-11-08 07:38:35', '2025-11-09 19:17:43'),
('2fc691b7-bc76-11f0-9284-92bd85fa5acf', 'Los Angles', 'Enjoy the clubs, booze and babes of the non-dreaming clubs Los Angeles!', '2026-04-14 06:38:35', '2026-05-07 06:38:35', 2288, 'frontend/src/assets/girls_at_the_club.webp', '2025-11-08 07:38:35', '2025-11-09 19:19:05'),
('3e42cc9f-bc75-11f0-9284-92bd85fa5acf', 'Hawaii', 'Explore the hawaiian beach with tall trees and beautiful local women', '2025-11-19 07:33:02', '2025-11-22 07:33:02', 2500, 'frontend/src/assets/hawaiian_beach.jpg', '2025-11-08 07:32:55', '2025-11-09 19:21:11'),
('54e2a55c-bcf6-11f0-8552-7aaf1c767246', 'Amazon', 'Discover the meandering amazon forests and many more amphibians encroaching there!', '2026-01-07 22:55:33', '2026-02-01 22:55:33', 2341, 'frontend/src/assets/amazon_river.webp', '2025-11-08 22:55:33', '2025-11-09 19:22:17'),
('7881b4f2-eb5e-4072-882d-16b3b9c312a7', 'Panama', 'Best beaches in Panama to swim with the almighty sea turtles that will chill your bones!', '2026-02-11 00:00:00', '2026-09-09 00:00:00', 2332, 'frontend/src/assets/panama_blonde.jpg', '2025-11-09 17:27:19', '2025-11-09 17:27:19'),
('b2b2f16e-bc75-11f0-9284-92bd85fa5acf', 'India', 'Visit the Taj Mahal, one of the seven wonders of the world!', '2025-11-19 07:33:47', '2025-11-28 07:33:47', 1589, 'frontend/src/assets/taj_mahal.webp', '2025-11-08 07:33:42', '2025-11-09 19:23:15'),
('b2b2fb37-bc75-11f0-9284-92bd85fa5acf', 'Japan', 'Explore the Cherry Blossom in the eastern countrysides of the oriental Japan!', '2025-11-08 05:33:42', '2025-12-08 05:33:42', 2222, 'frontend\\src\\assets\\cherry_blossom.webp', '2025-11-08 07:33:42', '2025-11-09 19:24:52'),
('b2b30464-bc75-11f0-9284-92bd85fa5acf', 'Peru', 'Discover exotic and rare birds in the peruvian rainforest!', '2025-11-14 07:33:47', '2025-11-21 07:33:47', 3333, 'frontend/src/assets/peruvian_toucans.png', '2025-11-08 07:33:42', '2025-11-09 19:25:40'),
('bbf7112f-bcf6-11f0-8552-7aaf1c767246', 'Paraguay', 'Enjoy the beautiful view of beautiful scenery and even more beautiful girls in piquantic Paraguay!', '2025-11-19 20:59:46', '2025-11-28 20:59:46', 2010, 'frontend/src/assets/paraguay_beautiful_view.jpg', '2025-11-08 22:59:46', '2025-11-09 19:33:07'),
('ebb4c36f-bc75-11f0-9284-92bd85fa5acf', 'Savannah', 'Discover the mottled tiger and other dangerous exotic animals in the wild shrubbery of Africa!', '2026-11-18 07:37:03', '2026-11-27 07:37:03', 1689, 'frontend/src/assets/savannah_tiger.webp', '2025-11-08 07:37:03', '2025-11-09 19:27:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `likers`
--
ALTER TABLE `likers`
  ADD PRIMARY KEY (`user_id`,`vacation_id`),
  ADD UNIQUE KEY `likers_userId_vacationId_unique` (`user_id`,`vacation_id`),
  ADD KEY `vacation_id` (`vacation_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
