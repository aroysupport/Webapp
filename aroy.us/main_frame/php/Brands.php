<?php
/**
 * Created by PhpStorm.
 * User: calvinho
 * Date: 10/11/14
 * Time: 2:31 PM
 */
require_once ('api.class.php');
//session_name("aroy");

$global_domain = "beta.aroy.us";
//$login_url = "http://localhost:8888/aptana/Test/main_frame_index/login";
$login_url = "http://accounts.aroy.us/login/";

if(isset($_COOKIE["aroy"])){
	session_id($_COOKIE["aroy"]);
	session_start();	
	/*echo "Session ID  = ".session_id()."<br>";
	echo "Session Name  = ".session_name("aroy")."<br>";
	echo "cookie  = ".$_COOKIE["aroy"]."<br>";*/
}else{
	echo json_encode(addslashes($login_url));
	exit();
}

/*if (isset($_GET["id"])) {
 session_id($_GET["id"]);
 session_start();
 }*/

/*ini_set('display_startup_errors', 1);
 ini_set('display_errors', 1);
 error_reporting(-1);*/

$time_debug=0;
$api = new api();

if (isset($_GET["method"])) {
	$method = $_GET["method"];
}
if (isset($_GET["type"])) {
	$type = $_GET["type"];
}
/*------------------------------------------------------------------------------
 *check login
 *
 *
 */
if ($method == "check") {
	if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
		$id = $api -> getAccountID();
		$api -> AccountBrand();
		$userID = $api -> getUserName();
		$id['userID'] = $userID;
		echo json_encode($id);
		/*$api -> AccountBrand();
		 $api -> AccountProduct();
		 $api -> BrandCampaign();
		 $api -> ProductImage();*/
	} else {
		echo json_encode(addslashes($login_url));
	}

}
if ($method == "init") {
	//echo "<pre>";
	//$timer = microtime(true);
	//$api -> AccountBrand();
	//$api -> AccountProduct();
	//$api -> BrandCampaign();
	//$api -> ProductImage();
	//printf("Total: %.5f sec\n", microtime(true) - $timer);
	//echo "</pre>";
}
/*------------------------------------------------------------------------------
 *Get brand related info
 */
else if ($method == 'brand') { 
	$brandID = $api -> getAccountBrand();
	$flag = true;
	//$timer1 = microtime(true);
	foreach ($brandID as $acKey => $acValue) {
		if ($_GET['accountID'] == $acKey) {
			foreach ($acValue as $key => $value) {
				$json = $api -> get("getBrandInfo/" . $value);
				if ($type == "manager") {
					$api -> brandTemplate($json);
				} else {
					$api -> optionTemplate($json, "BrandID");
				}
			}
		}
	}
	$api -> AccountProduct();
	$api -> BrandCampaign();
	//printf("1. Total: %.5f sec<br>", microtime(true) - $timer1);
}
/*------------------------------------------------------------------------------
 *Get collection related info
 */
else if ($method == "collection") {
	//$timer = microtime(true);
	$json = $api -> get("getAllCollections");
	$status = array();
	foreach ($json as $k => $v) {
		foreach ($v as $a => $key) {
			$status[$a] = $key['Status'];
		}
		$arr = $v;
	}

	array_multisort($status, SORT_ASC, $v);
	foreach ($v as $a => $key) {
		if ($key["Status"] != "999") {
			echo "<option value='" . $key["CollectionID"] . "'>$key[Name]</option>";
		}
	}
	//printf("Total: %.5f sec\n", microtime(true) - $timer);
}
/*------------------------------------------------------------------------------
 *Get campaign related info
 */else if ($method == "campaign") {
	//$timer = microtime(true);
	$CampaignID = $api -> getBrandCampaign();
	$arrBrand = $_GET["brand"];

	foreach ($CampaignID as $brandKey => $arr) {
		if ($arrBrand == $brandKey) {
			foreach ($arr as $key => $campaign) {
				//echo "<br>arrBrand = ".($arrBrand) ."<br>";
				//echo "productID = ".($campaign)."<br>";
				$json = $api -> get("getCampaignInfo/" . $campaign);
				if (isset($_GET["type"]) && $_GET["type"] == "manager") {
					$api -> campaignTemplate($json);
				} else {
					$api -> optionTemplate($json, "CampaignID");
				}
			}

		}
	}
	$api ->CampaignImage();
	//printf("Total: %.5f sec\n", microtime(true) - $timer);
}

/*------------------------------------------------------------------------------
 * Get Product related info
 *
 */
else if ($method == "product") {
	$arrBrand = $_GET['brand'];
	$ProductID = $api -> getAccountProduct();
	
	//$timer = microtime(true);
	function array_method1($item, $key, $arrBrand) {
		//echo "Key1: $key <br>";
		if (is_array($item)) {
			array_walk($item, 'array_method2', $arrBrand);
		}
	}

	function array_method2($item, $key, $arrBrand) {
		global $api;
		//echo "	key:$key | item2:$item<br>";
		//echo "	Brand:$arrBrand<br>";
		if($key==$arrBrand){
		foreach ($item as $index2 => $product) {
			$json_data = $api -> get("getProductInfo/" . $product);
			if (isset($_GET["type"]) && $_GET["type"] == "manager") {
					$api -> ProductTemplate($json_data);
				} else {
					$api -> optionTemplate($json_data, "ProductID");
				}
		}
		}
	}
	 array_walk($ProductID, 'array_method2', $arrBrand);
	 $api -> ProductImage();
	// echo "</pre>";
	//printf("Total: %.5f sec\n", microtime(true) - $timer);
}
/*------------------------------------------------------------------------------
 * Get Image
 *
 */
else if ($method == "image") {
	$arrBrand = $_GET['brand'];
	//echo "<pre>";
	//echo "BrandID = ".$arrBrand;
	$resopnse = array();
	$ImageID = $api -> getProductImage();
	//echo print_r($ImageID);
	$Product = $api -> getCurrentProduct($arrBrand);
	
	//echo print_r($Product);
	function array_method2($item, $key, $ImageID) {
		global $api;
		global $resopnse;
		foreach ($ImageID[$item] as $index2 => $image) {
			//echo "ImageID = ".$image;
			$json_data = $api -> get("getImageInfo/" . $image);
			$json_trim = $json_data['GetImageInfoResult'];
			foreach ($json_trim as $a => $reply) {
				$reply["ProductID"] = $item;
				array_push($resopnse, $reply);
			}
		}
	}
	 array_walk($Product, 'array_method2', $ImageID);
	echo json_encode($resopnse);
	//echo "</pre>";
}
/*------------------------------------------------------------------------------
 * Get CampaignImage
 *
 */
else if ($method == "CampaignImage") {
	$arrBrand = $_GET['brand'];
	//echo "<pre>";
	//echo "BrandID = ".$arrBrand;
	$resopnse = array();
	$ImageID = $api -> getCampaignImage();
	//echo print_r($ImageID);
	$Campaign= $api -> getCurrentCampaign($arrBrand);
	
	//echo print_r($Campaign);
	function array_method2($item, $key, $ImageID) {
		global $api;
		global $resopnse;
		foreach ($ImageID[$item] as $index2 => $image) {
			//echo "ImageID = ".$image;
			/*$json_data = $api -> get("getImageInfo/" . $image);
			$json_trim = $json_data['GetImageInfoResult'];
			foreach ($json_trim as $a => $reply) {*/
			$resopnse[$item] = $ImageID[$item];
				//array_push($resopnse, $index2);
			//}
		}
	}
	 array_walk($Campaign, 'array_method2', $ImageID);
	echo json_encode($resopnse);
	//echo "</pre>";
}

/*------------------------------------------------------------------------------
 * Get Image
 *
 */
else if ($method == "imageJson") {

}
/*------------------------------------------------------------------------------
 * POST
 * Brand Update and Create
 */
else if ($method == "postBrand") {
	foreach ($_POST as $key => $data) {
		if (array_key_exists("BrandID", $data)) {
			$reply = $api -> post("updateBrand", json_encode($data));
			$api -> errorMsg($reply);
		} else {
			echo "<br><br>create Brand<br>Brand name = " . $data["Name"] . "<br>";
			$newBrandID = $api -> getLastID("getAllBrands") + 1;
			$newData = array('BrandID' => $newBrandID, 'Name' => $data['Name']);
			$api -> post("createBrand", json_encode($newData));
			$newAccountBrand = array('BrandID' => $newBrandID, 'AccountID' => $_GET["accountID"], );
			echo "<br><br>create New Account Brand <br><br>";
			$reply = $api -> post("createAccountBrand", json_encode($newAccountBrand));
			$api -> errorMsg($reply);
		}
	}
	$api -> AccountBrand();
	$api -> AccountProduct();
	$api -> BrandCampaign();
}
/*------------------------------------------------------------------------------
 * POST
 * Product Update and Create
 */
else if ($method == "postProduct") {
	foreach ($_POST as $key => $data) {
		if (array_key_exists("ProductID", $data)) {
			echo "<br>update Product<br>Product name = " . $data["Name"]."<br><hr>";

			//create update Json array
			$product = array("ProductID" => $data["ProductID"], "Name" => $data["Name"]);
			$productBrand = array("ProductID" => $data["ProductID"], "BrandID" => $data["BrandID"]);
			$productCollection = array('CollectionID' => $data["CollectionID"], "ProductID" => $data["ProductID"]);

			//Post to update Product
			$reply1 = $api -> post("updateProduct", json_encode($product));
			echo "<hr><br>updateProduct<br>";
			$api -> errorMsg($reply1);
			
			$delete1 = $api->get("deleteProductBrand/".$data["ProductID"]);
			echo "<hr><br>Deleted - ProductBrand with ProductID: ".$data["ProductID"]."<br>";
			$api -> errorMsg($delete2);
			$reply2 = $api -> post("createProductBrand", json_encode($productBrand));
			echo "<br>update - ProductBrand with ProductID: ".$data["ProductID"]." CollectionID: ".$data["BrandID"]."<br>";
			$api -> errorMsg($reply2);
			
			$delete2 = $api->get("deleteProductCollection/".$data["ProductID"]);
			echo "<hr><br>Deleted - ProductCollection with ProductID: ".$data["ProductID"]."<br>";
			$api -> errorMsg($delete2);
			$reply3 = $api -> post("createProductCollection", json_encode($productCollection));
			echo "<br>update - ProductCollection with ProductID: ".$data["ProductID"]." CollectionID: ".$data["CollectionID"]."<br>";
			$api -> errorMsg($reply3);
			
			//$reply2 = $api -> post("updateProductBrand", json_encode($productBrand));
			//$reply3 = $api -> post("updateProductCollection", json_encode($productCollection));
		} else {
			echo "<br>create Product<br>Product name = " . $data["Name"];

			//get the last ID number
			$newProductID = $api -> getLastID("getAllProducts") + 1;

			//create update Json array
			$newData = array('ProductID' => $newProductID, 'Name' => $data['Name']);
			$newProductBrand = array('BrandID' => $data["BrandID"], 'ProductID' => $newProductID);
			$newProductCollection = array('CollectionID' => $data["CollectionID"], 'ProductID' => $newProductID);

			//Post to create Product
			$reply1 = $api -> post("createProduct", json_encode($newData));
			$reply2 = $api -> post("createProductCollection", json_encode($newProductCollection));
			$reply3 = $api -> post("createProductBrand", json_encode($newProductBrand));

			$api -> errorMsg($reply1);
			$api -> errorMsg($reply2);
			$api -> errorMsg($reply3);

		}
	}
	$api -> AccountProduct();
}/*------------------------------------------------------------------------------
 * POST
 * Campaign Update and Create
 */
else if ($method == "postCampaign") {
	foreach ($_POST as $key => $data) {
		$newCampaignID = $api -> getLastID("getAllCampaigns") + 1;

		$data["CampaignID"] = $newCampaignID;
		//$startTime = strtotime($data["StartDate"]);
		//$endTime = strtotime($data["EndDate"]);
		//$data["StartDate"] =date("m/d/y g:i A", $startTime);
		//$data["EndDate"] =date("m/d/y g:i A", $endTime);
		$data["Status"] = "Active";
		$newData = $data;
		$reply = $api -> post("createCampaign", json_encode($newData));
		$api -> errorMsg($reply);
		if (isset($_GET["brand"])) {
			$newBrandCampaign = array("CampaignID" => $newCampaignID, "BrandID" => $_GET["brand"]);
			$reply1 = $api -> post("createBrandCampaign", json_encode($newBrandCampaign));
			$api -> errorMsg($reply1);
		}
	}
	$api -> BrandCampaign();
}/*------------------------------------------------------------------------------
 * POST
 * Image Update and Create
 */
else if ($method == "postImage") {
	$newImageID;
	foreach ($_POST as $key => $data) {
		$newImageID = $api -> getLastID("getAllImages") + 1;

		$productImage = array("ProductID" => $data["ProductID"], "ImageID" => $newImageID);
		unset($data["ProductID"]);
		$data["ImageID"] = $newImageID;
		$newData = $data;

		$reply = $api -> post("createImage", json_encode($newData));
		$reply2 = $api -> post("createProductImage", json_encode($productImage));
		$api -> errorMsg($reply);
		$api -> errorMsg($reply2);
	}
	$api -> ProductImage();
}
/*------------------------------------------------------------------------------
 * POST
 * CampaignImage Create
 */
else if ($method == "postCampaignImage") {
	echo "<pre>Create =";
	echo print_r($_POST["create"]);
	echo "<br><br>";
	foreach ($_POST["create"] as $key => $data) {
		$campaignImage = array("CampaignID" => $data["CampaignID"], "ImageID" => $data["ImageID"]);
		echo "Create : ". $campaignImage["CampaignID"].", ". $campaignImage["ImageID"];
		$reply = $api -> post("createCampaignImage", json_encode($campaignImage));
		$api -> errorMsg($reply);
	}
	echo "<br><br>Delete =";
	echo print_r($_POST["delete"]);
	foreach ($_POST["delete"] as $key => $data) {
		//$campaignImage2 = array("CampaignID" => $data["CampaignID"], "ImageID" => $data["ImageID"]);
		echo "Delete : ". $data["CampaignID"].", ". $data["ImageID"];
		$reply1 = $api -> get("deleteCampaignImage/".$data["CampaignID"]."/".$data["ImageID"]);
		$api -> errorMsg($reply1);
	}
		echo "</pre><br><br>";
	$api ->CampaignImage();	
}

/*------------------------------------------------------------------------------
 *Get account related info
 */
else if ($method == "update") {
	/*$arr = array('BrandID' => "52", 'ProductID' => "100");
	$reply2 = $api -> post("updateProductBrand", json_encode($arr));

	echo $reply2;
	$api -> AccountProduct();
*/
	$reply1 = $api -> get("deleteCampaignImage/"."16"."/"."106");
	$api -> errorMsg($reply1);
	/*echo "<pre>";
	echo "AccountProduct = ";
	echo print_r($api -> getAccountProduct());
	echo "<br>";
	echo "</pre>";*/

}
/*------------------------------------------------------------------------------
 *Get account related info
 */
else if ($method == "account") {
	//$api->AccountProduct();
	echo "<pre>";
	echo "AccountProduct = ";
	echo print_r($api -> getAccountProduct());
	echo "<br>";
	echo "</pre>";

}/*------------------------------------------------------------------------------
 * test create
 */
else if ($method == "create") {
	//echo "Brand = " . $_GET['Brand'] . " Product = " . $_GET['Product'];
	//if (isset($_GET['Brand']) && isset($_GET['Product'])) {
	$newProductID = $api -> getLastID("getAllProducts") + 1;
	echo "Latest ID" . $newProductID;
	$newData = array('ProductID' => $newProductID, 'Name' => "Cara Delevingne Bag Black Quilted Lamb Nappa");
	$reply1 = $api -> post("createProduct", json_encode($newData));
	/*} else {
	 echo "Empty";
	 echo "Brand = " . $_GET['Brand'] . " Product = " . $_GET['Product'];
	 }*/
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testUser") {
	//$api -> getAccountUsers(10);
	echo "<pre>";
	echo print_r($api -> getAccountID());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testAccount") {
	//$api -> getAccount();
	echo "<pre>";
	echo print_r($api -> getAccountID());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testBrand") {
	//$api -> AccountBrand();
	echo "<pre>";
	echo print_r($api -> getAccountBrand());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testProduct") {
	//$api -> AccountProduct();
	echo "<pre>";
	echo print_r($api -> getAccountProduct());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testCampaign") {
	//$api -> AccountBrand();
	$api -> BrandCampaign();
	echo "<pre>";
	echo print_r($api -> getBrandCampaign());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testImage") {
	//$api -> AccountBrand();
	//$api -> ProductImage();
	echo "<pre>";
	echo print_r($api -> getProductImage());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testCampaignImage") {
	//$api -> AccountBrand();
	$api -> CampaignImage();
	echo "<pre>";
	echo print_r($api -> getCampaignImage());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 * Test Size
 */
else if ($method == "size") {
	$BrandID = $api -> getLastID("getAllImages");
	$newBrandID = $BrandID + 1;
	echo "lats getAllProducts = " . $BrandID;
	echo "<br>new getAllProducts = " . $newBrandID;
}
/*------------------------------------------------------------------------------
 * Test destory
 */
else if ($method == "destory") {
	$testTable = $_GET["table"];
	$testName = "testName";
	//$testID = "0";
	$testID = $api -> getLastID("getAllImages")+1;
	$api -> debug = 3;

	echo "<pre>";
	echo "******Test******<br>*Table: " . $testTable . "<br>*ID: " . $testID . "<br>*Name: " . $testName . "<br>****************<br>";

	//Create
	echo "<br>-Create-<br>";
	$newData = array($testTable . 'ID' => $testID, 'Name' => $testName);
	$reply = $api -> post("create" . $testTable, json_encode($newData));
	echo "result ";
	echo $api -> errorMsg($reply);

	//Get
	echo "<br>";
	echo "<br>-Get-<br>";
	//$newData = array($testTable.'ID' => 0, 'Name' => 71);
	$reply2 = $api -> get("get" . $testTable . "Info/" . $testID);
	foreach ($reply2 as $k => $v) {
		foreach ($v as $a => $key) {
			echo $testTable . "ID : " . $key[ 'ImageID'] . "<br>";
			echo "Name : " . $key["Name"];
		}
	}

	//Upadte
	echo "<br>";
	echo "<br>-Update-<br>";
	$newData2 = array($testTable . 'ID' => 1, 'Name' => $testName . "_Updated");
	$reply3 = $api -> post("update" . $testTable, json_encode($newData2));
	echo "result ";
	echo $api -> errorMsg($reply3);

	//Delete
	echo "<br>";
	echo "<br>-Delete-<br>";
	$reply4 = $api -> get("delete" . $testTable . "/" . $testID);
	echo "result ";
	echo $api -> errorMsg($reply4);

	echo "</pre>";

}
?>

