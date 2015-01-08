<?php
/**
 * Created by PhpStorm.
 * User: calvinho
 * Date: 10/11/14
 * Time: 2:31 PM
 */
require_once ('api.class.php');

if (isset($_GET["id"])) {
	session_id($_GET["id"]);
	session_start();
}

/*ini_set('display_startup_errors', 1);
 ini_set('display_errors', 1);
 error_reporting(-1);*/
$global_domain = "aroy.us";
//$login_url = "localhost:8888/login";
$login_url = "http://login.aroy.us";
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
		$userID = $api -> getUserName();
		$id['userID'] = $userID;
		//echo print_r($id);
		echo json_encode($id);
		/*$api -> AccountBrand();
		 $api -> AccountProduct();
		 $api -> BrandCampaign();
		 $api -> ProductImage();*/
	} else {
		//echo json_encode(addslashes('http://localhost:8888/aptana/login/index.html'));
		echo json_encode(addslashes($login_url));
	}

}
if ($method == "init") {
	$api -> AccountBrand();
	$api -> AccountProduct();
	$api -> BrandCampaign();
	$api -> ProductImage();
}
/*------------------------------------------------------------------------------
 *Get brand related info
 */
else if ($method == 'brand') {
	$brandID = $api -> getAccountBrand();
	$flag = true;
	foreach ($brandID as $acKey => $acValue) {
		//echo "accountID = ".$acKey;
		//echo "GET['accountID'] = ".$_GET['accountID'];
		if ($_GET['accountID'] == $acKey) {
			foreach ($acValue as $key => $value) {
				//echo "value = ".$acKey;
				$json = $api -> get("getBrandInfo/" . $value);
				if ($type == "manager") {
					$api -> brandTemplate($json);
				} else {
					$api -> optionTemplate($json, "BrandID");
				}
			}
		}
	}
}
/*------------------------------------------------------------------------------
 *Get collection related info
 */
else if ($method == "collection") {
	$json = $api -> get("getAllCollections");
	$status = array();
	foreach ($json as $k => $v) {
		foreach ($v as $a => $key) {
			$status[$a] = $key['Status'];
		}
		//echo "a = <pre>".print_r($v)."</pre>";
		$arr = $v;
	}

	array_multisort($status, SORT_ASC, $v);
	/*echo "<pre>";
	 echo print_r($v);
	 echo "</prev>";*/
	foreach ($v as $a => $key) {
		if ($key["Status"] != "999") {
			echo "<option value='" . $key["CollectionID"] . "'>$key[Name]</option>";
		}
	}
	//$api -> optionTemplate($json, "CollectionID");
}
/*------------------------------------------------------------------------------
 *Get campaign related info
 * else


 if ($method == "campaign") {
 if (isset($_GET["type"]) && $_GET["type"] == "manager") {
 $json = $api -> get("getAllCampaigns");
 $api -> campaignTemplate($json, "CampaignID");
 } else {
 $json = $api -> get("getAllCampaigns");
 $api -> optionTemplate($json, "CampaignID");
 }

 }*/else if ($method == "campaign") {
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
}

/*------------------------------------------------------------------------------
 * Get Product related info
 *
 */
else if ($method == "product") {
	/*$json = $api->get("getProductInfo/1");
	 $api->ProductTemplate($json);*/
	$ProductID = $api -> getAccountProduct();
	//$ProductBrand = $api -> getAccountProduct();
	//echo print_r($ProductID);
	//if (isset($_GET["brand"])) {
	$arrBrand = $_GET["brand"];
	/*} else {
	 $arr = array_values($ProductID);
	 $arrBrand = $arr[0];
	 }*/

	foreach ($ProductID as $brandKey => $arr) {
		//echo "brandKey = ".($brandKey) ."<br>";
		if ($arrBrand == $brandKey) {
			foreach ($arr as $key => $product) {
				//echo "<br>";
				//echo "arrBrand = ".($arrBrand) ."<br>";
				//echo "productID = ".($product)."<br>";
				$json = $api -> get("getProductInfo/" . $product);
				if (isset($_GET["type"]) && $_GET["type"] == "manager") {
					$api -> ProductTemplate($json);
				} else {
					$api -> optionTemplate($json, "ProductID");
				}
			}

		}
	}
}
/*------------------------------------------------------------------------------
 * Get Image
 *
 */
else if ($method == "image") {
	$resopnse = array();
	$ImageID = $api -> getProductImage();
	$arrBrand = $_GET['brand'];
	$temp = $api -> getCurrentProduct($arrBrand);
	foreach ($ImageID as $productKey => $arr) {
		//echo "productKey = ".$productKey."<br>";
		foreach ($temp as $index => $value) {
			if ($value == $productKey) {
				//echo "	value = ".$value."<br>";
				foreach ($arr as $key => $image) {
					$json = $api -> get("getImageInfo/" . $image);
					foreach ($json as $k => $v) {
						foreach ($v as $a => $key) {
							array_push($resopnse, $key);
						}
					}

				}
			}
		}

	}
	echo json_encode($resopnse);
	//echo "</pre>";
}
/*------------------------------------------------------------------------------
 * Get Image
 *
 */
else if ($method == "imageJson") {

	//echo "</pre>";
}
/*------------------------------------------------------------------------------
 * POST
 * Brand Update and Create
 */
else if ($method == "postBrand") {
	foreach ($_POST as $key => $data) {
		//echo "key:".$key."<br>";
		if (array_key_exists("BrandID", $data)) {
			//echo "<br><br>update Brand<br>Brand name = " . $data["Name"]."<br>";
			//echo "data =";
			//echo print_r($data);
			$reply = $api -> post("updateBrand", json_encode($data));
			$api -> errorMsg($reply);
			/*if ($reply) {
			 echo "success";
			 } else {
			 echo "fail";
			 }*/
		} else {
			echo "<br><br>create Brand<br>Brand name = " . $data["Name"] . "<br>";
			$newBrandID = $api -> getLastID("getAllBrands") + 1;
			$newData = array('BrandID' => $newBrandID,
			//'BrandInfo' => '[Your MicroBlogs Description Here]',
			//'BrandPhilosophy' => '[Your BrandInfo Description Here]',
			//'Description' => '[Your Brand Description Here]',
			//'MicroBlogs' => '[Your BrandPhilosophy Description Here]',
			'Name' => $data['Name']);
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
	// post("updateBrand", $base);
	foreach ($_POST as $key => $data) {
		//echo "key:".$key."<br>";
		//echo "Is productID exist ? =". array_key_exists("ProductID", $data);
		if (array_key_exists("ProductID", $data)) {

			//debug message
			/*echo"<br>-------------------------------------Update Product Post with -><pre>";
			 echo print_r($data);
			 echo"</pre>";*/
			echo "<br>update Product<br>Product name = " . $data["Name"];

			//create update Json array
			$product = array("ProductID" => $data["ProductID"], "Name" => $data["Name"]);
			$productBrand = array("ProductID" => $data["ProductID"], "BrandID" => $data["BrandID"]);
			$productCollection = array('CollectionID' => $data["CollectionID"], "ProductID" => $data["ProductID"]);

			//Post to update Product
			$reply1 = $api -> post("updateProduct", json_encode($product));
			$reply2 = $api -> post("updateProductBrand", json_encode($productBrand));
			$reply3 = $api -> post("updateProductCollection", json_encode($productCollection));
			echo "<br>------updateProduct-----<br>";
			$api -> errorMsg($reply1);
			echo "<br>------updateProductBrand-----<br>";
			$api -> errorMsg($reply2);
			echo "<br>------updateProductCollection-----<br>";
			$api -> errorMsg($reply3);
			//$reply2 = $api -> post("updateProductBrand", json_encode($productBrandArr));
			/*if($reply2==-3){
			 $create = $api -> post("createProductBrand", json_encode($productBrand));
			 if($create){
			 echo "create success";
			 }else{
			 echo "create fail";
			 }
			 }
			 if($reply3==-3){
			 $create = $api -> post("createProductCollection", json_encode($productCollection));
			 if($create){
			 echo "create success";
			 }else{
			 echo "create fail";
			 }
			 }*/
		} else {
			/*echo"<br>-------------------------------------Create Product Post with -><pre>";
			 echo print_r($data);
			 echo"</pre>";*/
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

			echo "<br>------createProduct-----<br>";
			$api -> errorMsg($reply1);
			echo "<br>------createProductCollection-----<br>";
			$api -> errorMsg($reply2);
			echo "<br>------createProductBrand-----<br>";
			$api -> errorMsg($reply3);
			/*if ($reply) {
			 echo "success";
			 } else {
			 echo "fail";
			 }*/
		}
	}
	//$api -> AccountBrand();
	$api -> AccountProduct();
}/*------------------------------------------------------------------------------
 * POST
 * Campaign Update and Create
 */
else if ($method == "postCampaign") {
	// post("updateBrand", $base);
	$newCampaignID;

	foreach ($_POST as $key => $data) {
		$newCampaignID = $api -> getLastID("getAllCampaigns") + 1;
		echo "campaignID = " . $newCampaignID;
		$data["CampaignID"] = $newCampaignID;
		$data["Sataus"] = "Active";
		//echo "<br>".$data."<br>";
		$newData = $data;
		$reply = $api -> post("createCampaign", json_encode($newData));
		$api -> errorMsg($reply);
		if (isset($_GET["brand"])) {

			$newBrandCampaign = array("CampaignID" => $newCampaignID, "BrandID" => $_GET["brand"]);
			echo "<pre>";
			echo "-----Array BrandCampaign -----<br>";
			echo print_r($newBrandCampaign);

			$reply1 = $api -> post("createBrandCampaign", json_encode($newBrandCampaign));
			//echo "Post result<br>";
			$api -> errorMsg($reply1);
			echo "-----Array BrandCampaign -----<br>";
			echo "</pre>";
		}
	}
	$api -> BrandCampaign();
}/*------------------------------------------------------------------------------
 * POST
 * Image Update and Create
 */
else if ($method == "postImage") {
	// post("updateBrand", $base);
	$newImageID;
	foreach ($_POST as $key => $data) {
		$newImageID = $api -> getLastID("getAllImages") + 1;
		//echo "campaignID = ".$newCampaignID;
		$productImage = array("ProductID" => $data["ProductID"], "ImageID" => $newImageID);
		unset($data["ProductID"]);
		$data["ImageID"] = $newImageID;
		//echo "<br>".$data."<br>";
		$newData = $data;
		$reply = $api -> post("createImage", json_encode($newData));
		$reply2 = $api -> post("createProductImage", json_encode($productImage));
		echo "<br>---------------------------<br>";
		echo "array  = " . print_r($productImage);
		echo "create product Image  = <pre>";
		echo var_dump($reply2);
		echo "</pre>";
		echo "<br>---------------------------<br>";
	}
	$api -> ProductImage();
}
/*------------------------------------------------------------------------------
 * POST
 * CampaignImage Create
 */
else if ($method == "postCampaignImage") {
	foreach ($_POST as $key => $data) {
		$campaignImage = array("CampaignID" => $data["CampaignID"], "ImageID" => $data["ImageID"]);
		$reply = $api -> post("createCampaignImage", json_encode($campaignImage));
		$api -> errorMsg($reply);
	}
}

/*------------------------------------------------------------------------------
 *Get account related info
 */
else if ($method == "update") {
	//$api->AccountProduct();
	$arr = array('BrandID' => "52", 'ProductID' => "100");
	$reply2 = $api -> post("updateProductBrand", json_encode($arr));
	echo $reply2;
	$api -> AccountProduct();

	echo "<pre>";
	echo "AccountProduct = ";
	echo print_r($api -> getAccountProduct());
	echo "<br>";
	echo "</pre>";

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
	echo "<pre>";
	echo var_dump($reply1);

	if ($reply1) {
		echo "success";
	} else {
		echo "fail";
	}
	echo "</pre>";
	/*} else {
	 echo "Empty";
	 echo "Brand = " . $_GET['Brand'] . " Product = " . $_GET['Product'];
	 }*/
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testAccount") {
	//$api -> AccountBrand();
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
	//$api -> AccountBrand();
	echo "<pre>";
	echo print_r($api -> getAccountProduct());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testCampaign") {
	//$api -> AccountBrand();
	echo "<pre>";
	echo print_r($api -> getBrandCampaign());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 *
 */
else if ($method == "testImage") {
	//$api -> AccountBrand();
	$api -> ProductImage();
	echo "<pre>";
	echo print_r($api -> getProductImage());
	echo "</pre>";
}
/*------------------------------------------------------------------------------
 * Test Size
 */
else if ($method == "size") {
	$BrandID = $api -> getLastID("getAllProducts");
	$newBrandID = $BrandID + 1;
	echo "lats getAllProducts = " . $BrandID;
	echo "<br>new getAllProducts = " . $newBrandID;
}
/*------------------------------------------------------------------------------
 * Test destory
 */
else if ($method == "destory") {
	if (isset($_SESSION['productBrand'])) {
		echo "ProductBrand = ";
		echo print_r($_SESSION['productBrand']) . "<br>";
	} else {
		echo "NULL<br>";
	}
	if (isset($_SESSION['loggedin'])) {
		echo "loggedin = " . $_SESSION['loggedin'] . "<br>";
	} else {
		echo "NULL<br>";
	}
	if (isset($_SESSION['userID'])) {
		echo "userID = " . $_SESSION['userID'] . "<br>";
	} else {
		echo "NULL<br>";
	}
	if (isset($_SESSION['userName'])) {
		echo "userName = " . $_SESSION['userName'] . "<br>";
	} else {
		echo "NULL<br>";
	}

	if (isset($_SESSION['accountID'])) {
		echo "accountID = ";
		echo print_r($api -> getAccountID());
		echo "<br>";

	} else {
		echo "NULL<br>";
	}
	if (isset($_SESSION['accountBrand'])) {
		//$api->AccountBrand();
		echo "accountBrand = ";
		echo print_r($api -> getAccountBrand());

	} else {
		echo "NULL<br>";
	}
}
?>

