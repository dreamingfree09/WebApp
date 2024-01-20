
<?php
include 'db_connect.php'; 

try {
    $stmt = $pdo->query("SELECT * FROM quiz_questions ORDER BY id ASC;");
    $questions = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($questions);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
