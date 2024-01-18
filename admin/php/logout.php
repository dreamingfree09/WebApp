<?php
session_start();
session_destroy();
header("Location: ../page/loginadmin.php"); 
exit;
?>
