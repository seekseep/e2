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
$eventCode = $_GET['eventCode'];

if($eventCode == ""){
	$eventCode = "e_0000";
}

# イベントディレクトリのパス
$eventDir = '../data/' . $eventCode;

# イベントディレクトリの存在確認
if(!file_exists($eventDir)){

	echo "console.log('イベントディレクトリが存在しません。', $eventDir);";
	retrun;
}

# メッセージコマンドファイルのパス
$mcFile = $eventDir . '/cmd.txt';

# メッセージコマンドファイルの存在確認
if(!file_exists($mcFile)){
	echo "console.log('メッセージコマンドファイルが存在しません。', $mcFile);";
	retrun;
}

# ファイルを開く
$mcFp = fopen($mcFile, 'r+');

# ファイルオープン結果判定
if(!$mcFp){
	echo "console.log('メッセージコマンドファイルのオープンに失敗しました。');\n";
	retrun;
}

# ファイルをロックする
// $res = flock($mcFp, LOCK_EX);

# ファイルロックの結果判定
// if(!$res){
// 	echo "console.log('メッセージコマンドファイルのロックに失敗しました。');\n";
// 	retrun;
// }

# 全行に対しての処理
while($buffer = fgets($mcFp)){
	# 各行を出力
	echo $buffer;
}

# 空文字列を書き込む
fwrite($mcFp, "");

# ファイルのロック解除
// flock($mcFp, LOCK_UN);

# ファイルの中を空にする
if($mcFp = fopen($mcFile, 'w')){
	fwrite($fp, "");
	fclose($fp);
}