<?php
// db接続
include_once './dbLink.php';

$eventcode = $_POST['eventcode'];
$startlogoshapeid = $_POST['startlogoshapeid'];
$startlogocolorid = $_POST['startlogocolorid'];

$query = "UPDATE `event` SET `startlogoshapeid` = $startlogoshapeid, `startlogocolorid` = $startlogocolorid WHERE `eventcode` = '$eventcode'";

$res = mysqli_query($link, $query);

echo $res;