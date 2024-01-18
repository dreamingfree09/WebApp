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
    $stmt = $pdo->prepare("SELECT * FROM admin_login WHERE username = ?");
    $stmt->execute([$username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password'])) {
      
        // Password is correct, set session variables
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;
        header("Location: view.php"); 
        exit;
    } else {
        // Authentication failed
        $error = "Invalid credentials";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG-Quiz Admin Page - Login</title>
    <link rel="stylesheet" type="text/css" href="../css/adminstyle.css">
</head>
<body class="bodyLogin">
    <div class="mainLogin">     
        <div id="loginForm">
            <h2>Admin ECG Quiz Login</h2>
            <?php if (isset($error)): ?>
                <p class="error"><?php echo $error; ?></p>
            <?php endif; ?>
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
        </div>
    </div>
    <footer>
        <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
    </footer>
    <script src="../js/adminjs.js"></script>
</body>
</html>