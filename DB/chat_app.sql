-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 22, 2024 at 11:33 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `timestamp`) VALUES
(1, 1, 2, 'hello Veer', '2024-11-21 14:17:03'),
(2, 2, 1, 'hello Jaymin', '2024-11-21 14:17:13'),
(3, 1, 2, 'fgg', '2024-11-22 09:16:01'),
(4, 1, 2, 'fdg', '2024-11-22 09:16:03');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `user_id`, `status`, `created_at`) VALUES
(1, 2, 'active', '2024-11-22 13:27:05');

-- --------------------------------------------------------

--
-- Table structure for table `stories_images`
--

CREATE TABLE `stories_images` (
  `id` int(11) NOT NULL,
  `stories_id` int(11) NOT NULL,
  `images_stories` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `viewers` text DEFAULT NULL,
  `stories_user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories_images`
--

INSERT INTO `stories_images` (`id`, `stories_id`, `images_stories`, `title`, `viewers`, `stories_user_id`, `created_at`, `updated_at`) VALUES
(1, 1, 'https://connectme-html.themeyn.com/images/stories/1.jpg', 'Frances Arnold\'s awesome Ptotoshoot', '11', NULL, '2024-11-22 13:27:54', '2024-11-22 14:28:54'),
(2, 1, 'https://connectme-html.themeyn.com/images/stories/2.jpg', 'Wonderful evening with myself', '5', NULL, '2024-11-22 13:27:54', '2024-11-22 14:29:17'),
(3, 1, 'https://connectme-html.themeyn.com/images/stories/3.jpg', 'Ptotoshoot with Evelyn Martin', '3', NULL, '2024-11-22 13:28:15', '2024-11-22 14:29:32'),
(4, 1, 'https://connectme-html.themeyn.com/images/stories/4.jpg', 'my beautiful girl', '10', NULL, '2024-11-22 13:28:15', '2024-11-22 14:30:02');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `avatar`, `created_at`) VALUES
(1, 'Jaymin Modi', 'jaymin@gmail.com', '$2a$10$nTZHmzbm.gM4YSvtt084HO0WII03dlEiN.g4IIPGoHcpxWsQBZj5.', '1.jpg', '2024-11-13 08:51:36'),
(2, 'Veer Modi', 'veer@gmail.com', '$2a$10$9uwjszFhLTA.zz7O94RQeO60wQOAYIscwsxO7MuKnJb0KP6lDUdi6', '2.jpg', '2024-11-13 08:51:58'),
(3, 'Harshil Patel', 'harshil@gmail.com', '$2a$10$bWVvwNXA9CfB0SUT.9Dxku7Fqv.oZ7HutsgvUlWa1AczYGTGtCvx.', '3.jpg', '2024-11-13 09:00:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stories_images`
--
ALTER TABLE `stories_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stories_images`
--
ALTER TABLE `stories_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
