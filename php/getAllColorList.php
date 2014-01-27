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
			`colorid`,
			`listcode`,
			`listnumber`,
			`colorcode`
		  FROM `colorlist`";

$result = mysqli_query($link, $query);

if(!$result){
	echo "$query";
}
?>
<div id="colorListData">
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