<?php

class BaseController extends Controller {

	/**
	 * Setup the layout used by the controller.
	 *
	 * @return void
	 */
	protected function setupLayout() {
		if (!is_null($this->layout)) {
			$this->layout = View::make($this->layout);
		}
	}

	public function check() {
		session_start();
		session_name("remote_in");
		$now = time();
		$msg = array();
		if ($now > $_SESSION['remote_in_expire']) {
			if (isset($_COOKIE['remote_in'])) {
				unset($_COOKIE['remote_in']);
				setcookie('remote_in', null, -1, '/');
				$msg["expired"] = "Your session has expired!";
				echo json_encode($msg);
				header("Location: /remote_in");
				exit();
			} 
		}
		session_write_close();
		
	}

}
