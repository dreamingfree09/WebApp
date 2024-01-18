<?php
include 'db_connect.php';

$questionId = $_GET['questionId'];

try {
    $stmt = $pdo->prepare("CALL DeleteAndUpdateIDs(?)");
    $stmt->execute([$questionId]);
    echo "Question deleted successfully, and IDs updated.";
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>