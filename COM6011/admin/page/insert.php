<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: loginadmin.php");
    exit;
}
?>
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ECG-Quiz Admin Page - Insert Questions</title>
    <link rel="stylesheet" type="text/css" href="../css/adminstyle.css">
</head>
<body>
    <div class="main-body"> 
           <nav>
        <div id="menuButton">&#9776;</div> <!-- Menu Button -->
        <ul id="navList">
          <li><a href="view.php">View Questions</a></li>
          <li><a href="update.php">Update Questions</a></li>
          <li><a class="currentPage" href="insert.php">Insert Questions</a></li>
          <li><a href="delete.php">Delete Questions</a></li>
        </ul>
        <button id="LogoutButton">Logout</button>
      </nav>
    <main>     
        <form id="insertQuestionForm">
                <label for="newQuestion">Question:</label>
                <input type="text" id="newQuestion" name="question">
                <label for="newOption1">Option 1:</label>
                <input type="text" id="newOption1" name="option1">
                <label for="newOption1">Option 2:</label>
                <input type="text" id="newOption2" name="option2">
                <label for="newOption1">Option 3:</label>
                <input type="text" id="newOption3" name="option3">
                <label for="newOption1">Option 4:</label>
                <input type="text" id="newOption4" name="option4">
                <label for="newCorrectAnswer">Correct Answer:</label>
                <input type="text" id="newCorrectAnswer" name="correct_answer">
                <label for="newExplanation">Explanation:</label>
                <textarea id="newExplanation" name="explanation"></textarea>
                <input type="submit" value="Insert">
            </form>


    </main>
    </div>
        <footer>
    <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
</footer>
<script src="../js/insertjs.js"></script>
</body>
</html>  