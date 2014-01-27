<?php
//db接続
include_once './dbLink.php';

$eventcode = $_POST['eventcode'];
$status = $_POST['status'];

$query = "UPDATE `event` SET `status` = $status WHERE `eventcode` = '$eventcode'";

$res = mysqli_query($link, $query);

if($res)
	echo '登録完了';
else 
	echo '登録失敗';
