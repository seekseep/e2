<?php
//DB接続
// ini_set("display_errors", "on");
include_once './dbLink.php';

$eventcode = $_POST['eventcode'];
$shapelistcode = $_POST['shapelistcode'];

$query = "UPDATE `event` SET `shapelistcode` = $shapelistcode WHERE `eventcode` = '$eventcode'";

$res = mysqli_query($link, $query);

echo $res;