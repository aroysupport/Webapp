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
		$(document).on("click", this.editButton, function() {

			debug.msg("Content", "Edit button clicked");

			content.input = $(options.popupHoldaer).find("input, textarea");

			if (options.tableHolder == ".brand-block2") {
				content.targetName = $(this).parent().find("p");
				debug.msg("Content", "TargetName: " + content.targetName.html());
			} else {
				content.targetName = $(this).parent().prev();
				//debug.msg("Content","TargetName: "+ content.targetName.html());
				content.targetRowValue = $(this).parent().parent();
				//debug.msg("Content","targetRowValue: "+ content.targetRowValue.attr("value"));
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
				debug.msg("Content", "			Method: " + options.method);
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
				queue.brand.push(getBrand());
			}
			break;
		case "philosophy":
			if (method == "add") {
				debug.msg("Blog", "				Table: " + options.table);
				debug.msg("Blog", "				input: " + content.input.val() + "\n");
				queue.brand.push(getBrand());
				$(options.table).append($("<p/>").html(content.input.val()));
				$("#new-brand-philosophy").hide();
				$("#edit-brand-philosophy").show();
			} else {
				queue.brand.push(getBrand());
			}
			break;
		case "info":
			if (method == "add") {
				debug.msg("Blog", "				Table: " + options.table);
				debug.msg("Blog", "				input: " + content.input.val() + "\n");
				queue.brand.push(getBrand());
				$(options.table).append($("<p/>").html(content.input.val()));
				$("#new-brand-info").hide();
				$("#edit-brand-info").show();
			} else {
				queue.brand.push(getBrand());
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