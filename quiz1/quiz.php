<?php
session_start(); // Start the session

$host = 'localhost';
$username = 'root';
$password = '';
$databaseName = 'hydrohub';

// Connect to the database
$conn = new mysqli($host, $username, $password, $databaseName);

// Check connection
if ($conn->connect_error) {
    echo "<script>alert('Connection failed: " . $conn->connect_error . "');</script>";
    exit;
}

// Ensure session variable exists
if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];

    // Use MySQLi prepared statements
    $sql = "SELECT * FROM users WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id); // Bind user_id as an integer
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $state = $user['state'];
        $username = $user['username'];
        echo "<script>window.location.href = 'quiz.html?quiz=ok&state=$state&username=$username';</script>"; // Added missing semicolon
    } else {
        echo "<script>alert('User not found.');</script>";
    }

    $stmt->close();
}

$conn->close(); // Close the connection
?>
