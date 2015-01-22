<?php



require_once ('api.class.php');

session_start();

if (isset($_GET["method"])) {
	$method = $_GET["method"];
}

$global_domain = "aroy.us";
$login_url = "http://login.aroy.us";


$api = new api();


if ($method == "init"){
	$api->getAllBrands();
	echo json_encode( $api -> getBrandArr());
	// echo "<br>Object<br>";
	// echo "<pre>";
	// echo print_r($api->getBrand());
	// echo "</pre>";
}else if($method == "test_print" ){
	$api->getAllBrands();
	
}else if($method=="Brand_page"){
	if(isset($_GET['brand'])){
		$api->getBrandInfo($_GET['brand']);
			// echo "<br>Object<br>";
	// echo "<pre>";
	// echo print_r($api->getBrand());
	// echo "</pre>";
	}else{
		echo "Brand id not correct";
	}

}else if($method =="test"){
		$json = $api-> get("getimageproductcollectionbrand/Brand/66/Active");
		echo "<pre>";
		echo "size : ".sizeof($json["GetImageProductCollectionBrandResult"])."<br>";
		echo print_r( $json);
		echo "</pre>";
}else if ($method == "search"){
	echo json_encode( $api -> getBrandArr());
}else{
	$api->getAllBrands();
	echo "<pre>";
	echo json_encode( $api -> getBrand());
	echo "</pre>";
}
