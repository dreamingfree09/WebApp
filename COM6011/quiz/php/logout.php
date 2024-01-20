<?php
session_start();
session_destroy();
header("Location: ../page/HomePage.php"); 
exit;
?>
