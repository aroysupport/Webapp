@extends('layout.main_layout')

@section('style')
		{{ HTML::script('js/search.js?version=1.03') }}
@stop

@section('content')	
<div id="support_page">
	<h2>Question? Please email us</h2>
	<h2><a href="mailto:support@manepage.com">support@manepage.com</a></h2>
	<h3><br><a href="{{ URL::route('privacy') }}">Read our Privacy Policy</a></h3>
	<h3><br><a href="{{ URL::route('terms') }}">Read our Terms</a></h3>
	<h3><br><a href="{{ URL::route('agreement') }}">Read our Artist Agreement</a></h3>
	<h3><br><a href="{{ URL::route('resources') }}">More artist resources</a></h3>
</div>
@stop
