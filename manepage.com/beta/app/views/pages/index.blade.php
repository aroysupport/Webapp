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
		
		{{ HTML::style('css/main.css?version=1.14') }}
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="landing_page/js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	</head>
	<!-- end Head -->
	<!-- Body Start-->
	<body>
		<!-- popup end -->
		<div class="wrapper">
			<div class="wrapper-container">
				<div class="content">
					<div id="home_page">
						<img src="{{ URL::asset('img/Roar_Home.png') }}" alt="mane logo" />
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
					</div>
				</div>
			</div>
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

