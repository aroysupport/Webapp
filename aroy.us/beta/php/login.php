<?php




require_once ('api.class.php');
//session_set_cookie_params(0, '/', 'aroy.us',false); 
session_name("aroy");
session_start();
$api = new api();
$local = false;
if($local){
	$account = "http://localhost:8888/aptana/Test/main_frame_index";
	$login = "http://localhost:8888/aptana/Test/main_frame_index/login";
}else{
	$account = "http://beta.aroy.us/";
	$login = "http://beta.aroy.us/login/";
}

if (isset($_GET["method"])) {
    $method = $_GET["method"];
}
if (isset($_GET["type"])) {
    $type = $_GET["type"];
}

if ($method == "login") {
    //echo var_dump($api->getUserID());
	echo "Session ID  = ".session_id()."<br>";
	echo "Session Name  = ".session_name("aroy")."<br>";
	$_COOKIE["aroy"] =session_id();
	echo "cookie  = ".$_COOKIE["aroy"]."<br>";
	//exit();
    $json = $api -> get("getAllUsers");
    $response = $api -> checkLogin($json, $_POST);
	
    if ($response) {
        $_SESSION['loggedin'] = true;
        session_write_close();
        //header("Location: ".$account."?id=".urlencode(session_id()));    
		header("Location: ".$account);  
       exit();
    } else {
        $errorMsg = "UserID or Password not match!";
        session_write_close();
        header("Location: ".$login."?error=" . urlencode($errorMsg));
        exit();
    }
}