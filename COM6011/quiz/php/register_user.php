<?php
session_start();
include 'db_connect.php'; 

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $username = trim($_POST['username']);
    $password = $_POST['password'];

// Check if username already exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->rowCount() > 0) {
    header("Location: ../page/login.php?error=username_exists");
    exit;
}

// Check if email already exists
$stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
$stmt->execute([$email]);
if ($stmt->rowCount() > 0) {
    header("Location: ../page/login.php?error=email_exists");
    exit;
}

    // Hash password and insert new user into the database
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $insert = $pdo->prepare("INSERT INTO users (name, email, username, password) VALUES (?, ?, ?, ?)");
    $insert->execute([$name, $email, $username, $hashedPassword]);

    // Redirect to the login page after successful registration
    header("Location: ../page/login.php?error=registration_complete");
    exit;
}
