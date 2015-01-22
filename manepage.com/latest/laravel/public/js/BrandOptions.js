$(function(){
	//brand();
	activeNav();
	search();
});
// var AWS = "http://betamanepage.com";
// var local = "http://localhost:8888/Desktop";
// 
// var domain = AWS;

function activeNav(){
	jQuery('.right-nav li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

function BrandTemplate(BrandName, id) {
	var li = $("<li/>");
	
	//var a = $("<a/>").attr("id", id).attr("href", "brand_content?brand=" + id).html(BrandName).appendTo(li);
	var a = $("<a/>").attr("id", id).attr("href", "brand_content?brand=" + id).html(BrandName).appendTo(li);
	//var form = $("<form/>").attr("method","post").attr("action",domain+"/brand_content?brand=" + id).appendTo(li);
	//var form = $("<form/>").attr("method","post").attr("action",domain+"/brand_content?brand=" + id).appendTo(li);
	//var input = $("<input />").attr("value", BrandName).attr('type', 'submit').appendTo(form);
	
	return li;
}


function brand() {
	$.getJSON(domain+"/php/api_brand.php?method=init", function(resopnse) {
		//data = resopnse;
		var ul =0;
		$.each(resopnse, function(index, key) {
			$("#brand_page ul:eq("+ul+")").append(BrandTemplate(key['value'], key["id"]));
			$("#brand_page").show();
			ul++;
			if(ul>2){
				ul=0;
			}
			//console.log(BrandTemplate(key['Brand_name']));
		});
	});

}

function listenBrand() {
	console.log("running listenBrand");
	$(document).on("click", "#brand_page ul li a", function(e){
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
				window.location.href ="brand_content?brand="+ui.item.id;
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
				"background" : "url(/img/Search_button.png)"
			});
			$(this).attr("placeholder", "Search Brand Pages").css({"padding-left":"30px"});;
		});
}
