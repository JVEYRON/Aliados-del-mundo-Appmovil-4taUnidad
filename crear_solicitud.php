<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');
error_reporting(0);

// 1. IMPORTAMOS TU ARCHIVO (Que ya tiene la conexión lista en $conexion)
require_once 'code.php'; 

// 2. RECIBIR DATOS
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Validación rápida para que no truene si entras directo del navegador
if (!$data) {
    echo json_encode(["exito" => false, "mensaje" => "Se esperaban datos JSON"]);
    exit;
}

$usuario_id  = $data['usuario_id'] ?? 0;
$titulo      = $data['titulo'] ?? '';
$descripcion = $data['descripcion'] ?? '';
$monto       = $data['monto'] ?? 0.00;
$tipo        = $data['tipo'] ?? 'fisico';
$evidencia   = $data['evidencia'] ?? '';

// 3. GUARDAR (Usando $conexion que viene de code.php)
$sql = "INSERT INTO solicitudes (beneficiario_id, titulo, descripcion, monto, tipo_evidencia, evidencia_data, fecha_creacion, estado) VALUES (?, ?, ?, ?, ?, ?, NOW(), 'Pendiente')";

// OJO AQUÍ: Usamos $conexion, no $conn
$stmt = $conexion->prepare($sql);

if (!$stmt) {
    echo json_encode(["exito" => false, "mensaje" => "Error SQL: " . $conexion->error]);
    exit;
}

$stmt->bind_param("issdss", $usuario_id, $titulo, $descripcion, $monto, $tipo, $evidencia);

if ($stmt->execute()) {
    echo json_encode(["exito" => true, "mensaje" => "Solicitud creada correctamente"]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Error al guardar: " . $stmt->error]);
}

$stmt->close();
$conexion->close();
?>