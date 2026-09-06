<?php
$host = 'localhost';
$username = 'root';
$password = '';
$databaseName = 'hydrohub';

$conn = new mysqli($host, $username, $password);
if ($conn->connect_error) {
    echo "<script>alert('Connection failed: " . $conn->connect_error . "');</script>";
    exit;
}

$sql = "CREATE DATABASE IF NOT EXISTS $databaseName";
if ($conn->query($sql) === TRUE) {
    echo "<script>alert('Database created successfully');</script>";
} else {
    echo "<script>alert('Error creating database: " . $conn->error . "');</script>";
}

$conn->close();
?>
