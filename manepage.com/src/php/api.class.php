<?php

/**
 * Created by PhpStorm.
 * User: calvinho
 * Date: 10/11/14
 * Time: 2:22 PM
 */
//session_start();
// 
// ini_set('display_startup_errors', 1);
// ini_set('display_errors', 1);
// error_reporting(-1);

class api {

	const base = "http://54.68.229.64/Service1.svc/";
	//User ID
	private $brand = array();

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

	/*
	 * Get all the accounts that user joint with account.
	 */
	public function getAllCollections() {
		unset($_SESSION['collection']);
		$json = $this -> get("getAllCollections");
		$status = array();
		foreach ($json as $k => $value) {
			foreach ($value as $a => $key) {
				if ($key["Status"] != "999") {
					$status[$key["CollectionID"]] = array("Status"=>$key['Status']);
					$temp = array("Collection_name" => $key["Name"], "Collection_id" => $key["CollectionID"], "Status" => $key['Status']);
					$this -> setCollection($key["CollectionID"], $temp);
				}
			}
		}
		$test =  $this->getCollection();
		array_multisort($status, SORT_ASC, $test);
		$_SESSION['SortedCollection']=$test;
	}

	public function getCollectionInfo($collectionID) {
		$collection = $this -> getCollection();
		$json = $this -> get("getimageproductcollectionbrand/Collection/$collectionID/Active");
		$collection[$collectionID];
		$collection[$collectionID]["ImageLocation"] = array();
		unset($collection[$collectionID]["ImageName"]);
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				//echo "Brand_id". $v["BrandID"] ."<br>";
				// if(!isset($collection[$collectionID]["BrandName"]) && !isset($collection[$collectionID]["ProductName"])){
				// $collection[$collectionID]["BrandName"] =  $v["BrandName"];
				// $collection[$collectionID]["ProductName"] =  $v["ProductName"];
				// }
				$temp = array();
				$temp["BrandName"] = $v["BrandName"];
				$temp["ProductName"] = $v["ProductName"];
				$temp["ImageLocation"] = $v["ImageLocation"];
				//echo "Image Location:  ". $v["ImageName"]."<br>";
				//$temp = array_push($brand[$brandID]["ImageName"], $v["ImageName"]);
				array_push($collection[$collectionID]["ImageLocation"], $temp);

				// echo "<pre>";
				// echo print_r($temp);
				// echo "</pre>";

			}
			$this -> setCollection($collectionID, $collection[$collectionID]);
			echo json_encode($collection[$collectionID]);
			// echo "<pre>";
			// echo print_r( $brand[$brandID]);
			// echo "</pre>";

		}
	}

	public function setCollection($collectionID, $collectionArr) {
		// echo "brandID = $brandID<br>";
		// echo "<pre>";
		// echo "BrandArr =";
		// echo print_r($BrandArr);
		// echo "</pre>";

		//array_push($this -> accountBrand, $key);
		$_SESSION['collection'][$collectionID] = $collectionArr;
		//$_SESSION['brand'] = $this -> brand;
		//array_push($this->accountBrand, $accountBrand);
	}
	public function getSortedCollection() {
		//return $this->accountBrand;
		return $_SESSION['SortedCollection'];
	}
	public function getCollection() {
		//return $this->accountBrand;
		return $_SESSION['collection'];
	}

	/*
	 * Get all the accounts that user joint with account.
	 */
	public function getAllBrands() {
		$brandName = array();
		unset($_SESSION['brand']);
		$json = $this -> get("getAllActiveBrands");
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				//echo "Brand_id". $v["BrandID"] ."<br>";
				$temp2 = array("value" => $v["Name"], "id" => $v["BrandID"]);
				$temp = array("Brand_name" => $v["Name"], "Brand_id" => $v["BrandID"], "Brand_philo" => $v["BrandPhilosophy"], "Brand_info" => $v["BrandInfo"]);
				// echo "<pre>";
				// echo print_r($temp);
				// echo "</pre>";
				$this -> setBrand($v["BrandID"], $temp);
				array_push($brandName, $temp2);
			}

		}
		$this -> setBrandArr($brandName);
	}
	
	public function getBrandInfo($brandID) {
		$brand = $this -> getBrand();
		$json = $this -> get("getimageproductcollectionbrand/Brand/$brandID/Active");
		$brand[$brandID];
		$brand[$brandID]["ImageLocation"] = array();
		unset($brand[$brandID]["ImageName"]);
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				//echo "Brand_id". $v["BrandID"] ."<br>";
				// if(!isset($brand[$brandID]["CollectionName"]) && !isset($brand[$brandID]["ProductName"])){
				// $brand[$brandID]["CollectionName"] =  $v["CollectionName"];
				// $brand[$brandID]["ProductName"] =  $v["ProductName"];
				// }
				$temp = array();
				$temp["CollectionName"] = $v["CollectionName"];
				$temp["ProductName"] = $v["ProductName"];
				$temp["ImageLocation"] = $v["ImageLocation"];
				//echo "Image Location:  ". $v["ImageName"]."<br>";
				//$temp = array_push($brand[$brandID]["ImageName"], $v["ImageName"]);
				array_push($brand[$brandID]["ImageLocation"], $temp);

				// echo "<pre>";
				// echo print_r($temp);
				// echo "</pre>";

			}
			$this -> setBrand($brandID, $brand[$brandID]);
			echo json_encode($brand[$brandID]);
			// echo "<pre>";
			// echo print_r( $brand[$brandID]);
			// echo "</pre>";

		}
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

	/*Get and Set functions for following data:
	 * Brand
	 *
	 */
	public function setBrand($brandID, $BrandArr) {
		// echo "brandID = $brandID<br>";
		// echo "<pre>";
		// echo "BrandArr =";
		// echo print_r($BrandArr);
		// echo "</pre>";

		//array_push($this -> accountBrand, $key);
		$_SESSION['brand'][$brandID] = $BrandArr;
		//$_SESSION['brand'] = $this -> brand;
		//array_push($this->accountBrand, $accountBrand);
	}

	public function getBrand() {
		//return $this->accountBrand;
		return $_SESSION['brand'];
	}

	public function setBrandArr($BrandArr) {
		// echo "brandID = $brandID<br>";
		// echo "<pre>";
		// echo "BrandArr =";
		// echo print_r($BrandArr);
		// echo "</pre>";

		//array_push($this -> accountBrand, $key);
		$_SESSION['BrandName'] = $BrandArr;
		//$_SESSION['brand'] = $this -> brand;
		//array_push($this->accountBrand, $accountBrand);
	}

	public function getBrandArr() {
		//return $this->accountBrand;
		return $_SESSION['BrandName'];
	}

}
