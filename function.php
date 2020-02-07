<?php
include_once('./PHPMailer/PHPMailerAutoload.php');

function mailer($fname, $fmail, $to, $subject, $content)
{
	$mail = new PHPMailer();

	$mail->IsSMTP();

	$mail->SMTPSecure = "ssl";
	$mail->SMTPAuth = "true";

	$mail->Host = "smtp.naver.com";
	$mail->Port = 465;
	$mail->Username = "whan4404@naver.com";
	$mail->Password = "dh26825485";

	$mail->CharSet = 'UTF-8'
	$mail->From = $fmail;
	$mail->FromName = $fname;
	$mail->Subject = $subject;
	$mail->msgHTML($contentn);
	$mail->addAddress($to);

	return $mail->send();
}
?>