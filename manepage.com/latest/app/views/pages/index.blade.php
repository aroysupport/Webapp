<!DOCTYPE html>
<html>
	<!-- Head Start-->
	<head>
		<meta charset="utf-8">
		<title>Mane Page</title>
		<link rel="icon" type="image/png" href="img/Favicon_ManePage16.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta name="description" content="Mane Page is a fast, new, safe destination where audiences discover and connect to leading brands with privacy built in ">
		<!--link style-->
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		
		{{ HTML::style('css/main.css?version=1.24') }}
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="landing_page/js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<script>
			// function getCookie(cname) {
// 				var name = cname + "=";
// 				var ca = document.cookie.split(';');
// 				for (var i = 0; i < ca.length; i++) {
// 					var c = ca[i];
// 					while (c.charAt(0) == ' ')
// 					c = c.substring(1);
// 					if (c.indexOf(name) != -1)
// 						return c.substring(name.length, c.length);
// 				}
// 				return "";
// 			}
// 
// 			if(getCookie("manepage")==""){
// 				window.stop();
// 				window.location.replace("http://manepage.com/login");
// 			}else{
// 				console.log("Passed");
// 			}
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		{{ HTML::script('js/domain.js?version=1.06') }}
	</head>
	<!-- end Head -->
	<!-- Body Start-->
	<body style="min-width: 442px; background:white;">
		<!-- popup end -->
		<div class="wrapper-special" style="background:white;">
			<div class="wrapper-container">
				<script>
			$(".wrapper-container").height($(window).height());
		</script>
				<div class="content">
					<div id="home_page">
						<img src="{{ URL::asset('img/logo-1.png') }}" alt="mane logo" />
						<!-- <h1>Mane Page</h1> -->
						<ul>
							<li>
								<a href="{{ URL::route('collection_page') }}">Collection Pages</a>
							</li>
							<li>
								<a href="{{ URL::route('brand_page') }}">Brand Pages</a>
							</li>
							<!-- <li><a href="remote_in/remote_in.html">Remote In</a></li> -->
						</ul>
						<p>Desktop browser recommended</p>
					</div>
				</div>
			</div>
		</div>
		<div id="small-text">
			All Rights Reserved.<span class="no-break"> Copyright © 2015 Aroy Innovation LLC.</span>  <span class="no-break2"><a href="{{ URL::route('terms') }}">Terms of Use</a> | <a href="{{ URL::route('privacy') }}">Privacy Policy</a> | <a href="{{ URL::route('help') }}">Help</a></span></span>
		</div>
		<!--content End-->
		<script type="text/javascript">
			setTimeout(function() {
				var a = document.createElement("script");
				var b = document.getElementsByTagName("script")[0];
				a.src = document.location.protocol + "//dnn506yrbagrg.cloudfront.net/pages/scripts/0027/8157.js?" + Math.floor(new Date().getTime() / 3600000);
				a.async = true;
				a.type = "text/javascript";
				b.parentNode.insertBefore(a, b)
			}, 1);
		</script>
	</body>
</html>

