<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<title>ビッグスクリーン ー ログイン | e2</title>
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
			version="1.1"
			id="Layer_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			viewBox="-5.508 -6.654 86.9 100"
			enable-background="new -5.508 -6.654 86.9 100"
			xml:space="preserve">
			<path fill="#EEE" d="M34.054,77.245l-16.37,6.277l-1.636-2.867l18.006-11.05V63.33h-34.65c-2.728,0-4.912-2.182-4.912-4.911 c0-2.591,1.91-4.638,4.5-4.909V8.353c-2.59-0.135-4.5-2.319-4.5-4.775c0-2.728,2.184-4.912,4.912-4.912h35.605l2.047-5.32h1.229 l2.042,5.32h36.154c2.728,0,4.911,2.184,4.911,4.912c0,2.73-2.184,4.912-4.911,4.912v45.02c2.728,0,4.911,2.182,4.911,4.909 c0,2.729-2.184,4.911-4.911,4.911H40.738v6.275l18.144,11.05l-1.636,2.867l-16.508-6.277v12.551c0,1.909-1.498,3.55-3.408,3.55 c-2.047,0-3.276-1.641-3.276-3.55V77.245L34.054,77.245z M70.203,8.899H5.27v44.2h64.933V8.899z"/>
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
			<h3>BIGSCREEN</h3>
			<h4>出力画面ログイン</h4>
		</hgroup>
		<form action="bigscreen.php" method="GET">
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