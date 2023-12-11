<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Max-Age: 86400");
// Check if the request method is PUT

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit;
}


if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Read the input data from the request body
    $data = file_get_contents("php://input");

    // Parse the JSON data if it's in JSON format
    $formData = json_decode($data, true);

    // Print the form data
    echo "Form Data Received:\n";
    print_r($formData);
} else {
    // If the request method is not PUT, return an error message
    header("HTTP/1.1 405 Method Not Allowed");
    echo "Only PUT requests are allowed.";
}
?>
