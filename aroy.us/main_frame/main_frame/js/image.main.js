function getImage(currentBrandID) {

	//function image(currentBrandID) {
	//var url = "http://localhost:8888/php/Brands.php?method=check";
	var url = "http://" + global_domain + "/php/Brands.php?method=image&id=" + cookieID + "&brand=" + currentBrandID;
	str = "";
	console.log("URL: ", url);
	$.ajax({
		type : "GET",
		url : url,
		datatype : "json",
	}).done(function(data) {
		console.log("-----json------> ", data);
		var json = JSON.parse(data);
		console.log("imageload function ->Status = ", document.readyState);
		console.log("json length = ", json.length);
		if (json.length > 0) {
			$('.thumbnail-block ul').empty();
			console.log("json length = ", json.length);
			// change is-checked class on buttons
			/*$('.button-group').each(function(i, buttonGroup) {
				var $buttonGroup = $(buttonGroup);
				$buttonGroup.on('click', 'a', function() {
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
*/
			var newElements = "";
			if ( typeof json === "object") {
				$.each(json, function(key, value) {
					//console.log(checkContent(value));
					//newElements += '<li><a href="#"><div class="lazy element-item ' + checkContent(value) + '"><img src="' + value["image"] + '" width="160" height="160" alt="image description"><div class="selected-box"><a class="btn-view" href="' + value["image"] + '" data-rel="lightbox">Quick View</a> </div></div></a></li>';
					newElements += '<li value="'+value["ImageID"]+'"><a href="#"><img class="lazy" src="' + value["ImageLocation"] + 
					'" alt="image description"><div class="selected-box">' + '<a class="btn-view" href="' + value["ImageLocation"] + 
					'" data-rel="lightbox">Quick View</a></div></a>' + 
					'<input type="hidden" id="ImageID" value="' + value["ImageID"] + '"/>' + 
					'<input type="hidden" id="AspectRation" value="' + value["AspectRation"] +
					'<input type="hidden" id="FileSize" value="' + value["FileSize"] +
					'<input type="hidden" id="ProductID" value="' + value["ProductID"] +
					
					 '"/></li>';
});
			}
			var $newElems = $(newElements);
			$('.thumbnail-block ul').append($newElems);
			
			$(".lazy").lazyload({
				effect : "fade",
				skip_invisible : false
			});
			/*$('.thumbnail-block ul').append($newElems).imagesLoaded(function() {

			 $('.thumbnail-block ul').isotope('appended', $newElems);

			 $(".lazy").lazyload({
			 effect : "fade",
			 skip_invisible : false
			 });

			 });*/
		}else{
			$('.thumbnail-block ul').html("");
		}
	});
}
