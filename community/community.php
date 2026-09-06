<?php
session_start();

// Database connection
$host = 'localhost';
$dbname = 'hydrohub';
$user = 'root';
$password = '';
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create table if not exists
$tableCreateQuery = 'CREATE TABLE IF NOT EXISTS community_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    content TEXT,
    image_url VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
)';
if ($conn->query($tableCreateQuery) === FALSE) {
    die("<script>alert('Error creating table: " . $conn->error . "');</script>");
}

// Ensure the user is logged in
if (!isset($_SESSION['user_id'])) {
    echo "<script>alert('User not logged in!');</script>";
    echo "<script>window.location.href = '../login.html';</script>";
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $content = $_POST['post-input'];
    
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $profile_image = $user['profile_image'] ?? null;
    
    $stmt->close();

    // Insert new post
    $insertQuery = 'INSERT INTO community_posts (user_id, content, image_url) VALUES (?, ?, ?)';
    $insertStmt = $conn->prepare($insertQuery);
    $insertStmt->bind_param("iss", $user_id, $content, $profile_image);
    
    if ($insertStmt->execute()) {
        echo "<script>alert('Post added successfully!');</script>";
        echo "<script>window.location.href = '../community.html?image=$profile_image';</script>";
    } else {
        echo "<script>alert('Error adding post: " . $insertStmt->error . "');</script>";
    }
    $insertStmt->close();
}

$conn->close();
?>
