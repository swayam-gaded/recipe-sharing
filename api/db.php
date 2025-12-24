<?php
$host = "localhost";
$user = "root";
$pass = "";          // empty in XAMPP
$db   = "recipe_sharing";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(["status" => "fail", "error" => $conn->connect_error]);
    exit;
}
?>
