<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "db.php";

$sql = "SELECT recipe_key, name, description, full_recipe, image_path, rating_avg, rating_count FROM recipes";
$result = $conn->query($sql);

$recipes = [];

if ($result === false) {
    die("SQL Error: " . $conn->error);
}

while ($row = $result->fetch_assoc()) {
    $recipes[] = $row;
}

header("Content-Type: application/json");
echo json_encode($recipes);
