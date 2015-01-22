$(function(){
search();
});

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
				window.location.href ="../brand_page/"+ui.item.value;
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