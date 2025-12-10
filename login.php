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


// 2. RECIBIR DATOS DE REACT NATIVE
$json = file_get_contents('php://input');
$datos = json_decode($json, true);

$email = $datos['email'];
$password = $datos['password'];

// 3. CONSULTAR EL USUARIO
// Nota: Usamos sentencias preparadas para seguridad
$sql = "SELECT * FROM usuarios WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    // 4. VERIFICAR CONTRASEÑA
    // Si en tu base de datos guardaste la contraseña normal (texto plano):
    if ($password == $row['password_hash']) {
        echo json_encode(["exito" => true, "mensaje" => "Bienvenido", "usuario" => $row]);
    } 
    // Si la guardaste encriptada (recomendado), usa: if(password_verify($password, $row['password_hash']))
    else {
        echo json_encode(["exito" => false, "mensaje" => "Contraseña incorrecta"]);
    }
} else {
    echo json_encode(["exito" => false, "mensaje" => "Usuario no encontrado"]);
}

$conn->close();
?>