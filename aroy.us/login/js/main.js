function getUserName() {
	var m = window.location.search.match(/error=([^&]*)/);
	if (m != null) {
		$(".msg").hide();
		$(".msg").html(decodeURIComponent(m[1]).replace(/\+/g, ' ')).delay(1000).fadeIn("fast");
	}
}

getUserName(); 