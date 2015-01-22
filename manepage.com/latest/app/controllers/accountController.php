<?PHP
class accountController extends BaseController {
	public function getLogin() {
		//$user = User::create(array('code' => '15aroy15'));
		return View::make('login.login');
	}

	public function postLogin() {
			$userdata = Input::get('code');
			if($userdata == '15aroy15'){
				Session::put('key', 'value');
				return Redirect::to('/');
			}else{
				return Redirect::to('login.login');
			}
	}
}
