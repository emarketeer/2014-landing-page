<?php

//Accepts messages and emails them accordingly.
if (! empty( $_POST['name'] ) && ! empty( $_POST['email'] ) && ! empty( $_POST['phone'] ) ) {
	
	$name = stripslashes($_POST['name']);
	$email = stripslashes($_POST['email']);
	$phone = stripslashes($_POST['phone']);
	$message = "N/A";
	
	if (! empty( $_POST['message']) ) {
		$message = stripslashes($_POST['message']);
	}
	
	//Send the email.
	$to = "info@emarketeer.com.au";
	$subject = "Contact message from campaign website";
	$message = "A new message has been submitted via the campaign site. Here's the info: \r\n\r\n
	Name: $name\r\nEmail: $email\r\nPhone: $phone\r\nMessage:\r\n$message\r\n\r\nGo sell something!\r\n~ Webster";
	$headers = "From: webmaster@emarketeer.com.au\r\nReply-To: $email\r\nX-Mailer: PHP/5.5";
	
	if ( @mail($to,$subject,$message,$headers) ) {	
		die("1");
	} else {
		die("-1");
	}
	
} else {
	die("-1");
}

?>
