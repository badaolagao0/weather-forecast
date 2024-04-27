-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 26, 2024 at 04:43 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `weather`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '1: register,\r\n0: unsubscribe '
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`id`, `email`, `token`, `date_created`, `status`) VALUES
(8, 'doanquochuy1411@gmail.com', '186c9253dee0558db2fa8fc64c19f390', '2024-04-26 14:17:57', 1),
(9, 'doanquochuy1411@gmail.com', 'c10bfee64bec4d7b4b76e1d24d7548dd', '2024-04-26 14:18:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `weatherinfo`
--

CREATE TABLE `weatherinfo` (
  `id` int(11) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Temp` float NOT NULL,
  `Wind` float NOT NULL,
  `Humidity` float NOT NULL,
  `date` datetime NOT NULL,
  `state` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `weatherinfo`
--

INSERT INTO `weatherinfo` (`id`, `Location`, `Temp`, `Wind`, `Humidity`, `date`, `state`) VALUES
(1, 'hanoi', 23, 2.2, 3.4, '2024-01-02 00:00:00', ''),
(2, 'London', 5, 1.2, 87, '2024-04-26 05:04:00', ''),
(3, 'London', 4, 1.33, 87, '2024-04-26 05:32:00', ''),
(4, 'London', 4, 1.33, 87, '2024-04-26 05:32:00', ''),
(5, 'London', 4, 1.2, 93, '2024-04-26 05:58:00', ''),
(6, 'London', 4, 1.2, 93, '2024-04-26 05:58:00', ''),
(7, 'india', 4, 1.2, 93, '2024-04-26 06:05:00', 'Overcast'),
(8, 'hanoi', 4, 1.2, 93, '2024-04-26 06:05:00', 'Overcast'),
(9, 'italian', 4, 1.2, 93, '2024-04-26 06:07:00', 'Overcast'),
(10, 'korean', 4, 1.2, 93, '2024-04-26 06:07:00', 'Overcast'),
(11, 'korean', 4, 1.2, 93, '2024-04-26 06:07:00', 'Overcast'),
(12, 'indi', 4, 1.2, 93, '2024-04-26 06:07:00', 'Overcast');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `weatherinfo`
--
ALTER TABLE `weatherinfo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `weatherinfo`
--
ALTER TABLE `weatherinfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
