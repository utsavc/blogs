<?php
require 'vendor/autoload.php'; // Assuming you installed PHP-JWT library

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Content-Type");


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


function getAllBlogs($author_id) {
    global $conn;

    $sql = "SELECT * FROM blogs WHERE author_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $author_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $blogs = array();
    while ($row = $result->fetch_assoc()) {
        $blogs[] = $row;
    }

    $stmt->close();
    return $blogs;
}


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Validate JWT token
    $headers = apache_request_headers();
    $token = $headers['Authorization'];


    if ($token && ($decoded = verify_token($token))) {

        $author = $decoded->user_id;
        // Retrieve all blog posts from the database
        $blogs = getAllBlogs($author);
        echo json_encode($blogs);
    } else {
        http_response_code(401);
        echo json_encode(array("message" => "Unauthorized"));
    }
}

$conn->close();
?>
