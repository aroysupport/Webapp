$(function() {
	brand();
	activeNav();
	search();
});

function activeNav() {
	jQuery('.right-nav li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

var Brand = {
	previous : "",
	addChar : function(BrandName) {
		console.log("Character Changed: " + BrandName.charAt(0).toUpperCase());
		emptyList = $("<td/>");
		emptyList.addClass("empty").css({
			"width" : "5%",
			"font-size" : "22pt",
			"font-weight": "400"
		}).html(BrandName.charAt(0).toUpperCase());
		return emptyList;
	},
	addSpace : function() {
		emptyList = $("<td/>");
		emptyList.addClass("empty").css({
			"width" : "5%"
		}).html('&nbsp;');
		return emptyList;
	},
	template : function(BrandName, id) {
		var td = $("<td/>");
		var a = $("<a/>").attr("id", id).attr("href", "brand_content.html?brand=" + id).html(BrandName).appendTo(td);
		//console.log("Template		-	:", td);
		return td;
	},
	isChanged : function(current) {
		if (this.previous != current.charAt(0).toUpperCase()) {
			return true;
		} else {
			return false;
		}
	},
	getData : function() {
		$("#brand_page table tbody").empty();
		var count = 0;
		$.getJSON(domain + "/php/api_brand.php?method=init", function(response) {
			var i, x;
			var row = $("<tr/>");
			var table = $("<table/>");
			var body = $("<tbody/>").append("<tr><th/><th/><th/><th/></tr>");
			var flag = false;
			$.each(response, function(index, key) {
				if (Brand.isChanged(key['value'])) {
						if (flag) {
							if (count == 1) {
								row.append("<td/>");
								row.append("<td/>");
							} else if (count == 2) {
								row.append("<td/>");
							}
							body.append("<tr><th/><th/><th/><th/></tr>");
							row = $("<tr/>");
						}
						body.append("<tr></tr>");
						if(Brand.previous!=""){
							$("#brand_page").append(table.append(body).addClass("allBrands").attr("id", Brand.previous));
						}
						
						Brand.previous = key['value'].charAt(0).toUpperCase();
						body = $("<tbody/>").append("<tr><th/><th/><th/><th/></tr>");
						table = $("<table/>");
						row = $("<tr/>");
						row.append(Brand.addChar(key['value']));
						count = 0;
						flag = true;
				} else if (count == 0) {
					if (index == 0) {
						row.append(Brand.addChar(key['value']));
					} else {
						row.append(Brand.addSpace());
					}
				}
				$(row).append(Brand.template(key['value'], key['id']));
				count++;
				if (count > 2) {
					count = 0;
					console.log("\ngetData	-	Row: " + row.appendTo(body));
					row = $("<tr/>");
				}
			});
		});
	}
};

function brand() {
	Brand.getData();
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
