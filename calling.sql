-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Apr 09, 2025 at 03:52 AM
-- Server version: 8.0.30
-- PHP Version: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `calling`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

CREATE TABLE `account` (
  `id` int NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('0','1') DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `fullname`, `username`, `password`, `role`) VALUES
(1, 'admin', 'admin', '123456', '1');

-- --------------------------------------------------------

--
-- Table structure for table `account_lienhe`
--

CREATE TABLE `account_lienhe` (
  `id` int NOT NULL,
  `account_id` int NOT NULL,
  `lienhe_id` int NOT NULL,
  `assigned_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int NOT NULL,
  `content` text NOT NULL,
  `user_id` int DEFAULT NULL,
  `status` enum('0','1') DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `content`, `user_id`, `status`, `created_at`, `thumbnail`, `title`, `description`) VALUES
(1, '<p>Heelllo</p>\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"../public/uploads/1744131146343.webp\" alt=\"\" width=\"351\" height=\"351\"></p>', 1, '1', '2025-04-08 16:52:39', NULL, NULL, NULL),
(2, '<p>Soạn nội dung tại đ&acirc;y...</p>\r\n<p>sfashcasjcsa<img src=\"../public/uploads/1744131291311.jpg\" alt=\"\" width=\"624\" height=\"624\"></p>', 1, '0', '2025-04-08 16:54:54', NULL, NULL, NULL),
(3, '<h1>Tin n&oacute;ng h&ocirc;m nay</h1>\r\n<p><img src=\"../public/uploads/1744133297413.jpg\" alt=\"\" width=\"1200\" height=\"800\"></p>', 1, '1', '2025-04-08 17:28:20', NULL, NULL, NULL),
(4, '<h1>Tin n&oacute;ng 2</h1>\r\n<p><img src=\"../public/uploads/1744133322099.jpg\" alt=\"\" width=\"1200\" height=\"800\"></p>', 1, '1', '2025-04-08 17:28:44', NULL, NULL, NULL),
(5, '<h1>Tin n&oacute;ng 3</h1>\r\n<p><img src=\"../public/uploads/1744133345065.png\" alt=\"\" width=\"640\" height=\"640\"></p>', 1, '1', '2025-04-08 17:29:07', NULL, NULL, NULL),
(6, '<h1>Tin n&oacute;ng 4</h1>\r\n<p><img src=\"../public/uploads/1744133372601.jpg\" alt=\"\" width=\"225\" height=\"225\"></p>', 1, '1', '2025-04-08 17:29:36', NULL, NULL, NULL),
(7, '<h1>Nội dung 13</h1>\r\n<ol>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Quản l&yacute; th&ocirc;ng tin nh&acirc;n vi&ecirc;n</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Quản l&yacute; lương ( bảng lương cho từng nhiệm vụ v&agrave; vị tr&iacute; ph&ograve;ng ban&hellip;) (import file excel, csv&hellip;.)</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Quản l&yacute; ng&agrave;y nghỉ lễ</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Hệ thống tự động t&iacute;nh phạt cho từng nh&acirc;n vi&ecirc;n dựa v&agrave;o bảng attendances v&agrave; vacations.</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Quản l&yacute; c&aacute;c th&ocirc;ng tin mới của c&ocirc;ng ty</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Thống k&ecirc; lương h&agrave;ng th&aacute;ng của nh&acirc;n vi&ecirc;n</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Quyết to&aacute;n lương cho nh&acirc;n vi&ecirc;n v&agrave;o cuối th&aacute;ng (gửi th&ocirc;ng b&aacute;o đến email v&agrave; hệ thống của từng nh&acirc;n vi&ecirc;n) (automation t&iacute;nh lương, gửi email về, cronjob,..)</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Thống k&ecirc; số ng&agrave;y nghỉ c&oacute; ph&eacute;p v&agrave; kh&ocirc;ng ph&eacute;p của nh&acirc;n vi&ecirc;n</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Thống k&ecirc; lỗi của nh&acirc;n vi&ecirc;n</p>\r\n</li>\r\n<li dir=\"ltr\" aria-level=\"2\">\r\n<p dir=\"ltr\" role=\"presentation\">Thống k&ecirc; v&agrave; tạo ra giải thưởng h&agrave;ng qu&yacute; cho nh&acirc;n vi&ecirc;n (dựa theo th&agrave;nh t&iacute;ch, chuy&ecirc;n cần,...)</p>\r\n</li>\r\n</ol>\r\n<p><img src=\"../public/uploads/1744133671486.webp\" alt=\"\" width=\"900\" height=\"1133\"></p>', 1, '1', '2025-04-08 17:34:34', NULL, NULL, NULL),
(8, '<p>Soạn nội dung tại đ&acirc;y...</p>\n<p style=\"text-align: center;\"><img src=\"../public/uploads/1744168087690.jpg\" alt=\"\" width=\"624\" height=\"624\"></p>', 1, '0', '2025-04-09 03:08:11', '/uploads/1744168091105.jpg', 'Thái', 'thái ok'),
(9, '<p>Điện thoại xiaomi&nbsp;</p>\n<p style=\"text-align: center;\"><img src=\"../public/uploads/1744168345136.jpg\" alt=\"\" width=\"464\" height=\"309\"></p>', 1, '0', '2025-04-09 03:12:39', '/uploads/1744168359671.jpg', 'Điện thoại xiaomi', 'Điện thoại xiaomi thật đẹp'),
(10, '<p class=\"\" data-start=\"452\" data-end=\"892\">Đầu ti&ecirc;n l&agrave; <strong data-start=\"464\" data-end=\"484\">đường tinh luyện</strong>, kẻ th&ugrave; &acirc;m thầm của gan v&agrave; hệ miễn dịch. Thứ hai l&agrave; <strong data-start=\"537\" data-end=\"553\">đồ chi&ecirc;n r&aacute;n</strong>, chứa nhiều chất b&eacute;o chuyển h&oacute;a g&acirc;y tổn thương tế b&agrave;o. Thứ ba, <strong data-start=\"617\" data-end=\"628\">thịt đỏ</strong> v&agrave; c&aacute;c sản phẩm từ thịt chế biến sẵn dễ l&agrave;m tăng phản ứng vi&ecirc;m. Tiếp theo l&agrave; <strong data-start=\"706\" data-end=\"726\">nước ngọt c&oacute; gas</strong>, kh&ocirc;ng chỉ g&acirc;y b&eacute;o m&agrave; c&ograve;n l&agrave;m cơ thể mất c&acirc;n bằng chuyển h&oacute;a. Cuối c&ugrave;ng, <strong data-start=\"800\" data-end=\"820\">ngũ cốc tinh chế</strong> như b&aacute;nh m&igrave; trắng, m&igrave; ăn liền&hellip; g&oacute;p phần l&agrave;m tăng lượng đường trong m&aacute;u.</p>\n<p class=\"\" data-start=\"894\" data-end=\"1059\">Chọn thực phẩm th&ocirc;ng minh, tr&aacute;nh xa c&aacute;c t&aacute;c nh&acirc;n g&acirc;y vi&ecirc;m l&agrave; bước đầu ti&ecirc;n để sống khỏe chủ động mỗi ng&agrave;y. H&atilde;y bắt đầu từ h&ocirc;m nay c&ugrave;ng <strong data-start=\"1029\" data-end=\"1050\">khỏe chủ động 360</strong> bạn nh&eacute;!</p>\n<p class=\"\" style=\"text-align: center;\" data-start=\"894\" data-end=\"1059\"><img src=\"../public/uploads/1744169527846.jpg\" alt=\"\" width=\"359\" height=\"359\"></p>', 1, '0', '2025-04-09 03:32:16', '/uploads/1744169536659.jpg', 'Thực phẩm vô hại', 'Bạn có biết rằng mỗi ngày, có những thực phẩm tưởng như vô hại lại đang âm thầm gây viêm trong cơ thể bạn? Trên kênh khỏe chủ động 360, hôm nay chúng ta sẽ cùng điểm mặt 5 “thủ phạm” phổ biến nhất.'),
(11, '<p>Soạn nội dung tại đ&acirc;y...</p>\n<p style=\"text-align: center;\"><img src=\"../public/uploads/1744169967112.jpg\" alt=\"\" width=\"339\" height=\"226\"></p>', 1, '0', '2025-04-09 03:39:38', '/uploads/1744169978783.jpg', 'Bài viết 1', 'Bài viết 1'),
(12, '<p>Soạn nội dung tại đ&acirc;y...</p>\r\n<p><img style=\"display: block; margin-left: auto; margin-right: auto;\" src=\"/public/uploads/1744170105535.jpg\" alt=\"\" width=\"286\" height=\"286\"></p>', 1, '0', '2025-04-09 03:41:55', '/uploads/1744170115929.webp', 'Bài Viết 2', 'Bài Viết 2');

-- --------------------------------------------------------

--
-- Table structure for table `lienhe`
--

CREATE TABLE `lienhe` (
  `ID` int NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(20) DEFAULT NULL,
  `Project` varchar(255) DEFAULT NULL,
  `Subject` varchar(255) DEFAULT NULL,
  `Message` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lienhe`
--

INSERT INTO `lienhe` (`ID`, `Name`, `Email`, `Phone`, `Project`, `Subject`, `Message`, `created_at`) VALUES
(13, 'Thái', 'thaiphph52804@gmail.com', '0372039565', 'Công ty Abc', 'Liên hệ tôi ngay', 'Nhanh nhe', '2025-04-09 03:42:59'),
(14, 'Phạm Hồng Thái', 'thaiphph52804@gmail.com', '', '', '', '', '2025-04-09 03:52:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `account_lienhe`
--
ALTER TABLE `account_lienhe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `lienhe_id` (`lienhe_id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `lienhe`
--
ALTER TABLE `lienhe`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `account`
--
ALTER TABLE `account`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `account_lienhe`
--
ALTER TABLE `account_lienhe`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `lienhe`
--
ALTER TABLE `lienhe`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `account_lienhe`
--
ALTER TABLE `account_lienhe`
  ADD CONSTRAINT `account_lienhe_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  ADD CONSTRAINT `account_lienhe_ibfk_2` FOREIGN KEY (`lienhe_id`) REFERENCES `lienhe` (`ID`);

--
-- Constraints for table `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `account` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
