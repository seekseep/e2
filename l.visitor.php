<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<title>ビジター ー ログイン | e2</title>
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
			viewBox="0 0 48 100"
			enable-background="new 0 0 48 100"
			xml:space="preserve">
			<path fill="#EEE" d="M41.6,1H6.4C2.865,1,0,3.865,0,7.4v76.033c0,3.535,2.865,6.4,6.4,6.4h35.2c3.535,0,6.4-2.865,6.4-6.4V7.4  C48,3.865,45.135,1,41.6,1z M24,86.999c-2.302,0-4.167-1.865-4.167-4.166c0-2.302,1.865-4.167,4.167-4.167  c2.3,0,4.166,1.865,4.166,4.167C28.166,85.134,26.301,86.999,24,86.999z M44,73.433c0,1.323-1.077,2.4-2.4,2.4H6.4  c-1.323,0-2.4-1.077-2.4-2.4V7.4C4,6.077,5.077,5,6.4,5h35.2C42.923,5,44,6.077,44,7.4V73.433z"/>
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
			<h3>VISITOR</h3>
			<h4>参加者ログイン</h4>
		</hgroup>
		<form>
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

</body>
</html>