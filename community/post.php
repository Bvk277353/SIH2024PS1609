<?php
session_start();

// Database connection using mysqli
$host = 'localhost';
$dbname = 'hydrohub';
$user = 'root';
$password = '';
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch posts excluding the current user's posts
$userId = $_SESSION['user_id'];
$query = $conn->prepare("SELECT user_id, content, image_url, created_at FROM community_posts");
$query->execute();
$result = $query->get_result();

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = $row;
}

$query->close();
$conn->close();

// Send data to an HTML file outside the folder
header('Content-Type: application/json');
echo json_encode($posts);
?>

