function imageload(currentBrandID) {

	//function image(currentBrandID) {
	//var url = "http://localhost:8888/php/Brands.php?method=check";
	var url = "http://" + global_domain + "/php/Brands.php?method=image&id=" + cookieID + "&brand=" + currentBrandID;
	str = "";
	console.log("URL: ", url);
	$('.thumbnail-block ul').empty();

	$.ajax({
		type : "GET",
		url : url,
		datatype : "json",
	}).done(function(data) {
		console.log("-----json------> ", data);
		var json = JSON.parse(data);
		/*if ( typeof json === "object") {
		//console.log("json, ", json);
		//console.log("typeof Json, ", typeof json);
		$.each(json, function(index, key) {
		console.log("index = "+index+", key"+key);
		});
		}*/
		//}
		console.log("imageload function ->Status = ", document.readyState);
		
		/*$('.thumbnail-block ul').isotope({
		 itemSelector : '.element-item',
		 layoutMode : 'fitRows',
		 resizesContainer : false
		 });*/
		$('#filters').on('click', 'button', function(event) {
			event.preventDefault();
			var filterValue = $(this).attr('data-filter');
			//console.log(filterValue);
			/*if(filterValue=="*"){
			$('#content_header').html("Content Manager - All Content");
			}else if(filterValue==".owned"){
			$('#content_header').html("Content Manager - Owned Content");
			}else if(filterValue==".User"){
			$('#content_header').html("Content Manager - User Content");
			}else if(filterValue==".prepared"){
			$('#content_header').html("Content Manager - Prepared Content");
			}else if(filterValue==".licensed"){
			$('#content_header').html("Content Manager - Licensed Content");
			}*/
			// use filterFn if matches value
			$('.image-container').isotope({
				filter : filterValue
			});
		});
		// change is-checked class on buttons
		$('.button-group').each(function(i, buttonGroup) {
			var $buttonGroup = $(buttonGroup);
			$buttonGroup.on('click', 'button', function() {
				$buttonGroup.find('.is-checked').removeClass('is-checked');
				$(this).addClass('is-checked');
			});
		});
		//
		// here i will be using data through api
		// For now I am using i am defining json manually
		// var json is defined at top of this code
		// considering json return was success
		//$.getJSON(APIURL, function (json) {
		function checkContent(value) {
			var str = "";
			if (value["owned"] == "true") {
				str += "owned ";
			}
			if (value["licensed"] == "true") {
				str += "licensed ";
			}
			if (value["User"] == "true") {
				str += "User ";
			}
			if (value["prepared"] == "true") {
				str += "prepared ";
			}
			return str;
		}

		var newElements = "";
		var blockSize = (json.length / 2) * 160;
		if ( typeof json === "object") {
			if (json != null) {
				$.each(json, function(key, value) {
					//console.log(checkContent(value));
					//newElements += '<li><a href="#"><div class="lazy element-item ' + checkContent(value) + '"><img src="' + value["image"] + '" width="160" height="160" alt="image description"><div class="selected-box"><a class="btn-view" href="' + value["image"] + '" data-rel="lightbox">Quick View</a> </div></div></a></li>';
					newElements += '<li><a href="#"><img src="' + value["ImageLocation"] +
					 '" width="160" height="160" alt="image description"><div class="selected-box">'+
					 '<a class="btn-view" href="' + value["ImageLocation"] + 
					  '" data-rel="lightbox">Quick View</a></div></a>'+
					  '<input type="hidden" id="ImageID" value="' +value["ImageID"] + '"/>'+
					  '<input type="hidden" id="AspectRation" value="' +value["AspectRation"] + '"/></li>';
					//newElements += '<li class="selected"><a href="#">' + '<img src="' + value["image"] + '" width="160" height="160" alt="image description"></a>' + '<div class="selected-box"><span class="txt">Selection</span>' + '<a class="btn-view" href="images/img1.jpg" data-rel="lightbox">Quick View</a></div></li>';
				});
			}
		}
		var $newElems = $(newElements);
		$('.thumbnail-block ul').append($newElems);
		/*$('.thumbnail-block ul').append($newElems).imagesLoaded(function() {

		 $('.thumbnail-block ul').isotope('appended', $newElems);

		 $(".lazy").lazyload({
		 effect : "fade",
		 skip_invisible : false
		 });

		 });*/

	});
}
