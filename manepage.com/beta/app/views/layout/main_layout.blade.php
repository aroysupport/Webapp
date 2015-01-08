<!DOCTYPE html>
<html>
	<!-- Head Start-->
	<head>
		<meta charset="utf-8">
		<title>Mane Page</title>
		<link rel="icon" type="image/png" href="img/Favicon_ManePage16.ico">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--link style-->
		{{ HTML::style('css/jcf.css') }}
		<!--<link rel="stylesheet" type="text/css" href="../landing_page/css/fancybox.css" />-->
		{{ HTML::style('css/jssort.css') }}
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		{{ HTML::style('css/slider.css') }}
		{{ HTML::style('css/main.css?version=1.18') }}
		{{ HTML::style('css/spin.css?version=1.00') }}
		{{ HTML::style('css/jquery-ui.min.css?version=1.05') }}

		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="../landing_page/js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		{{ HTML::script('js/lib/jquery-ui/jquery-ui.min.js') }}
		{{ HTML::script('js/domain.js?version=1.06') }}
		{{ HTML::script('js/slider-master/js/jssor.slider.min.js') }}
		@yield('style')
	</head>
	<!-- end Head -->
	<!-- Body Start-->
	<body>
		<!-- popup end -->
		@yield('load')
		<div class="wrapper">
			<div class="wrapper-container">
				<div class="main_page">
					<div class="header">
						<div class="left-nav">
							<a href="{{ URL::route('index') }}"><img src="{{ URL::asset('img/Icon_with_text_small.png') }}" /></a>
							<span class="search-button"></span>
							<input type="text" id="search" placeholder="Search Brand Pages" />
						</div>
						<div class="right-nav">
							<ul>
								<li>
									<a href="{{ URL::route('collection_page') }}" id="collection_nav">Collection Pages </a>
								</li>
								<li>
									<a href="{{ URL::route('brand_page') }}" id="brand_nav">Brand Pages</a>
								</li>
								<li>
									<a href="{{ URL::route('help') }}" id="help_nav">Help</a>
								</li>
								<!-- <li><a href="../collection_page/info.html">Info</a></li> -->
							</ul>
						</div>
						<div class="clear"></div>
					</div>
					@yield('content')
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

