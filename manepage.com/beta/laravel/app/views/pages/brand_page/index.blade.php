@extends('layout.main_layout')

@section('style')
{{ HTML::script('js/BrandOptions.js?version=1.12') }}
@stop

@section('content')
<style>
	#brand_page ul {
		width: 98%;
		margin-bottom: 20px;
		overflow: hidden;
		display: block;
	}
	#brand_page li {
		line-height: 1.5em;
		float: left;
		display: inline;
	}
	#triple li {
		width:33.3%;
	}
</style>
<div id="brand_page">
	<h2>Brand Pages</h2>
	<ul id="triple">
		@foreach($json as $index => $key )
		<li>
			<a href="{{str_replace(' ','_',$key['value'])}}">{{$key['value']}}</a>
		</li>
			@endforeach
	</ul>
</div>
@stop