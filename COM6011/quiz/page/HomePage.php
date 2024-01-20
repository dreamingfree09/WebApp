<?
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG Quiz - Home Page</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
</head>
<body>
        <header>
          <h1>ECG Quiz</h1>
          <nav>
            <div id="menuButton">&#9776; Home</div> <!-- Menu Button -->
            <ul id="navList">
                <li><a class="currentPage" href="HomePage.php">Home</a></li>
                <?php if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true): ?>  
                    <li><a href="../php/logout.php">Logout</a></li>
                <?php else: ?>
                    <li><a href="login.php">Login</a></li>
                <?php endif; ?>
                <li><a href="quiz.php">Quiz</a></li>
                <li><a href="scores.php">Top Scorers</a></li>
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
        <section class="hero">
          <div class="hero-content">
            <h1>Welcome to the ECG Quiz Challenge!</h1>
            <p>Test your knowledge and improve your skills.</p>
          </div>
        </section>
        <section class="features">
          <h2>Why Take Our ECG Quiz?</h2>
          <ul>
            <li>Interactive learning experience.</li>
            <li>Instant feedback on your answers.</li>
            <li>Track your progress over time.</li>
          </ul>
        </section>
        <section class="image-feature">
          <img src="../source/ECG.jpg" alt="ECG">
        </section>
        <section class="how-it-works">
          <h2>How It Works</h2>
          <div class="steps-container">
            <div class="step">
              <span class="step-number">1</span>
              <h3>Register Account</h3>
              <p>Create your personal account to start the quiz, track your scores, and monitor your progress.</p>
            </div>
            <div class="step">
              <span class="step-number">2</span>
              <h3>Start the Quiz</h3>
              <p>Choose from a variety of ECG-related topics and begin answering questions at your own pace.</p>
            </div>
            <div class="step">
              <span class="step-number">3</span>
              <h3>Instant Feedback</h3>
              <p>Receive immediate feedback after each question to understand the correct answers and explanations.</p>
            </div>
            <div class="step">
              <span class="step-number">4</span>
              <h3>Track Your Progress</h3>
              <p>Review your quiz results and track your improvement over time with detailed analytics.</p>
            </div>
            <div class="step">
              <span class="step-number">5</span>
              <h3>Compete and Share</h3>
              <p>Compare your scores with friends or colleagues, and share your achievements on social media.</p>
            </div>
            <div class="step">
              <span class="step-number">6</span>
              <h3>Advanced Challenges</h3>
              <p>As you grow, take on advanced quizzes and real-world scenarios to test your expertise.</p>
            </div>
          </div>
        </section>
        
        </main>
        
        <footer>
          <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
        </footer>
        <script src="../js/script.js"></script>
</body>
</html>