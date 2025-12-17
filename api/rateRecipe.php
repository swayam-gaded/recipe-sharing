<?php
require "db.php";

$data = json_decode(file_get_contents("php://input"), true);

$recipeKey = $data['recipe_key'];
$userRating = (int)$data['rating'];

if ($userRating < 1 || $userRating > 5) {
    http_response_code(400);
    exit;
}

// Get current avg & count
$stmt = $conn->prepare(
    "SELECT rating_avg, rating_count FROM recipes WHERE recipe_key = ?"
);
$stmt->bind_param("s", $recipeKey);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

$currentAvg = (float)$row['rating_avg'];
$currentCount = (int)$row['rating_count'];

// Calculate new average
$newCount = $currentCount + 1;
$newAvg = (($currentAvg * $currentCount) + $userRating) / $newCount;

// Update DB
$update = $conn->prepare(
    "UPDATE recipes SET rating_avg = ?, rating_count = ? WHERE recipe_key = ?"
);
$update->bind_param("dis", $newAvg, $newCount, $recipeKey);
$update->execute();

echo json_encode(["status" => "success"]);

