<?php
//DB接続
include_once './dbLink.php';

$eventcode = $_POST['eventcode'];
$colorlistcode = $_POST['colorlistcode'];

$query = "UPDATE `event` SET `colorlistcode` = $colorlistcode WHERE `eventcode` = '$eventcode'";

$res = mysqli_query($link, $query);

echo $res;