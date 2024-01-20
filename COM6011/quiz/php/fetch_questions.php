<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

include 'db_connect.php'; 

try {
    $stmt = $pdo->query("SELECT id, question, option1, option2, option3, option4, correct_answer, explanation FROM quiz_questions");
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convert each question to the desired format
    $formattedQuestions = array_map(function($question) {
        return [
            "id" => $question['id'],
            "question" => $question['question'],
            "options" => [$question['option1'], $question['option2'], $question['option3'], $question['option4']],
            "answer" => $question['correct_answer'],
            "explanation" => $question['explanation']
        ];
    }, $questions);

    echo json_encode($formattedQuestions);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
    exit;
}
?>
