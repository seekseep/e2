<?php
//db接続
include_once './dbLink.php';

$eventcode = $_POST['eventcode'];
$endlogoshapeid = $_POST['endlogoshapeid'];
$endlogocolorid = $_POST['endlogocolorid'];

$query = "UPDATE `event` SET `endlogoshapeid` = $endlogoshapeid, `endlogocolorid` = $endlogocolorid WHERE `eventcode` = '$eventcode'";

$res = mysqli_query($link, $query);

echo $res;