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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Check if the username already exists
    $check_stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
    $check_stmt->bind_param("s", $username);
    $check_stmt->execute();
    $check_stmt->store_result();

    if ($check_stmt->num_rows > 0) {
        // Username already exists
        $check_stmt->close();
        http_response_code(400);
        echo json_encode(array("message" => "Username already exists"));
    } else {
        // Perform user registration
        $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
        $stmt->bind_param("ss", $username, $password);

        if ($stmt->execute()) {
            $user_id = $stmt->insert_id;
            $stmt->close();
            http_response_code(200);
            echo json_encode(array("message" => "Registration Success"));
        } else {
            // Registration failed
            $stmt->close();
            http_response_code(400);
            echo json_encode(array("message" => "Registration failed"));
        }
    }
}

$conn->close();
?>
