<?php

class RemoteInController extends BaseController {
	const base = "http://54.68.229.64/Service1.svc/";

	public function index() {
		return View::make('pages.remote_in.index');
	}

	public function login() {
		$devices_id = Input::get('devicesId');
		$json = $this -> get('getDesktopLogin/' . $devices_id);
		foreach ($json as $k => $value) {
			$object = $value[0];
			if ($object['LoginCodeStatus'] == "Expired") {
				session_start();
				session_name("remote_in");
				$_COOKIE["remote_in"] = session_id();
				$_SESSION['remote_in_start'] = time();
				$_SESSION['remote_in_expire'] = $_SESSION['remote_in_start'] + (1 * 60);
				session_write_close();
				return 1;
				// return 'The device number you entered is incorrect.';
			}
		}
		return 1;
	}

	public function remote_in_upload_artwork_upload() {
		session_start();
		session_name("remote_in");
		$now = time();
		$msg = array();

		if($now > $_SESSION['remote_in_expire']) {
			unset($_COOKIE['remote_in']);
			setcookie('remote_in', null, -1, '/');
			$msg["expired"] = "Your session has expired!";
			echo json_encode($msg);
			header("Location: /remote_in");
			exit();
		}
		session_write_close();

		$status = ($now > $_SESSION['remote_in_expire']);
		
		return View::make('pages.remote_in.upload_artwork_upload', array('now' => $status));
	}

	public function check() {
		$now = time();
		$msg = array();
		if ($now > $_SESSION['remote_in_expire']) {
			if (isset($_COOKIE['remote_in'])) {
				unset($_COOKIE['remote_in']);
				setcookie('remote_in', null, -1, '/');
				$msg["expired"] = "Your session has expired!";
				echo json_encode($msg);
			} 
		}
	}

	private function get($method) {
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
}
