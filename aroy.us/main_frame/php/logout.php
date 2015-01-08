<?php 
	
	//$id = $_GET['id'];
	session_id($_COOKIE["aroy"]);
	session_start(); //to ensure you are using same session
	session_destroy(); //destroy the session
	header("location:http://accounts.aroy.us/login/"); //to redirect back to "index.php" after logging out