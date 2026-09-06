<?php
// Database connection details
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'hydrohub';

// Create a connection
$conn = new mysqli($host, $user, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve and sanitize user inputs
    $otp = $_POST['email'];
    $newPassword = $_POST['newPassword'];
    $confirmPassword = $_POST['confirmPassword'];

    // Validate that passwords match
    if ($newPassword !== $confirmPassword) {
        echo "<script>alert('Passwords do not match!'); window.location.href='updatepassword.html';</script>";
        exit;
    }

    // Check if OTP exists and retrieve the current password
    $sql = "SELECT * FROM users WHERE otp = ?";
    $p = $conn->prepare($sql);
    $p->bind_param('s', $otp);
    $p->execute();
    $result = $p->get_result();

    if ($result->num_rows === 0) {
        echo "<script>alert('Invalid OTP!'); window.location.href='updatepassword.html';</script>";
        exit;
    }

    $row = $result->fetch_assoc();

    // Debug: Check current password
    echo "Current Password: " . $row['password'] . "<br>";

    // Check if the new password is the same as the current password
    if ($row['password'] === $newPassword) {
        echo "<script>alert('Password should not be the same as the previous password!'); window.location.href='updatepassword.html';</script>";
        exit;
    }

    // Update the password
    $updateSql = "UPDATE users SET password = ? WHERE otp = ?";
    $stmt = $conn->prepare($updateSql);
    $stmt->bind_param('ss', $newPassword, $otp);
   

    // Execute the update query
    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo "<script>alert('Password updated successfully!'); window.location.href='login.html';</script>";
        } else {
            echo "<script>alert('No user found with the provided $row[email].'); window.location.href='updatepassword.html';</script>";
        }
    } else {
        echo "<script>alert('Error updating password: " . $stmt->error . "');</script>";
    }

    // Close statements
    $p->close();
    $stmt->close();
}

// Close the database connection
$conn->close();
?>
