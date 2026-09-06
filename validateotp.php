<?php
// Database connection
$host = 'localhost';
$db = 'hydrohub';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

// Get email and OTP from the form
$email = $_POST['email'];
$otp = $_POST['otp'];

// Validate OTP
$sql = "SELECT * FROM users WHERE email = ? AND otp = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('si', $email, $otp);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // OTP is correct, redirect to update password page
    echo "<script>window.location.href='updatepassword.html?email=$otp'</script>";//redirect to updatepassword page ,send data to that page
} else {
    // OTP is incorrect
    echo "<script>alert('Invalid OTP!'); window.location.href='forgotpassword.html?otp_sent=true&email=$email';</script>";//pop up message & redirect to forgotpassword page ,send data to forgotpassword page
}

$conn->close();
?>
