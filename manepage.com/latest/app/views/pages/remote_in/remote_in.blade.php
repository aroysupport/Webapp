<!DOCTYPE html>
<html>
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
		window.jQuery || document.write('<script src="{{ url('js/jquery-1.11.1.min.js') }}"><\/script>');
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		{{ HTML::script('js/lib/isotope/isotope.pkgd.min.js') }}
		{{ HTML::script('js/lib/imageload/imagesloaded.pkgd.min.js') }}
		{{ HTML::script('js/lib/fileupload/jquery.fileupload.js') }}
		{{ HTML::script('js/contentTabs.main.js') }}
		{{ HTML::script('js/image.main.js') }}
		{{ HTML::script('js/remote_in.js?version=1.04') }}
		{{ HTML::script('js/jquery.main.js') }}
		{{ HTML::script('js/slider-master/js/jssor.slider.min.js') }}
		{{ HTML::script('js/slider.js') }}
		{{ HTML::script('js/main.js?version=1.04') }}
	</head>
	<body>
		<!-- <div class="load">
			<h1>Coming Soon</h1>
			<div id="floatingCirclesG">
				<div class="f_circleG" id="frotateG_01"></div>
				<div class="f_circleG" id="frotateG_02"></div>
				<div class="f_circleG" id="frotateG_03"></div>
				<div class="f_circleG" id="frotateG_04"></div>
				<div class="f_circleG" id="frotateG_05"></div>
				<div class="f_circleG" id="frotateG_06"></div>
				<div class="f_circleG" id="frotateG_07"></div>
				<div class="f_circleG" id="frotateG_08"></div>
			</div>
		</div> -->
		
	<!-- 	<div class="popup-holder">
			<div id="disconnect_popup" class="lightbox popup-disconnect">
				<form class="add-form popup-disconnect" action="#">
					<fieldset>
						<h4>Are you sure to disconnect from this site?</h4>
						<a href="#" class="close cancelReset">Cancel</a>
						<a href="#" class="close" id="disconnect">Ok</a>
					</fieldset>
				</form>
			</div>
		</div> -->
		
		<div class="wrapper">
			<div class="wrapper-container">
				<div class="content">
					<div id="remote_home_page">
						<img src="{{URL::asset('img/Roar_Home.png')}}" alt="Mane Logo" />
						<form method="post" action="#">
							<div class="hint-text">
								<input type="input" placeholder="Device Number" name="deviceNumber" />
								<a href="#">What is this?</a>
							</div>
							<input type="checkbox">
							<label>Store an safe, anonymous cookie
								<br />
								in my browser to remember me</label>
							<br />
							<input type="button" id="btn-remote-login" value="Enter" name="submit"/>
						</form>
					</div>
				</div>
			</div>
		</div>
		
	</body>
</html>

