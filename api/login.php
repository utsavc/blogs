<?php
require 'vendor/autoload.php'; // Assuming you installed PHP-JWT library


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400");

use Firebase\JWT\JWT;

$secret_key = "Utsav";
$host = "localhost";
$username = "root";
$password = "";
$database = "api";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function generate_token($user_id) {
    global $secret_key;
    $payload = array(
        "user_id" => $user_id,
        "exp" => time() + 3600 // Token expiration time (1 hour)
    );
    return JWT::encode($payload, $secret_key, 'HS256');
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Validate user credentials
    $stmt = $conn->prepare("SELECT id FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $stmt->bind_result($user_id);
    $stmt->fetch();
    $stmt->close();

    if ($user_id) {
        // Login successful, generate token
        $token = generate_token($user_id);
        echo json_encode(array("token" => $token));
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Invalid credentials"));
    }
}

$conn->close();
?>


