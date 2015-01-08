<!DOCTYPE html>
<html>
	<!-- Head Start-->
	<head>
		<meta charset="utf-8">
		<title>Aroy Innovation</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		{{ HTML::style('css/jcf.css') }}
		{{ HTML::style('css/fancybox.css') }}
		{{ HTML::style('css/jssort.css') }}
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		{{ HTML::style('css/slider.css') }}
		{{ HTML::style('css/main.css?version=1.10') }}
		
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="../landing_page/js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		{{ HTML::script('js/slider.js') }}
		{{ HTML::script('js/lib/isotope/isotope.pkgd.min.js') }}
		{{ HTML::script('js/lib/imageload/imagesloaded.pkgd.min.js') }}
		{{ HTML::script('js/lib/fileupload/jquery.fileupload.js') }}
		{{ HTML::script('js/contentTabs.main.js') }}
		{{ HTML::script('js/image.main.js') }}
		{{ HTML::script('js/jquery.main.js') }}
		{{ HTML::script('js/slider-master/js/jssor.slider.min.js') }}
		{{ HTML::script('js/slider.js') }}
		{{ HTML::script('js/main.js?version=1.04.js') }}
	</head>
	<!-- end Head -->
	<!-- Body Start-->
	<body>
		<!-- Modal -->
		<div class="popup-holder">
			<div id="disconnect_popup" class="lightbox popup-disconnect">
				<form class="add-form popup-disconnect" action="#">
					<fieldset>
						<h4>Are you sure to disconnect from this site?</h4>
						<a href="#" class="close cancelReset">Cancel</a>
						<a href="#" class="close" id="disconnect">Ok</a>
					</fieldset>
				</form>
			</div>
		</div>
		<!-- popup end -->
		<div class="wrapper">
			<div class="wrapper-container">
				<div class="main_page">
					<div class="header">
						<div class="left-nav">
							<a href="{{ URL::route('index') }}"><img src="{{ URL::asset('img/Icon_with_text_small.png') }}" /></a>
							<span class="search-button"></span>
							<input type="text" placeholder="Search Brand Pages" />
						</div>
						<div class="right-nav">
							<ul>
								<li><a href="{{ URL::route('remote_in_collection_page') }}">Collection </a></li>
								<li class="active"><a href="{{ URL::route('remote_in_brand_page') }}">My Brands</a></li>
								<li><a href="{{ URL::route('remote_in_info') }}">Info</a></li>
								<li><a href="{{ URL::route('remote_in_upload_artwork_agree') }}">Upload Artwork</a></li>
								<li><a href="#disconnect_popup" class="lightbox" id="disconnected">Disconnect</a></li>
							</ul>
						</div>
						<div class="clear"></div>
					</div>
					@yield('content')
				</div>
			</div>
		</div>
		<!--content End-->
	</body>
</html>



