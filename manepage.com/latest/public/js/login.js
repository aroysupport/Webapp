$(window).load(function() {
	$(".wrapper-container").height($(window).height());
	getUserName();
});
function getUserName() {
	var m = window.location.search.match(/error=([^&]*)/);
	if (m != null) {
		var element = $(".wrapper");
		var errorContainer = element.parent().find('.msg');
		if (errorContainer.length == 0) {
			errorContainer = $('<div class= "msg"></div>').prependTo(element.parent());
		}
		errorContainer
		.empty()
		.hide()
		.append(decodeURIComponent(m[1]).replace(/\+/g, ' '))
		.slideDown("slow", "linear",function(){
			      setTimeout( "jQuery('.msg').slideUp();",5000 );
			});
	}
}

