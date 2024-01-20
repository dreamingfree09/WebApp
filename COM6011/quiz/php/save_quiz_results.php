<?php
session_start();
include 'db_connect.php'; // Adjust this path to your database connection script

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($_SESSION['username'])) {
        // Fetch user_id from the username
        $username = $_SESSION['username'];
        $stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user) {
            $userId = $user['id'];
            $quizType = $data['quizType'];
            $correctAnswers = $data['correctAnswers'];
            $totalQuestions = $data['totalQuestions'];
            $timeTaken = $data['timeTaken'] ?? null;

            // Calculate scores
            $regularQuizScore = ($correctAnswers / $totalQuestions) * 100;
            $weightFactor = 80; 
            $timeFactor = 20; 
            $flashQuizScore = ($correctAnswers / $totalQuestions * $weightFactor) - ($timeTaken / $timeFactor);

            if ($quizType === 'regular_quiz') {
                // Check if a score already exists
                $checkStmt = $pdo->prepare("SELECT score FROM regular_quiz_scores WHERE user_id = ?");
                $checkStmt->execute([$userId]);
                $existingScore = $checkStmt->fetchColumn();

                if ($existingScore !== false && $regularQuizScore > $existingScore) {
                    // Update existing score if the new score is better
                    $updateStmt = $pdo->prepare("UPDATE regular_quiz_scores SET score = ? WHERE user_id = ?");
                    $updateStmt->execute([$regularQuizScore, $userId]);
                } elseif ($existingScore === false) {
                    // Insert new score if no score exists
                    $insertStmt = $pdo->prepare("INSERT INTO regular_quiz_scores (user_id, score) VALUES (?, ?)");
                    $insertStmt->execute([$userId, $regularQuizScore]);
                }
            } elseif ($quizType === 'flash_quiz') {
                // Check if a record already exists
                $checkStmt = $pdo->prepare("SELECT score FROM flash_quiz_scores WHERE user_id = ?");
                $checkStmt->execute([$userId]);
                $existingScore = $checkStmt->fetchColumn();

                if ($existingScore !== false && $flashQuizScore > $existingScore) {
                    // Update if the new score is better
                    $updateStmt = $pdo->prepare("UPDATE flash_quiz_scores SET score = ?, time_taken = ? WHERE user_id = ?");
                    $updateStmt->execute([$flashQuizScore, $timeTaken, $userId]);
                } elseif ($existingScore === false) {
                    // Insert new record if none exists
                    $insertStmt = $pdo->prepare("INSERT INTO flash_quiz_scores (user_id, score, time_taken) VALUES (?, ?, ?)");
                    $insertStmt->execute([$userId, $flashQuizScore, $timeTaken]);
                }
            }

            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'user_not_found']);
        }
    } else {
        echo json_encode(['status' => 'not_logged_in']);
    }
}
?>

