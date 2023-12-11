<?php
require 'vendor/autoload.php'; // Assuming you installed PHP-JWT library

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST,GET ,OPTIONS");
header("Access-Control-Allow-Headers: Authorization,Content-Type");
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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['id'])) {
    // Validate JWT token
    $headers = apache_request_headers();
    $token = $headers['Authorization'];

    if ($token && ($decoded = verify_token($token))) {
        // Retrieve blog post from the database
        $blog_id = $_GET['id'];
        $sql = "SELECT * FROM blogs WHERE id = $blog_id";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $blog = $result->fetch_assoc();
            echo json_encode($blog);
        } else {
            http_response_code(404);
            echo json_encode(array("message" => "Blog not found"));
        }
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
    }
}

$conn->close();
?>
