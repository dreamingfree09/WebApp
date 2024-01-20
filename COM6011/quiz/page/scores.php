<?
session_start();
include '../php/db_connect.php';
// Fetch top 10 regular quiz scores
$stmt = $pdo->prepare("SELECT users.username, regular_quiz_scores.score FROM regular_quiz_scores JOIN users ON regular_quiz_scores.user_id = users.id ORDER BY score DESC LIMIT 10");
$stmt->execute();
$regularQuizScores = $stmt->fetchAll();

// Fetch top 10 flash quiz scores
$stmt = $pdo->prepare("SELECT users.username, flash_quiz_scores.score, flash_quiz_scores.time_taken FROM flash_quiz_scores JOIN users ON flash_quiz_scores.user_id = users.id ORDER BY score DESC LIMIT 10");
$stmt->execute();
$flashQuizScores = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG Quiz - Top Scores</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>
        <header>
          <h1>ECG Quiz</h1>
          <nav>
            <div id="menuButton">&#9776; Home</div> <!-- Menu Button -->
            <ul id="navList">
                <li><a href="HomePage.php">Home</a></li>
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>  
                    <li><a href="../php/logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="login.php">Login</a></li>
                <?php endif; ?>
                <li><a href="quiz.php">Quiz</a></li>
                <li><a class="currentPage"  href="scores.php">Top Scorers</a></li>
            </ul>
        </nav>
        </header>
        <div id="videoContainer" class="small">
            <video autoplay loop muted playsinline id="animationVideo">
                <source src="../source/Heart.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
        <main>
         
        <div class="scores-container">
    <!-- Regular Quiz Scores -->
    <div class="table-container">
        <h2>Top 10 Scores Quiz</h2>
        <table id="regularQuizScores">
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
            </tr>
            <?php $rank = 1; ?>
            <?php foreach ($regularQuizScores as $score): ?>
                <tr>
                    <td><?php echo $rank++; ?></td>
                    <td><?php echo htmlspecialchars($score['username']); ?></td>
                    <td><?php echo htmlspecialchars($score['score']); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <!-- Flash Quiz Scores -->
    <div class="table-container">
        <h2>Top 10 Scores Flash Quiz</h2>
        <table id="flashQuizScores">
            <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Time</th>
            </tr>
            <?php $rank = 1; ?>
            <?php foreach ($flashQuizScores as $score): ?>
                <tr>
                    <td><?php echo $rank++; ?></td>
                    <td><?php echo htmlspecialchars($score['username']); ?></td>
                    <td><?php echo htmlspecialchars($score['score']); ?></td>
                    <td><?php echo htmlspecialchars($score['time_taken']); ?></td>
                </tr>
            <?php endforeach; ?>
        </table>
    </div>
</div>
      </main>
        <footer>
          <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
        </footer>
        <script src="../js/script.js"></script>
</body>
</html>