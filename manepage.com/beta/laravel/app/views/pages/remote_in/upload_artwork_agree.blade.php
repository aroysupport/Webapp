<!DOCTYPE html>
<html>
	<!-- Head Start-->
	<head>
		<meta charset="utf-8">
		<title>Aroy Innovation</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link rel="stylesheet" type="text/css" href="../landing_page/css/jcf.css" />
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
		<script type="text/javascript" src="../landing_page/js/main.js?version=1.04"></script>
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
					<div id="upload_artwork_agree_page">
						<img src="../landing_page/img/Roar_Home.png" alt="mane logo" />
						<h1>Mane Page</h1>
						<h2>Dear Artist</h2>
						<p>First upload from any device is free. When you upload artwork to<br /> Mane Page you accept the terms of our Artist Agreement.</p>
						<div class="text-agree jcf-scrollable">
							Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />Text<br />
						</div>
						<form method="post" action="#">
							<input type="submit" value="Cancel"/>
							<input type="submit" value="I Agree" name="agree" />
						</form>
					</div>
				</div>
			</div>
		</div>
		<!--content End-->
	</body>
</html>
