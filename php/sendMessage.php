<?php

# エラーの表示をオフにする
ini_set("display_errors", "off");

# タイムゾーンの設定
ini_set("date.timezone", "Asia/Tokyo");

# ヘッダー宣言
# 文字コード
header("Content-Type:text/html; charset=UTF-8");
# キャッシュの有効期限
header("Expires: Thu, 01 Dec 1994 16:00:00 GMT");
# 更新日を実行された時間にする
header("Last-Modified: ". gmdate("D, d M Y H:i:s"). " GMT");
# キャッシュしない
# 複数のバージョンに対応
header("Cache-Control: no-store, no-cache, must-revalidate, post-check=0, pre-check=0");
header("Pragma: no-cache");

# イベントコード
$eventCode 	= $_GET['eventCode'];

# イベントディレクトリのパス
$eventDir = '../data/' . $eventCode;

# イベントディレクトリの存在確認
if(!file_exists($eventDir)){

	echo "console.log('イベントディレクトリが存在しません。', $eventDir);";
	retrun;
}

# メッセージコマンドファイルのパス
$mcFile = $eventDir . '/cmd.txt';

# ファイルをロックする
// $res = flock($mcFp, LOCK_EX);

# ファイルロックの結果判定
// if(!$res){
// 	echo "console.log('メッセージコマンドファイルのロックに失敗しました。');\n";
// 	retrun;
// }

# メッセージコマンドの作成
$cmd = "";

if($_GET['manager'] == 'visitor'){

	$cmd = 'visitorMessagesManager';

	if($_GET['type'] == 'add'){
		$cmd .= ".add({";
		$cmd .= "id : '" 		. $_GET['id'] 		. "', ";
		$cmd .= "shapeCode : "	. $_GET['shapeCode'] . ", ";
		$cmd .= "colorCode : "	. $_GET['colorCode']. ", ";
		$cmd .= "text : '" 		. $_GET['text'] 	. "'});";
	}else{

		$cmd .= ".control({ id : '" . $_GET['id'] . "', o : { ";

		if($_GET['type'] == 'move'){

			$cmd .= "'type' : COMMAND_MOVE,";
			$cmd .= "'x' : " . $_GET['x'] . ",";
			$cmd .= "'y' : " . $_GET['y'] . "}});";

		}else if($_GET['type'] == 'resize'){

			$cmd .= "'type' : COMMAND_RESIZE,";
			$cmd .= "'size' : " . $_GET['size'] . "}});";

		}
	}

}else{

	if($_GET['manager'] == 'host1'){
		$cmd = 'host1MessagesManager';
	}else if($_GET['manager'] == 'host2'){
		$cmd = 'host2MessagesManager';		
	}

	if($_GET['type'] == 'add'){
		$cmd .= '.add({';
		if($_GET['mType'] == 'rect'){

			$cmd .= "'mType' : 'rect',";

			if($_GET['rType'] == 'vertical'){

				$cmd .= "'rType' : 'vertical',";
				$cmd .= "'basePoint' : " + $_GET['basePoint'];
				$cmd .= "'width' : " . $_GET['width']; 

			}else if($_GET['rType'] == 'horizon'){

				$cmd .= "rType : 'horizon',";
				$cmd .= "'basePoint' : " + $_GET['basePoint'];
				$cmd .= "'height' : " . $_GET['width'];

			}else if($_GET['rType'] == 'wall'){

				$cmd .= "rType : 'wall',";

			}

			$cmd .= "'rectColor' : " 	. $_GET['rectColor'] 	 . ",";
			$cmd .= "'text' : " 		. $_GET['text'] 		 . ",";
			$cmd .= "'textVertical'" 	. $_GET['textBasePoint'] . ",";
			$cmd .= "'textArign'" 		. $_GET['textBasePoint'] . ",";
			$cmd .= "'textColor' : " 	. $_GET['textColor'] 	 . "});";


		}else if($_GET['messageType'] == 'path'){

		}
	}

}

# メッセージコマンドファイルの存在確認
if(!file_exists($mcFile)){
	echo "console.log('メッセージコマンドファイルが存在しません。', $mcFile);";
	retrun;
}

# ファイルを開く
$mcFp = fopen($mcFile, 'a');

# ファイルオープン結果判定
if(!$mcFp){
	echo "console.log('メッセージコマンドファイルのオープンに失敗しました。');\n";
	retrun;
}

# メッセージコマンドを書き込む
fwrite($mcFp, $cmd);
echo $cmd;


# ファイルのロック解除
// flock($mcFp, LOCK_UN);

# ファイルのクローズ
fclose($fp);