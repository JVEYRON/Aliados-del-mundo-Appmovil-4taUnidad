<?php
header('Content-Type: application/json');
error_reporting(0);

// --- TUS DATOS DE CONEXIÓN ---
$host = "localhost";
$usuario = "root";
$contrasena = "joshuamanuel"; 
$nombre_bd = "aliados";
$puerto = 3306;

// 1. CONEXIÓN (Usamos $conn desde el principio)
$conn = new mysqli($host, $usuario, $contrasena, $nombre_bd, $puerto);

if ($conn->connect_error) {
    die(json_encode(["exito" => false, "mensaje" => "Error de conexión: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");

// 2. RECIBIR DATOS
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

$id = $datos['usuario_id'];
$cuenta = $datos['cuenta_bancaria'];
$banco = $datos['nombre_banco'];

// Validar
if (empty($id)) {
    echo json_encode(["exito" => false, "mensaje" => "Falta el ID del usuario"]);
    exit;
}

// 3. ACTUALIZAR
$sql = "UPDATE usuarios SET cuenta_bancaria = ?, nombre_banco = ? WHERE usuario_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssi", $cuenta, $banco, $id);

if ($stmt->execute()) {
    echo json_encode(["exito" => true, "mensaje" => "Datos bancarios actualizados"]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Error al actualizar: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>