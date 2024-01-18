<?php
session_start();
session_destroy();
header("Location: loginadmin.php"); // Redirect to the login page
exit;
?>