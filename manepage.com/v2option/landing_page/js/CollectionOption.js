$(function(){
	search();
	collection();
	activeNav();
});
// var AWS = "http://betamanepage.com";
// var local = "http://localhost:8888/Desktop";
// 
// var domain = local;
function activeNav(){
	jQuery('.right-nav li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
}

function CollectionTemplate(CollectionName, id) {
	var li = $("<li/>");
	var a = $("<a/>").attr("id", id).attr("href", "collection_content.html?collection=" + id).html(CollectionName).appendTo(li);
	return li;
}


function collection() {
	$.getJSON(domain+"/php/api_Collection.php?method=init", function(resopnse) {
		//data = resopnse;
		var count = 0;
		//console.log("length : ", Object.keys(resopnse).length/2);
		$.each(resopnse, function(index, key) {
			if(count< (Object.keys(resopnse).length/2)){
				$("#collection_page ul:eq(1)").append(CollectionTemplate(key['Collection_name'], key["Collection_id"]));			
			}else{
				$("#collection_page ul:eq(2)").append(CollectionTemplate(key['Collection_name'], key["Collection_id"]));					
			}
			count++;
			//$("#collection_page").show();
			//console.log(BrandTemplate(key['Brand_name']));
		});
	});

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
