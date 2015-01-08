<?php
if(isset($_COOKIE["aroy"])){
	//session_id($_COOKIE["aroy"]);
	//session_start();	
	/*echo "Session ID  = ".session_id()."<br>";
	echo "Session Name  = ".session_name("aroy")."<br>";
	echo "cookie  = ".$_COOKIE["aroy"]."<br>";*/
	$account = "http://beta.aroy.us/";
	header("Location: ".$account);
	exit(); 
}else{
	$login = "http://beta.aroy.us/login/";
	header("Location: ".$login); 
	exit();
}

?>