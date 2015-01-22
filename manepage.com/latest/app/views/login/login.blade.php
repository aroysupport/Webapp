<!doctype html>
<html>
	<head>
		<!-- set the encoding of your site -->
		<meta charset="utf-8">
		<title>Mane Page</title>
		<link rel="icon" type="image/png" href="../landing_page/img/Favicon_ManePage16.ico">
		<!-- include the site stylesheet -->
		<link href="css/all.css?v=1.09" rel="stylesheet" type="text/css" media="all"/>
		<!-- include HTML5 IE enabling script for IE -->
		<!--[if IE]><script type="text/javascript" src="js/ie.js"></script><![endif]-->
		<!-- include jQuery library -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<!-- include custom JavaScript -->
		<script type="text/javascript" src="js/placeholder.main.js"></script>
		<script type="text/javascript" src="js/login.js?v=1.10"></script>
	</head>
	<body>
		<div class="wrapper">
			<div class="wrapper-container">
				<div class="content">
					<div id="home_page">
						<img src="img/Roar_Home.png" alt="mane logo" />
						<form class="login-form" action="http://manepage.com/php/login.php?method=login"  method="post">
							<!-- {{ Form::open(array('url' => 'login')) }} -->
							<fieldset>
								<div class="row">
									<input class="code" name="code" type="text" placeholder="Enter Code" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Code'" autocomplete="off">
								</div>
								<div class="row">
									{{ Form::submit('Go') }}
									<!--<input type="submit" value="Go">-->
								</div>
								{{ $errors->first('code') }}
							</fieldset>
							<!-- {{ Form::close() }} -->
						</form>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>