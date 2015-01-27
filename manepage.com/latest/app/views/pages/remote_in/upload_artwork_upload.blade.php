<!DOCTYPE html>
<html>
	<!-- Head Start-->
	<head>
		<meta charset="utf-8">
		<title>Aroy Innovation</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!--link style-->
		<!-- <link rel="stylesheet" type="text/css" href="../landing_page/css/jcf.css" />
		<link rel="stylesheet" type="text/css" href="../landing_page/css/fancybox.css" />
		<link rel="stylesheet" type="text/css" href="../landing_page/css/jssort.css" />
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="../landing_page/css/slider.css" />
		<link rel="stylesheet" type="text/css" href="../landing_page/css/main.css?version=1.10">
		
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="//code.jquery.com/ui/1.11.1/jquery-ui.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write('<script src="../landing_page/js/jquery-1.11.1.min.js"><\/script>');
		</script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
		<script type="text/javascript" src="../landing_page/js/lib/isotope/isotope.pkgd.min.js"></script>
		<script type="text/javascript" src="../landing_page/js/lib/imageload/imagesloaded.pkgd.min.js"></script>
		<script type="text/javascript" src="../landing_page/js/lib/fileupload/jquery.fileupload.js"></script>
		<script type="text/javascript" src="../landing_page/js/contentTabs.main.js"></script>
		<script type="text/javascript" src="../landing_page/js/image.main.js"></script>
		<script type="text/javascript" src="../landing_page/js/jquery.main.js"></script>
		<script type="text/javascript" src="../landing_page/js/slider-master/js/jssor.slider.min.js"></script>
		<script type="text/javascript" src="../landing_page/js/slider.js"></script>
		<script type="text/javascript" src="../landing_page/js/main.js?version=1.04"></script> -->
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
		{{ HTML::script('js/jquery.main.js') }}
		{{ HTML::script('js/slider-master/js/jssor.slider.min.js') }}
		{{ HTML::script('js/slider.js') }}
		{{ HTML::script('js/main.js?version=1.04') }}
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
							<a href="../index.html"><img src="../landing_page/img/Icon_with_text_small.png" /></a>
							<span class="search-button"></span>
							<input type="text" placeholder="Search Brand Pages" />
						</div>
						<div class="right-nav">
							<ul>
								<li><a href="collection_page.html">Collection </a></li>
								<li class="active"><a href="brand_page.html">My Brands</a></li>
								<li><a href="info.html">Info</a></li>
								<li><a href="upload_artwork_agree.html">Upload Artwork</a></li>
								<li><a href="#disconnect_popup" class="lightbox" id="disconnected">Disconnect</a></li>
							</ul>
						</div>
						<div class="clear"></div>
					</div>
					<div id="upload_artwork_upload_page">
						<p>Mane Page uploads a preview of artwork. The file size of a preview is pretty small. All previews are automatically water-marked with a Mane Page logo.</p>
						<!--upload page-->	
						<div class="upload-block">
							<form class="upload-form" action="#">
								<fieldset>
									<div class="row">
										<input id="img-uploader"type="file" data-jcf='{"buttonText": "Browse" }'>
									</div>
									<div class="row">
										<label>Brand name</label>
										<select>
											<option></option>
										</select>
									</div>
									<div class="row">
										<div class="box">
											<div class="inner-row">
												<label for="keyword1">#Keyword1</label>
												<input id="keyword1" type="text" placeholder="#keyword1">
											</div>
											<div class="inner-row">
												<label for="keyword2">#Keyword2</label>
												<input id="keyword2" type="text" placeholder="#keyword2">
											</div>
										</div>
										<div class="box">
											<div class="inner-row">
												<label for="username">Username</label>
												<input id="username" type="text" placeholder="^^Auto">
											</div>
											<div class="inner-row">
												<label for="aspectRatio">Aspect Ratio</label>
												<input id="aspectRatio" type="text" placeholder="^^Auto">
											</div>
										</div>
										<div class="box">
											<div class="inner-row">
												<label for="date">Date</label>
												<input id="date" type="text" placeholder="^^Auto">
											</div>
											<div class="inner-row">
												<label for="size">^^File Size</label>
												<input id="size" type="text" placeholder="^^Auto">
											</div>
										</div>
									</div>
									<div class="files"></div>
									<div class="outer">
										<div class="thumbnail">
											
										</div>
										<input type="submit" value="Save">
									</div>
								</fieldset>
							</form>
						</div>
						<!--upload page end-->
					</div>
				</div>
			</div>
		</div>
		<!--content End-->
	</body>
</html>
