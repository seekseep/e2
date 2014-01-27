
<?php

header("Content-Type:text/html; charset=UTF-8");
ini_set("date.timezone", "Asia/Tokyo");

?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>LOGIN | BIGSCREEN</title>
  <link rel="shortcut icon" href="favicon.ico">
  <link rel="stylesheet" href="css/login/login.css">
  <script src="lib/jquery-1.10.2.js"></script>
</head>
<body>
<header>
  <a href="./index.html">
    <h1>
      <span>
        e<em>2</em>
      </span>
    </h1>
  </a>
</header>
<section>
  <h1>イベント作成</h1>
<?php

  // DBコネクションの確率
  include_once('./php/dbLink.php');

  // イベントコードの生成
  $eventCode = "e_" . date('YmdHis') . sprintf('%04d', floor(microtime() * 1000));

  
  $file_name = "./data/$eventCode";
  if(!file_exists($file_name)){
    mkdir( $file_name, 0777);
  }else{
    echo "<p>イベントディレクトリの作成に失敗しました。</p>";
  }

  $txt_name = "./data/$eventCode/cmd.txt";
  if(!file_exists($txt_name)){
    touch( $txt_name );
    chmod( $file_name, 0777);
  }else{
    echo "<p>コマンドファイルの作成に失敗しました。</p>";  
  }

  $query = "INSERT INTO `event` (`eventcode`) VALUES ('$eventCode')";

  $result = mysqli_query($link, $query);

  if($result){
?>
  <h1>イベントを作成しました</h1>
  <h2><?php echo $eventCode; ?></h2>
  <a href="host_login.php">ログイン</a>
<?php
  }else{
?>
  <h1>イベント作成に失敗しました。</h1>
<?php
  echo "<p>$query</p>";
}
?>
    </section>
  </body>
</html>