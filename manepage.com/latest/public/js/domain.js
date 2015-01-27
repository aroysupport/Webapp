	//var AWS = "http://manepage.com";
	var local = "http://localhost:8000";
	//var domain = AWS;
	var domain = local;
	

$(function(){
search();
activeNav();
// $.getJSON(domain+"/php/login.php?method=check", function(resopnse) {
// 		if(resopnse["expired"]!=undefined){
// 			alert(resopnse["expired"]);
// 			window.stop();
// 			window.location.replace("http://manepage.com/login");
// 		}
// 	});
});

function search() {
	var array = new Array();
	$.getJSON(domain + "/php/api_collection.php?method=search", function(data) {
		//console.log("Data: ", data);
		$.each(data, function(index, value) {
			value.value=(value.value).replace("&amp;", "&");
			//console.log("Index: " + index + " \nName: " + value.value + "\nBrandID: " + value.id);
			array.push(value);
		});
		//console.log("Array = ", array);
		$("#search").autocomplete({
			source : array,
			select : function(event, ui) {
				var str = ui.item.value;
				var newStr = str.replace(/\s+/g, '');
				console.log("link URL value: ", ui.item.value);
				console.log("link URL value trimed: ",newStr);
				window.location.href ="../"+newStr;
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


function activeNav(){
		switch(window.location.pathname){
			case "/brand_page":
				jQuery("#brand_nav").parent('li').addClass('active').siblings().removeClass('active');
				break;
			case "/collection_page":
				jQuery("#collection_nav").parent('li').addClass('active').siblings().removeClass('active');
				$("body").append("<div class='collection-footer'></div>)");
				break;
			case "/collection_content":
				jQuery("#collection_nav").parent('li').addClass('active').siblings().removeClass('active');
				break;
			case "/help":
				jQuery("#help_nav").parent('li').addClass('active').siblings().removeClass('active');
				break;
			case "/privacy":
				jQuery("#help_nav").parent('li').addClass('active').siblings().removeClass('active');
				break
			case "/agreement":
				jQuery("#help_nav").parent('li').addClass('active').siblings().removeClass('active');
				break
			case "/resources":
				jQuery("#help_nav").parent('li').addClass('active').siblings().removeClass('active');
				break
			case "/terms":
				jQuery("#help_nav").parent('li').addClass('active').siblings().removeClass('active');
				break
			default:
				jQuery("#brand_nav").parent('li').addClass('active').siblings().removeClass('active');
				break;
		}
	//});
}