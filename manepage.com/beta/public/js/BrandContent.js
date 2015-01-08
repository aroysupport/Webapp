// $(function() {
	// //search();
	// // if(getURLParameter("brand")==null){
		// // $(".load").fadeOut(500);
		// // $(".brand_content_page").html($("<div/>").addClass("load").css("position", "relative").html($("<h1/>").html("Can't find content")));
	// // }else{
	// //$.getJSON(domain+"/php/api_brand.php?method=Brand_page&brand="+brand, function(resopnse) {
		// //console.log(resopnse);
// 		
	// //});
// 	
	// //activeNav();
	// //}
// });
// // function activeNav() {
	// // jQuery('.right-nav li a').on('click', function(e) {
		// // // Change/remove current tab to active
		// // jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	// // });
// // }
// 
// function image(url, collection, product) {
	// var div = $("<div/>").addClass("image");
	// var img = $("<img/>").attr("u", "image").attr("src", url).appendTo(div);
	// var tumb = $("<div/>").attr("u", "thumb").appendTo(div);
	// var tumb_img = $("<img/>").addClass("i").attr("src", url).css({"width":"99%","height":"95px"}).appendTo(tumb);
	// /*var newImag = $("<div/>").css({"width":"99%",
									// "height":"95px",
									// "background-image":"url("+url+")",
									// "background-position": "center center",
									// "background-repeat": "no-repeat",
									// "background-size": "contain"}).appendTo(tumb);*/
// 	
// 	
	// // <div style="width: 100%; height: 100%; background-image: url(../img/alila/thumb-01.jpg); background-position: center center; background-repeat: no-repeat; ">
        // // </div>
// 	
// 	
	// var collection = $("<input/>").attr("type", "hidden").addClass("collection").attr("value", collection).appendTo(div);
	// //var brand = $("<input/>").attr("type", "hidden").addClass("brand").html(brand).appendTo(div);
	// var product = $("<input/>").attr("type", "hidden").addClass("product").attr("value",product).appendTo(div);
	// return div;
// }
// 
// function getURLParameter(name) {
	// return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
// }
// 
// function getContent(brandName, BrandPhli,BrandInfo,images){
					// $(".brand_content_page h3").html(brandName);
					// $(".brand_content_page .brand_content li #fix-brand").html(brandName);
					// $(".brand_philosophy_content p").html(BrandPhli);
					// $(".brand_info_content p").html(BrandInfo);
					// var count = 0;
					// $.each(images, function(i, url) {
						// //console.log(image(url["ImageLocation"], url["CollectionName"], url["ProductName"]), count);
						// $("#slides").append(image(url["ImageLocation"], url["CollectionName"], url["ProductName"]));
					// });
					// $.getScript("js/slider.js");
// 				
	// $(".load").fadeOut(500);
	// }
// // function search() {
	// // var array = new Array();
	// // $.getJSON(domain + "/php/api_collection.php?method=search", function(data) {
		// // //console.log("Data: ", data);
		// // $.each(data, function(index, value) {
			// // //console.log("Index: " + index + " \nName: " + value.Name + "\nBrandID: " + value.BrandID);
			// // array.push(value);
		// // });
		// // //console.log("Array = ", array);
		// // $("#search").autocomplete({
			// // source : array,
			// // select : function(event, ui) {
				// // window.location.href ="brand_content?brand="+ui.item.id;
			// // }
		// // });
	// // });
	// // $('input#search').focus(function() {
			// // $(".search-button").css({
				// // "background" : "none"
			// // });
			// // $(this).attr("placeholder", "").css({"padding-left":"0"});
// // 			
		// // }).blur(function() {
			// // $(".search-button").css({
				// // "background" : "url(img/Search_button.png)"
			// // });
			// // $(this).attr("placeholder", "Search Brand Pages").css({"padding-left":"30px"});;
		// // });
// // }