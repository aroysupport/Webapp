jQuery(document).ready(function() {
	jQuery('#main_navbar .nav  li a').on('click', function(e) {
		// Change/remove current tab to active
		jQuery(this).parent('li').addClass('active').siblings().removeClass('active');
	});
	console.log("Window height = ", $(window).height());
	$("#contact").height($(window).height());
	$("#solution").height($(window).height());
	send();
});
function send() {
	jQuery("form.subscribe-form").bind("submit", function(event) {
		event.preventDefault();
		var post_data = {
			'user_email' : $("#user_email").val()
		};
		console.log("user", $("#user_email").val());
		//Ajax post data to server		
		$.post('http://aroy.us/src/php/email.php', post_data, function(response) {
			if (response.type == 'error') {//load json data from server and output message
				output = '<div class="error">' + response.text + '</div>';
			} else {
				output = '<div class="success">' + response.text + '</div>';
			}
			$("#output").hide().html(output).slideDown();
		}, 'json');
	});
	$("#user_email").val("");
}