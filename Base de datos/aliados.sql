-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 27-11-2025 a las 16:52:35
-- Versión del servidor: 8.0.17
-- Versión de PHP: 7.3.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aliados`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aportaciones_peticiones`
--

CREATE TABLE `aportaciones_peticiones` (
  `aportacion_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `peticion_id` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_aportacion` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `apoyos_personales`
--

CREATE TABLE `apoyos_personales` (
  `apoyo_id` int(11) NOT NULL,
  `donante_id` int(11) NOT NULL,
  `beneficiario_id` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `motivo_apoyo` varchar(255) NOT NULL,
  `fecha_apoyo` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donaciones_causas`
--

CREATE TABLE `donaciones_causas` (
  `donacion_causa_id` int(11) NOT NULL,
  `donante_id` int(11) NOT NULL,
  `causa` varchar(255) NOT NULL,
  `descripcion_donacion` text NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_donacion` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticiones`
--

CREATE TABLE `peticiones` (
  `peticion_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `monto_meta` decimal(10,2) DEFAULT NULL,
  `monto_actual` decimal(10,2) DEFAULT NULL,
  `fecha_creacion` timestamp NOT NULL,
  `estado` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `solicitudes`
--

CREATE TABLE `solicitudes` (
  `solicitud_id` int(11) NOT NULL,
  `beneficiario_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `estado` varchar(50) NOT NULL,
  `fecha_creacion` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `alias` varchar(50) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `cuenta_bancaria` varchar(50) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `direccion` varchar(255) NOT NULL,
  `contador_ayudas` int(11) DEFAULT NULL,
  `puntuacion_promedio` decimal(2,1) DEFAULT NULL,
  `fecha_registro` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `alias`, `nombre`, `apellido`, `email`, `password_hash`, `cuenta_bancaria`, `telefono`, `direccion`, `contador_ayudas`, `puntuacion_promedio`, `fecha_registro`) VALUES
(1, 'Nova', 'Joshua emmanuel ', 'Vazquez Mayo ', 'joshua@gmail.com', '12345678', NULL, NULL, 'Sin dirección', NULL, NULL, '2025-11-27 14:38:58'),
(2, 'El máximo ', 'Aldo Alberto ', 'Collado mayo ', 'aldo@gmail.com', '12345678', NULL, NULL, 'Sin dirección', NULL, NULL, '2025-11-27 14:52:49');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `valoraciones`
--

CREATE TABLE `valoraciones` (
  `valoracion_id` int(11) NOT NULL,
  `elemento_id` int(11) NOT NULL,
  `tipo_elemento` varchar(50) NOT NULL,
  `puntuacion_otorgada` int(11) DEFAULT NULL,
  `comentario` text,
  `usuario_valorador_id` int(11) NOT NULL,
  `fecha_valoracion` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `aportaciones_peticiones`
--
ALTER TABLE `aportaciones_peticiones`
  ADD PRIMARY KEY (`aportacion_id`),
  ADD KEY `fk_aportaciones_peticiones_peticion` (`peticion_id`),
  ADD KEY `fk_aportaciones_peticiones_usuario` (`usuario_id`);

--
-- Indices de la tabla `apoyos_personales`
--
ALTER TABLE `apoyos_personales`
  ADD PRIMARY KEY (`apoyo_id`),
  ADD KEY `fk_apoyos_personales_beneficiario` (`beneficiario_id`),
  ADD KEY `fk_apoyos_personales_donante` (`donante_id`);

--
-- Indices de la tabla `donaciones_causas`
--
ALTER TABLE `donaciones_causas`
  ADD PRIMARY KEY (`donacion_causa_id`),
  ADD KEY `fk_donaciones_causas_donante` (`donante_id`);

--
-- Indices de la tabla `peticiones`
--
ALTER TABLE `peticiones`
  ADD PRIMARY KEY (`peticion_id`),
  ADD KEY `fk_peticiones_usuario` (`usuario_id`);

--
-- Indices de la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD PRIMARY KEY (`solicitud_id`),
  ADD KEY `fk_solicitudes_beneficiario` (`beneficiario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`);

--
-- Indices de la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD PRIMARY KEY (`valoracion_id`),
  ADD KEY `fk_valoraciones_usuario_valorador` (`usuario_valorador_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `aportaciones_peticiones`
--
ALTER TABLE `aportaciones_peticiones`
  ADD CONSTRAINT `fk_aportaciones_peticiones_peticion` FOREIGN KEY (`peticion_id`) REFERENCES `peticiones` (`peticion_id`),
  ADD CONSTRAINT `fk_aportaciones_peticiones_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `apoyos_personales`
--
ALTER TABLE `apoyos_personales`
  ADD CONSTRAINT `fk_apoyos_personales_beneficiario` FOREIGN KEY (`beneficiario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `fk_apoyos_personales_donante` FOREIGN KEY (`donante_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `donaciones_causas`
--
ALTER TABLE `donaciones_causas`
  ADD CONSTRAINT `fk_donaciones_causas_donante` FOREIGN KEY (`donante_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `peticiones`
--
ALTER TABLE `peticiones`
  ADD CONSTRAINT `fk_peticiones_usuario` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `solicitudes`
--
ALTER TABLE `solicitudes`
  ADD CONSTRAINT `fk_solicitudes_beneficiario` FOREIGN KEY (`beneficiario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `valoraciones`
--
ALTER TABLE `valoraciones`
  ADD CONSTRAINT `fk_valoraciones_usuario_valorador` FOREIGN KEY (`usuario_valorador_id`) REFERENCES `usuarios` (`usuario_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
