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

var Brand = {
	previous : "",
	addChar : function(BrandName) {
		console.log("Character Changed: " + BrandName.charAt(0).toUpperCase());
		emptyList = $("<td/>");
		emptyList.addClass("empty").css({
			"width" : "5%",
			"font-size" : "20pt"
		}).html(BrandName.charAt(0).toUpperCase());
		return emptyList;
	},
	addSpace : function() {
		emptyList = $("<td/>");
		emptyList.addClass("empty").css({
			"width" : "5%",
			"font-size" : "20pt"
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
			this.previous = current.charAt(0).toUpperCase();
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
			var body = $("<tbody/>");
			//for ( i = 0; i <= response.length - 3; i += 3) {
			//while(i<response.length){
			console.log("----------- Count = " + i);

			//-----------------------------------------------------
			//for (  x= i; x <i+3 ; x ++) {
			$.each(response, function(index, key) {
				//var key = response[i];
				console.log("------Brand Name: " + key['value']);
				if (Brand.isChanged(key['value'])) {
					$("#brand_page").append(table.append(body).addClass("allBrands").attr("id", Brand.previous));
					table = $("<table/>");
					body = $("<tbody/>");
					
					row = $("<tr/>");
					row.append(Brand.addChar(key['value']));
					count = 0;
				} else if (count == 0) {
					row.append(Brand.addSpace());
				}
				$(row).append(Brand.template(key['value'], key['id']));
				//}
				count++;
				if (count > 2) {
					count = 0;
					console.log("\ngetData	-	Row: " + row.appendTo(body));
					row = $("<tr/>");

				}
			});
			//-----------------------------------------------------
			// var key1 = response[i + 1];
			// console.log("------Brand Name: " + key1['value']);
			// if (Brand.isChanged(key1['value'])) {
			// row = $("<tr/>").addClass("allBrands").attr("id",Brand.previous);
			// row.append(Brand.addChar(key1['value']));
			// } else {
			// row.append(Brand.addSpace());
			// }
			// $(row).append(Brand.template(key1['value'], key1['id']));
			//
			// //-----------------------------------------------------
			// var key2 = response[i + 2];
			// console.log("------Brand Name: " + key2['value']);
			//
			// if (Brand.isChanged(key2['value'])) {
			// row = $("<tr/>").addClass("allBrands").attr("id",Brand.previous);
			// row.append(Brand.addChar(key2['value']));
			// } else {
			// row.append(Brand.addSpace());
			// }
			// $(row).append(Brand.template(key2['value'], key2['id']));
			//
			// console.log("\ngetData	-	Row: " + row);
			// $("#brand_page table tbody").append(row);
			// row = $("<tr/>");
			//}

			// $.each(response, function(index, key) {
			// row = Brand.checker(key['value'], key["id"], index, row);
			// if(count==index){
			// count+3;
			// row = $("<tr/>");
			// console.log("getData	-	Row: "+ row);
			// }
			//
			// });
		});
	}
};

function brand() {
	Brand.getData();
	// var charAt = "";
	// var counter = 4;
	// var count = 0;
	// $.getJSON(domain + "/php/api_brand.php?method=init", function(resopnse) {
	// //data = resopnse;
	// var temp;
	// $.each(resopnse, function(index, key) {
	// //temp = counter % 4;
	// //console.log("Index: ", counter);
	//
	// if (charAt != key['value'].charAt(0).toUpperCase()) {
	// console.log("Char changed");
	// charAt = key['value'].charAt(0).toUpperCase();
	// console.log("	Append");
	// temp = BrandTemplate(key['value'], key["id"], index, true)
	// $("#brand_page table tbody").append(BrandTemplate(key['value'], key["id"], index, true));
	// } else {
	// console.log("	Append");
	//
	// $("#brand_page table tbody").append(BrandTemplate(key['value'], key["id"], index, false));
	// }
	// $("#brand_page").show();
	// //console.log(BrandTemplate(key['Brand_name']));
	// counter++;
	// count++;
	// });
	// });

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
