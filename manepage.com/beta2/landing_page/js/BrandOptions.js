$(function() {
	brand();
	activeNav();
	search();
});
// var AWS = "http://betamanepage.com";
// var local = "http://localhost:8888/Desktop";
//
// var domain = AWS;

function activeNav() {
	jQuery('.right-nav li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

function BrandTemplate(BrandName, id, count, ChangedChar) {

	var li = $("<li/>");
	console.log("BrandName: " + BrandName + ", count: " + count + ", count%: " + count % 3);
	switch(count%3) {
	case 0:
		if (!ChangedChar) {
			console.log("Empty");
			var emptyList = $("<li/>").addClass("empty").css({
				"width" : "5%",
				"font-size" : "20pt"
			}).html('&nbsp;');
			$("#brand_page ul").append(emptyList);
		}
		li.addClass("first");
		break;
	case 1:
		li.addClass("middle");
		break;
	case 2:
		li.addClass("last");
		break;
	default:
		break;
	}
	var a = $("<a/>").attr("id", id).attr("href", "brand_content.html?brand=" + id).html(BrandName).appendTo(li);
	return li;
}

function brand() {
	var charAt = "";
	var counter = 4;
	var count = 0;
	$.getJSON(domain + "/php/api_brand.php?method=init", function(resopnse) {
		//data = resopnse;
		var temp;
		$.each(resopnse, function(index, key) {
			temp = counter % 4;
			//console.log("Index: ", counter);

			if (charAt != key['value'].charAt(0).toUpperCase()) {
				console.log("Char changed");
				charAt = key['value'].charAt(0).toUpperCase();
				//$("#brand_page ul").append(emptyList);
				//var li = $("<li/>").addClass("break").html($("<hr>"));
				$("#brand_page ul").append($("<hr>").css({
					"width" : "100%",
					"float" : "left"
				}));

				var emptyList = $("<li/>").addClass("empty").css({
					"width" : "4%",
					"font-size" : "20pt"
				}).html(charAt);
				$("#brand_page ul").append(emptyList);

				// $("#brand_page ul").append($("<div>").css({
				// "width" : "100%",
				// "float" : "left"
				// }));
				console.log("	Append");
				$("#brand_page ul").append(BrandTemplate(key['value'], key["id"], index, true));
			} else {
				console.log("	Append");
				$("#brand_page ul").append(BrandTemplate(key['value'], key["id"], index, false));
			}
			$("#brand_page").show();
			//console.log(BrandTemplate(key['Brand_name']));
			counter++;
			count++;
		});
	});

}

function brand2() {
	var charAt = "A";
	var counter = 4;
	$.getJSON(domain + "/php/api_brand.php?method=init", function(resopnse) {
		//data = resopnse;
		var temp;
		$.each(resopnse, function(index, key) {
			temp = counter % 4;
			console.log("Index: ", counter);
			if (index == 0 || temp == 0) {
				if (charAt != key['value'].charAt(0).toUpperCase()) {
					charAt = key['value'].charAt(0).toUpperCase();
					//var li = $("<li/>").addClass("break").html($("<hr>"));
					$("#brand_page ul").append($("<hr>").css({
						"width" : "90%",
						"float" : "left"
					}));
					console.log("Change Letter");
					var emptyList = $("<li/>").addClass("empty").css({
						"width" : "10%",
						"font-size" : "20pt"
					}).html(charAt);
					$("#brand_page ul").append(emptyList);
				} else {
					console.log("Empty");
					var emptyList = $("<li/>").addClass("empty").css({
						"width" : "10%"
					}).html("Empty");
					$("#brand_page ul").append(emptyList);
				}

			} else {
				if (charAt != key['value'].charAt(0).toUpperCase()) {
					charAt = key['value'].charAt(0).toUpperCase();
					//var li = $("<li/>").addClass("break").html($("<hr>"));
					// $("#brand_page ul").append($("<hr>").css({
					// "width" : "90%",
					// "float" : "left"
					// }));
				}
				$("#brand_page ul").append(BrandTemplate(key['value'], key["id"]));
				$("#brand_page").show();
			}
			//console.log(BrandTemplate(key['Brand_name']));
			counter++;
		});
	});

}

function listenBrand() {
	console.log("running listenBrand");
	$(document).on("click", "#brand_page ul li a", function(e) {
		//$().live("click",function(e) {
		e.preventDefault();
		//console.log($(this));

	});
}

function search() {
	var array = new Array();
	$.getJSON(domain + "/php/api_brand.php?method=search", function(data) {
		//console.log("Data: ", data);
		$.each(data, function(index, value) {
			//console.log("Index: " + index + " \nName: " + value.Name + "\nBrandID: " + value.BrandID);
			array.push(value);
		});
		//console.log("Array = ", array);
		$("#search").autocomplete({
			source : array,
			select : function(event, ui) {
				window.location.href = "brand_content.html?brand=" + ui.item.id;
			}
		});
	});
	$('input#search').focus(function() {
		$(".search-button").css({
			"background" : "none"
		});
		$(this).attr("placeholder", "").css({
			"padding-left" : "0"
		});

	}).blur(function() {
		$(".search-button").css({
			"background" : "url(../landing_page/img/Search_button.png)"
		});
		$(this).attr("placeholder", "Search Brand Pages").css({
			"padding-left" : "30px"
		});
		;
	});
}
