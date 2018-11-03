-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-11-2018 a las 21:22:36
-- Versión del servidor: 10.1.26-MariaDB
-- Versión de PHP: 7.1.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `paymentv2`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pivot`
--

CREATE TABLE `pivot` (
  `ID_PIVOT` int(11) NOT NULL,
  `ID_SERVICE` int(11) NOT NULL,
  `ID_USER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registers`
--

CREATE TABLE `registers` (
  `ID_REGISTER` int(11) NOT NULL,
  `DATE` date NOT NULL,
  `ID_USER` int(11) NOT NULL,
  `ID_STATUS` int(11) NOT NULL,
  `ID_SERVICE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `ID_SERVICE` int(11) NOT NULL,
  `NAME` varchar(150) NOT NULL,
  `PRICE` decimal(10,2) NOT NULL,
  `CREATION_DATE` date NOT NULL,
  `STATUS` tinyint(1) NOT NULL,
  `ID_USER` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `status`
--

CREATE TABLE `status` (
  `ID_STATUS` int(11) NOT NULL,
  `STATUS` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `status`
--

INSERT INTO `status` (`ID_STATUS`, `STATUS`) VALUES
(1, 'Por pagar'),
(2, 'Pagado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `ID_USER` int(11) NOT NULL,
  `NAME` varchar(150) NOT NULL,
  `LAST_NAME` varchar(150) NOT NULL,
  `MAIL` varchar(150) NOT NULL,
  `PASSWORD` varchar(800) NOT NULL,
  `ID_TYPE` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_types`
--

CREATE TABLE `users_types` (
  `ID_TYPE` int(11) NOT NULL,
  `TYPE` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `users_types`
--

INSERT INTO `users_types` (`ID_TYPE`, `TYPE`) VALUES
(1, 'Usuario'),
(2, 'Administrador de plataforma');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `pivot`
--
ALTER TABLE `pivot`
  ADD PRIMARY KEY (`ID_PIVOT`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_SERVICE` (`ID_SERVICE`);

--
-- Indices de la tabla `registers`
--
ALTER TABLE `registers`
  ADD PRIMARY KEY (`ID_REGISTER`),
  ADD KEY `ID_USER` (`ID_USER`),
  ADD KEY `ID_STATUS` (`ID_STATUS`),
  ADD KEY `ID_SERVICE` (`ID_SERVICE`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`ID_SERVICE`),
  ADD KEY `ID_USER` (`ID_USER`);

--
-- Indices de la tabla `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`ID_STATUS`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID_USER`),
  ADD KEY `ID_TYPE` (`ID_TYPE`);

--
-- Indices de la tabla `users_types`
--
ALTER TABLE `users_types`
  ADD PRIMARY KEY (`ID_TYPE`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `pivot`
--
ALTER TABLE `pivot`
  MODIFY `ID_PIVOT` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `registers`
--
ALTER TABLE `registers`
  MODIFY `ID_REGISTER` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `ID_SERVICE` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `status`
--
ALTER TABLE `status`
  MODIFY `ID_STATUS` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `ID_USER` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `users_types`
--
ALTER TABLE `users_types`
  MODIFY `ID_TYPE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pivot`
--
ALTER TABLE `pivot`
  ADD CONSTRAINT `pivot_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`),
  ADD CONSTRAINT `pivot_ibfk_2` FOREIGN KEY (`ID_SERVICE`) REFERENCES `services` (`ID_SERVICE`);

--
-- Filtros para la tabla `registers`
--
ALTER TABLE `registers`
  ADD CONSTRAINT `registers_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`),
  ADD CONSTRAINT `registers_ibfk_2` FOREIGN KEY (`ID_SERVICE`) REFERENCES `services` (`ID_SERVICE`),
  ADD CONSTRAINT `registers_ibfk_3` FOREIGN KEY (`ID_STATUS`) REFERENCES `status` (`ID_STATUS`);

--
-- Filtros para la tabla `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`ID_USER`) REFERENCES `users` (`ID_USER`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ID_TYPE`) REFERENCES `users_types` (`ID_TYPE`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
