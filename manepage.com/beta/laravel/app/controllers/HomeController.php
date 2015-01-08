<?php

class HomeController extends BaseController {

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
					$status[$key["CollectionID"]] = $key['Status'];
					$temp = array("Collection_name" => $key["Name"], "Collection_id" => $key["CollectionID"], "Status" => $key['Status']);
					$this -> setCollection($key["CollectionID"], $temp);
				}
			}
		}
		array_multisort($status, SORT_ASC, $this -> getCollection());
	}

	public function getCollectionInfo($collectionID) {
		$collection = $this -> getCollection();
		$json = $this -> get("getimageproductcollectionbrand/Collection/$collectionID/Active");
		$collection[$collectionID];
		$collection[$collectionID]["ImageLocation"] = array();
		unset($collection[$collectionID]["ImageName"]);
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				$temp = array();
				$temp["BrandName"] = $v["BrandName"];
				$temp["ProductName"] = $v["ProductName"];
				$temp["ImageLocation"] = $v["ImageLocation"];
				array_push($collection[$collectionID]["ImageLocation"], $temp);

			}
			$this -> setCollection($collectionID, $collection[$collectionID]);
			echo json_encode($collection[$collectionID]);

		}
	}

	public function setCollection($collectionID, $collectionArr) {
		$_SESSION['collection'][$collectionID] = $collectionArr;
	}

	public function getCollection() {
		return $_SESSION['collection'];
	}

	/*
	 * Get all the accounts that user joint with account.
	 */
	public function getAllBrands() {
		$brandName = array();
		//unset($_SESSION['brand']);
		$json = $this -> get("getAllActiveBrands");
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				$temp2 = array("value" => $v["Name"], "id" => $v["BrandID"]);
				$temp = array("Brand_name" => $v["Name"], "Brand_id" => $v["BrandID"], "Brand_philo" => $v["BrandPhilosophy"], "Brand_info" => $v["BrandInfo"]);
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
				$temp = array();
				$temp["CollectionName"] = $v["CollectionName"];
				$temp["ProductName"] = $v["ProductName"];
				$temp["ImageLocation"] = $v["ImageLocation"];
				array_push($brand[$brandID]["ImageLocation"], $temp);
			}
			$this -> setBrand($brandID, $brand[$brandID]);
			//return $brand[$brandID];
			//echo json_encode($brand[$brandID]);
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

	/*Get and Set functions for following data:
	 * Brand
	 *
	 */
	public function setBrand($brandID, $BrandArr) {
		$_SESSION['brand'][$brandID] = $BrandArr;
	}

	public function getBrand() {
		return $_SESSION['brand'];
	}

	public function setBrandArr($BrandArr) {
		$_SESSION['BrandName'] = $BrandArr;
	}

	public function getBrandArr() {
		return $_SESSION['BrandName'];
	}
	
	public function index()
	{
		return View::make('pages.index');
	}
	public function brand_page(){
		$this->getAllBrands();
		$json = $this->getBrandArr();
		View::share(array('json'=>$json));
		return View::make('pages.brand_page.index');
		
	}
	//public function brand_content($brand){
	//	return View::make('pages.brand_page.brand_content')
	//	->with(array('brand'=>$brand));
		
		
		
					
	//}
	public function showBrand($brandName){
		$brandName = str_replace('_',' ',$brandName);
		$this->getAllBrands();
		$brand =$this-> getBrandArr();
		foreach($brand as $index => $value){
			if($value['value']==$brandName){
				$brandID =$value['id'];
			}
		}
		 return View::make('pages.brand_page.brand_content', array('brandID'=>$brandID, 'brand'=>$brandName, 'brandArr'=>$brand));
	}
	
	
	
	public function brand_content(){
		//$brandActive = $this->get("getimageproductcollectionbrand/Brand/$brandID/Active");
		return View::make('pages.brand_page.brand_content');
	}
	public function collection_page(){
		return View::make('pages.collection_page.index');
	}
	public function collection_content(){
		return View::make('pages.collection_page.collection_content');
	}
	public function info(){
		return View::make('pages.collection_page.info');
	}
	public function help(){
		return View::make('pages.help.index');
	}
	public function privacy(){
		return View::make('pages.privacy.index');
	}
	public function remote_in(){		
		return View::make('pages.remote_in.remote_in');
	}
	public function remote_in_brand_page(){
		return View::make('pages.remote_in.brand_page');
	}
	public function remote_in_brand_content(){
		return View::make('pages.remote_in.brand_content');
	}
	public function remote_in_collection_page(){
		return View::make('pages.remote_in.collection_page');
	}
	public function remote_in_collection_content(){
		return View::make('pages.remote_in.collection_content');
	}
	public function remote_in_info(){
		return View::make('pages.remote_in.info');
	}
	public function remote_in_upload_artwork_agree(){
		return View::make('pages.remote_in.upload_artwork_agree');
	}
	public function remote_in_upload_artwork_upload(){
		return View::make('pages.remote_in.upload_artwork_upload');
	}
	public function remote_in_upload_artwork_tag(){
		return View::make('pages.remote_in.upload_artwork_tag');
	}
	public function remote_in_upload_artwork_information(){
		return View::make('pages.remote_in.upload_artwork_information');
	}

}
