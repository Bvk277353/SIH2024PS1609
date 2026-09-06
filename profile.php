
<?php
session_start();

// Redirect to login page if user is not logged in
if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit();
}

// Database connection
$host = 'localhost';
$dbname = 'hydrohub';
$user = 'root';
$password = '';
$conn = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);

// Get user details
$user_id = $_SESSION['user_id'];
$sql = "SELECT * FROM users WHERE id = :id";
$stmt = $conn->prepare($sql);
$stmt->bindParam(':id', $user_id);
$stmt->execute();
$user = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html>
<head>
    <title>User Profile</title>
</head>
<body>
    <h2>Welcome</h2>

    <?php if ($user['profile_image']): ?>
        <img src="<?php echo htmlspecialchars($user['profile_image']); ?>" alt="Profile Image" width="150">
    <?php else: ?>
        <p>No profile image available.</p>
    <?php endif; ?>

    <p>Username: <?php echo htmlspecialchars($user['username']); ?></p>
    <p>Gender: <?php echo htmlspecialchars($user['gender']); ?></p>
    <p>Language: <?php echo htmlspecialchars($user['language']); ?></p>

    <a href="logout.php">Logout</a>
    <a href="quiz/quiz.html">dashboard</a>
</body>
</html>
