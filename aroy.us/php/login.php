<?php




require_once ('api.class.php');
session_start();
$api = new api();
$local = false;
if($local){
	$account = "http://localhost:8888/aptana/AWS/main_frame/";
	$login = "http://localhost:8888/aptana/AWS/login/";
}else{
	$account = "http://accounts.aroy.us";
	$login = "http://login.aroy.us";
}

if (isset($_GET["method"])) {
    $method = $_GET["method"];
}
if (isset($_GET["type"])) {
    $type = $_GET["type"];
}

if ($method == "login") {
    //echo var_dump($api->getUserID());

    $json = $api -> get("getAllUsers");
    $response = $api -> checkLogin($json, $_POST);
	
    if ($response) {
        $_SESSION['loggedin'] = true;
        //header("Location: http://localhost:8888/aptana/main_frame/index.html");
        session_write_close();
        header("Location: ".$account."?id=".urlencode(session_id()));
        //header("Location: http://accounts.aroy.us?user=" . urlencode($api->getUserName)."&ID=". urlencode($api->getUserID)); 
        //header("Location: http://aroy.us/main_frame/index.html");          
       exit();
    } else {
        $errorMsg = "UserID or Password not match!";
        session_write_close();
        header("Location: ".$login."?error=" . urlencode($errorMsg));
        exit();
    }
}