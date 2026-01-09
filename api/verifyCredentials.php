<?php
  include 'db.php';
  ini_set('display_errors', 1);
  error_reporting(E_ALL);
  $request = file_get_contents("php://input");
  $data = json_decode($request,true);
  $username = $data["username"];
  $password = $data["password"];

  $stmt = $conn->prepare("SELECT password FROM login_credentials WHERE Username = ?");
  $stmt->bind_param("s",$username);
  $stmt->execute();
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();

  if ($row != null && password_verify($password,$row['password'])) {
    header("Content-Type: application/json");
    $response = [
      "status" => "success",
    ];
    echo json_encode($response);
  } else {
    header("Content-Type: application/json");
    $response = [
      "status" => "fail"
    ];
    echo json_encode($response);
  }
?>