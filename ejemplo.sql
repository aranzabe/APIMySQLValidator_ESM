-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 28-12-2022 a las 23:24:57
-- Versión del servidor: 8.0.31-0ubuntu0.20.04.2
-- Versión de PHP: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ejemplo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `dni` varchar(10) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `clave` varchar(20) NOT NULL,
  `tfno` varchar(20) NOT NULL
);

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`dni`, `nombre`, `clave`, `tfno`) VALUES
('05K', 'Eloy', '013', '661 022'),
('10A', 'Daniel', '123', '123'),
('135T', 'Gema', '123', '12894'),
('13H', 'Jaime', '', '2389392'),
('14F', 'Javier', '', '2387272'),
('18U', 'Álvaro', '', '23892'),
('19I', 'Alberto', '', '35345'),
('1A', 'Mónica', '123', '12389'),
('1E', 'Carlos', '1234', '243'),
('200RE', 'Miguel', '1234', '555 425423'),
('20Z', 'José', '', '2723832'),
('2B', 'Juán', '123', '2'),
('3C', 'Rafael', '3', '3'),
('5E', 'Ismael', '4', '5'),
('6F', 'Raúl G', '4', '6'),
('7G', 'Raúl N', '5', '7'),
('8H', 'Ángel', '', '348738'),
('90TE', 'DAW2', '1234', '555 8592'),
('9I', 'DAW1', '', '3289329');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int NOT NULL,
  `descripcion` varchar(20) NOT NULL
);

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `descripcion`) VALUES
(1, 'Administrador'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rolesasignados`
--

CREATE TABLE `rolesasignados` (
  `id` int NOT NULL,
  `dni_usu` varchar(10) NOT NULL,
  `id_rol` int NOT NULL
);

--
-- Volcado de datos para la tabla `rolesasignados`
--

INSERT INTO `rolesasignados` (`id`, `dni_usu`, `id_rol`) VALUES
(1, '10A', 1),
(2, '10A', 2),
(3, '11B', 2),
(4, '2B', 1),
(5, '1A', 1),
(6, '1A', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `rolesasignados`
--
ALTER TABLE `rolesasignados`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `rolesasignados`
--
ALTER TABLE `rolesasignados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
