<?php
// define(HOST, "localhost"); 
// define(USER, "e2");	
// define(PW, "1101");	
// define(DB, "e2");	

//DB接続
// $connect = mysqli_connect(HOST,USER,PW,DB)
// or die('Could not connect to mysql server.' );

$query = "SELECT
			`shapelist`.`shapeid`,
			`shapelist`.`listcode`,
			`shapelist`.`listnumber`,
			`shapelist`.`shapepath`
		FROM `event` LEFT OUTER JOIN `shapelist` ON `event`.`shapelistcode` = `shapelist`.`listcode`
		WHERE `event`.`eventcode` = '$eventCode'";

$result = mysqli_query($link, $query);
?>
<div id="eventShapeList" >
<?php
while($row = mysqli_fetch_array($result)){

	$shapeid 	=	$row['shapeid'];
	$listcode 	=	$row['listcode'];
	$listnumber =	$row['listnumber'];
	$shapepath 	=	$row['shapepath'];

?>
	<input 
		type="hidden"
		data-id="<?php echo $shapeid;?>"
		data-listcode="<?php echo $listcode;?>"
		data-listnumber="<?php echo $listnumber;?>"
		data-shapepath="<?php echo $shapepath;?>"/>
<?php
}
?>
</div>