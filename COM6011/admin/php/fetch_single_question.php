<?php
include 'db_connect.php';

$questionId = $_GET['questionId'];

try {
    $stmt = $pdo->prepare("SELECT * FROM quiz_questions WHERE id = ?");
    $stmt->execute([$questionId]);
    $question = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($question);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>