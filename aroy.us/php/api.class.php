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
		//echo "returned value =";
		//echo var_dump($json_response);
		/*if (false === $json_response) {
		 throw new Exception("Error: get() - cURL error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
		 }*/

		/*if ($status != 200) {
		 throw new Exception("Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl));
		 }*/
		curl_close($curl);
		$response = json_decode($json_response);
		//echo $response;

		return $response;
	}

	public function checkLogin($json, $value) {
		$name = $value['Name'];
		$pwd = $value['Password'];
		//echo "<br>Name :".$name;
		//echo "<br>pwd :".$pwd;
		foreach ($json as $key => $value) {
			foreach ($value as $k => $v) {
				if ($v['Name'] == $name) {
					//echo "<br>Name match :";
					if ($v["Password"] == $pwd) {
						$this -> getAccountUsers($v["UserID"]);
						$this -> getAccountName();
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
		}
		return false;
	}

	/*
	 * Get all the accounts that user joint with account.
	 */
	public function getAccountUsers($userID) {
		$json = $this -> get("getAllAccountUsers");
		foreach ($json as $key => $value) {
			foreach ($value as $k => $v) {
				if ($v['UserID'] == $userID) {
					$this -> setAccountID($v['AccountID'], null);

				}
			}
		}
	}

	/*
	 * Get all the account name
	 */
	public function getAccountName() {
		$accountID = $this -> getAccountID();
		foreach ($accountID as $key => $value) {
			//echo "account = $key<br>";
			$json = $this -> get("getAccountInfo/" . $key);
			//echo var_dump($json);
			foreach ($json as $k => $v) {
				foreach ($v as $a => $b) {
					//echo "ID = $key<br>Name = $b[Name]";
					$this -> setAccountID($key, $b['Name']);
				}
			}
		}
	}

	/*
	 * Get all the brand ID that is joint with all the Account userID joint with.
	 */
	public function AccountBrand() {
		$accountID = $this -> getAccountID();
		foreach ($accountID as $key => $value) {
			$arrTemp = array();
			//echo "account = $key<br>";
			$json = $this -> get("getAllAccountBrands");
			//echo var_dump($json);
			foreach ($json as $k => $v) {
				foreach ($v as $a => $b) {
					if ($b['AccountID'] == $key) {
						//echo "BrandID = $b[BrandID]";
						array_push($arrTemp, $b['BrandID']);
						//$this -> setAccountBrand($b['BrandID']);
					}

				}
			}

			$this -> setAccountBrand($key, $arrTemp);
			unset($arrTemp);
		}
	}

	/*
	 * Get all the Product ID that is joint with all the BrandID joint with.
	 */
	public function AccountProduct() {
		$accountBrand = $this -> getAccountBrand();
		foreach ($accountBrand as $key => $value) {
			$arrTemp = array();
			//echo "Account = $key<br>";
			$json = $this -> get("getAllProductBrands");
			foreach ($value as $brandKey => $ID) {
				foreach ($json as $k => $v) {
					foreach ($v as $a => $b) {
						//echo "<pre>if Brand == " . $ID;
						//echo "<br>And (BrandID1 : " . $b['BrandID'].", ProductID: ". $b['ProductID'].") </pre>";
						if ($b['BrandID'] == $ID) {
							//echo "<pre>------------------------------------>Added to array</pre>";
							array_push($arrTemp, $b['ProductID']);
						}
					}

				}

				if (!empty($arrTemp)) {
					//echo "<br>-------*Added accountID[".$ID."] = <pre>";
					//echo print_r($arrTemp);
					//echo "</pre>------------";
					$this -> setAccountProduct($ID, $arrTemp);
					$arrTemp = array();
				}
			}

		}
	}

	/*
	 * Get all the Campaign ID that is joint with all the Campaign joint with.
	 */
	public function BrandCampaign() {
		$accountBrand = $this -> getAccountBrand();
		foreach ($accountBrand as $key => $value) {
			$arrTemp = array();
			//echo "Account = $key<br>";
			$json = $this -> get("getAllBrandCampaigns");
			foreach ($value as $brandKey => $ID) {
				foreach ($json as $k => $v) {
					foreach ($v as $a => $b) {
						if ($b['BrandID'] == $ID) {
							array_push($arrTemp, $b['CampaignID']);
						}
					}

				}

				if (!empty($arrTemp)) {
					//echo "<br>-------*Added accountID[".$ID."] = <pre>";
					//echo print_r($arrTemp);
					//echo "</pre>------------";
					$this -> setBrandCampaign($ID, $arrTemp);
					$arrTemp = array();
				}
			}

		}
	}

	/*
	 * Get all the Image ID that is joint with all the Product joint with.
	 */
	public function ProductImage() {
		$accountProduct = $this -> getAccountProduct();
		foreach ($accountProduct as $key => $value) {
			$arrTemp = array();
			//echo "Account = $key<br>";
			$json = $this -> get("getAllProductImages");
			foreach ($value as $brandKey => $ID) {
				foreach ($json as $k => $v) {
					foreach ($v as $a => $b) {
						if ($b['ProductID'] == $ID) {
							array_push($arrTemp, $b['ImageID']);
						}
					}

				}

				if (!empty($arrTemp)) {
					$this -> setProductImage($ID, $arrTemp);
					$arrTemp = array();
				}
			}

		}
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
				// debug("ID", $v[$str], $GLOBALS['debug']);
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
		//echo "<select>";
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				echo '<li><a href="#"><div class="lazy element-item"><img src="'. $key["ImageLocation"].
				'" width="160" height="160" alt="image description"><div class="selected-box"><a class="btn-view" href="' .
				$key["ImageLocation"].'" data-rel="lightbox">Quick View</a> </div></div></a></li>';
			
			}
		}
		//echo "</select>";
	}
	/*
	 * Template for Option list, Campaign table, Product table, Brand table
	 *
	 */
	public function optionTemplate($data, $value) {
		//echo "<select>";
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				echo "<option value='" . $key[$value] . "'>$key[Name]</option>";
			}
		}
		//echo "</select>";
	}

	public function campaignTemplate($data) {
		//echo "<select>";
		foreach ($data as $k => $v) {
			foreach ($v as $a => $key) {
				$str = '<tr>' . '<td><input type="checkbox" id="' . $key['CampaignID'] . '">' . '</td><td><label for="' . $key['CampaignID'] . '">' . $key['Name'] . '</label><a class="opener" href="#">opener</a>' . '<ul class="slide"><li>Start Date: ' . $key['StartDate'] . '</li><li>End Date:' . $key['EndDate'] . '</li><li>Location: ' . $key['Market'] . '</li><li>Clientele:' . '</li><li>^^Campaign Identifier' . '</li><li>Campaign Message' . '<ul><li>Title - ' . $key['MessageTitle'] . '</li><li>Name - ' . $key['Name'] . '</li><li>Message - ' . $key['Message'] . '</li></ul></li><li>QRCode Location: ' . $key['QRCodeLocation'] . '</li><li>^^Campaign Content' . '</li></ul></td></tr>';
				// "<input type='hidden' value='" . $key['Status'] . "' class='BrandInfo'/></tr>";
				echo $str;

			}
		}
		//echo "</select>";
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
				$str = '<tr class="ID" name="ProductID" value="' . $key['ProductID'] . '"><td>' . $key['Name'] . '</td>' . '<td><a class="productEdit edit Newlightbox" href="#popup1">Edit</a></td><td id="brandSize">' . '<select class="newBrand" name="BrandID"><option>Select Brand</option></select>' . '</td><td>' . '<select class="newCollection" name="CollectionID"><option>Select Collection</option>' . '</select></td><input type="hidden" class="productCollection" name="Name" value="' . $key['Name'] . '"/>' . '<input type="hidden" name="ProductID" value="' . $key['ProductID'] . '"/>' . // '"/></tr>';
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
		echo "<br>---------------Error Message-----------------------";
		//echo "Error message: <pre>" ;
		//echo var_dump($response) ;
		//echo "</pre>";
		if (is_array($response)) {
			echo "<br>Array<br>";
			echo "result :" . print_r($response);
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
			echo "<br>Object<br>";
			echo "<pre>";
			echo var_dump($response);
			echo "</pre>";
			/*if (isset($response["wasSuccessful"])) {
				$successful = $response -> wasSuccessful;
				echo "result : " . $successful;
			} else {
				//$Exception = $response->Exception;
				echo "result : " . $Exception;
			}*/
		}
		echo "<br>----------------End----------------------<br>";
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
		//echo "key = $key<br>";
		//echo "value = $value<br>";
		$this -> accountID[$key] = $value;
		$_SESSION['accountID'] = $this -> accountID;
		//array_push($this->$accountID,$accountID);
	}

	public function getAccountID() {
		return $_SESSION['accountID'];
	}

	public function setAccountBrand($accountID, $BrandArr) {
		//echo "key = $key<br>";
		//echo "value = $value";
		//array_push($this -> accountBrand, $key);
		$this -> accountBrand[$accountID] = $BrandArr;
		$_SESSION['accountBrand'] = $this -> accountBrand;
		//array_push($this->accountBrand, $accountBrand);
	}

	public function getAccountBrand() {
		//return $this->accountBrand;
		return $_SESSION['accountBrand'];
	}

	public function setAccountProduct($brandID, $productID) {
		//array_push($this->accountProduct,$accountProduct);
		$this -> accountProduct[$brandID] = $productID;
		$_SESSION['productBrand'] = $this -> accountProduct;
	}

	public function getAccountProduct() {
		return $_SESSION['productBrand'];
	}

	public function setBrandCampaign($brandID, $campaignID) {
		//array_push($this->accountProduct,$accountProduct);
		$this -> brandCampaign[$brandID] = $campaignID;
		$_SESSION['brandCampaign'] = $this -> brandCampaign;
	}

	public function getBrandCampaign() {
		return $_SESSION['brandCampaign'];
	}

	public function setProductImage($productID, $imageID) {
		//array_push($this->accountProduct,$accountProduct);
		$this -> productImage[$productID] = $imageID;
		$_SESSION['productImage'] = $this -> productImage;
	}

	public function getProductImage() {
		return $_SESSION['productImage'];
	}

}
