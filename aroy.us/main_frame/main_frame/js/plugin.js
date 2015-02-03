var get = {
	init : function() {

	},
	getAccount : function() {

	},
	getBrand : function() {

	},
	getProduct : function() {

	},
	getCamapign : function() {

	},
	getImage : function() {

	},
	getCamapignImage : function() {

	}
}
var current = {
	Account : {
		currentAccount : null,
		get : function() {
			return this.currentAccount;
		},
		set : function(newAccount) {
			this.currentAccount = newAccount;
		}
	},
	Brand : {
		currentBrand : null,
		get : function() {
			return this.currentBrand;
		},
		set : function(newBrand) {
			this.currentBrand = newBrand;
		}
	}
}

var events = {
	attach:function(){
		this.Account.changes();
		this.Brand.changes();
		this.Product.changes();
	},
	Account : {
		changes : function() {
			$('.accountID').bind('change.account', function() {
				debug.msg("Events -> Account -> Changes ", 		"Changes: " + $(this));
				current.Account.set($(this).val());
				getData(".accountBrand", "brand");
				// check();
				current.Brand.set($(".accountBrand").val());
				$('.accountBrand').change();
				queue.brand.clear();
			});
		}
	},
	Brand : {
		changes : function() {
			$(".accountBrand").bind("change.brand", function() {
				debug.msg("Events -> Brand -> Changes ", 		"Changes: " + $(this));
				current.Brand.set($(this).val());
				MainControl();
			});
		}
	},
	Product : {
		changes : function() {
			$(".product-table tr .collection, .product-table tr .brand").bind("change.check", function() {
				debug.msg("Events -> Product -> Changes ", 		"Changes: " + $(this));
				var value = $(this).parent().parent().attr("value");
				debug.msg("changes - Product ", "tr value: " + value)
				queue.product.push(value);
			});
		},
		update : function() {
			debug.msg("Events -> Product -> Update ", 		"Update: " + $(this));
			$(".product-table tr .collection").unbind("change.check");
			$(".product-table tr:gt(0)").each(function() {
				var value = $(this).find("#CollectionID").val();
				if (value != "") {
					var target = $(this).find(".collection option[value=" + value + "]");
					if (target[0] != null) {
						$(this).find(".collection").val(value);
						$(this).find(".collection").trigger("change");
					}
				}
			});
			events.Product.changes();
		}
	}
}
var jsonFor = {
	basic : function(form) {
		var array = jQuery(form).serializeArray();
		jsonFor.toJson(array);
	},
	Product : function() {
		var temp1;
		var array = [];
		console.log("with update", queue.product.get().length);
		while (queue.product.get().length > 0) {
			var productID = queue.product.pop();
			debug.msg("Product - Make Json ", "productID: " + productID);
			$('.product-table').find('tr').each(function() {
				if ($(this).attr("value") == productID) {
					temp1 = jQuery(this).find("input, select").serializeArray();
					array = array.concat(temp1);
				}
			});
		}
		return jsonFor.toJson(array);
	},
	Brand : function() {
		var temp1;
		var array = [];
		console.log("with update")
		while (queue.brand.get().length > 0) {
			var brandID = queue.brand.pop();
			debug.msg("Brand - Make Json ", "brandID: " + brandID);
			$('.brand-table').find('tr').each(function() {
				if ($(this).attr("value") == brandID) {
					debug.msg("Brand - Make Json ", "Brand ID Matched");
					temp1 = jQuery(this).find("input").serializeArray();
					//console.log(temp1);
					array = array.concat(temp1);
				}
			});
		}
		return jsonFor.toJson(array);
	},
	toJson : function(array) {
		var json = {};
		var temp = {};
		var i = 0;
		console.log("Array :"+array);
		jQuery.each(array, function() {
			if (this.name in json) {
				temp[i] = json;
				json = {};
				json[this.name] = this.value;
				i++;
			} else {
				json[this.name] = this.value;
			}
		});
		console.log("			Result:"+json);
		temp[i] = json;
		return temp;
	}
}

var template = {
	microBlog : function(handle) {
		var row = $("<tr/>");
		var BrandName = $("<td/>").html(handle).appendTo(row);
		var edit = $("<td/>").html($("<a/>").addClass("edit Newlightbox").attr("id", "edit-handle-url").attr("href", "#popup6").html("Edit")).appendTo(row);
		var select = $("<td/>").html($("<select/>")).appendTo(row);
		var twitter = $("<option\>").val("twitter").html("Twitter").appendTo($(select).find("select"));
		var weibo = $("<option\>").val("weibo").html("Weibo").appendTo($(select).find("select"));
		var test = $("<td/>").html($("<a/>").addClass("test").attr("href", "http://twitter.com/" + handle).attr("target", "popup").attr("onclick", "window.open(this.href,'" + handle + "','width=600,height=400')").html("Test")).appendTo(row);
		var input = $("<td/>").html($("<input/>").attr("type", "checkbox")).appendTo(row);
		return row;
	},
	Brand : function(BrandName, unique) {
		var row = $("<tr/>").attr("value", "Brand" + unique);
		var BrandName = $("<td/>").html(BrandName).appendTo(row);
		var edit = $("<td/>").html($("<a/>").addClass("brandEdit edit Newlightbox").attr("href", "#popup2").html("Edit")).appendTo(row);
		var input = $("<input/>").addClass("brandPost").attr("name", "Name").attr("type", "hidden").val(BrandName.html()).appendTo(row);
		return row;
	},
	Product : function(ProductName, unique) {
		var row = $("<tr/>").attr("value", "Product" + unique);
		var BrandName = $("<td/>").html(ProductName).appendTo(row);

		var edit = $("<td/>").html($("<a/>").addClass("productEdit edit Newlightbox").attr("href", "#popup1").html("Edit")).appendTo(row);
		var brandOptions = $("<td/>").html($("<select/>").addClass("brand").attr("name", "BrandID").html($("<option/>").html("Select Brand"))).appendTo(row);
		var collectionOptions = $("<td/>").html($("<select/>").addClass("collection").attr("name", "CollectionID").html($("<option/>").html("Select Collection"))).appendTo(row);
		var input = $("<input/>").addClass("productCollection").attr("name", "Name").attr("type", "hidden").val(ProductName).appendTo(row);
		return row;
	},
	contentImage:function(imageURL, photoID, product, description, username, date, counts){
		var listTemplate = $("<li/>");
		var li = '<li><div class="image-container">';
		var img = '<img src="'+imageURL+'" alt="brand gallery" /></div>';
		var txtLeft = '<div class="txt-hover-top"><div class="txt-left"><ul>';
		var listTemplate = $("<li/>");
		var imageInfo = listTemplate.html("PhotoID: 	"+photoID).prop('outerHTML') + listTemplate.html("Product: 		"+product).prop('outerHTML') + listTemplate.html("Description: 		"+description).prop('outerHTML') + listTemplate.html("Username: 	"+username).prop('outerHTML') + listTemplate.html("Date of upload: 		"+date).prop('outerHTML');
		var txtRight = '</ul></div><div class="txt-right"><ul><li>&nbsp;</li><li><a href="#popup-content-edit-product" class="lightbox">Edit Product</a></li>'+
						'<li><a href="#popup-content-edit-desc" class="lightbox">Edit Description</a></li><li>&nbsp;</li><li>'+
						'<input type="checkbox" /><span>Delete &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</span><input type="checkbox" />'+
						'<span>Block</span></li></ul></div></div>';
		var txtBottom = '<div class="txt-hover-bottom"><a href="#popup-campaign" class="lightbox">Active Campaigns:'+ counts +'</a></div></li>';
		var result = li+img +txtLeft+imageInfo+txtRight+txtBottom;
		return result;
	}
};

var queue = {
	brand : {
		Brand_list : [],
		push : function(BrandID) {
			if (this.Brand_list.indexOf(BrandID) == -1) {
				this.Brand_list.push(BrandID);
			}
		},
		pop : function() {
			return this.Brand_list.shift();
		},
		get : function() {
			return this.Brand_list;
		},
		clear : function() {
			this.Brand_list.length = 0;
		}
	},
	product : {
		Product_list : [],
		push : function(ProductID) {
			if (this.Product_list.indexOf(ProductID) == -1) {
				this.Product_list.push(ProductID);
			}
		},
		pop : function() {
			return this.Product_list.shift();
		},
		get : function() {
			return this.Product_list;
		},
		clear : function() {
			this.Product_list.length = 0;
		}
	},
	campaignImage : {
		compaignImage_list : [],
		push : function(campaignID) {
			if (this.compaignImage_list.indexOf(campaignID) == -1) {
				this.compaignImage_list.push(campaignID);
			}
		},
		pop : function() {
			return this.compaignImage_list.shift();
		},
		get : function() {
			return this.compaignImage_list;
		},
		clear : function() {
			this.compaignImage_list = 0;
		}
	}
};
var content = {
	previousClick : null,
	input : null,
	targetName : null,
	targetRowValue : null,
	cancelButton : ".cancelReset, #fancybox-close, #fancybox-overlay",
	init : function(options) {
		this.currentMethod = options.method;
		debug.msg("Content", "Method: " + this.currentMethod);
		this.tableHolder = options.tableHolder;
		this.addButton = options.addButton;
		this.editButton = options.editButton;
		this.SaveButton = options.SaveButton;

		this.table = $(this.tableHolder).find(options.table);
		this.attachEvents(options);
	},
	attachEvents : function(options) {
		this.add(options);
		this.edit(options);
		this.save(options);
		//this.cancel();
	},
	add : function(options) {
		$(document).on("click", this.addButton, function() {
			debug.msg("Content", "Add button clicked");
			content.previousClick = "add";
			content.input = $(options.popupHoldaer).find("input, textarea");
		});
	},
	edit : function(options) {
		$(document).on("click", this.editButton, function(event) {

			debug.msg("Content", "Edit button clicked");
			content.input = $(options.popupHoldaer).find("input, textarea");

			if (options.tableHolder == ".brand-block2") {
				content.targetName = $(this).parent().find("p");
				debug.msg("Content", "TargetName: " + content.targetName.html());
			} else {
				content.targetName = $(this).parent().prev();
				debug.msg("Content", "TargetName: " + content.targetName.html());
				content.targetRowValue = $(this).parent().parent();
				debug.msg("Content", "targetRowValue: " + content.targetRowValue.attr("value"));
				debug.msg("Content", "targetRowValue: " + content.targetRowValue.find("input[name='Name']").attr("value"));
			}
			content.input.val(content.targetName.html());

			content.previousClick = "edit";
		});
	},
	cancel : function() {
		$(document).on("click", this.cancelButton, function() {
			debug.msg("Content", "Cancel button clicked");
			$(".cancelReset").parent().find("input, textarea").val("");
			//content.input.val("");
		});
	},
	save : function(options) {
		$(document).on("click", this.SaveButton, function() {
			debug.msg("Content", "	Save button clicked");
			switch(content.previousClick) {
			case "add":
				debug.msg("Content", "		add New content");
				debug.msg("Content", "			Method: " + options.method);
				content.selection("add", options);
				break;
			case "edit":
				debug.msg("Content", "		Edit content");
				content.targetName.html(content.input.val());
				content.targetRowValue.find("input[name='Name']").attr("value", content.input.val());
				debug.msg("Content", "			Value: " + content.input.val());
				debug.msg("Content", "			Method: " + options.method);
				debug.msg("Content", "			New TargetName: " + content.targetName.html());
				debug.msg("Content", "			targetRowValue: " + content.targetRowValue.find("input[name='Name']").attr("value"));
				content.selection("edit", options);
				break;
			default:
				debug.msg("Content", "Error");
				break;
			}
			content.previousClick = "";
			content.input.val("");
		});
	},
	selection : function(method, options) {
		switch(options.method) {
		case "brand":
			if (method == "add") {
				debug.msg("Brand", "				Table: " + options.table);
				debug.msg("Brand", "				input: " + content.input.val() + "\n");
				var count = 0;
				queue.brand.push("Brand" + count);
				$(options.table).append(template.Brand(content.input.val(), count++));
				lightboxReload();
			} else {
				queue.brand.push(content.targetRowValue.attr("value"));
				$("#brand-table tr").find("")
			}
			break;
		case "product":
			if (method == "add") {
				debug.msg("Product", "				Table: " + options.table);
				debug.msg("Product", "				input: " + content.input.val() + "\n");
				var count = 0;
				queue.product.push("Product" + count);
				$(options.table).append(template.Product(content.input.val(), count++));
				appendOptionToProduct();
				initCustomForms();
				lightboxReload();
			} else {
				queue.product.push(content.targetRowValue.attr("value"));
			}
			break;
		case "blog":
			if (method == "add") {
				debug.msg("Blog", "				Table: " + options.table);
				debug.msg("Blog", "				input: " + content.input.val() + "\n");
				$(options.table).append(template.microBlog(content.input.val()));
				initCustomForms();
				lightboxReload();
			} else {
				$(content.targetRowValue).find(options.tableHolder).val(content.input.val());
				queue.brand.push(current.Brand.get());
			}
			break;
		case "philosophy":
			if (method == "add") {
				debug.msg("Blog", "				Table: " + options.table);
				debug.msg("Blog", "				input: " + content.input.val() + "\n");
				queue.brand.push(current.Brand.get());
				$(options.table).append($("<p/>").html(content.input.val()));
				$("#new-brand-philosophy").hide();
				$("#edit-brand-philosophy").show();
			} else {
				queue.brand.push(current.Brand.get());
			}
			break;
		case "info":
			if (method == "add") {
				debug.msg("Blog", "				Table: " + options.table);
				debug.msg("Blog", "				input: " + content.input.val() + "\n");
				queue.brand.push(current.Brand.get());
				$(options.table).append($("<p/>").html(content.input.val()));
				$("#new-brand-info").hide();
				$("#edit-brand-info").show();
			} else {
				queue.brand.push(current.Brand.get());
			}
			break;
		default:
			debug.msg("Content", "				Selection: Error => " + table);
			break;
		}
	}
};

var tableController = {
	bind : function() {
		this.brand();
		this.product();
		this.microBlog();
		this.philo();
		this.info();
		content.cancel();
	},
	brand : function() {
		var options = {
			tableHolder : ".brand-block",
			popupHoldaer : "#popup2",
			addButton : "#addBrand",
			editButton : ".brandEdit",
			SaveButton : "#BrandNameBtn",
			popupInput : "#BrandName",
			table : ".brand-table",
			method : "brand"
		};
		content.init(options);
	},
	product : function() {
		var options = {
			tableHolder : ".product-block",
			popupHoldaer : "#popup1",
			addButton : "#new-product",
			editButton : ".productEdit",
			SaveButton : "#ProductNameBtn",
			popupInput : "#productName",
			table : ".product-table",
			method : "product"
		};
		content.init(options);
	},
	microBlog : function() {
		var options = {
			tableHolder : ".micro-block",
			popupHoldaer : "#popup6",
			addButton : "#new-handle-url",
			editButton : "#edit-handle-url",
			SaveButton : "#blogSave",
			popupInput : "#HandleUrl",
			table : ".micro-table",
			method : "blog"
		};
		content.init(options);
	},
	philo : function() {
		var options = {
			tableHolder : ".brand-block2",
			popupHoldaer : "#popup4",
			addButton : "#new-brand-philosophy",
			editButton : "#edit-brand-philosophy",
			SaveButton : "#philosophySave",
			popupInput : "#BrandPhilosophy",
			table : ".content-brand-philosophy",
			method : "philosophy"
		};
		content.init(options);
	},
	info : function() {
		var options = {
			tableHolder : ".brand-block2",
			popupHoldaer : "#popup5",
			addButton : "#new-brand-info",
			editButton : "#edit-brand-info",
			SaveButton : "#infoSave",
			popupInput : "#BrandInfo",
			table : ".content-brand-info",
			method : "info"
		};
		content.init(options);
	}
};

var debug = {
	status : true,
	enable : function() {
		this.status = true;
	},
	disable : function() {
		this.status = false;
	},
	msg : function(call, msg) {
		if (this.status) {
			console.log("<Debug> " + call + "	-	" + msg + " <Debug>");
		}
	}
};
