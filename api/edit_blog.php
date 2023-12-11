<?php
require 'vendor/autoload.php'; 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
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

function respondUnauthorized($message = "Unauthorized") {
    http_response_code(401);
    echo json_encode(["message" => $message]);
    exit;
}

function respondServerError($message) {
    http_response_code(500);
    echo json_encode(["message" => $message]);
    exit;
}

function updateBlog($conn, $blogId, $title, $content) {
    $sql = "UPDATE blogs SET title='$title', content='$content' WHERE id=$blogId";
    return $conn->query($sql);
}

// Read raw input from the request body
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Check if the required parameters are present
if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_GET['id']) && isset($data['title']) && isset($data['content'])) {
    // Validate JWT token
    $headers = apache_request_headers();
    $token = $headers['Authorization'];

    if (!$token || !($decoded = verify_token(substr($token, 7)))) {
        respondUnauthorized();
    }

    // Update the blog post in the database
    $blogId = $_GET['id'];
    $title = $data['title'];
    $content = $data['content'];

    if (updateBlog($conn, $blogId, $title, $content)) {
        echo json_encode(["message" => "Blog updated successfully"]);
    } else {
        respondServerError("Error updating blog: " . $conn->error);
    }
} else {
    respondUnauthorized("Unsupported method or missing parameters");
}

$conn->close();
?>
