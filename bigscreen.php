<?php

    // 文字コード指定
    header("Content-Type: text/html;charset=utf-8");

    // イベントコード
    $eventCode = $_GET['eventCode'];

    // DBとのコネクションの確保
    include_once('./php/dbLink.php'); 

    // SQL の発行
    $query = "SELECT `eventcode` FROM `event` WHERE `eventcode` = '$eventCode'";    

    // SQL の実行
    $result = mysqli_query($link, $query);
    $row = mysqli_fetch_array($result); 

    if(!$row){
        // ログイン失敗時にログイン画面に移動
        header("Location: bigscreen_login.php?error=1");        
    }else{
?>
<!doctype html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>ビッグスクリーン | e2</title>
        <!-- lib -->
        <script type="text/javascript" src="./lib/jquery-1.10.2.min.js"></script>
        <script type="text/javascript" src="./lib/raphael-min.js"></script>
        <!-- script : bigscreen -->
        <script type="text/javascript" src="./js/bigscreen/bigscreen.js"></script>
        <script type="text/javascript" src="./js/bigscreen/messagesManager.js"></script>
        <script type="text/javascript" src="./js/even/codeManager.js"></script>
        <script type="text/javascript" src="./js/bigscreen/message.js"></script>
        <script type="text/javascript" src="./js/bigscreen/visitorMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostPathMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostRectMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostRectWallMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostRectVerticalMessage.js"></script>
        <script type="text/javascript" src="./js/bigscreen/hostRectHorizontalMessage.js"></script>
        <!-- css -->
		<link type="text/css" rel="stylesheet" href="css/fontsize.css" />
		<link type="text/css" rel="stylesheet" href="css/message.css" />
		<link type="text/css" rel="stylesheet" href="css/bigscreen.css" />
    </head>
<body>
<article id="bigscreenApp" data-status="suspension" data-eventCode='<?php echo $eventCode; ?>'>
    <section id="laeyers">
    	<section class="layer" id="hostLayer2"></section>
    	<section class="layer" id="visitorLayer"></section>
    	<section class="layer" id="hostLayer1"></section>	
    </section>
    <section id="info">
        <h1 id="info_message">停止中</h1>
    </section>
</article>
<?php
        // イベントに登録されたリストを取得
        include_once('./php/getEventColorList.php');
        include_once('./php/getEventShapeList.php');
    } // ログイン処理終了
?>
</body>
</html>