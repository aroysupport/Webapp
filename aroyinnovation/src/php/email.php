<?php
require ('vendor/phpmailer/phpmailer/PHPMailerAutoload.php');
if ($_POST) {
	//Sanitize input data using PHP filter_var().
	$user_email = filter_var($_POST["user_email"], FILTER_SANITIZE_EMAIL);

	if (!filter_var($user_email, FILTER_VALIDATE_EMAIL)) {//email validation
		$output = json_encode(array('type' => 'error', 'text' => 'Please enter a valid email!'));
		die($output);
	}

	$mail = new PHPMailer;

	//$mail -> SMTPDebug = 3;
	// Enable verbose debug output

	$mail -> isSMTP();
	// Set mailer to use SMTP
	$mail -> Host = 'smtp.zoho.com';
	// Specify main and backup SMTP servers
	$mail -> SMTPAuth = true;
	// Enable SMTP authentication
	$mail -> Username = 'steven@aroy.us';
	// SMTP username
	$mail -> Password = 'wni7if5gwqqu';
	// SMTP password
	$mail -> SMTPSecure = 'tls';
	// Enable TLS encryption, `ssl` also accepted
	$mail -> Port = 587;
	// TCP port to connect to

	$mail -> From = 'steven@aroy.us';
	$mail -> FromName = 'Aroy Innovation Landing Page';
	$mail -> addAddress("sales@aroy.us");
	// Add a recipient            // Name is optional

	$mail -> WordWrap = 50;
	// Set word wrap to 50 characters
	$mail -> isHTML(true);
	// Set email format to HTML

	$mail -> Subject = "New subscriber.";
	$mail -> Body = "Email : " . $user_email;

	if (!$mail -> send()) {
		//echo 'Message could not be sent.';
		$output = json_encode(array('type' => 'error', 'text' => 'Message could not be sent.'));
		//echo 'Mailer Error: ' . $mail->ErrorInfo;
		 die($output);
	} else {
		//echo 'Message has been sent';
		$output = json_encode(array('type' => 'message', 'text' => ' Thank you for your email!'));
		 die($output);
	}

}


