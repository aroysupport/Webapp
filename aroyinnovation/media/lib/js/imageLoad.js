function loadImage() {
	showProgressBar();
	var preload = new createjs.LoadQueue();
	preload.on("fileload", handleFileComplete);
	preload.on("fileprogress", updateProgressBar);
	preload.loadFile("img/teaser1_6.jpg");
}

function showProgressBar() {
	progressBar = document.createElement("progress");
	progressBar.value = 0;
	progressBar.max = 100;
	progressBar.removeAttribute("value");
	$("#progress-bar").append('<img id="logo" src="../icon/Mane_Page_140px.png" alt="mane logo"/>');
	$("#progress-bar").append($("<span/>").attr("id", "progress"));
	document.getElementById("progress-bar").appendChild(progressBar);
}

function updateProgressBar(e) {
	var percentage = e.loaded / e.total * 100;
	progressBar.value = percentage;
	$("#progress").html(Math.round(percentage));
}

function handleFileComplete(event) {
	$("#wrapper").fadeOut("slow").remove();
	$("body").append($(event.result).attr("id", "teaser"));
}

// var request;
// var progressBar;
//
// function loadImage(imageURI) {
// request = new XMLHttpRequest();
// request.onloadstart = showProgressBar;
// request.onprogress = updateProgressBar;
// request.onload = showImage;
// request.onloadend = hideProgressBar;
// request.open("GET", imageURI, true);
// request.overrideMimeType('text/plain; charset=x-user-defined');
// request.send(null);
// }
//
// function showProgressBar() {
// progressBar = document.createElement("progress");
// progressBar.value = 0;
// progressBar.max = 100;
// progressBar.removeAttribute("value");
// $("#progress-bar").append('<img id="logo" src="../icon/Mane_Page_140px.png" alt="mane logo"/>');
// $("#progress-bar").append($("<span/>").attr("id", "progress"));
// document.getElementById("progress-bar").appendChild(progressBar);
// }
//
// function updateProgressBar(e) {
// if (e.lengthComputable) {
// var percentage = e.loaded / e.total * 100;
// progressBar.value = percentage;
// $("#progress").html(Math.round(percentage));
// } else {
// progressBar.removeAttribute("value");
// }
// }
//
// function showImage(e) {
// //var imageElement = document.createElement("img");
// //$("#teaser").attr("src", "data:image/jpg;base64," + base64Encode(request.responseText));
// //document.body.appendChild(imageElement);
// // Obtain a blob: URL for the image data.
// var arrayBufferView = new Uint8Array( this.response );
// var blob = new Blob( [ arrayBufferView ], { type: "image/jpeg" } );
// var urlCreator = window.URL || window.webkitURL;
// var imageUrl = urlCreator.createObjectURL( blob );
// $("#teaser").attr("src",imageUrl);
// // var img = document.querySelector( "#photo" );
// //mg.src = imageUrl;
// }
//
// function hideProgressBar() {
// $("#wrapper").fadeOut("slow").remove();
// }
//
// // This encoding function is from Philippe Tenenhaus's example at http://www.philten.com/us-xmlhttprequest-image/
// function base64Encode(inputStr) {
// var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
// var outputStr = "";
// var i = 0;
//
// while (i < inputStr.length) {
// //all three "& 0xff" added below are there to fix a known bug
// //with bytes returned by xhr.responseText
// var byte1 = inputStr.charCodeAt(i++) & 0xff;
// var byte2 = inputStr.charCodeAt(i++) & 0xff;
// var byte3 = inputStr.charCodeAt(i++) & 0xff;
//
// var enc1 = byte1 >> 2;
// var enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
//
// var enc3, enc4;
// if (isNaN(byte2)) {
// enc3 = enc4 = 64;
// } else {
// enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
// if (isNaN(byte3)) {
// enc4 = 64;
// } else {
// enc4 = byte3 & 63;
// }
// }
//
// outputStr += b64.charAt(enc1) + b64.charAt(enc2) + b64.charAt(enc3) + b64.charAt(enc4);
// }
//
// return outputStr;
// }