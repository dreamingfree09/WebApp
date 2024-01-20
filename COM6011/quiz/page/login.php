<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
ob_start(); // Start output buffering
session_start();
include '../php/db_connect.php'; // Include your database connection script
// Check if the form has been submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
   
    $username = $_POST['username'];
    $password = $_POST['password']; // Password entered by the user

    // Protect against SQL injection
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user) {
      // User exists, now check the password
      if (password_verify($password, $user['password'])) {
          // Password is correct, set session variables
          $_SESSION['loggedin'] = true;
          $_SESSION['username'] = $username;
          header("Location: HomePage.php");
          exit;
      } else {
          // Password is incorrect
          header("Location: login.php?error=invalid_password");
      }
  } else {
      // Username does not exist
      header("Location: login.php?error=invalid_username");
  }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG Quiz - Login - Register<</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>
        <header>
          <h1>ECG Quiz</h1>
          <nav>
            <div id="menuButton">&#9776; Home</div> <!-- Menu Button -->
            <ul id="navList">
                <li><a href="HomePage.php">Home</a></li>
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>  
                    <li><a href="../php/logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a class="currentPage" href="login.php">Login</a></li>
                <?php endif; ?>
                <li><a href="quiz.php">Quiz</a></li>
                <li><a href="scores.php">Top Scorers</a></li>
            </ul>
        </nav>
        </header>
        <div id="videoContainer" class="small">
            <video autoplay loop muted playsinline id="animationVideo">
                <source src="../source/Heart.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
      <main>     
<div id="loginForm">
  <h2>Login</h2>
            <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post"> 
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>

      <label for="password">Password:</label>

      <div class ="password-container">
      <input type="password" id="enterPassword" name="password" required>
      <span onclick="togglePasswordVisibility('enterPassword', this)" class="toggle-password">&#128065;</span>
      </div>
      <input type="submit" value="Login">
  </form>
  <button id="showRegisterForm">Register</button>
</div>

<!-- Registration Form -->
<div id="registerForm" style="display:none;">
  <h2>Register</h2>
        <form action="../php/register_user.php" method="post" onsubmit="return checkPasswords();">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required>

      <label for="newUsername">Username:</label>
      <input type="text" id="newUsername" name="username" required>

      
      <label for="newPassword">Password:</label>
      <div class ="password-container">
      <input type="password" id="newPassword" name="password" required>
      <span onclick="togglePasswordVisibility('newPassword', this)" class="toggle-password">&#128065;</span>
    </div>
      <label for="confirmPassword">Confirm Password:</label>
      <div class ="password-container">
      <input type="password" id="confirmPassword" name="confirmPassword" required>
      <span onclick="togglePasswordVisibility('confirmPassword', this)" class="toggle-password">&#128065;</span>
      </div>
      <input type="submit" value="Register">
  </form>
</div>
        
      </main>
        <footer>
          <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
        </footer>
        <script src="../js/script.js"></script>
</body>
</html>