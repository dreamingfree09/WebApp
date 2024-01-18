<?php
include 'db_connect.php';

$questionText = $_POST['question'];
$option1Text = $_POST['option1'];
$option2Text = $_POST['option2'];
$option3Text = $_POST['option3'];
$option4Text = $_POST['option4'];
$answerText = $_POST['correct_answer'];
$explanationText = $_POST['explanation'];


try {
    $stmt = $pdo->prepare("INSERT INTO quiz_questions (question, option1, option2, option3, option4, correct_answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$questionText, $option1Text,$option2Text, $option3Text,$option4Text,$answerText,$explanationText]);
    echo "Question inserted successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

?>