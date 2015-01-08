<?php



require_once ('api.class.php');

session_start();

if (isset($_GET["method"])) {
	$method = $_GET["method"];
}

$global_domain = "http://localhost/desktop_front_end/DFE_Backup_16-12-2014/";
//$login_url = "http://login.aroy.us";


$api = new api();


if ($method == "init"){
	$api->getAllCollections();
	
	echo json_encode( $api -> getCollection());
	
}else if($method=="Collection_page"){
	if(isset($_GET['collection'])){
		$api->getCollectionInfo($_GET['collection']);
	}else{
		echo "Brand id not correct";
	}

}else if ($method == "search"){
	$api->getAllBrands();
	echo json_encode( $api -> getBrandArr());
}else{
echo "<br>Object<br>";
		echo "<pre>";
		echo print_r($api->getCollection());
		echo "</pre>";
}

