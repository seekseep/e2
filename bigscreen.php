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
<html>
    <head>
        <meta charset="utf-8">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>BIGSCREEN</title>
        <link rel="shortcut icon" href="favicon.ico">
        <!-- lib -->
        <script src="./lib/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
        <script src="./lib/raphael-min.js" type="text/javascript" charset="utf-8"></script>
        <!-- script -->
        <script src="js/even/even.constants.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/even/even.codeManager.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/even/even.flexibleSvg.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/even/even.messageText.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/even/even.createVisitorMessage.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/even/even.createHostMessage.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bigscreen/bigscreen.message.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bigscreen/bigscreen.messagesManager.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bigscreen/bigscreen.js" type="text/javascript" charset="utf-8"></script>
        <script src="js/bigscreen/bigscreen.updater.js" type="text/javascript" charset="utf-8"></script>
        <!-- css -->
        <link rel="stylesheet" href="css/bigscreen/bigscreen.css">
        <link rel="stylesheet" href="css/even/even.message.css">
        <link rel="stylesheet" href="css/even/even.fontsize.css">
    </head>
<body>
<article id="bigscreenApp" data-status="suspension" data-eventCode='<?php echo $eventCode; ?>'>
    <section id="laeyers">
    	<section class="layer" id="hostLayer2"></section>
    	<section class="layer" id="visitorLayer"></section>
    	<section class="layer" id="hostLayer1"></section>	
    </section>
    <section id="un_active">
        <h1></h1>
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