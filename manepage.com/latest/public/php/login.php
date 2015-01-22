<?php

require_once ('api.class.php');
//session_set_cookie_params(0, '/', 'aroy.us',false);
session_name("manepage");
// $session_expiration = time() + 5 * 60;
// session_set_cookie_params($session_expiration);
session_start();
$local = false;
if ($local) {
	$account = "http://localhost:8888/aptana/Test/main_frame_index";
	$login = "http://localhost:8888/aptana/Test/main_frame_index/login";
} else {
	$account = "http://manepage.com/";
	$login = "http://manepage.com/login/";
}

if (isset($_GET["method"])) {
	$method = $_GET["method"];
}

if ($method == "login") {
	$_COOKIE["manepage"] = session_id();

	echo "Post:" . print_r($_POST);
	if ($_POST['code'] == "15aroy15") {
		$_SESSION['start'] = time();
		// Taking now logged in time.
		// Ending a session in 30 minutes from the starting time.
		$_SESSION['expire'] = $_SESSION['start'] + (5 * 60);
		echo "*Created*<br>Current Time : " . $now . "<br>";
		echo "Session Time : " . $_SESSION['expire'] . "<br>";
		session_write_close();
		header("Location: " . $account);
		exit();
	} else {
		$errorMsg = "Code not match!";
		session_write_close();
		header("Location: " . $login . "?error=" . urlencode($errorMsg));
		exit();
	}
} else if ($method == "check") {
	$now = time();
	// Checking the time now when home page starts.
	$temp = array();
	if ($now > $_SESSION['expire']) {
		if (isset($_COOKIE['manepage'])) {
			unset($_COOKIE['manepage']);
			setcookie('manepage', null, -1, '/');
			//echo "Your session has expired!";
			$temp["expired"] ="Your session has expired!";
			echo json_encode($temp);
		} 
	}

} else {
	$lines = file("../test_data.txt");
	echo  "File data". print_r($lines);
	$pos = array_search("wwwasdasda1", $lines);
	echo "<br>Result: ".var_dump($pos);
}
