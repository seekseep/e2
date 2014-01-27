
<!--
// = visitor.html
// - 説明
// クライアント側のページ
// - 文字コード
// 		~ UTF-8
// - 依存するライブラリ
// 		~ jQuery 	1.10.2
//		~ Raphaël	2.1.2
// - 依存するファイル
// 		~ visitor.js
//		~ visitor.startPage.js
// - 作成者
//		~ ヨコヤマタク
// 		~ B2266@oic.jp
// - 最終更新日
//		~ 2013-12-05
-->
<?php
    // 文字コード指定
    header("Content-Type: text/html;charset=itf-8");

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
        header("Location: visitor_login.php?error=1");        
    }else{
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<title>VISITOR</title>
	<link rel="shortcut icon" href="favicon.ico">
	<!-- css -->
	<link rel="stylesheet" href="css/even/even.fontsize.css">
	<link rel="stylesheet" href="css/even/even.flexiblesvg.css">
	<link rel="stylesheet" href="css/even/even.message.css">
	<link rel="stylesheet" href="css/visitor/visitor.css">
	<link rel="stylesheet" href="css/visitor/visitor.optionSettingPage.css">
	<link rel="stylesheet" href="css/visitor/visitor.selecterButtons.css">
	<link rel="stylesheet" href="css/visitor/visitor.pagerButton.css">
	<link rel="stylesheet" href="css/visitor/visitor.optionSettingPage.css">
	<link rel="stylesheet" href="css/visitor/visitor.sendMessagePage.css">
	<link rel="stylesheet" href="css/visitor/visitor.startPage.css">
	<link rel="stylesheet" href="css/visitor/visitor.controlMessagePage.css">
	<!-- lib -->
	<script src="lib/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="lib/raphael-min.js" type="text/javascript" charset="utf-8"></script>
	<!-- script -->
	<!-- even -->
	<script src="js/even/even.codeManager.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/even/even.dataManager.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/even/even.createVisitorMessage.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/even/even.flexibleSvg.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/even/even.messageText.js" type="text/javascript" charset="utf-8"></script>
	<!-- visitor -->
	<script src="js/visitor/visitor.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.pagerButtons.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.optionSelecter.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.startPage.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.optionSettingPage.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.makeSendMessageSample.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/visitor/visitor.controlMessage.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<?php

	include_once('./php/getEventStatus.php');
	
?>
<article id="visitorApp" class="startPageView" data-eventCode="<?php echo $eventCode; ?>" data-eventStatus="<?php echo $status; ?>">
	<!-- 開始ページ -->
	<section class="visitorAppPage" id="startPage">
		<section class="pageContent">
			<h1 id="startLogo"></h1>
		</section>
		<section class="pagerButton nextPagerButton clickable">
			<div class="pagerButtonBody">
				<div class="pagerButtonArrow">
					<span class="pagerButtonArrowBody"></span>
				</div>
			</div>
		</section>
	</section>

	<!-- メッセージオプション設定ページ -->
	<section class="visitorAppPage" id="optionSettingPage">
		<section class="pageContent">
			<section id="setMessageShape" class="optionSelecter"></section>
			<section id="setMessageColor" class="optionSelecter"></section>
			<section id="setMessageText">
				<div class="inner">
					<input type="text" name="visitorName" value="" placeholder="名前を入力してください。" maxlength="20">
					<div id="changeTextButton">
						<div class="buttonBody">
							<div class="buttonIcon"></div>
						</div>
					</div>
				</div>
			</section>
		</section>
		<section class="pagerButton nextPagerButton clickable">
			<div class="pagerButtonBody">
				<div class="pagerButtonArrow">
					<span class="pagerButtonArrowBody"></span>
				</div>
			</div>
		</section>
	</section>

	<!-- メッセージ送信ページ -->
	<section class="visitorAppPage" id="sendMessagePage">
		<section class="pageContent">
			<div id="senddingMessage"></div>
			<div id="background_arrow">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
					<polygon fill="rgba(0,0,0,0.2)" points="99.497,49.497 52.828,2.828 50,0 47.172,2.828 0.503,49.497 3.331,52.326 48,7.656 48,100 52,100 52,7.656    96.669,52.326 "/>
				</svg>
			</div>
		</section>
	</section>

	<!-- メッセージ操作ページ -->
	<section class="visitorAppPage" id="controlMessage">
		<section class="pageContent">
			<div id="controlArrowBox">
				<div class="upperSection">
					<svg
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
						<path
							fill="rgba(0,0,0,0.2)"
							d="M0,49.951l17.725,17.7c0,0,9.942-9.937,19.732-19.727V100h25.067V47.925l19.751,19.751L100,49.951  L50.006,0L0,49.951z"/>
					</svg>
				</div>				
				<div class="middleSection">
					<div class="lefter">
						<svg
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
							<path
								fill="rgba(0,0,0,0.2)"
								d="M49.951,100l17.725-17.725c0,0-9.937-9.937-19.727-19.727H100V37.476H47.949l19.727-19.751L49.951,0  L0,50L49.951,100z"/>
						</svg>
					</div>
					<div class="righter">
						<svg
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
							<path
								fill="rgba(0,0,0,0.2)"
								d="M50.049,0L32.336,17.725c0,0,9.938,9.937,19.727,19.727H0v25.086h52.062L32.324,82.275L50.049,100  L100,50L50.049,0z"/>
						</svg>
					</div>
				</div>				
				<div class="underSection">
						<svg
						xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" xml:space="preserve">
							<path
								fill="rgba(0,0,0,0.2)"
								d="M100,50.049l-17.725-17.7c0,0-9.937,9.937-19.727,19.727V0H37.476v52.075L17.725,32.324L0,50.049  L50,100L100,50.049z"/>
						</svg>					
				</div>				
			</div>
			<div id="controlStick">
				<div id="controlStickBody"></div>
			</div>
		</section>
	</section>

	<!-- 終了ページ -->
	<section class="visitorAppPage" id="endPage">
		<section class="pageContent">
			<h1 id="endLogo"></h1>
		</section>
	</section>
</article>

<?php

	// イベント情報を出力

	include_once('./php/getEventLogoData.php');
	include_once('./php/getEventShapeList.php');
	include_once('./php/getEventColorList.php');


	} // ログイン判定終わり
?>
</body>
</html>