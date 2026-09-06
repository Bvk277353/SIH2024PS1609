//check email in database and if exists it sends OTP to email
<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

// Database connection
$host = 'localhost';
$db = 'hydrohub';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die('Database connection failed: ' . $conn->connect_error);
}

// Get the email from the form
$email = $_POST['email'];

// Check if the email exists in the database
$sql = "SELECT * FROM users WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Email exists, generate and send OTP
    $otp = rand(100000, 999999);
    
    // Save OTP to the database
    $updateOtpSql = "UPDATE users SET otp = ? WHERE email = ?";
    $updateStmt = $conn->prepare($updateOtpSql);
    $updateStmt->bind_param('is', $otp, $email);
    $updateStmt->execute();

    // Send OTP via email
    $mail = new PHPMailer();
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'otp139302@gmail.com'; // Your Gmail address
    $mail->Password = 'bwxc rubi cepn pevt';   // Your App Password from Gmail
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;



    $mail->setFrom('revanthchandika@gmail.com', 'HydroHub');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = 'Your OTP';
    $mail->Body    = "Your OTP is $otp";

    if ($mail->send()) {
        header("Location: forgotpassword.html?otp_sent=true&email=$email");
        echo"<script>alert('OTP sent successfully');</script>";//pop up message

    } else {
        echo 'Error sending email: ' . $mail->ErrorInfo;
    }
} else {
    // Email not found
    echo "<script>alert('Email not found!'); window.location.href='forgotpassword.html';</script>";//pop up message & redirect to same page
}

$conn->close();
?>
