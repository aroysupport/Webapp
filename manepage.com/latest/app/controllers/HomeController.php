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
	 * Get all the accounts that user joint with account.
	 */
	public function getAllCollections() {
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
		$array[$collectionID] = $collectionArr;
		Session::put('collection', $array);
	}

	public function getCollection() {
		return Session::get('collection');
	}

	/*
	 * Get all the accounts that user joint with account.
	 */
	public function getAllBrands() {
		Session::flush();
		$brandName = array();
		$brandName2 = array();
		$json = $this -> get("getAllActiveBrands");
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				$temp2 = array("value" => htmlspecialchars_decode($v["Name"]), "id" => $v["BrandID"]);
				$temp = array("Brand_name" => $v["Name"], "Brand_id" => $v["BrandID"], "Brand_philo" => $v["BrandPhilosophy"], "Brand_info" => $v["BrandInfo"]);
				$brandName2[$v["BrandID"]] =$temp;
				array_push($brandName, $temp2);
			}

		}
		$this -> setBrand($brandName2);
		$this -> setBrandArr($brandName);
	}

	public function getBrandInfo($brandID) {
		if(!Session::has('brand')){
			$this->getAllBrands();
		}
		$brand = $this -> getBrand();
		$json = $this -> get("getimageproductcollectionbrand/Brand/$brandID/Active");
		$brand[$brandID];
		$brand[$brandID]["ImageLocation"] = array();
		foreach ($json as $k => $value) {
			foreach ($value as $a => $v) {
				$temp = array();
				$temp["CollectionName"] = $v["CollectionName"];
				$temp["ProductName"] = $v["ProductName"];
				$temp["ImageLocation"] = $v["ImageLocation"];
				array_push($brand[$brandID]["ImageLocation"], $temp);
			}
			//$this -> setBrand($brandID, $brand[$brandID]);
			return $brand[$brandID];
		}
	}
	public function check(){
		if(Session::has('key')){
	   		return Redirect::to($request->path());
	   }else{
	   		return Redirect::to('/login');
	   }
	}
	/*Get and Set functions for following data:
	 * Brand
	 *
	 */
	public function setBrand( $BrandArr) {
		Session::put('brand', $BrandArr);
	}

	public function getBrand() {
		return Session::get('brand');
	}

	public function setBrandArr($BrandArr) {
		Session::put('BrandName', $BrandArr);
	}

	public function getBrandArr() {
		return Session::get('BrandName');

	}

	public function index() {
		return View::make('pages.index');
	}

	public function brand_page() {
		$this->getAllBrands();
		$json = $this -> getBrandArr();
		return View::make('pages.brand_page.index', array('json' => $json));
	}

	public function collection_page() {
		$json = $this -> getCollection();
		return View::make('pages.collection_page.index', array('json' => $json));
	}
	public function showBrand($brandName) {
		$brand = $this -> getBrandArr();
		foreach ($brand as $index => $value) {
			if (preg_replace('/\s+/', '', trim(htmlspecialchars_decode($value['value']))) == preg_replace('/\s+/', '', trim($brandName))) {
				$resopnse=$this ->getBrandInfo($value['id']);
			}
		}
		return View::make('pages.brand_page.brand_content', array('Brand_name' =>$resopnse["Brand_name"], 'Brand_philo' =>$resopnse["Brand_philo"], 'Brand_info' =>$resopnse["Brand_info"], 'ImageLocation' =>$resopnse["ImageLocation"]));
	}
	public function collection_content() {
		return View::make('pages.collection_page.collection_content');
	}

	public function info() {
		return View::make('pages.collection_page.info');
	}

	public function help() {
		return View::make('pages.help.index');
	}

	public function privacy() {
		return View::make('pages.privacy.index');
	}
	
	public function terms() {
		return View::make('pages.terms.index');
	}
	public function agreement() {
		return View::make('pages.agreement.index');
	}
	public function resources() {
		return View::make('pages.resources.index');
	}
}
