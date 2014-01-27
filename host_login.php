
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>LOGIN | HOST</title>
	<link rel="shortcut icon" href="favicon.ico">
	<link rel="stylesheet" href="css/login/login.css">
	<script src="lib/jquery-1.10.2.js"></script>
	<script src="js/login/login.js"></script>
</head>
<body>
<header>
	<a href="./index.html">
		<h1>
			<span>
				e<em>2</em>
			</span>
		</h1>
	</a>
</header>

<?php
	if(isset($_GET['error'])){
		if($_GET['error'] == 1){
			echo '<p>イベントが存在しませんでした。</p>';
		}		
	}
?>

<section>
	<form action="host.php" method="GET">
		<h1>ホスト</h1>
		<div id="inputEventCode">
			<input type="text" name="eventCode" placeholder="EVENT CODE"/>
		</div>
		<div id="loginButton">
			<div>
				<span>ログイン</span>
			</div>
		</div>
		<input type="submit" value="LOGIN">
	</form>	
</section>
<div id="link_createEvent">
	<a href="create.php">新規イベント作成</a>
</div>



</body>
</html>