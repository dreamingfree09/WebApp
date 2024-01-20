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
    <title>ECG-Quiz Admin Page - Update Questions</title>
    <link rel="stylesheet" type="text/css" href="../css/adminstyle.css">
</head>
<body>
    <div class="main-body">
    <nav>
        <div id="menuButton">&#9776;</div> <!-- Menu Button -->
        <ul id="navList">
          <li><a href="view.php">View Questions</a></li>
          <li><a class="currentPage"href="update.php">Update Questions</a></li>
          <li><a href="insert.php">Insert Questions</a></li>
          <li><a href="delete.php">Delete Questions</a></li>
        </ul>
        <button id="LogoutButton">Logout</button>
      </nav>
    <main>     
        <div id="searchContainer">
            <label for="searchQuestionId">Enter question ID:</label>
            <input type="number" id="searchQuestionId">
            <button id="searchButton">Search</button>
        </div>
        <div id="questionContainer" class="questionContainer">
         
        </div>
         
         <form id="updateQuestionForm" >
            <input type="hidden" id="updateId" name="updateId">
            <label for="updateQuestion">Question:</label>
            <input type="text" id="updateQuestion" name="question">
            <label for="updateOption1">Option 1:</label>
            <input type="text" id="updateOption1" name="option1">
            <label for="updateOption1">Option 2:</label>
            <input type="text" id="updateOption2" name="option2">
            <label for="updateOption1">Option 3:</label>
            <input type="text" id="updateOption3" name="option3">
            <label for="updateOption1">Option 4:</label>
            <input type="text" id="updateOption4" name="option4">
            <label for="updateCorrectAnswer">Correct Answer:</label>
            <input type="text" id="updateCorrectAnswer" name="correct_answer">
            <label for="updateExplanation">Explanation:</label>
            <textarea id="updateExplanation" name="explanation"></textarea>
            <input type="submit" value="Update">
        </form>

    </main>
    </div>
        <footer>
    <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
</footer>
<script src="../js/updatejs.js"></script>
</body>
</html>  