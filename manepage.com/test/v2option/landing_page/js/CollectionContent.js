$(function() {
	// var AWS = "http://betamanepage.com";
	// var local = "http://localhost:8888/Desktop";
// 
	// var domain = local;
	search();
	console.log("URL = ", getURLParameter("collection"));
	if(getURLParameter("collection")==null){
		$(".load").fadeOut(500);
		$(".collection_content_page").html($("<div/>").addClass("load").css("position", "relative").html($("<h1/>").html("Can't find content")));
	}else{
	$.getJSON(domain + "/php/api_collection.php?method=Collection_page&collection=" + getURLParameter("collection"), function(resopnse) {
		//console.log(resopnse);
		$.each(resopnse, function(index, key) {
			//console.log("index", index);
			switch(index) {
			// case "Brand_name":
			// $(".collection_content_page h3").html(key);
			// $(".collection_page .brand_content li:eq(3)").html(key);
			// break;
			// case "Collection_id":
			// break;
			// case "Brand_philo":
			// $(".brand_philosophy_content p").html(key);
			// break;
			// case "Brand_info":
			// $(".brand_info_content p").html(key);
			// break;
			case "ImageLocation":
				var count = 0;
				$.each(key, function(i, url) {
					//console.log(image(url["ImageLocation"], url["CollectionName"], url["ProductName"]), count);
					$("#slides").append(image(url["ImageLocation"], url["BrandName"], url["ProductName"]));
				});
				$.getScript("../landing_page/js/slider.js");
				break;
			case "Collection_name":
				$(".collection_content_page h3").html(key);
				//	console.log("collection Name : ", key);
				$(".collection_content_page .collection_content li #fix-collection").html(key);
				break;
			// case "ProductName":
			// //console.log("Product Name : ", key);
			// //$(".brand_content_page .brand_content li:eq(1)").html(key);
			// break;
			default:
				break;

			}
		});
		$(".load").fadeOut(500);
	});

	activeNav();
	}
});
// function caption() {
// var slides = $("#slider1_container #slides")[1];
//
// $.each($(slides).find(".image"), function(index) {
//
// console.log("Left: ", $(this).css("left"));
// console.log("Top: ", $(this).css("top"));
// if ($(this).css("left") == "0px" && $(this).css("top") == "0px") {
// console.log($(this).find("img").attr("src"));
// console.log("collection : ", $(this).find(".collection").attr("value"));
// $(".brand_content_page .brand_content li:eq(0)").html($(this).find(".collection").attr("value"));
// console.log("Product : ", $(this).find(".product").attr("value"));
// $(".brand_content_page .brand_content li:eq(1)").html($(this).find(".product").attr("value"));
// }
//
// });
// }

function activeNav() {
	jQuery('.right-nav li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

function image(url, brand, product) {
	var div = $("<div/>").addClass("image");
	var img = $("<img/>").attr("u", "image").attr("src", url).appendTo(div);
	var tumb = $("<div/>").attr("u", "thumb").appendTo(div);
	var tumb_img = $("<img/>").addClass("i").attr("src", url).css({"width":"99%","height":"95px"}).appendTo(tumb);
	//var collection = $("<input/>").attr("type", "hidden").addClass("collection").attr("value", collection).appendTo(div);
	var brand = $("<input/>").attr("type", "hidden").addClass("brand").attr("value", brand).appendTo(div);
	var product = $("<input/>").attr("type", "hidden").addClass("product").attr("value", product).appendTo(div);
	return div;
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
}

function search() {
	var array = new Array();
	$.getJSON(domain + "/php/api_collection.php?method=search", function(data) {
		//console.log("Data: ", data);
		$.each(data, function(index, value) {
			//console.log("Index: " + index + " \nName: " + value.Name + "\nBrandID: " + value.BrandID);
			array.push(value);
		});
		//console.log("Array = ", array);
		$("#search").autocomplete({
			source : array,
			select : function(event, ui) {
				window.location.href ="../brand_page/brand_content.html?brand="+ui.item.id;
			}
		});
	});
	$('input#search').focus(function() {
			$(".search-button").css({
				"background" : "none"
			});
			$(this).attr("placeholder", "").css({"padding-left":"0"});
			
		}).blur(function() {
			$(".search-button").css({
				"background" : "url(../landing_page/img/Search_button.png)"
			});
			$(this).attr("placeholder", "Search Brand Pages").css({"padding-left":"30px"});;
		});
}