$( document ).ready(function() {
    console.log( "ready!" );
    var base = "http://aroy.us/php/index.php?method=";
    var method = "getAllUsers";
    var url = base+method;
    console.log(url);
    var Profile = Backbone.Model.extend();

    var ProfileList = Backbone.Collection.extend({
        model : Profile,
        url : url
    });

    var ProfileView = Backbone.View.extend({
        el : ".collections",
        template : _.template("<% _.each(GetAllUsersResult, function(result) { %><div value=<%= result.UserID %>><%= result.UserID %></div>" +
            "<div value=<%= result.IPAddress %>><%= result.IPAddress %></div>" +
            "<div value=<%= result.Name %>><%= result.Name %></div>" +
            "<div value=<%= result.Password %>><%= result.Password %></div>" +
            "<div value=<%= result.Country %>><%= result.Country %></div>" +
            "<% }); %>"),
        initialize : function() {
            this.listenTo(this.collection, "add", this.renderItem);
        },
        renderItem : function(profile) {
        	var maxID = 0;
            /*var profileTemplate = this.template(profile.toJSON());
            this.$el.append(profileTemplate);*/
            var json =profile.toJSON();
            _.each(json.GetAllUsersResult, function(result) {
            	maxID = parseInt(result.UserID);
            });
            $("#UserID").val(maxID+1);
			this.$el.append($("#UserID").val());
        }
    });
    $(document).ready(function(){
    	get_data_from_server();
    });
    $('#post_data').click(function(){
        console.log('Post Clicked');
        post_data_to_the_server();

    });
    $('#get_data').click(function(){
        console.log('Get Clicked');
        get_data_from_server();
    });
    function get_data_from_server(){
        var profileList = new ProfileList;
        var profilesView = new ProfileView({
            collection : profileList
        });
        //console.log(profileList.fetch());
        profileList.fetch({
            success : function(collection, response) {
                console.log(response);
            }
        });
    }
    function post_data_to_the_server(){
        var allItemCost = document.getElementsByName("ItemCost[]");
        Courses = Backbone.Collection.extend({
            url:'http://54.68.20.208/Service1.svc/createUser'
        });
        var Courses = new Courses();
        Courses.fetch({
            data:{
                "Country": ('#Country').val(),
                "IPAddress": ('#IPAddress').val(),
                Password: ('#Password').val(),
                Name: ('#Name').val(),
                UserID: ('#UserID').val()
            },
            type:'POST'
        });
        /* ('#CampaignID').val();
         ('#Clientele').val();
         ('#Description').val();
         ('#EndDate').val();
         ('#ImageLocation').val();
         ('#Location').val();
         ('#Message').val();
         ('#MessageTitle').val();
         ('#Name').val();
         ('#Photo').val();
         ('#StartDate').val();*/
    }
});









/*$( document ).ready(function() {
    console.log( "ready!" );
	var Profile = Backbone.Model.extend();

	var ProfileList = Backbone.Collection.extend({
		model : Profile,
		url : "http://54.68.20.208/Service1.svc/getAllCollections",
		prase : function(resp) {
			console.log("resp", resp.GetAllCollectionsResult);
			return resp.GetAllCollectionsResult;
		}
	});

	var ProfileView = Backbone.View.extend({
		el : ".collections",
		template : _.template("<% _.each(GetAllCollectionsResult, function(result) { %><option value=<%= result.Name %>><%= result.Name %></option><% }); %>"),
		initialize : function() {
			this.listenTo(this.collection, "add", this.renderItem);
		},
		renderItem : function(profile) {
			var profileTemplate = this.template(profile.toJSON());
			this.$el.append(profileTemplate);
		}
	});

	var profileList = new ProfileList;
	var profilesView = new ProfileView({
		collection : profileList
	});
	//console.log(profileList.fetch());
	profileList.fetch({
		success : function(collection, response) {
			console.log(response);
		}
	});
});
*/