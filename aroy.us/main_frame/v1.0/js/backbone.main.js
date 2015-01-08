$(document).ready(function() {
	//console.log("backbone ready ->Status = ", document.readyState);
	///main
	//get_data_from_server(".collection", "getAllCollections", "Name");
	//get_data_from_server(".campaign", "getAllCampaigns", "Name");
	//get_data_from_server( ".library-table", "getCampaignInfo/1", "Name");

});

function get_data_from_server(element, method, value, option) {
	//console.log("Option1 = ", option);
	if ( typeof option === 'undefined') {
		option = option;
	}
	var base = "http://localhost:8888/php/index.php?method=";
	//var base = "http://aroy.us/php/index.php?method=";
	var url = base + method;

	/*
	 * Model
	 */
	var Profile = Backbone.Model.extend();
	/*
	 * Collection
	 */
	var ProfileList = Backbone.Collection.extend({
		model : Profile,
		url : url,
	});
	/*
	 * View
	 */
	var ProfileView = Backbone.View.extend({
		initialize : function(options) {
			//console.log(options.temp);
			this.template = _.template(options.temp);
			this.listenTo(this.collection, "add", this.renderItem);
		},
		renderItem : function(profile) {
			//declare template and find element
			var profileTemplate = this.template(profile.toJSON());
			var length = this.$el.find('option').size();
			//check amount of elements
			//if (length <= 2) {
			this.$el.append(profileTemplate);
			if (method.indexOf("BrandInfo") > -1) {
				//lightboxReload();
			} else if (method.indexOf("ProductInfo") > -1) {
				get_data_from_server(".newCollection", "getAllCollections", "Name");
				//get_data_from_server(".newBrand", "getBrandInfo/2", "Name",true);
				//get_data_from_server(".newBrand", "getAllBrands", "Name");
				//console.log("*****called brand****");
				for (var i = 0; i < brandID.length; i++) {
					//console.log("index[" + i + "]= ", brandID[i]);
					//get_data_from_server(".newBrand", "getBrandInfo/"+brandID[i], "Name", true);
					str ="<option value='"+ +"'>"+ +"</option>";
		
				}
				//console.log("****passed brand****");

				$(".product-table tr").each(function() {
					$(this).find(".newBrand").removeClass("newBrand").addClass("brand");
					$(this).find(".newCollection").removeClass("newCollection").addClass("collection");
				});
				//initCustomForms();
				//jcf.replaceAll();
				//lightboxReload();

			} else if (method.indexOf("CampaignInfo") > -1) {
				console.log("open close");
				openCloseReload();
			}else if (method.indexOf("AccountInfo") > -1) {
				//console.log("open close");
				//initCustomForms();
				//jcf.replaceAll();
			}
			//}
		}
	});
	//create collection with model
	var profileList = new ProfileList;
	//create view with collection
	var profilesView = new ProfileView({
		el : element,
		temp : getOptionTemplate(method, value, option),
		collection : profileList
	});
	//fetch colletion to th page
	profileList.fetch({
		success : function(collection, response) {
			//console.log(response);
		}
	});

}

//append template
function getOptionTemplate(method, value, option) {
	var str;
	console.log("method = ", method);
	if ( typeof option === 'undefined') {
		option = 0;
		//console.log("Option2 = ", option);
	}

	//check if the method contain slash, if so it will prase differently
	if (method.indexOf("/") > -1) {
		method = method.substring(0, method.indexOf("/"));
		//console.log("slash: ",method );
	}
	
	var prase = method.replace("g", "G") + "Result";
	//if method is looking fo brand info
	if ((method.indexOf("BrandInfo") > -1) && option == 0) {
		//console.log("BrandInfo");
		str = "<% _.each(" + prase + ", function(result) { %>" + 
		"<tr><td><%= result." + value + "%></td>" +
		 "<td><a class='brandEdit edit Newlightbox' href='#popup2'>Edit</a></td>" + 
		 "<input type='hidden' class='brandPost' name='Name' value='<%= result." + value + "%>'/>" +
		  "<input type='hidden' name='BrandID' value='<%= result.BrandID %>' class='brandID'/>" +
		   "<input type='hidden' name='BrandInfo' value='<%= result.BrandInfo %>' />" + 
		   "<input type='hidden' name='BrandPhilosophy' value='<%= result.BrandPhilosophy %>' />" + 
		   "<input type='hidden' name='Description' value='<%= result.Description %>' />" + 
		   "<input type='hidden' name='MicroBlogs' value='<%= result.MicroBlogs %>'/>" + "</tr>" + "<% }); %>";
	}
	//if method is looking fo campaign info
	else if (method.indexOf("CampaignInfo") > -1) {
		//console.log("CampaignInfo");
		str = "<% _.each(" + prase + ", function(result) { %>" + 
		'<tr class="newAdd"><td><input type="checkbox" id="chk<%=result.CampaignID%>">' +
		 '</td><td><label for="chk<%=result.CampaignID%>"><%=result.Name%></label><a class="opener" href="#">opener</a>' + 
		 '<ul class="slide"><li>Start Date: <%=result.StartDate%>' + 
		 '</li><li>End Date: <%=result.EndDate%>' +
		  '</li><li>Location: <%=result.Market%>' + 
		  '</li><li>Clientele: <%=result.Clientele%>' + 
		  '</li><li>^^Campaign Identifier' + 
		  '</li><li>Campaign Message' + 
		  '<ul><li>Title - <%=result.MessageTitle%>' + 
		  '</li><li>Name - <%=result.Name%>' + 
		  '</li><li>Message - <%=result.Message%>' + 
		  '</li></ul></li><li>QRCode Location: <%=result.QRCodeLocation%>' + 
		  '</li><li>^^Campaign Content' + 
		  '</li></ul></td></tr><tr>' + 
		  "<% }); %>";
		// console.log("str=", str);
	} else if (method.indexOf("ProductInfo") > -1) {
		//console.log("CampaignInfo");
		str = "<% _.each(" + prase + ", function(result) { %>" + '<tr class="ID" name="ProductID" value="<%= result.ProductID %>"><td>' + "<%= result." + value + '%></td>' + '<td><a class="productEdit edit Newlightbox" href="#popup1">Edit</a></td>' + '<td id="brandSize">' + '<select class="newBrand" name="Brand">' + '<option>Select Brand</option></select></td>' + '<td><select class="newCollection" name="Collection"><option>Select Collection</option>' + '</select></td><input type="hidden" class="productCollection" name="Name" value="<%= result.' + value + '%>"/>' + '<input type="hidden" name="ProductID" value="<%=result.ProductID %>"/></tr>' + "<% }); %>";

		//console.log("str=", str);
	}else if (method.indexOf("AccountInfo") > -1) {
		str = "<% _.each(" + prase + ", function(result) { %>" +
		"<script id='script'> account[<%= result.AccountID%>]= '<%= result.Name%>';</script>"+
		"<option value='<%= result.AccountID %>'><%= result." + value + " %></option>"+"<% }); %>";
		//console.log("str=", str);	
	}
	//if method is geting options for brands, collections and campaigns
	else {
		console.log("else");
		str = "<% _.each(" + prase + ", function(result) { %>" + "<option value='<%= result." + value + " %>'><%= result." + value + " %></option>" + "<% }); %>";
		//console.log("str=", str);
	}
	return str;
}

