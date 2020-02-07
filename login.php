<?php
include("./dbconn.php");
?>

<html>
<head>
	<title>Login</title>
	<link href="./style.css" rel="stylesheet" type="text/css">
</head>
<body>
	<?php if(isset($_SESSION['ss_mb_id'])) {?>
<h1>로그인</h1>

	<form action="./login_check.php" method="post">
		<table>
			<tr>
				<th>아이디</th>
				<td><input type="text" name="mb_id"></td>
			</tr>
			<tr>
				<th>비밀번호</th>
				<td><input type="password" name="mb_password"></td>
			</tr>
			<tr>
				<td colspan="2" class="td_center">
					<input type="submit" value="로그인">
					<a href="./register.php">회원가입</a>
				</td>
			</tr>
		</table>
	</form>
<?php } else {?>

<h1>로그인을 환영합니다.</h1>
	<?php
	$mb_id = $_SESSION['ss_mb_id'];

	$sql = "select *from member where mb_id = TRIM('$mb_id')";
	$result = mysqli_query($conn, $sql);
	$mb = mysqli_fetch_assoc($result);

	mysqli_close($conn);
	?>
	<table>
		<tr>
			<th>아이디</th>
			<td><?php echo $mb['mb_id']?></td>
		</tr>
		<tr>
			<th>이름</th>
			<td><?php echo $mb['mb_name']?></td>
		</tr>
		<tr>
			<th>이메일</th>
			<td><?php echo $mb['mb_email']?></td>
		</tr>
		<tr>
			<th>성별</th>
			<td><?php echo $mb['mb_gender']?></td>
		</tr>
		<tr>
			<th>직업</th>
			<td><?php echo $mb['mb_job']?></td>
		</tr>
		<tr>
			<th>관심언어</th>
			<td><?php echo $mb['mb_language']?></td>
		</tr>
		<tr>
			<th>이메일 인증일</th>
			<td><?php echo $mb['mb_email_certify']?></td>
		</tr>
		<tr>
			<th>회원가입일</th>
			<td><?php echo $mb['mb_datetime']?></td>
		</tr>
		<tr>
			<th>회원정보 수정일</th>
			<td><?php echo $mb['mb_modify_datetime']?></td>
		</tr>
		<tr>
			<td colspan="2" class="td_center">
				<a href="./register.php?mode=modify">회원정보수정</a>
				<a href="./logout.php">로그아웃</a>
			</td>
		</tr>
	</table>
<?php } ?>
</body>
</html>