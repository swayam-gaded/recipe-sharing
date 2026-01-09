<?php
  include "/recipe-sharing/api/db.php";
  $response = file_get_contents("php://input");
  $data = json_decode($response);





