@extends('layout.main_layout')

@section('style')
{{ HTML::script('js/BrandOptions.js?version=1.12') }}
@stop

@section('content')
<div id="brand_page">
	<h2>Brand Pages</h2>
	<ul id="triple">
		@foreach($json as $index => $key )
		<li>
			<a href="{{str_replace(' ','',$key['value'])}}">{{$key['value']}}</a>
		</li>
			@endforeach
	</ul>
</div>
@stop