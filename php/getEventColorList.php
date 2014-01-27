<?php

//DBに接続
// header("Content-Type:text/html; charset=UTF-8");
// ini_set("date.timezone", "Asia/Tokyo");

// define("HOST", "localhost");
// define("USER", "e2");
// define("PW", "1101");
// define("DB", "e2");

// $link = mysqli_connect(HOST, USER, PW, DB)
// 	or die("Error " . mysqli_error($link));

$query = "SELECT
			`colorlist`.`colorid`,
			`colorlist`.`listcode`,
			`colorlist`.`listnumber`,
			`colorlist`.`colorcode`
		  FROM `event` LEFT OUTER JOIN `colorlist` ON `event`.`colorlistcode` = `colorlist`.`listcode`
		  WHERE `event`.`eventcode` = '$eventCode'";

$result = mysqli_query($link, $query);

if(!$result){
	echo "$query";
}
?>
<div id="eventColorList">
<?php
while($row = mysqli_fetch_array($result)){
	$colorId 			= $row['colorid'];
	$listCode 			= $row['listcode'];
	$listNumber 		= $row['listnumber'];
	$colorCode 			= $row['colorcode'];
?>
	<input type="hidden"
		data-id="<?php echo $colorId;?>"
		data-listcode="<?php echo $listCode;?>"
		data-listnumber="<?php echo $listNumber;?>"
		data-colorCode="<?php echo $colorCode;?>"/>
<?php
}		// end of while
?>
</div>