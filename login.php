//to check the given login details are valid and present in database or NOT
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];


    // Prepare the query to prevent SQL injection
    $sql = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    
    // Bind parameters
    $stmt->bind_param("s", $username);
    
    // Execute the statement
    $stmt->execute();
    
    // Get result
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    

    // Verify password
    if ($user && $password === $user['password']) {
        $_SESSION['user_id'] = $user['id'];
        $img =$user['profile_image'];
        echo "<script>
                window.location.href = 'index.html?logined=true&image=$img';
            </script>";
        exit();
    } else {
        echo "<script>
            alert('Invalid username or password.');
            window.location.href = 'login.html';
        </script>";//redirect to login
    }
    
    // Close statement and connection
    $stmt->close();
}

$conn->close();
?>
