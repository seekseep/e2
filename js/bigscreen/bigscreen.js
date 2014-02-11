// ====================================================================================================
// BIGSCREEN
// ==
// ビッグスクリーン全体の操作の根幹を担う
// ====================================================================================================
// ビッグスクリーンオブジェクト
var bigscreen = new Object();

// websocketオブジェクトの格納先
bigscreen.ws 				= 	null;

// websocketの初期化
bigscreen.initWebSocket 	= 	function(){

									// コネクションの作成
									this.ws 	= 	new WebSocket('ws://taku.st-sweet.com:8082/bigscreen');

									// 
									this.ws.sendJSON	= function(obj){
										this.send(JSON.stringify(obj));
									}

									var eventCode = this.eventCode;

									// コネクションがとれたとき
									this.ws.onopen = function(){
														var obj 			= 	{};
														obj.type 			= 	"join";
														obj.eventCode 		= 	eventCode;
														this.sendJSON(obj);
													}

									// メッセージを受信したとき
									this.ws.onmessage = function(msg){
										try{
											messagesManager.call(msg);
										}catch(e){
											console.log(e);
										}
									}
								};

// イベントコードの取得
bigscreen.getEventCode = function(){
	this.eventCode = $('#bigscreenApp').attr('data-eventcode');
}

bigscreen.start = function(){

	// イベントコードの取得
	this.getEventCode();

	// Websocketの準備
	this.initWebSocket();

	//　メッセージマネージャーを起動する
	messagesManager.start();

	// ステータスの書き換え
	$('#bigscreenApp').attr('data-status', 'active');
}


bigscreen.stop = function(){

	// ステータスの書き換え
	$('#bigscreenApp').attr('data-status', 'suspension');

	// メッセージマネージャーを停止する
	messagesManager.stop();	
}


$(document).ready(function() {

	bigscreen.start();

});
