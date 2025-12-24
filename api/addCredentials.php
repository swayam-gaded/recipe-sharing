<?php
  ini_set('display_errors', 1);
  error_reporting(E_ALL);
  header("Content-Type: application/json");
  include 'db.php';
  $request = file_get_contents("php://input");
  $data = json_decode($request,true);
  $email_id = $data["email_id"];
  $username = $data["username"];
  $password = $data["password"];
  $hash = password_hash($password,PASSWORD_DEFAULT);

  $stmt = $conn->prepare("INSERT INTO login_credentials (Email_ID, Username, Password) VALUES(?,?,?)");
  $stmt->bind_param("sss",$email_id,$username,$hash);

  if($stmt->execute()) {
    header("Content-Type: application/json");
    $response = [
      "status" => "success"
    ];
    echo json_encode($response);
  } else {
    header("Content-Type: application/json");
    $response = [
      "status" => "fail",
      "error" => $stmt->error
    ];
    echo json_encode($response);
  }
?>