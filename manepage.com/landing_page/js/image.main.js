function imageload() {
  	console.log("imageload function ->Status = ",document.readyState);
	// For Ajax testing
	var json = [{
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "true",
		"licensed" : "true",
		"User" : "true",
		"prepared" : "true"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "true",
		"licensed" : "false",
		"User" : "false",
		"prepared" : "false"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "false",
		"licensed" : "true",
		"User" : "false",
		"prepared" : "false"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "false",
		"licensed" : "false",
		"User" : "true",
		"prepared" : "false"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "false",
		"licensed" : "false",
		"User" : "false",
		"prepared" : "true"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "false",
		"licensed" : "true",
		"User" : "true",
		"prepared" : "false"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "false",
		"licensed" : "true",
		"User" : "false",
		"prepared" : "true"
	}, {
		"image" : "http://s3-us-west-2.amazonaws.com/test.aroy/fdf092ef-d60a-4aef-ad7e-82b892a71254.jpg",
		"owned" : "true",
		"licensed" : "false",
		"User" : "true",
		"prepared" : "false"
	}];

	var APIURL = "http://www.wookmark.com/api/json?type=search&term=small";
	var small_img = "http://www.appelsiini.net/projects/lazyload/img/grey.gif";

	$('.image-container').isotope({
		itemSelector : '.element-item',
		layoutMode : 'fitRows',
		resizesContainer : false
	});
	$('#filters').on( 'click', 'button', function(event) {
		event.preventDefault();
    	var filterValue = $( this ).attr('data-filter');
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
    $('.image-container').isotope({ filter: filterValue });
  });
  // change is-checked class on buttons
  $('.button-group').each( function( i, buttonGroup ) {
    var $buttonGroup = $( buttonGroup );
    $buttonGroup.on( 'click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $( this ).addClass('is-checked');
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
	var blockSize =(json.length/2)*160;
	$.each(json, function(key, value) {
		//console.log(checkContent(value));
		newElements += '<li><a href="#"><div class="lazy element-item ' + checkContent(value) + '"><img src="' + value["image"] + '" width="160" height="160" alt="image description"><div class="selected-box"><a class="btn-view" href="' + value["image"] + '" data-rel="lightbox">Quick View</a> </div></div></a></li>';
		
	});
	$(".image-container").height(blockSize);
	var $newElems = $(newElements);
	
	$('.image-container').append($newElems).imagesLoaded(function() {

		$('.image-container').isotope('appended', $newElems);

		$(".lazy").lazyload({
			effect : "fade",
			skip_invisible : false
		});

	});
}
