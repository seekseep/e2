<?php
// define(HOST, "localhost"); 
// define(USER, "e2");	
// define(PW, "1101");	
// define(DB, "e2");	

//DB接続
// $connect = mysqli_connect(HOST,USER,PW,DB)
// or die('Could not connect to mysql server.' );

$query = "SELECT
			`startshapelist`.`shapepath`AS `startlogoshapepath`,
			`startcolorlist`.`colorcode`AS `startlogocolorcode`,
			`endshapelist`.`shapepath` 	AS `endlogoshapepath`,
			`endcolorlist`.`colorcode` 	AS `endlogocolorcode` 
		FROM `event`
				INNER JOIN `shapelist` AS `startshapelist` ON `event`.`startlogoshapeid` = `startshapelist`.`shapeid`
				INNER JOIN `colorlist` AS `startcolorlist` ON `event`.`startlogocolorid` = `startcolorlist`.`colorid`
				INNER JOIN `shapelist` AS `endshapelist` ON `event`.`endlogoshapeid` = `endshapelist`.`shapeid`
				INNER JOIN `colorlist` AS `endcolorlist` ON `event`.`endlogocolorid` = `endcolorlist`.`colorid`
		WHERE `event`.`eventcode` = '$eventCode'";

$result = mysqli_query($link, $query);

if($row = mysqli_fetch_array($result)){

	$startlogoshapepath = $row['startlogoshapepath'];
	$startlogocolorcode = $row['startlogocolorcode'];
	$endlogoshapepath 	= $row['endlogoshapepath'];
	$endlogocolorcode 	= $row['endlogocolorcode'];

?>
<div id="visitorStartLogoData">
	<input type="hidden" name="path" value="<?php echo $startlogoshapepath; ?>">
	<input type="hidden" name="color" value="<?php echo $startlogocolorcode; ?>">
</div>
<div id="visitorEndLogoData">
	<input type="hidden" name="path" value="<?php echo $endlogoshapepath; ?>">
	<input type="hidden" name="color" value="<?php echo $endlogocolorcode; ?>">
</div>
<?php
}
?>