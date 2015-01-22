@extends('layout.main_layout')

@section('style')		
	{{ HTML::script('js/CollectionOption.js?version=1.06') }}
@stop

@section('content')

<div id="collection_page">
	<h2>Select a Collection</h2>
	<ul>
		<li>
			<ul id="li-first">
				<!-- <li><a href="collection_content.html">^^Collection 1</a></li>
				<li><a href="#">^^Collection 2</a></li>
				<li><a href="#">^^Collection 3</a></li>
				<li><a href="#">^^Collection 4</a></li>
				<li><a href="#">^^Collection 5</a></li> -->
			</ul>
		</li>
		<li>
			<ul id="li-second">
				<!-- <li><a href="#">^^Collection 6</a></li>
				<li><a href="#">^^Collection 7</a></li>
				<li><a href="#">^^Collection 8</a></li>
				<li><a href="#">^^Collection 9</a></li>
				<li><a href="#">^^Collection 10</a></li> -->
			</ul>
		</li>
	</ul>
</div>
@stop

