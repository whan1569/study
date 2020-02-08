<?php
include("./dbconn.php");

$mode = $_POST['mode'];

if($mode != 'insert' && $mode != 'modify'){
	echo "<script>alret('mode 값이 제대로 넘어오지 않았습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

switch ($mode) {
	case 'insert':
		$mb_id = trim($_POST['mb_id']);
		$title = "회원가입";
		break;
	case 'modify':
		$mb_id = trim($_SESSION['ss_mb_id']);
		$title = "회원수정";
		break;
}

$mb_password		= trim($_POST['mb_password']);
$mb_password_re		= trim($_POST['mb_password_re']);
$mb_name			= trim($_POST['mb_name']);
$mb_email			= trim($_POST['mb_email']);
$mb_gender			= $_POST['mb_gender'];
$mb_job				= $_POST['mb_jop'];
$mb_ip				= $_SERVER['REMOTE_ADDR'];
$mb_language		= implode(",", $_POST['mb_language']);
$mb_datetime		= date('Y-m-d H:i:s',time());
$mb_modify_datetime	= date('Y-m-d H:i:s',time());

if(!$mb_id){
	echo "<script>alret('아이디가 넘어오지 않았습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

if(!$mb_password){
	echo "<script>alret('비밀번호가 넘어오지 않았습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

if($mb_password != $mb_password_re){
	echo "<script>alret('비밀번호가 일치하지 않습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

if(!$mb_name){
	echo "<script>alret('이름이 넘어오지 않았습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

if(!$mb_email){
	echo "<script>alret('이메일이 넘어오지 않았습니다.');</script>";
	echo "<script>location.replace('./register.php');</script>";
	exit;
}

$sql = "SELECT PASSWORD('$mb_password') AS pass";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
$mb_password = $row['pass'];

if($mode == "insert"){

	$sql = "SELECT * FROM member WHERE mb_id = '$mb_id'";
	$result = mysqli_query($conn, $sql);

	if(mysqli_num_rows($result) > 0){
		echo "<script>alret('이미 사용중인 회원아이디 입니다.');</script>";
		echo "<script>location.replace('./register.php');</script>";
		exit;
	}

	$sql = "INSERT INTO member
					SET mb_id = '$mb_id',
						mb_password = '$mb_password',
						mb_name = '$mb_name',
						mb_email = '$mb_email',
						mb_gender = '$mb_gender',
						mb_job = '$mb_job',
						mb_ip = '$mb_ip',
						mb_language = '$mb_language',
						mb_datetime = '$mb_datetime' ";
	$result = mysqli_query($conn, $sql);

}else if($mode == "modify"){

	$sql = "UPDATE member
					SET mb_password = '$mb_password',
						mb_email = '$mb_email',
						mb_gender = '$mb_gender',
						mb_job = '$mb_job',
						mb_language = '$mb_language',
						mb_modify_datetime = '$mb_modify_datetime'
					WHERE mb_id = '$mb_id' ";
	$result = mysqli_query($conn, $sql);
}

if($result){

	if($mode == "insert"){
		include_once('./function.php');

		$mb_md5 = md5(pack('V*',rand(),rand(),rand(),rand()));

		$sql = " UPDATE member SET mb_email_certify2 = '$mb_md5' WHERE mb_id = '$mb_id' ";
		$result = mysqli_query($conn, $sql);
		mysqli_close($conn);

		$certify_href = 'http://localhost/email_certify.php?&amp;mb_id='.$mb_id.'$amp;mb_md5='.$mb_md5;

		$subject = '인증확인 메일입니다.';

		ob_start();
		include_once('./register_update_mail.php');
		$content = ob_get_contents();
		ob_end_clean();

		$mail_from = "whan4404@naver.com";
		$mail_to = $mb_email;

		mailer('관리자', $mail_from, $mail_to, $subject, $content);
	}

	echo "<script>alret('".$title."이 완료 되었습니다. \\n신규가입의 경우 메일인증을 받으셔야 로그인 가능합니다.');</script>";
	echo "<script>location.replace('./login.php');</script>";
	exit;
}else{
	echo "생성 실패" .mysqli_error($conn);
	mysqli_close($conn);
}
?>