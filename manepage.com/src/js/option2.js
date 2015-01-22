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

	var row = $("<tr/>");
	var td = $("<td/>");
	console.log("BrandName: " + BrandName + ", count: " + count + ", count%: " + count % 3);
	switch(count%3) {
	case 0:
		if (!ChangedChar) {
			console.log("Empty");
			var emptyList = $("<td/>").addClass("empty").css({
				"width" : "5%",
				"font-size" : "20pt"
			}).html('&nbsp;');
			$(row).append(emptyList);
		} else {
			var emptyList = $("<td/>").addClass("empty").css({
				"width" : "4%",
				"font-size" : "20pt"
			}).html(BrandName.charAt(0).toUpperCase());
			$(row).append(emptyList);
		}
		td.addClass("first");
		break;
	case 1:
		td.addClass("middle");
		break;
	case 2:
		td.addClass("last");
		break;
	default:
		break;
	}
	var a = $("<a/>").attr("id", id).attr("href", "brand_content.html?brand=" + id).html(BrandName).appendTo(td);
	return row.append(td);
}

function brand() {
	var charAt = "";
	var counter = 4;
	var count = 0;
	$.getJSON(domain + "/php/api_brand.php?method=init", function(resopnse) {
		//data = resopnse;
		var temp;
		$.each(resopnse, function(index, key) {
			//temp = counter % 4;
			//console.log("Index: ", counter);

			if (charAt != key['value'].charAt(0).toUpperCase()) {
				console.log("Char changed");
				charAt = key['value'].charAt(0).toUpperCase();
				console.log("	Append");
				$("#brand_page table tbody").append(BrandTemplate(key['value'], key["id"], index, true));
			} else {
				console.log("	Append");
				$("#brand_page table tbody").append(BrandTemplate(key['value'], key["id"], index, false));
			}
			$("#brand_page").show();
			//console.log(BrandTemplate(key['Brand_name']));
			counter++;
			count++;
		});
	});

}

function listenBrand() {
	console.log("running listenBrand");
	$(document).on("click", "#brand_page table td a", function(e) {
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
