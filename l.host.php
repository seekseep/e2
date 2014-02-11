<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<title>ホスト ー ログイン | e2</title>
	<link href='http://fonts.googleapis.com/css?family=Anaheim' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="css/fontsize.css">
	<link rel="stylesheet" href="css/login.css">
	<script src="lib/jquery-1.10.2.min.js"></script>
</head>
<body>
<header>
	<h1><a href="./index.php">e<sup>2</sup></a></h1>
	<h2>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			viewBox="0 0 100 100"
			enable-background="new 0 0 100 100"
			xml:space="preserve">
				<g fill="#EEE">
					<path d="M82.309,72.391c4.782,0,9.737,3.751,11.043,8.341l1.879,6.643c1.301,4.588-1.554,8.348-6.326,8.323  l-77.745-0.05c-4.768,0-7.656-3.769-6.418-8.37l1.773-6.51c1.24-4.626,6.174-8.377,10.941-8.377H82.309z"/>
					<path d="M89.901,4.302H10.11c-2.013,0-3.641,1.625-3.641,3.641v55.565c0,2.017,1.628,3.643,3.641,3.643h79.791  c2.006,0,3.643-1.626,3.643-3.643V7.943C93.544,5.928,91.907,4.302,89.901,4.302z M86.26,59.869H13.749V11.583H86.26V59.869z"/>
				</g>
		</svg>
	</h2>
</header>
<?php
	if(isset($_GET['error'])){
		if($_GET['error'] == 1){
			echo '<p>イベントが存在しませんでした。</p>';
		}		
	}
?>

<section>
	<div>
		<hgroup>
			<h3>HOST</h3>
			<h4>管理者ログイン</h4>
		</hgroup>
		<form action="host.php" method="GET">
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
	</div>
 </section>
<div id="link_createEvent">
	<a href="create.php">新規イベント作成</a>
</div>



</body>
</html>