@extends('layout.main_layout')

@section('style')

{{ HTML::script('js/BrandContent.js?version=1.12') }}
@stop

@section('load')

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
	<h3>{{$Brand_name}}</h3>
	<div id="slider1_container">
		<!-- Loading Screen -->
		<div u="loading" id="loading">
			<div id="first-loading" ></div>
			<div id="second-loading" ></div>
		</div>
		<!-- Slides Container -->
		<div u="slides" id="slides">
			@foreach($ImageLocation as $index => $value)
			<div class="image">
				<img u="image" src="{{$value['ImageLocation']}}">
				<div u="thumb">
					<img class="i" src="{{$value['ImageLocation']}}" style="width: 99%; height: 95px;">
				</div>
				<input type="hidden" class="collection" value="{{$value['CollectionName']}}">
				<input type="hidden" class="product" value="{{$value['ProductName']}}">
			</div>
			@endforeach
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
		<p>{{$Brand_philo}}</p>
	</div>
	<div class="brand_info_content">
		<h4>Brand Info</h4>
		<p>{{$Brand_info}}</p>
	</div>
</div>
<script>
	$.getScript("js/slider.js");		
	$(".load").fadeOut(500);
</script>
@stop
