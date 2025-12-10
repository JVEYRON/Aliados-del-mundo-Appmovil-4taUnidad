<?php
// --- 1. Definir los parámetros de la base de datos ---
$host = "localhost";
$usuario = "root";
$contrasena = "joshuamanuel"; // ¡Dejar vacía si XAMPP/WAMP no tiene contraseña!
$nombre_bd = "aliados";
$puerto = 3306; // O 3307 si lo cambiaste


$conn = new mysqli($host, $usuario, $contrasena, $nombre_bd);

if ($conn->connect_error) {
    die(json_encode(["exito" => false, "mensaje" => "Error de conexión: " . $conn->connect_error]));
}

$conn->set_charset("utf8mb4");

// 2. RECIBIR DATOS DE LA APP
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

// Extraemos las variables
$alias    = $datos['alias'] ?? ''; // El ?? '' evita errores si viene vacío
$nombre   = $datos['nombre'] ?? '';
$apellido = $datos['apellido'] ?? '';
$email    = $datos['email'] ?? '';
$password = $datos['password'] ?? '';

// Validar que no vengan vacíos
if (empty($email) || empty($password) || empty($nombre)) {
    echo json_encode(["exito" => false, "mensaje" => "Faltan datos obligatorios"]);
    exit;
}

// 3. VERIFICAR QUE EL CORREO NO EXISTA YA
$checkEmail = $conn->prepare("SELECT usuario_id FROM usuarios WHERE email = ?");
$checkEmail->bind_param("s", $email);
$checkEmail->execute();
$checkEmail->store_result();

if ($checkEmail->num_rows > 0) {
    echo json_encode(["exito" => false, "mensaje" => "Este correo ya está registrado"]);
    exit;
}

// 4. INSERTAR EL NUEVO USUARIO
// IMPORTANTE: Estamos guardando fecha_registro automática con NOW()
// Nota: Si tu tabla no tiene columna 'alias', borra esa parte de la consulta.
// Asumo que agregaste 'alias' como dijimos antes. Si no, quítalo de aquí.
$sql = "INSERT INTO usuarios (alias, nombre, apellido, email, password_hash, fecha_registro) VALUES (?, ?, ?, ?, ?,  NOW())";

$stmt = $conn->prepare($sql);
// "sssss" significa que son 5 Strings
$stmt->bind_param("sssss", $alias, $nombre, $apellido, $email, $password);

if ($stmt->execute()) {
    echo json_encode(["exito" => true, "mensaje" => "Usuario registrado con éxito"]);
} else {
    echo json_encode(["exito" => false, "mensaje" => "Error al guardar en BD: " . $stmt->error]);
}

$conn->close();
?>