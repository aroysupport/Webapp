	var AWS = "http://beta.manepage.com";
	var local = "http://localhost:8888/Desktop";
	var domain = AWS;
	

$(function(){
	$.getJSON(domain+"page/login/php/login.php?method=check", function(resopnse) {
		if(resopnse["expired"]!=undefined){
			alert(resopnse["expired"]);
			window.stop();
			window.location.replace("http://beta.manepage.com/login");
		}
	});
});
