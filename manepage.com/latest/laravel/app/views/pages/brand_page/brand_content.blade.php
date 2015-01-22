@extends('layout.main_layout')

@section('style')
{{ HTML::script('js/BrandContent.js?version=1.12') }}
@stop

@section('load')
<script>
	var brand ={{$brandID}};
	console.log("BrandID =",brand);
</script>
<div class="load">
<!--<h1>Loading</h1>-->
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
</div>
@stop

@section('content')
		
<div class="brand_content_page">
	<h3>^^Brand 1</h3>
	<div id="slider1_container">
		<!-- Loading Screen -->
		<div u="loading" id="loading">
			<div id="first-loading" ></div>
			<div id="second-loading" ></div>
		</div>
		<!-- Slides Container -->
		<div u="slides" id="slides">
		</div> 
		<!-- ThumbnailNavigator Skin Begin -->
		<div u="thumbnavigator" class="jssort11" id="thumbnavigator" >
			<!-- Thumbnail Item Skin Begin -->
			<div u="slides"style="cursor: move;">
				<div u="prototype" id="prototype" class="p" >
					<thumbnailtemplate id="thumbnailtemplate"></thumbnailtemplate>
				</div>
			</div>
			<!-- Thumbnail Item Skin End -->
		</div>
		<!-- ThumbnailNavigator Skin End -->
		<!-- Arrow Navigator Skin Begin -->
	    <!-- Arrow Left -->
        <span u="arrowleft" class="jssora13l" style="width: 45px; height: 36px; top: 123px; left: 0px;">
        </span>
        <!-- Arrow Right -->
        <span u="arrowright" class="jssora13r" style="width: 45px; height: 36px; top: 123px; right: 0px">
        </span>
        <!-- Arrow Navigator Skin End -->
	</div>
	<div class="brand_content">
		<ul>
			<li><span id="fix-product"></span></li>
			<li>Collection: <span id="fix-collection"></span></li>
			<!-- <li><span id="fix-product"></span> by <span id="fix-brand"></span></li> -->
		</ul>
	</div>
	<div class="clear"></div>
	<div class="brand_philosophy_content">
		<h4>Brand Philosophy</h4>
		<p>Today, Audemars Piguet is still the oldest fine watch-making manufacturer never to have left the hands of its founding families. This gives the company an independent streak that allows it to go its own way and follow its own unique vision.</p>
	</div>
	<div class="brand_info_content">
		<h4>Brand Info</h4>
		<p>Today, Audemars Piguet is still the oldest fine watch-making manufacturer never to have left the hands of its founding families. This gives the company an independent streak that allows it to go its own way and follow its own unique vision.</p>
	</div>
</div>
@stop
