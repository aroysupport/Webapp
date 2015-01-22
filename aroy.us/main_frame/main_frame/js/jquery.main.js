/*-------------------------------Variables-----------------------------------------------*/
//var cookieID;
//var currentAccountID;
//var currentBrandID;
//var currentBrandName;
var ajaxFlag;
//var initFlag = true;
//var updated_array = new Array();
var compaignImage;
//var compaignImage_list = new Array();
if (getURLParameter('id')) {
	cookieID = getURLParameter('id');
}
var global_domain = "accounts.aroy.us/";
var currentPage;
//var global_domain = "aroy.us";

/*-------------------------------Main-----------------------------------------------*/
$(function() {
	/*------------Init-----------*/
	ajaxCount();
	getAccountInfo();
	tableController.bind();

	post("postBrand", ".brand-block form.Post, .brand-block2 form, .micro-block");
	post("postProduct", ".product-block form.Post");
	post("postCampaign", "form.compaign-form");
	post("postCampaignImage", "form.content-form");

	events.attach();
	initSelect();

	logout();

});
/*-------------------------------Main End-----------------------------------------------*/

function style() {
	initDatepicker();
	initOpenClose();
	initLightbox();
	initTabs();
	initCustomForms();
	console.log("initAddClasses()");
	initAddClasses();
	initPopups();
	jQuery('input, textarea').placeholder();
}

function ajaxCount() {
	var counter = 0;
	$(document).ajaxStart(function() {
		counter++;
		ajaxFlag = true;
	});

	$(document).ajaxStop(function() {
		counter--;
		current.Brand.set($(".accountBrand").val());
		if (counter == 0) {
			style();
			$(".load").fadeOut(500);
			ajaxFlag = false;
			events.Product.update();
		}
	});
}

/*-------------------------------Init-----------------------------------------------*/
function initData() {
	var url = "http://" + global_domain + "/php/Brands.php?method=init";
	str = "";
	console.log("URL: ", url);
	$.ajax({
		type : "GET",
		url : url
	}).done(function() {
		getData(".accountBrand", "brand");
		getData(".collection", "collection");
	});
}

/*-------------------------------GET Data-------------------------------------------*/
function getAccountInfo() {
	var url = "http://" + global_domain + "/php/Brands.php?method=check";
	str = "";
	console.log("URL: ", url);
	$.ajax({
		type : "GET",
		url : url,
	}).done(function(data) {
		var json = JSON.parse(data);
		if ( typeof json === "object") {
			$.each(json, function(index, key) {
				if (index == "userID") {
					$(".name").html(key);
					$(".upload-form #username").val(key);
				} else {
					str += "<option value=" + index + "> " + key + "</option>";

				}

			});
			$(".accountID").html(str);
			current.Account.set($(".accountID").val());
			MainControl();
		} else {
			window.location.replace(json);
		}
	});
}

function getCampaignImage() {
	$.getJSON("http://" + global_domain + "/php/Brands.php?method=CampaignImage&brand=" + current.Brand.get(), function(data) {
		//var items = [];
		compaignImage = data;
	});

}

function is_containImage(imageID) {
	console.log("Image- > ", imageID);
	$.each(compaignImage, function(key, val) {
		if ($.inArray(imageID, val) > -1) {
			console.log("		Campaign -> ", key);
			queue.campaignImage.push(key);
		}
	});
}

/*
 * Function to GET data from service calls
 *
 *
 * @param element 	- class or id element that will append to.
 * @param method 	- method that user want to get (method: product, campaign, brand)
 * @param type 		- if user want to get the option list then (type = null)
 * 				 	- if user want to get the table content then (type = Manager)
 * @param BrandID 	- The current brand ID that global filter is using.
 */
function getData(element, method, type, BrandID) {
	var url = "http://" + global_domain + "/php/Brands.php?method=" + method + "&accountID=" + current.Account.get() + "&brand=" + current.Brand.get();
	if ( typeof type === 'undefined' || typeof type === null) {
		type = 0;
	} else {
		url = url + "&type=" + type;
	}
	console.log("URL: ", url);

	$.ajax({
		type : "GET",
		url : url,
		async : false
	}).done(function(data) {
		reset(element);
		//clean container
		if ($.trim(data).length > 1) {
			if (type == 0) {
				$(element).html(data);
			} else {
				$.when($(element).append(data)).done(function() {
					if (method == "product") {
						console.log("-------product------");

						if (element == ".product-table") {
							appendOptionToProduct();
							$(".product-table tr .brand").off();
							$(".brand").val(current.Account.get()).change();
						}
						lightboxReload();
					} else if (method == "brand") {
						if (element == ".brand-table") {
							getAllBrandInfo();
						}
						lightboxReload();
						initCustomForms();
					} else if (method == "campaign") {
						if (element == ".library-table") {
							appendCampaignToAside();
						}
					}
				});
			}
		} else {
			if (element == ".accountBrand" || element == ".campaign" || element == ".product") {
				$("<option/>").html("Empty").appendTo(element);
			}
			console.log("Data is null nothing to append");
		}
		style();
	});
}

/*
 *
 */
function appendCampaignToAside() {
	var target = $(".aside .add");
	$(".library-table tr:gt(0)").each(function() {
		var newLi = document.createElement("li");
		var newInput = document.createElement("input");
		var label = $(this).find("label").clone();
		newInput.type = "checkbox";
		newInput.id = label.attr("for");
		$(newInput).appendTo(newLi);
		$(label).appendTo(newLi);
		$(newLi).appendTo(target);
	});
}

function MainControl() {
	if ( typeof currentPage === 'undefined') {
		initData();
	} else {
		console.log("\n1. curentPage			", currentPage);
		console.log("2.CurrentAccount		= ", current.Account.get());
		console.log("3.CurrentBrand			= " + current.Brand.get() + "\n");
		switch(currentPage) {
		case "#home_page":
			$("#allpage").show();
			$(".top-bar").css("background", " none");
			break;
		case "#admin_page":
			console.log("Hide");
			$("#allpage").hide();
			$(".top-bar").css("background", " url(../main_frame/images/bg-nav.png) no-repeat 50% bottom");
			break;
		case "#brand_page":
			console.log("Hide");
			$("#allpage").hide();
			$(".top-bar").css("background", " url(../main_frame/images/bg-nav.png) no-repeat 50% bottom");
			getData(".brand-table", "brand", "manager");
			break;
		case "#help_page":
			$("#allpage").hide();
			$(".top-bar").css("background", " url(../main_frame/images/bg-nav.png) no-repeat 50% bottom");
			break;
		case "#clientele_page":
			break;
		case "#campaign_page":
			getData(".campaign", "campaign", null, current.Brand.get());
			getData(".library-table", "campaign", "manager", current.Brand.get());
			break;
		case "#content_page":
			getCampaignImage();
			getData(".library-table", "campaign", "manager", current.Brand.get());
			getData(".product", "product", null, current.Brand.get());
			getImage(current.Brand.get());
			uploader();
			break;
		case "#architecture_page":
			getData(".product-table", "product", "manager", current.Brand.get());
			getData(".brand-table", "brand", "manager");
			break;
		default:

			break;
		}
		style();
	}
}

function uploader() {
	// Get the template HTML and remove it from the doumenthe template HTML and remove it from the doument
	var previewNode = document.querySelector("#template");
	previewNode.id = "";
	var previewTemplate = previewNode.parentNode.innerHTML;
	previewNode.parentNode.removeChild(previewNode);

	var myDropzone = new Dropzone(document.body, {// Make the whole body a dropzone
		url : "main_frame/server/php/upload.php", // Set the url
		thumbnailWidth : 80,
		thumbnailHeight : 80,
		parallelUploads : 20,
		previewTemplate : previewTemplate,
		autoQueue : false, // Make sure the files aren't queued until manually added
		previewsContainer : "#previews", // Define the container to display the previews
		clickable : ".fileinput-button" // Define the element that should be used as click trigger to select files.
	});

	myDropzone.on("addedfile", function(file) {
		// Hookup the start button
		console.log("File	->	Added: " + file.name);
		//console.log("Preview Element 	-	", file.previewElement.querySelector(".start"));
		file.previewElement.querySelector(".start").onclick = function() {
			myDropzone.enqueueFile(file);
		};
	});
	myDropzone.on("sending", function(file) {
		console.log("File	->	Sending: " + file.name);
		//console.log("Progress Element 	-	", document.querySelector(".progress"));
		// Show the total progress bar when upload starts
		document.querySelector(".progress").style.opacity = "1";
		// And disable the start button
		file.previewElement.querySelector(".start").setAttribute("disabled", "disabled");
	});
	// Update the total progress bar
	myDropzone.on("uploadprogress", function(file, progress, bytesSent) {
		//console.log("Progress-bar Element 	-	", document.querySelector(".progress-bar"));
		document.querySelector(".progress-bar").style.width = progress + "%";
		document.querySelector(".progress-bar").html(progress + "%");
		console.log("File 	->	Progress", progress);
	});
	// // Hide the total progress bar when nothing's uploading anymore
	myDropzone.on("success", function(file, second) {
		console.log("File 	-	file response", file);
		console.log("File 	-	Second response", second);
	});

	// Setup the buttons for all transfers
	// The "add files" button doesn't need to be setup because the config
	// `clickable` has already been specified.
	document.querySelector(".start").onclick = function() {
		myDropzone.enqueueFiles(myDropzone.getFilesWithStatus(Dropzone.ADDED));
	};
	document.querySelector(".cancel").onclick = function() {
		myDropzone.removeAllFiles(true);
	};
}

/*--------------------------------POST Data-----------------------------------------*/
function postImage(file) {
	var json = createImageJson(file);
	var result = $.ajax({
		type : "POST",
		url : "http://" + global_domain + "/php/Brands.php?method=postImage",
		data : json
	}).done(function(respones) {
		console.log("image post respones =", respones);
		console.log("image post complete1");
	});

	result.complete(function() {
		console.log("image post complete2");
		getImage(current.Brand.get());
		upclickAllCheckbox();
	});
}

function post(method, target) {
	jQuery(target).bind('submit', function(event) {
		event.preventDefault();
		var form = this;
		if (method == "postBrand") {
			if (queue.brand.get().length > 0) {
				form = ".brand-block form.Post";
				getBrandInfo();
				// var json = ConvertFormToJSON(form, "Brand");
				var json = jsonFor.Brand();
				console.log("			Result:" + json);
			} else {
				alert("No Update");
				return;
			}
		} else if (method == "postProduct") {
			if (queue.product.get().length > 0) {
				//var json = ConvertFormToJSON(form, "Product");
				var json = jsonFor.Product();

			} else {
				alert("No Update");
				return;
			}
		} else if (method == "postCampaignImage") {
			var json = createCampaignImage();
		} else {
			//var json = ConvertFormToJSON(form, false);
			var json = jsonFor.basic(form);
		}

		console.log(json);

		$.ajax({
			type : "POST",
			url : "http://" + global_domain + "/php/Brands.php?method=" + method + "&accountID=" + current.Account.get() + "&brand=" + current.Brand.get(),
			data : json
		}).done(function(respones) {
			alert("Done!");

			switch(method) {
			case "postBrand":
				console.log("postBrand");
				getData(".brand-table", "brand", "manager");
				getData(".accountBrand", "brand");
				break;
			case "postProduct":
				console.log("postProduct");
				getData(".product", "product", null, current.Brand.get());
				getData(".product-table", "product", "manager", current.Brand.get());
				break;
			case "postCampaign":
				console.log("postCampaign");
				getData(".campaign", "campaign", null, current.Brand.get());
				getData(".library-table", "campaign", "manager", current.Brand.get());
				break;
			case "postCampaignImage":
				console.log("postCampaignImage");
				$('.thumbnail-block ul li').each(function() {
					lib.removeClass(this, "selected");
				});
				upclickAllCheckbox();
				initAddClasses();
				getCampaignImage();
				break;
			default:
				break;
			}
		});
	});
}

function initSelect() {
	current.Account.set($(".accountID").val());
	current.Brand.set($(".accountBrand").val());
	$(".brand-block2 input.brandID").val(current.Brand.get());
}

/*bind upload button
 *
 */
function uploadButton() {
	$('.upload-form input[type=submit]').addClass('btn btn-primary').prop('disabled', true).on('click', function(event) {
		event.preventDefault();
		var $this = $(this), data = $this.data();
		$this.off('click').val('Abort').on('click', function() {
			$this.remove();
			data.abort();
		});
		data.submit();
	});
}

function appendOptionToProduct() {
	$($(".brand")).each(function() {
		if ($(this).find("option").length < 2) {
			$('.account-form .accountBrand').find('option').clone().appendTo(this);
		}
	});
	$($(".collection")).each(function() {
		if ($(this).find("option").length < 2) {
			$('#hidden .collection').find('option').clone().appendTo(this);
		}
	});
}

/*
 *
 */
function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20')) || null;
}

/*
 *
 */
function reset(element) {
	//console.log("reset");
	switch(element) {
	case ".accountID":
		break;
	case ".accountBrand":
		$(".accountBrand").find("option").remove();
		break;
	case ".campaign":
		$(".campaign").find("option").remove();
		break;
	case ".collection":
		$(".collection").find("option:gt(0)").remove();
		break;
	case ".brand-table":
		$(".brand-table").find("tr:gt(0)").remove();
		break;
	case ".library-table":
		$(".library-table").find("tr:gt(0)").remove();
		$(".aside .add").find("li:gt(0)").remove();
		break;
	case ".product-table":
		$(".product-table").find("tr:gt(0)").remove();
		break;
	case ".product":
		$(".product").find("option").remove();
		break;
	default:
		break;
	}
}

/*
 *
 *
 */
function getAllBrandInfo() {
	$(".content-brand-philosophy").find("p").remove();
	$(".content-brand-info").find("p").remove();
	$(".micro-table tr:gt(0)").remove();

	$(".brand-table tr:gt(0)").each(function() {
		if ($(this).attr("value") == current.Brand.get()) {
			console.log("BrandPhilosophy", $(this).find("input.BrandPhilosophy").val());
			console.log("BrandInfo", $(this).find("input.BrandInfo").val());
			var BrandPhilosophy = $(this).find("input.BrandPhilosophy").val();
			var BrandInfo = $(this).find("input.BrandInfo").val();
			var Description = $(this).find("input.Description").val()

			if (BrandPhilosophy != "") {
				$(".content-brand-philosophy").append($("<p/>").html(BrandPhilosophy));
				$("#new-brand-philosophy").hide();
				$("#edit-brand-philosophy").show();
			} else {
				$("#new-brand-philosophy").show();
				$("#edit-brand-philosophy").hide();
			}
			if (BrandInfo != "") {
				$(".content-brand-info").append($("<p/>").html(BrandInfo));
				$("#new-brand-info").hide();
				$("#edit-brand-info").show();
			} else {
				$("#new-brand-info").show();
				$("#edit-brand-info").hide();
			}

			var MicroBlogs = $(this).find("input.MicroBlogs").val();
			console.log("This MicroBlogs = ", MicroBlogs);
			if (MicroBlogs != "") {
				if (MicroBlogs.indexOf(".com/") > -1) {
					var trimed = MicroBlogs.substring(MicroBlogs.indexOf(".com/") + 5, MicroBlogs.length);
					console.log("This MicroBlogs  append = ", template.microBlog(trimed));
					$(".micro-table").append(template.microBlog(trimed));
				} else {
					console.log("This MicroBlogs  append = ", template.microBlog(MicroBlogs));
					$(".micro-table").append(template.microBlog(MicroBlogs));
				}
			}
		}
	});
}

/*
 *
 */
function logout() {
	$("a.logout").attr("href", "http://" + global_domain + "/php/logout.php");
}

/*
 *
 */

function clickCheckbox() {
	$.each(queue.campaignImage.get(), function(index, value) {
		$(".aside .add li").each(function() {
			$(this).find("input").attr("disabled", false);
			if ($(this).find("input").attr("id") == value) {
				console.log("match", this);
				$(this).find(".jcf-checkbox").click();
			}
		});
	});
}

function disableCheckbox() {
	$(".aside .add li").find("input").attr("disabled", true);
}

function upclickAllCheckbox() {
	$(".aside .add li").find(".jcf-checked").click();
}

function getClickedCamapign() {
	var current_arr = new Array();
	$(".aside .add li .jcf-checked").each(function() {
		current_arr.push($(this).find("input").attr("id"));
	});
	return current_arr;
}

function createCampaignImage() {
	var json = {};
	var temp = {};
	var wrapper = {};
	var i = 0;

	var selectedImage = $(".thumbnail-block").find("li.selected");
	if (selectedImage.length == 1) {
		var current = getClickedCamapign();
		var old = queue.campaignImage.get();
		var create = [];
		var remove = [];
		jQuery.grep(current, function(el) {
			if (jQuery.inArray(el, old) == -1) {
				create.push(el);
			}
		});
		console.log("create =", create);
		jQuery.grep(old, function(el) {
			if (jQuery.inArray(el, current) == -1) {
				remove.push(el);
			}
		});
		console.log("remove = ", remove);
		var imageID = $(selectedImage).find("input#ImageID").val();
		console.log("\nImageID = ", imageID);
		$(create).each(function(index, val) {
			json["ImageID"] = imageID;
			json["CampaignID"] = val;
			temp[i++] = json;
			json = {};
		});
		console.log("create -> json = ", temp);
		wrapper["create"] = temp;
		var temp2 = {};
		var json2 = {};
		i = 0;
		$(remove).each(function(index, val) {
			json2["ImageID"] = imageID;
			json2["CampaignID"] = val;
			temp2[i++] = json2;
			json2 = {};
		});
		console.log("delete -> json = ", temp2);
		wrapper["delete"] = temp2;
	}
	return wrapper;
}

function createImageJson(file) {
	var url = "" + file.url;
	var arr = {};
	var temp = {};
	arr["AspectRation"] = $("#aspectRatio").val();
	arr["FileSize"] = file.size + "KB";
	arr["ImageLocation"] = url;
	arr["LicenseRequest"] = "1";
	arr["Name"] = url.substring(url.indexOf("brandimg/") + 9, url.length);
	arr["ProductID"] = $("#upload_Product").val();
	temp[0] = arr;
	return temp;
}

/**
 *
 */
function rowToJson() {
	$('.brand-table').find('tr').each(function() {
		if ($(this).attr("value") == current.Brand.get()) {
			var array = jQuery(this).find("input").serializeArray();
			console.log(array);
		}
	});
}

// /*
 // *
 // */
// function ConvertFormToJSON(form, method) {
	// var array = [];
	// var json = {};
	// var temp = {};
	// var i = 0;
	// if (method == "Product") {
		// var temp1;
		// console.log("with update")
		// while (queue.product.get().length > 0) {
			// var productID = queue.product.remove();
			// console.log("\nbrandID : ", productID);
			// $('.product-table').find('tr').each(function() {
				// if ($(this).attr("value") == productID) {
					// console.log("Matched");
					// temp1 = jQuery(this).find("input, select").serializeArray();
					// console.log(temp1);
					// array = array.concat(temp1);
				// }
			// });
		// }
	// } else if (method == "Brand") {
		// var temp1;
		// console.log("with update")
		// while (queue.brand.get().length > 0) {
			// var brandID = queue.brand.remove();
			// console.log("\nbrandID : ", brandID);
			// $('.brand-table').find('tr').each(function() {
				// if ($(this).attr("value") == brandID) {
					// console.log("Matched");
					// temp1 = jQuery(this).find("input").serializeArray();
					// console.log(temp1);
					// array = array.concat(temp1);
				// }
			// });
		// }
	// } else {
		// array = jQuery(form).serializeArray();
	// }
	// jQuery.each(array, function() {
		// if (this.name in json) {
			// temp[i] = json;
			// json = {};
			// json[this.name] = this.value;
			// i++;
		// } else {
			// json[this.name] = this.value;
		// }
	// });
	// console.log(json);
	// temp[i] = json;
	// return temp;
// }

/*Collect data for Brand
 *
 */
function getBrandInfo() {
	$(".brand-table tr").each(function() {
		if ($(this).attr("value") == current.Brand.get()) {
			/*$(this).find("input.BrandPhilosophy").val($(".brand-block2 form").find('textarea[name=BrandPhilosophy]').val());
			 $(this).find("input.BrandInfo").val($(".brand-block2 form").find('input[name=BrandInfo]').val());
			 $(this).find("input.Description").val($(".brand-block2 form").find('textarea[name=Description]').val());*/

			$(this).find("input.BrandPhilosophy").val($(".content-brand-philosophy").find("p").html());
			$(this).find("input.BrandInfo").val($(".content-brand-info").find("p").html());
			//$(this).find("input.Description").val($(".brand-block2 form").find('textarea[name=Description]').val());

			var MicroBlogs = "";
			switch($(".micro-block tr:eq(1)").find('select').val()) {
			case "twitter":
				MicroBlogs = "https://twitter.com/";
				break;
			case "weibo":
				MicroBlogs = "http://weibo.com/";
				break;
			}
			if ($(".micro-block tr:eq(1) td:first-child").html() != "") {
				$(this).find("input.MicroBlogs").val(MicroBlogs + $(".micro-block tr:eq(1) td:first-child").html());
			}
		}
	});
}

/*
 *
 */
function initDatepicker() {
	$("#sdate").datepicker({
		dateFormat : 'yy-mm-dd',
		changeMonth : true,
		minDate : new Date(),
		maxDate : '+2y',
		onSelect : function(date) {

			var d = new Date();
			date = date + " " + d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds();
			$("#sdate").val(date);
			$("#edate").datepicker("option", "minDate", date);
			$("#edate").datepicker("option", "maxDate", '+2y');

		}
	});

	$("#edate").datepicker({
		dateFormat : 'yy-mm-dd',
		changeMonth : true,
		onSelect : function(date) {
			var d = new Date();
			date = date + " " + d.getHours() + ": " + d.getMinutes() + ": " + d.getSeconds();
			$("#edate").val(date);
		}
	});
}

/*
 *
 */
function bytesToSize(bytes, precision) {
	var kilobyte = 1024;
	var megabyte = kilobyte * 1024;
	var gigabyte = megabyte * 1024;
	var terabyte = gigabyte * 1024;

	if ((bytes >= 0) && (bytes < kilobyte)) {
		return bytes + ' B';

	} else if ((bytes >= kilobyte) && (bytes < megabyte)) {
		return (bytes / kilobyte).toFixed(precision) + ' KB';

	} else if ((bytes >= megabyte) && (bytes < gigabyte)) {
		return (bytes / megabyte).toFixed(precision) + ' MB';

	} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
		return (bytes / gigabyte).toFixed(precision) + ' GB';

	} else if (bytes >= terabyte) {
		return (bytes / terabyte).toFixed(precision) + ' TB';

	} else {
		return bytes + ' B';
	}
}

/*
 *
 */
function getDate(dateString) {
	var date = new Date(dateString);
	var newDate = date.toLocaleDateString() + " " + date.toLocaleTimeString();
	return newDate;
}

/*
 *
 */
function displayPreview(files) {
	var _URL = window.URL || window.webkitURL;
	//console.log("displayPreview");
	//console.log("files : ", files);
	//console.log("files[0] : ", files[0]);
	var file = files[0];
	var img = new Image();
	//var sizeKB = file.size / 1024;
	//console.log("sizeKB : ", sizeKB);
	img.onload = function() {
		//$('#preview').append(img);
		//alert("Size: " + sizeKB + "KB\nWidth: " + img.width + "\nHeight: " + img.height);
		function gcd(a, b) {
			if (b > a) {
				temp = a;
				a = b;
				b = temp;
			}
			while (b != 0) {
				m = a % b;
				a = b;
				b = m;
			}
			return a;
		}

		function ratio(x, y) {
			c = gcd(x, y);
			return "" + (x / c) + ":" + (y / c);
		}

		var ratio = ratio(img.width, img.height);
		//console.log("width: " + img.width + ", height: " + img.height);
		//console.log("ratio : ", ratio);
		$("#aspectRatio").val(ratio);
	};
	img.src = _URL.createObjectURL(file);
}


