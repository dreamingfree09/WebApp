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
    <title>ECG-Quiz Admin Page - Delete Questions</title>
    <link rel="stylesheet" type="text/css" href="../css/adminstyle.css">
</head>
<body>
    <div class="main-body">
    <nav>
        <div id="menuButton">&#9776;</div> <!-- Menu Button -->
        <ul id="navList">
          <li><a  href="view.php">View Questions</a></li>
          <li><a href="update.php">Update Questions</a></li>
          <li><a href="insert.php">Insert Questions</a></li>
          <li><a class="currentPage"href="delete.php">Delete Questions</a></li>
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
        <button id="deleteButton" style="display: none;">Delete Question</button>

    </main>
    </div>
        <footer>
    <p>&copy; 2024 ECG Quiz. All rights reserved.</p>
</footer>
<script src="../js/deletejs.js"></script>
</body>
</html>  