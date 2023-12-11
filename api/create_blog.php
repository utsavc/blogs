<?php
require 'vendor/autoload.php'; // Assuming you installed PHP-JWT library

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Access-Control-Max-Age: 86400");

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$secret_key = "Utsav";
$host = "localhost";
$username = "root";
$password = "";
$database = "api";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$input = file_get_contents('php://input');
$data = json_decode($input, true);


function verify_token($token) {
    global $secret_key;    

    if ($token && strpos($token, 'Bearer ') === 0) {
        $token = substr($token, 7);
    } 
    
    try {
        $decoded = JWT::decode($token, new Key($secret_key, 'HS256'));
        return $decoded;
    } catch (Exception $e) {
        http_response_code(401); 
        $response = ['message' => 'Unauthorized Token'];
        echo json_encode($response);
        exit;
        return null;
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['title']) && isset($_POST['content'])) {
    // Validate JWT token
    $headers = apache_request_headers();
    $token = $headers['Authorization'];

    if ($token && ($decoded = verify_token($token))) {
        // Insert new blog post into the database
        $title = $_POST['title'];
        $content = $_POST['content'];
        $author = $decoded->user_id;

        $sql = "INSERT INTO blogs (title, content, author_id) VALUES ('$title', '$content', '$author')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(array("message" => "Blog created successfully"));
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Error creating blog: " . $conn->error));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
    }
}

$conn->close();
?>
