<?php
// define("HOST", "localhost"); //DBサーバのアドレスを指定　※名前、IPアドレス
// define("USER", "e2");	//DBサーバを使えるユーザーを指定
// define("PW", "1101");	//DBサーバのパスワードを指定
// define("DB", "e2");	//今から利用するDB名の指定

//DBに接続
// $connect = mysqli_connect(HOST,USER,PW,DB)
// or die('Could not connect to mysql server.' );

//statusはイベント状態。0 - 準備中, 1 - 開催中
$query = "SELECT
			`status`,
			`startlogoshapeid`,
			`startlogocolorid`,
			`endlogoshapeid`,
			`endlogocolorid`,
			`shapelistcode`,
			`colorlistcode`
		FROM
			event
		WHERE `eventcode` = '$eventCode'";

$result = mysqli_query($link, $query);

if(!$result){
	echo "<p>$query</p>";
}

$row = mysqli_fetch_array($result);

if($row){
			$status 			= $row['status'];
			$startlogoshapeid 	= $row['startlogoshapeid'];
			$startlogocolorid 	= $row['startlogocolorid'];
			$endlogoshapeid 	= $row['endlogoshapeid'];
			$endlogocolorid 	= $row['endlogocolorid'];
			$shapelistcode 		= $row['shapelistcode'];
			$colorlistcode 		= $row['colorlistcode'];
}