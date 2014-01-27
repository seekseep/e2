
<!--
// = host.html
// - 説明
// ホスト側のページ
// - 文字コード
// 		~ UTF-8
// - 依存するライブラリ
// 		~ jQuery 	1.10.2
//		~ Raphaël	2.1.2
// - 依存するファイル
// 		~ host.sidebat.js
// - 作成者
//		~ ヨコヤマタク
// 		~ B2266@oic.jp
// - 最終更新日
//		~ 2013-12-10
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
        header("Location: host_login.php?error=1");        
    }else{
?>
<!DOCTYPE html>
<html lang="ja">
<head>
	<meta charset="utf-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
	<title>HOST</title>
	<link rel="shortcut icon" href="favicon.ico">
	<!-- css -->
	<link rel="stylesheet" href="css/even/even.fontsize.css">
	<link rel="stylesheet" href="css/even/even.flexiblesvg.css">
	<link rel="stylesheet" href="css/host/host.css">
	<link rel="stylesheet" href="css/host/host.globalNavi.css">
	<link rel="stylesheet" href="css/host/host.localNaviGroup.css">
	<link rel="stylesheet" href="css/host/host.hostPages.css">	
	<!-- lib -->
	<script src="lib/jquery-1.10.2.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="lib/raphael-min.js" type="text/javascript" charset="utf-8"></script>
	<!-- script -->
	<script src="js/even/even.flexibleSvg.js" type="text/javascript" charset="utf-8"></script>
	<script src="js/host/host.effect.js" type="text/javascript" charset="utf-8"></script>
</head>
<body>
<?php
	// イベント情報の取得
	include_once('php/getEventStatus.php');
?>
<article id="hostApp" data-eventcode="<?php echo $eventCode; ?>">
	<section id="globalNavi">
		<ul id="globalNaviBody">
			<li id="eventOptionSettingLink" class="globalNaviItem">
				<div class="inner">
					<span class="globalItemName">イベント設定</span>
				</div>
			</li>
			<li id="eventStatusControlLink" class="globalNaviItem">
				<div class="inner">
					<span class="globalItemName">イベント操作</span>
				</div>
			</li>
			<li id="hostMessageSendLink" class="globalNaviItem">
				<div class="inner">
					<span class="globalItemName">ホストメッセージの送信</span>
				</div>
			</li>
			<li id="eventCodeCheckingLink" class="globalNaviItem">
				<div class="inner">
					<span class="globalItemName">ログインページの確認</span>
				</div>
			</li>
		</ul>
		<div class="background"></div>
	</section>
	<section id="localNaviGroup">
		<div class="inner">
			<section id="eventOptionSettingNavi" class="localNavi">
				<ul class="localNaviItems">
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">スタートロゴ</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">エンドロゴ</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">メッセージ<br>シェイプ</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">メッセージ<br>カラー</span>
							</div>
						</div>
					</li>													
				</ul>
			</section>
			<section id="eventStatusControlNavi" class="localNavi">
				<ul class="localNaviItems">
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">イベント操作</span>
							</div>
						</div>
					</li>
				</ul>
			</section>
			<section id="hostMessageSendNavi" class="localNavi">
				<ul class="localNaviItems">
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">テキストメッセージ<br>登録</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">シェイプメッセージ<br>登録</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">メッセージ<br>送信</span>
							</div>
						</div>
					</li>															
				</ul>
			</section>
			<section id="eventCodeCheckingNavi" class="localNavi">
				<ul class="localNaviItems">
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">ビジターページ</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">ビッグスクリーンページ</span>
							</div>
						</div>
					</li>
					<li class="localNaviItem">
						<div class="localNaviItemBody">
							<div class="localNaviItemIcon">
								<div class="inner">
									<div class="localNaviItemIconBody">
										
									</div>
								</div>
							</div>
							<div class="localNaviItemName">
								<span class="localNaviItemNameBody">ホストページ</span>
							</div>
						</div>
					</li>										
				</ul>
			</section>
		</div>
	</section>
	<section id="hostPages">
		<section id="eventOptionSettingPages" class="hostPagesGroup">
			<!-- スタートロゴのシェイプとカラーを選ぶ-->
			<section id="registerStartLogoPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>スタートロゴ</span></h1>
					<section class="hostPageContent">
						<section class="optionSelect">
							<section class="selectShape">
								<ul id="startLogoShape" class="selectList">
								</ul>
							</section>
							<section class="selectcolor">
								<ul id="startLogoColor" class="selectList">
								</ul>								
							</section>
						</section>
						<section class="optionregister">
							<section class="selectedsample"
										data-colorcode="<?php echo $startlogocolorid;?>"
										data-shapepath="<?php echo $startlogoshapeid;?>">
								<div class="selectedsampleBody">
									<div id="startLogoSample"></div>
								</div>
							</section>
							<section id="startLogoRegisterButton" class="registerButton">
								<div class="registerButtonBody"><span>登録</span></div>
							</section>
						</section>
					</section>
				</section>
			</section>
			<section id="registerEndLogoPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>エンドロゴ</span></h1>
					<section class="hostPageContent">
						<section class="optionSelect">
							<section class="selectShape">
								<ul id="endLogoShape" class="selectList">
								</ul>
							</section>
							<section class="selectcolor">
								<ul id="endLogoColor" class="selectList">
								</ul>								
							</section>
						</section>
						<section class="optionregister">
							<section class="selectedsample"
										data-colorcode="<?php echo $endlogocolorid;?>"
										data-shapepath="<?php echo $endlogoshapeid;?>">
								<div class="selectedsampleBody">
									<div id="endLogoSample"></div>
								</div>
							</section>
							<section id="endLogoRegisterButton" class="registerButton">
								<div class="registerButtonBody"><span>登録</span></div>
							</section>
						</section>
					</section>
				</section>
			</section>
			<section id="registerVisitorMessageShapePage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>メッセージシェイプ</span></h1>
					<section class="hostPageContent">
						<section class="optionSelect">
							<section class="selectShapes">
								<ul id="messageShapes" class="selectList">
								</ul>
							</section>
						</section>
						<section class="optionregister">
							<section class="selectedsample"
									data-shapelist="<?php echo $shapelistcode;?>">
								<div class="selectedsampleBody">
									<ul id="messageShapeSample">
									</ul>
								</div>
							</section>
							<section id="shapeListRagisterButton" class="registerButton">
								<div class="registerButtonBody"><span>登録</span></div>
							</section>
						</section>
					</section>					
				</section>
			</section>
			<section id="registerVisitorMessageColorPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>メッセージカラー</span></h1>
					<section class="hostPageContent">
						<section class="optionSelect">
							<section class="selectShape">
								<ul id="messageColors" class="selectList">
								</ul>
							</section>
						</section>
						<section class="optionregister">
							<section class="selectedsample"
									data-colorlist="<?php echo $colorlistcode;?>">
								<div class="selectedsampleBody">
									<ul id="messageColorSample">
									</ul>
								</div>
							</section>
							<section id="colorListRagisterButton" class="registerButton">
								<div class="registerButtonBody"><span>登録</span></div>
							</section>
						</section>
					</section>										
				</section>
			</section>
		</section>
		<section id="eventStatusControlPages" class="hostPagesGroup">
			<section id="controlEventStatusPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>イベント操作</span></h1>
					<section class="hostPageContent">
						<section id="eventControlPanel">
							<div id="statusView" data-status="<?php echo $status;?>">
								<div id="stop_button">
									<span>休止中</span>
									<div class="border"></div>
								</div>
								<div id="active_button">
									<span>実行中</span>
									<div class="border"></div>									
								</div>
							</div>
						</section>
					</section>
				</section>
			</section>
		</section>
		<section id="hostMessageSendPages" class="hostPagesGroup">
			<section id="registerHostTextMessage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>テキストメッセージ登録</span></h1>
					<section class="hostPageContent">
						<section id="hostMessage_messageOption" class="messageOption">
							<section id="hostMessage_text_layerType" class="layerType">
								<div class="toggle_group">
									<div class="toggle_item selected"><span>前面</span></div>
									<div class="toggle_item"><span>背面</span></div>
								</div>
							</section>
							<section id="hostMessage_text_rectType">
								<div class="toggle_group">
									<div class="toggle_item selected"><span>前面</span></div>
									<div class="toggle_item"><span>前面</span></div>
									<div class="toggle_item"><span>背面</span></div>
								</div>
							</section>
							<section id="hostMessage_text_size">
								<div>
									<div>+</div>
									<div><input type="text"/></div>
									<div>-</div>
								</div>
							</section>
							<section id="hostMessage_text_rectColor">
								<div>
									<input type="text">
								</div>
							</section>
							<section id="hostMessage_text_basePoint">
								<div>
									<div>上</div>
									<div>中央</div>
									<div>下</div>																		
								</div>
							</section>
							<section id="hostMessage_text_text">
								<div>
									<input type="text"/>
								</div>
							</section>
							<section id="hostMessage_text_textColor">
								<div>
									<input type="text">
								</div>
							</section>
							<section id="hostMessage_text_textAlign">
								<div>
									<div>左</div>
									<div>中央</div>
									<div>右</div>
								</div>
							</section>
							<section id="hostMessage_text_time">
								<div>
									<input type="text">
								</div>
							</section>
						</section>
						<section id="hostMessage_text_appearOption" class="appearOption">
							<section id="hostMessage_text_feadIn" class="feadIn">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>
							</section>
							<section id="hostMessage_text_slideIn" class="slideIn">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>
							</section>
							<section id="hostMessage_text_sizingIn" class="sizingIn">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>
							</section>
						</section>
						<section id="hostMessage_text_disappearOption" class="disappearOption">
							<section id="hostMessage_text_feadIn" class="feadOut">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>
							</section>
							<section id="hostMessage_text_feadIn" class="slideOut">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>								
							</section>
							<section id="hostMessage_text_feadIn" class="sizingOut">
								<div>
									<div>速度</div>
									<div>待機</div>
									<div>距離</div>
								</div>								
							</section>							
						</section>
						<section id="hostMessage_text_messageSample" class="messageSample">
							<section id="hostMessage_text_messageSampleBody"></section>
						</section>						
						<section id="hostMessage_text_registerButton" class="registerButton"></section>
					</section>
				</section>
			</section>
			<section id="registerHostShapeMessage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>シェイプメッセージ登録</span></h1>
					<section class="hostPageContent">
					</section>
				</section>
			</section>
			<section id="sendHostMessage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>メッセージ送信</span></h1>
					<section class="hostPageContent">
						<section id="hostMessage_messageOption">
							<section id="hostMessage_layerType"></section>
							<section id="hostMessage_messageType"></section>
							<section id="hostMessage_rectType"></section>
						</section>
						<section id="hostMessage_appearOption"></section>
						<section id="hostMessage_sendButton"></section>
					</section>
				</section>
			</section>
		</section>
		<section id="eventCodeCheckingPages" class="hostPagesGroup">
			<section id="checkUrlCodeAccessVisitorPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>ビジターログインページ</span></h1>
				</section>
			</section>
			<section id="checkUrlCodeAccessHostPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>ホストログインページ</span></h1>
				</section>
			</section>
			<section id="checkUrlCodeAccessBigscreenPage" class="hostPage">
				<section class="hostPageBody">
					<h1><span>ビッグスクリーンログインページ</span></h1>
				</section>
			</section>
		</section>
	</section>
</article>

<?php
	
	// データベースに登録されている
	// カラーリストとシェイプリストをDBより出力
	include_once('./php/getAllColorList.php');
	include_once('./php/getAllShapeList.php');
}	// ログイン判定
?>
</body>
</html>