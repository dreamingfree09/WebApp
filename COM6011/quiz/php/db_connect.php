<?php
$host = 'localhost'; // Typically 'localhost' or the server address
$dbname = 'op8iv1e_ECGQuiz';   // Your database name
$user = 'op8iv1e_user'; // Your database username
$pass = '*+36BK#x=Ljs'; // Your database password

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // echo "Connected successfully"; 
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>