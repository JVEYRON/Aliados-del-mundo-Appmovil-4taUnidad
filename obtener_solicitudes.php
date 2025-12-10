<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

// Reportar errores básicos para debug (solo si no es producción)
// error_reporting(E_ALL); 
// ini_set('display_errors', 1);
error_reporting(0); // Lo dejamos en 0 para que no rompa el JSON con warnings

// --- 1. CONEXIÓN DIRECTA (Para descartar problemas de include) ---
$host = "localhost";
$usuario = "root";
$contrasena = "joshuamanuel"; 
$nombre_bd = "aliados"; // Asegúrate que este sea el nombre real en tu HeidiSQL
$puerto = 3306;

$conn = new mysqli($host, $usuario, $contrasena, $nombre_bd, $puerto);

if ($conn->connect_error) {
    die(json_encode(["error" => "Error Conexión: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");

// --- 2. CONSULTA SEGURA ---
// Verificamos si la consulta falla
$sql = "SELECT 
            s.solicitud_id, s.titulo, s.descripcion, s.monto, s.tipo_evidencia, s.evidencia_data,
            u.alias, u.nombre, u.apellido, u.nombre_banco, u.cuenta_bancaria
        FROM solicitudes s
        JOIN usuarios u ON s.beneficiario_id = u.usuario_id
        ORDER BY s.fecha_creacion DESC";

$result = $conn->query($sql);

if (!$result) {
    // SI ENTRAS AQUÍ, ES QUE TE FALTAN COLUMNAS EN LA BD
    echo json_encode([
        "error" => "Error SQL", 
        "mensaje" => $conn->error 
    ]);
    exit;
}

$datos = [];
while ($fila = $result->fetch_assoc()) {
    $datos[] = $fila;
}

// 3. IMPRIMIR JSON FINAL
echo json_encode($datos);

$conn->close();
?>