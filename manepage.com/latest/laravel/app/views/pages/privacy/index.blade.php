@extends('layout.main_layout')

@section('style')
		{{ HTML::script('js/search.js?version=1.03') }}
@stop

@section('content')	
<div id="policy_page">
	<h2>Privacy Policy</h2>
	<div id="policy">
		A URL that links to your organization's privacy policy. Privacy policies are required for
		apps that are Made for Kids or offer auto-renewable In-App Purchases or free
		subscriptions. They are also required for apps with account registration, apps that
		access a user’s existing account, or as otherwise required by law. Privacy policies are
		recommended for apps that collect user- or device-related data.
	</div>
</div>
@stop