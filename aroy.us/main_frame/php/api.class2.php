<?php

/**
 * Created by PhpStorm.
 * User: calvinho
 * Date: 10/11/14
 * Time: 2:22 PM
 */
//session_start();
class api {

	const base = "http://54.68.229.64/Service1.svc/";
	//User ID
	private $userID;
	//User ID
	private $userName;
	//Account ID
	private $accountID = array();
	//account product
	private $accountProduct = array();
	//account Brand
	private $accountBrand = array();
	//Brand Campaign
	private $brandCampaign = array();
	//Product Image
	private $productImage = array();
	//debug
	public $debug = 0;

	/*
	 * Function to get json repsonse with GET service calls
	 * @param $method: Service calls (e.g getAllBrands)
	 * @param $base: The base URL for the service call
	 */
	public function get($method) {
		//echo "method = ". $method."<br>";
		$url = self::base . $method;
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $url);
		curl_setopt($ch, CURLOPT_HEADER, 0);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		$raw_data = curl_exec($ch);
		curl_close($ch);
		$data = json_decode($raw_data, true);
		return $data;
	}

	/*
	 * Function to post json array with Create service calls
	 * @param $method: Service calls (e.createBrand)
	 * @param $base: The base URL for the service call
	 * @param $data: The data that need to be create.
	 */
	public function post($method, $data) {
		$url = self::base . $method;
		$curl = curl_init($url);
		curl_setopt_array($curl, array(CURLOPT_POST => TRUE, CURLOPT_RETURNTRANSFER => TRUE, CURLOPT_HTTPHEADER => array('Content-Type: application/x-www-form-urlencoded'), CURLOPT_POSTFIELDS => $data));
		$json_response = curl_exec($curl);
		$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
		curl_close($curl);
		$response = json_decode($json_response);
		return $response;
	}

	public function checkLogin($json, $value) {
		$name = $value['Name'];
		$pwd = $value['Password'];
		$join_table_trim =$json["GetAllUsersResult"];
		//foreach ($json as $key => $value) {
			foreach ($join_table_trim as $k => $v) {
				if ($v['Name'] == $name) {
					if ($v["Password"] == $pwd) {
						$this -> getAccount($v["UserID"]);
						$this -> setUserID($v['UserID']);
						$this -> setUserName($v['Name']);
						$_SESSION["userID"] = $v['UserID'];
						$_SESSION['loggedin'] = true;
						return true;
					} else {
						return false;
					}
				}
			}
		//}
		return false;
	}

	/*
	 * Get all the accounts that user joint with account.
	 */
	
	/*
	 * Get all the account name
	 */
	public function getAccount($userID) {
		//$related_data = $this -> getAccountID();
		$join_table2 = $this -> get("getAllAccounts");
		$join_table_trim2 =$join_table2["GetAllAccountsResult"];
		
		$join_table = $this -> get("getAllAccountUsers");
		$join_table_trim =$join_table["GetAllAccountUsersResult"];

		//echo "<pre>";
		$timer = microtime(true);
		//echo "AccountName ";
			$arrTemp = array();
			//echo "key: $key 		| item: $item<br>";	
			foreach ($join_table_trim as $key => $value) {
				//echo "GetAllAccountUsers: (".$value['AccountID'].", ".$value['Name'].")<br>";		
				foreach ($join_table_trim2 as $a => $b) {
					//echo "GetAllAccounts: (".$b['AccountID'].", ".$b['Name'].")<br>";		
					if ($b['AccountID'] == $value["AccountID"]) {
						//echo "Matched";
						$this -> setAccountID($b["AccountID"], $b['Name']);
					}
				}
			}
	//	printf("Result: %.5f sec<br>", microtime(true) - $timer);
		//echo "</pre>";
	}
	
	
	
	/*
	 * Get all the brand ID that is joint with all the Account userID joint with.
	 */

	public function AccountBrand() {
		$related_data = $this -> getAccountID();
		$join_table = $this -> get("getAllAccountBrands");
		$join_table_trim =$join_table["GetAllAccountBrandsResult"];

		//echo "<pre>";
		$timer = microtime(true);
		echo "Brand ";
		function AccountBrand_array_method2($item, $key, $json) {
			//echo "key: $key | item: $item<br>";	
			$arrTemp = array();
			$api = new api();			
			//echo "		Product: $item ";
			//echo "<br>";
			foreach ($json as $a => $b) {
				//echo "key: $key | item: $item<br>";	
				//echo "AccountID: " . $b['AccountID'] ."<br>";
					
				if ($b['AccountID'] == $key) {
					//echo "|Pushed		AccountID: " . $b['AccountID'] . "	|AccountID: " . $key . "	<br>|BrandID: " . $b['BrandID'] . "<br>";
					array_push($arrTemp, $b['BrandID']);
				}
			}
			
			if (!empty($arrTemp)) {
				$api -> setAccountBrand($key, $arrTemp);
			}
		}
		array_walk($related_data,'AccountBrand_array_method2',$join_table_trim);

		printf("Result: %.5f sec<br>", microtime(true) - $timer);
	}
	/*
	 * Get all the Product ID that is joint with all the BrandID joint with.
	 */
	public function AccountProduct() {
		$related_data = $this -> getAccountBrand();
		$join_table = $this -> get("getAllProductBrands");
		$join_table_trim =$join_table["GetAllProductBrandsResult"];

		//echo "<pre>";
		$timer = microtime(true);
		echo "ProductBrand ";
		function AccountProduct_array_method1($item, $key,$json) {
			//echo "Brand -> $key<br>";
			if(is_array($item)){
				array_walk($item, 'AccountProduct_array_method2',$json);	
			}
		}
		
		function AccountProduct_array_method2($item, $key, $json) {
			$arrTemp = array();
			$api = new api();			

			//echo "key: $key | item: $item<br>";	
			foreach ($json as $a => $b) {
				if ($b['BrandID'] == $item) {
					array_push($arrTemp, $b['ProductID']);
				}
			}
			
			if (!empty($arrTemp)) {
				$api -> setAccountProduct($item, $arrTemp);
			}
		}
		array_walk($related_data,'AccountProduct_array_method1',$join_table_trim);

		printf("Result: %.5f sec<br>", microtime(true) - $timer);
	}
	
	
	
	/*
	 * Get all the Campaign ID that is joint with all the Campaign joint with.
	 */
	public function BrandCampaign() {
		$related_data = $this -> getAccountBrand();
		$join_table = $this -> get("getAllBrandCampaigns");
		$join_table_trim =$join_table["GetAllBrandCampaignsResult"];

		//echo "<pre>";
		$timer = microtime(true);
		echo "BrandCampaign ";
		function BrandCampaign_array_method1($item, $key,$json) {
			//echo "Brand -> $key<br>";
			if(is_array($item)){
				array_walk($item, 'BrandCampaign_array_method2',$json);	
			}
		}
		
		function BrandCampaign_array_method2($item, $key, $json) {
			$arrTemp = array();
			$api = new api();			
			//echo "		Product: $item ";
			//echo "<br>";
			foreach ($json as $a => $b) {
				if ($b['BrandID'] == $item) {
					//echo "			|Pushed		This.ProductID: " . $b['ProductID'] . "	|ProductID: " . $item . "	|image: " . $b['ImageID'] . "<br>";
					array_push($arrTemp, $b['CampaignID']);
				}
			}
			
			if (!empty($arrTemp)) {
				$api -> setBrandCampaign($item, $arrTemp);
			}
		}
		array_walk($related_data,'BrandCampaign_array_method1',$join_table_trim);

		printf("Result: %.5f sec<br>", microtime(true) - $timer);
	}

	
	/*
	 * Get all the Image ID that is joint with all the Product joint with.
	 */
	public function ProductImage() {
		
		$accountProduct = $this -> getAccountProduct();
		$temp = $this -> get("getAllProductImages");
		$json =$temp["GetAllProductImagesResult"];
		//echo "<pre>";
		$timer = microtime(true);
		echo "ProductImage ";
		
		function ProductImage_array_method2($item, $key, $json) {
			$arrTemp = array();
			$api = new api();			
			//echo "		Product: $item ";
			//echo "<br>";
			foreach ($json as $a => $b) {
				if ($b['ProductID'] == $item) {
					//echo "			|Pushed		This.ProductID: " . $b['ProductID'] . "	|ProductID: " . $item . "	|image: " . $b['ImageID'] . "<br>";
					array_push($arrTemp, $b['ImageID']);
				}
			}
			
			if (!empty($arrTemp)) {
				$api -> setProductImage($item, $arrTemp);
			}
		}

		function ProductImage_array_method1($item, $key,$json) {
			//echo "Brand -> $key<br>";
			if(is_array($item)){
				array_walk($item, 'ProductImage_array_method2',$json);	
			}
		}

		array_walk($accountProduct,'ProductImage_array_method1',$json);
		//echo "<br>-------------------------------------<br>";
		printf("Result: %.5f sec<br>", microtime(true) - $timer);
	}

	/*
	 * Helper function to get the last ID of the base table (e.g Account, brand, collection, user,.etc)
	 * @param $table: base table
	 */
	public function getLastID($table) {
		$str = substr(str_replace("getAll", "", $table), 0, -1) . "ID";
		//echo "str = " . $str;
		$ID = 0;
		$json = $this -> get($table);
		foreach ($json as $key => $value) {
			foreach ($value as $k => $v) {
				if ($ID < $v[$str]) {
					$ID = $v[$str];
				}
			}
		}
		return $ID;
	}

	/*
	 * Template for image
	 *
	 */
	public function imageTemplate($data) {
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				echo '<li><a href="#"><div class="lazy element-item"><img src="' . $key["ImageLocation"] . '" width="160" height="160" alt="image description"><div class="selected-box"><a class="btn-view" href="' . $key["ImageLocation"] . '" data-rel="lightbox">Quick View</a> </div></div></a></li>';

			}
		}
	}

	/*
	 * Template for Option list, Campaign table, Product table, Brand table
	 *
	 */
	public function optionTemplate($data, $value) {
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				echo "<option value='" . $key[$value] . "'>$key[Name]</option>";
			}
		}
	}

	public function campaignTemplate($data) {
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				$str = '<tr>' . '<td><input type="checkbox" id="' . $key['CampaignID'] . '">' . '</td><td><label for="' . $key['CampaignID'] . '">' . $key['Name'] . '</label><a class="opener" href="#">opener</a>' . '<ul class="slide"><li>Start Date: ' . $key['StartDate'] . '</li><li>End Date:' . $key['EndDate'] . '</li><li>Location: ' . $key['Market'] . '</li><li>Clientele:' . '</li><li>^^Campaign Identifier' . '</li><li>Campaign Message' . '<ul><li>Title - ' . $key['MessageTitle'] . '</li><li>Name - ' . $key['Name'] . '</li><li>Message - ' . $key['Message'] . '</li></ul></li><li>QRCode Location: ' . $key['QRCodeLocation'] . '</li><li>^^Campaign Content' . '</li></ul></td></tr>';
				echo $str;

			}
		}
	}

	public function brandTemplate($data) {
		//echo "<select>";
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				$str = "<tr value='" . $key['BrandID'] . "'><td>" . $key['Name'] . "</td>" . "<td><a class='brandEdit edit Newlightbox' href='#popup2'>Edit</a></td>" . "<input type='hidden' name='Name' value='" . $key['Name'] . "'class='brandPost'/>" . "<input type='hidden' name='BrandID' value='" . $key['BrandID'] . "' class='brandID'/>" . "<input type='hidden' name='Description' value='" . $key['Description'] . "' class='Description'/>" . "<input type='hidden' name='BrandPhilosophy' value='" . $key['BrandPhilosophy'] . "' class='BrandPhilosophy'/>" . "<input type='hidden' name='MicroBlogs' value='" . $key['MicroBlogs'] . "' class='MicroBlogs'/>" . "<input type='hidden' name='BrandInfo' value='" . $key['BrandInfo'] . "' class='BrandInfo'/>" . "</tr>";
				echo $str;
			}
		}
		//echo "</select>";
	}

	public function ProductTemplate($data) {
		//echo "<select>";

		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				$str = '<tr class="ID" name="ProductID" value="' . $key['ProductID'] . '"><td>' . $key['Name'] . '</td>' . '<td><a class="productEdit edit Newlightbox" href="#popup1">Edit</a></td><td>' . '<select class="brand" name="BrandID"><option>Select Brand</option></select>' . '</td><td>' . '<select class="collection" name="CollectionID"><option>Select Collection</option>' . '</select></td><input type="hidden" class="productCollection" name="Name" value="' . $key['Name'] . '"/>' . '<input type="hidden" name="ProductID" value="' . $key['ProductID'] . '"/>' . // '"/></tr>';
				'<input type="hidden" id="CollectionID" value="' . $this -> getCollectionID($key['ProductID']) . '"/></tr>';
				echo $str;
			}
		}
		//echo "</select>";
	}

	public function getCurrentProduct($brandID) {
		$arr = array();
		$ProductID = $this -> getAccountProduct();
		foreach ($ProductID as $brandKey => $arr) {
			//echo "brandKey = ".($brandKey) ."<br>";
			if ($brandID == $brandKey) {
				foreach ($arr as $key => $product) {
					//echo "Pushed product =[". $product.",";
					//array_push($arr, $product);
				}
				//echo "]<br>";
				return $arr;
				break;
			}
		}
	}

	public function getCollectionID($target) {
		$data = $this -> get("getAllProductCollections");
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				if ($key['ProductID'] == $target) {
					return $key['CollectionID'];
				}
			}
		}
	}

	public function getBrandID($target) {
		$data = $this -> get("getAllProductBrands");
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				if ($key['ProductID'] == $target) {
					return $key['BrandID'];
				}
			}
		}
	}

	public function getInfoArray($data) {
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				unset($key["Name"]);
				unset($key["BrandID"]);
				echo json_decode($key);
			}
		}
	}

	/*
	 *Function for error message
	 * if response return 0 -> Successful
	 *			   return -1 -> something wrong (not able to update)
	 *			   return -3 -> can't find in the table
	 */
	public function errorMsg($response) {
		if (is_array($response)) {
			if ($this -> debug == 3) {
				echo "<br>------------------------<br>";
				echo var_dump($response);
				echo "<br>------------------------<br>";
			} else {
				foreach ($response as $k => $v) {
					if ($v["WasSuccessful"]) {
						echo "Successful";
					} else {
						echo "Error Message: " . $v["Exception"] . "<br>";
					}

				}
			}
		}
		if (is_string($response)) {
			echo "<br>String<br>";
			echo "result :" . $response;
		}
		if (is_int($response)) {
			echo "<br>Integer<br>";
			echo "result :" . $response;
		}
		if (is_object($response)) {
			//echo "<br>Object<br>";
			if ($this -> debug == 3) {
				echo "<br>------------------------<br>";
				echo var_dump($response);
				echo "<br>------------------------<br>";
			} else {
				if ($response -> WasSuccessful) {
					echo "Successful";
				} else {
					echo "Error Message: " . $response -> Exception . "<br>";
				}
			}
			/*if (isset($response["wasSuccessful"])) {
			 $successful = $response -> wasSuccessful;
			 echo "result : " . $successful;
			 } else {
			 //$Exception = $response->Exception;
			 echo "result : " . $Exception;
			 }*/
		}
	}

	/*Get and Set functions for following data:
	 * User
	 * Account
	 * Product
	 * Campaign
	 * Brand
	 * -----Joint table
	 * AccountBrand
	 * AccountProduct (aka. ProductBrand)
	 *
	 */
	public function setUserID($userID) {
		$_SESSION['userID'] = $userID;
	}

	public function getUserID() {
		return $_SESSION['userID'];
	}

	public function setUserName($userName) {
		$_SESSION['userName'] = $userName;
	}

	public function getUserName() {
		return $_SESSION['userName'];
	}

	public function setAccountID($key, $value) {
		$_SESSION['accountID'][$key] =$value;
	}

	public function getAccountID() {
		return $_SESSION['accountID'];
	}

	public function setAccountBrand($accountID, $BrandArr) {
		//$this -> accountBrand[$accountID] = $BrandArr;
		$_SESSION['accountBrand'][$accountID] = $BrandArr;
	}

	public function getAccountBrand() {
		return $_SESSION['accountBrand'];
	}

	public function setAccountProduct($brandID, $productID) {
		//$this -> accountProduct[$brandID] = $productID;
		$_SESSION['productBrand'][$brandID] = $productID;
	}

	public function getAccountProduct() {
		return $_SESSION['productBrand'];
	}

	public function setBrandCampaign($brandID, $campaignID) {
		//$this -> brandCampaign[$brandID] = $campaignID;
		//unset($_SESSION['brandCampaign']);
		$_SESSION['brandCampaign'][$brandID] = $campaignID;
	}

	public function getBrandCampaign() {
		return $_SESSION['brandCampaign'];
	}

	public function setProductImage($productID, $imageID) {
		//echo "pushed ".print_r($imageID);
		//array_push($this -> productImage[$productID], $imageID);
		//$this -> productImage[$productID] = $imageID;
		$_SESSION['productImage'][$productID] = $imageID;
	}

	public function getProductImage() {
		return $_SESSION['productImage'];
	}

}
