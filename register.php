//connect to database & create table if not exist & make entry ,upload image to uploads folder
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
if (!$conn->query($sql) === TRUE){
    echo "<script>alert('Error creating database: " . $conn->error . "');</script>";
}

$conn->close();

// Database connection parameters
$host = 'localhost';
$dbname = 'hydrohub';
$user = 'root';
$password = '';
$conn = new mysqli($host, $user, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("<script>alert('Connection failed: " . $conn->connect_error . "');</script>");
}

// Create the `users` table if it doesn't exist
$tableCreateQuery = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(30) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    state VARCHAR(50) NOT NULL,
    profile_image VARCHAR(255) NOT NULL,
    otp VARCHAR(10)
)";
if ($conn->query($tableCreateQuery) === FALSE) {
    
    die("<script>alert('Error creating table: " . $conn->error . "');</script>");//pop up message
    exit();
}

// Handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $mobilenumber = $_POST['mobilenumber'];
    $username = $_POST['username'];
    $password = $_POST['password'];
    $gender = $_POST['gender'];
    $language = $_POST['language'];

    // Handle profile image upload
    $profile_image = null;
    if (isset($_FILES['profile_image'])) {
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($_FILES["profile_image"]["name"]);
        
        if (move_uploaded_file($_FILES["profile_image"]["tmp_name"], $target_file)) {
            $profile_image = $target_file;
        } else {
            echo "<script>alert('Error uploading file.');</script>";
            $profile_image = null; // Optional: You could exit here if image is required
        }
    }
    //
    $stmt=$conn->prepare("SELECT * FROM users WHERE username =?");
    $stmt->bind_param("s", $username);

    if ($stmt->execute() && $stmt->get_result()->num_rows > 0) {
        echo "<script>
            alert('Details already exist!');
            window.location.href = 'login.html';
        </script>";
    } else {
        $hashedPassword =$password;
        $insertStmt = $conn->prepare("INSERT INTO users (email, username, password, gender, state, profile_image) VALUES (?, ?, ?, ?, ?, ?)");
        $insertStmt->bind_param("ssssss", $mobilenumber, $username, $hashedPassword, $gender, $language, $profile_image);
        if ($insertStmt->execute()) {
            echo "<script>
                alert('Registration successful!');
                window.location.href = 'login.html';
            </script>";
        } else {
            echo "<script>alert('Error during registration.');</script>";
        }
    }
    

    // Close statement
    $stmt->close();
}

// Close the connection
$conn->close();
?>
