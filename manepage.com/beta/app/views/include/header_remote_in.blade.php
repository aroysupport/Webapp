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

<div class="header">
	<div class="left-nav">
		<a href="{{ URL::route('index') }}"><img src="{{ URL::asset('img/Icon_with_text_small.png') }}" /></a>
		<!--<span class="search-button"></span>-->
		<input type="text" placeholder="Search Brand Pages" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Search Brand Pages'" />
	</div>
	<div class="right-nav">
		<ul>
			<li class="{{ Request::is( 'remote_in/collection_page') || Request::is( 'remote_in/collection_content') ? 'active' : '' }}"><a href="{{ URL::route('remote_in_collection_page') }}">Collection </a></li>
			<li class="{{ Request::is( 'remote_in/brand_page') || Request::is( 'remote_in/brand_content') ? 'active' : '' }}"><a href="{{ URL::route('remote_in_brand_page') }}">My Brands</a></li>
			<li class="{{ Request::is( 'remote_in/info') ? 'active' : '' }}"><a href="{{ URL::route('remote_in_info') }}">Info</a></li>
			<li class="{{ Request::is( 'remote_in/upload_artwork_agree') || Request::is( 'remote_in/upload_artwork_upload') || Request::is( 'remote_in/upload_artwork_tag') || Request::is( 'remote_in/upload_artwork_information')? 'active' : '' }}"><a href="{{ URL::route('remote_in_upload_artwork_agree') }}">Upload Artwork</a></li>
			<li>{{HTML::link('#disconnect_popup','Disconnect', array('class'=>'lightbox','id'=>'disconnected'))}}</li>
		</ul>
	</div>
	<div class="clear"></div>
</div>
					
