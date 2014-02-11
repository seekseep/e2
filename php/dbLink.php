<?php
define("HOST", "localhost");
define("USER", "e2");
define("PW", "1381101");
define("DB", "e2");

// リンクの取得
$link = mysqli_connect(HOST, USER, PW, DB)
or die("Error " . mysqli_error($link));