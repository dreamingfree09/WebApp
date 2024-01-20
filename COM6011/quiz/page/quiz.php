<?
session_start();
$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
?>
<script>
    var loggedInUsername = '<?php echo $username; ?>';
</script>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG Quiz <</title>
    <link rel="stylesheet" type="text/css" href="../css/style.css">
    <script src="../js/script.js" defer></script>
</head>
<body id="quizzPage">
    
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
                <li><a class="currentPage" href="quiz.php">Quiz</a></li>
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
        <div id="quizContainer">
          <div id="questionText">Welcome to the ECG Quiz Challenge!</div>
        <div id ="contentContainer">
          <div id="optionsContainer">
              <p>Are you ready to test your knowledge of electrocardiography? Our quiz is designed to challenge and enhance your understanding of ECGs, a critical tool in cardiac diagnosis. Whether you're a student, a professional, or simply keen on learning more about ECGs, this quiz is for you!
              <br><br>
                <b>How to Play:</b>
                  <br><br>
                <b>Select Your Quiz Type: </b>Choose between two types of quizzes - the regular quiz or the flash quiz.
                <br>
                <b>Regular Quiz: </b>Offers a question-by-question approach with immediate feedback on your answers. This mode is excellent for learning and understanding each concept deeply.<br>
                <b>Flash Quiz: </b> time-challenged mode that presents all questions in a sequence without immediate feedback. Once you've completed all questions, your time and score will be displayed. Aim for accuracy and speed!<br>
                <b>Answer Questions:</b> Each question will provide multiple-choice answers. Select the answer you believe is correct. No penalties are given for wrong answers, so feel free to make your best guess! <br>
                <b>View Your Results: </b> the end of the quiz, you'll see how many questions you answered correctly. In the flash quiz, you'll also see your total time.
                <br><br>
                <b>Ready to Start?</b>
                <br><br>
                Click <b>Start Quiz </b> begin the regular quiz with feedback after each question.<br>
                Click <b>Start Flash</b> Quiz to test your skills against the clock without immediate feedback.<br><br>
                Remember, practice makes perfect. Good luck, and enjoy the ECG Quiz Challenge!</p>
          </div> 
          <div id="timer">Time: 00:00</div>
          </div>
          <button id="startQuizBtn">Start Quiz</button>
          <button id="startFlashQuizBtn">Start Flash Quiz</button>
      </div>
      <!-- Custom Modal -->
<div id="customModal" class="modal">
  <div class="modal-content">
      <span class ="close">&times;</span>
      <p id="modalText">Text</p>
      <button id="restartQuizBtn">Restart Quiz</button>
  </div>
</div>
</main>
        <footer>
          <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
        </footer>
        
</body>
</html>