-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 07, 2025 at 02:53 PM
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
-- Table structure for table `block_user`
--

CREATE TABLE `block_user` (
  `id` int(11) NOT NULL,
  `sender_id` varchar(255) DEFAULT NULL,
  `receiver_id` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `status` enum('read','unread') NOT NULL DEFAULT 'unread',
  `timestamp` timestamp NOT NULL DEFAULT current_timestamp(),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `delete_user_id` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`delete_user_id`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `sender_id`, `receiver_id`, `content`, `status`, `timestamp`, `images`, `delete_user_id`) VALUES
(1, 1, 4, 'Had they visited Rome before', 'read', '2025-02-03 06:27:28', '[]', NULL),
(2, 1, 5, 'Liked that disco music', 'read', '2025-02-04 06:27:51', '[]', NULL),
(3, 6, 1, 'Hey, how\'s it going?', 'read', '2025-02-04 06:28:03', '[]', NULL),
(4, 1, 7, 'Same here. I\'ve been trying to keep myself occupied', 'read', '2025-02-04 06:28:15', '[]', NULL),
(5, 1, 8, 'It\'s been really fun so far', 'read', '2025-02-04 06:28:37', '[]', NULL),
(6, 1, 9, 'That\'s cool!', 'read', '2025-02-04 06:28:57', '[]', NULL),
(7, 1, 10, 'Yeah, I\'ve been trying to paint', 'read', '2025-02-04 06:29:13', '[]', NULL),
(8, 1, 11, 'That\'s awesome! I\'d love to see', 'read', '2025-02-04 06:29:58', '[]', NULL),
(9, 1, 12, 'Sounds good to me', 'read', '2025-02-04 06:30:08', '[]', NULL),
(10, 1, 13, 'Definitely, let\'s plan on it', 'read', '2025-02-04 06:30:22', '[]', NULL),
(11, 1, 14, 'Not really, how about we try', 'read', '2025-02-04 06:30:32', '[]', NULL),
(12, 1, 4, 'I need help', 'read', '2025-02-03 06:40:10', '[]', NULL),
(13, 1, 4, '', 'read', '2025-02-03 06:41:46', '[{\"url\":\"http://localhost:3001/uploads/Konstantin_cv.docx\"}]', NULL),
(14, 4, 1, '', 'read', '2025-02-03 06:41:46', '[{\"url\":\"http://localhost:3001/uploads/1.jpg\"},{\"url\":\"http://localhost:3001/uploads/2.jpg\"},{\"url\":\"http://localhost:3001/uploads/3.jpg\"},{\"url\":\"http://localhost:3001/uploads/4.jpg\"},{\"url\":\"http://localhost:3001/uploads/5.jpg\"}]', NULL),
(15, 4, 1, 'I hope these article helps.', 'read', '2025-02-03 06:41:46', '[]', NULL),
(16, 1, 4, '', 'read', '2025-02-03 06:41:46', '[{\"url\":\"http://localhost:3001/uploads/1.webm\"}]', NULL),
(17, 4, 1, 'https://www.envato.com/atomic-power-plant-engine/', 'read', '2025-02-04 07:09:35', '[]', NULL),
(18, 4, 1, 'I hope these article helps.', 'read', '2025-02-04 07:10:07', '[]', NULL),
(19, 1, 4, 'Do you know which App or feature it will require to set up.', 'read', '2025-02-04 07:10:30', '[]', NULL),
(20, 1, 4, 'hello', 'read', '2025-02-06 09:23:47', '[]', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `images_stories` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `viewers` text DEFAULT '0',
  `stories_user_id` text DEFAULT '[]',
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Jaymin Modi', 'jaymin@gmail.com', '$2a$10$nTZHmzbm.gM4YSvtt084HO0WII03dlEiN.g4IIPGoHcpxWsQBZj5.', '1.jpg', '2024-11-13 03:21:36'),
(4, 'Jasmine Thompson', 'jasminethompson@gmail.com', '$2a$10$nTZHmzbm.gM4YSvtt084HO0WII03dlEiN.g4IIPGoHcpxWsQBZj5.', '1.jpg', '2024-11-13 03:21:36'),
(5, 'Konstantin Frank', 'konstantinfrank@gmail.com', '$2a$10$9uwjszFhLTA.zz7O94RQeO60wQOAYIscwsxO7MuKnJb0KP6lDUdi6', '2.jpg', '2024-11-13 03:21:58'),
(6, 'Mathias Devos', 'mathiasdevos@gmail.com', '$2a$10$bWVvwNXA9CfB0SUT.9Dxku7Fqv.oZ7HutsgvUlWa1AczYGTGtCvx.', '3.jpg', '2024-11-13 03:30:58'),
(7, 'Marie George', 'mariegeorge@gmail.com', '$2a$10$nTZHmzbm.gM4YSvtt084HO0WII03dlEiN.g4IIPGoHcpxWsQBZj5.', '4.jpg', '2024-11-13 03:21:36'),
(8, 'Phillip Burke', 'phillipburke@gmail.com', '$2a$10$9uwjszFhLTA.zz7O94RQeO60wQOAYIscwsxO7MuKnJb0KP6lDUdi6', '5.jpg', '2024-11-13 03:21:58'),
(9, 'Romy Schulte', 'romyschulte@gmail.com', '$2a$10$bWVvwNXA9CfB0SUT.9Dxku7Fqv.oZ7HutsgvUlWa1AczYGTGtCvx.', '6.jpg', '2024-11-13 03:30:58'),
(10, 'Frances Arnold', 'francesarnold@gmail.com', '$2a$10$nTZHmzbm.gM4YSvtt084HO0WII03dlEiN.g4IIPGoHcpxWsQBZj5.', '7.jpg', '2024-11-13 03:21:36'),
(11, 'Nina Dubois', 'ninadubois@gmail.com', '$2a$10$9uwjszFhLTA.zz7O94RQeO60wQOAYIscwsxO7MuKnJb0KP6lDUdi6', '8.jpg', '2024-11-13 03:21:58'),
(12, 'Albert Henderson', 'alberthenderson@gmail.com', '$2a$10$bWVvwNXA9CfB0SUT.9Dxku7Fqv.oZ7HutsgvUlWa1AczYGTGtCvx.', '9.jpg', '2024-11-13 03:30:58'),
(13, 'Maxim Werner', 'maximwerner@gmail.com', '$2a$10$9uwjszFhLTA.zz7O94RQeO60wQOAYIscwsxO7MuKnJb0KP6lDUdi6', '10.jpg', '2024-11-13 03:21:58'),
(14, 'Nolan Etienne', 'nolanetienne@gmail.com', '$2a$10$bWVvwNXA9CfB0SUT.9Dxku7Fqv.oZ7HutsgvUlWa1AczYGTGtCvx.', '11.jpg', '2024-11-13 03:30:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `block_user`
--
ALTER TABLE `block_user`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `block_user`
--
ALTER TABLE `block_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
