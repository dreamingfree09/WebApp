<?php
include 'db_connect.php';

// Collect POST data
$questionId = $_POST['updateId'];
$questionText = $_POST['question'];
$option1Text = $_POST['option1'];
$option2Text = $_POST['option2'];
$option3Text = $_POST['option3'];
$option4Text = $_POST['option4'];
$answerText = $_POST['correct_answer'];
$explanationText = $_POST['explanation'];


try {
    $stmt = $pdo->prepare("UPDATE quiz_questions SET question = ?, option1 = ?, option2 = ?, option3 = ?, option4 = ?,correct_answer =?, explanation=? WHERE id = ?");
    $stmt->execute([$questionText, $option1Text,$option2Text, $option3Text,$option4Text,$answerText,$explanationText, $questionId]);
    echo "Question updated successfully";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>