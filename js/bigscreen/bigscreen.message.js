// ====================================================================================================
// MESSAGE
// ==
// ビッグスクリーン上で動くメッセージ
// ====================================================================================================
// メッセージオブジェクトが共通で使う定数
// ==
var STATUS_IMMATURE	= 0;
var STATUS_ACTIVE	= 1;
var STATUS_DEATH	= 3;
var STATUS_PHOENIX	= 4;
// ==
var SPEED_SLOW		= 1000;
var SPEED_MIDDLE	= 500;
// == 
var COMMAND_STAY		= 1;
var COMMAND_MOVE 		= 2;
var COMMAND_RESIZE 		= 3;
var COMMAND_OPACITY 	= 4;
var COMMAND_REMOVE 		= 5;
var COMMAND_APPEAR 		= 6;
var COMMAND_DISAPPEAR 	= 7;
var COMMAND_CSS 		= 8;
// ====================================================================================================

// メッセージオブジェクト
var message_prototype = new Object();

// 初期のステータスはIMMATURE(未熟)
message_prototype = STATUS_IMMATURE

// キューに入ったメッセージコマンドを取得する
message_prototype.getMessageCommand = 	function(){
											return this.commandQueue.shift();
										};

// キューにメッセージコマンドを追加する
message_prototype.addMessageCommand = 	function(o){
											console.log(this.status, STATUS_ACTIVE);
											if(this.status == STATUS_ACTIVE){
												this.commandQueue.push(o);
												return true;
											}

											// 今のステータスを返す
											return this.status;
										};

// キューにメッセージコマンドを割り込ませる
message_prototype.wedgeMessageCommand = function(o){
											if(this.status == STATUS_ACTIVE){
												this.commandQueue.unshift(o);
											}

											return this.status;
										};

// キューに入ったコマンドを実行する
// アップデートの処理は各メッセージに委ねる
message_prototype.updateMessageCommand = function(){};

// 何もしないがコマンドが実行される。待機する。
message_prototype.stay 				=	function(o){

											if(o.time > 0){
												o.time = o.time - 1;
												this.wedgeMessageCommand(o);
											}
											
										};

// メッセージの要素を削除する。ステータスを書き変える。
message_prototype.destroy 			= 	function(){
											// 要素を取り除く
											$('#' + this.id).remove();

											// オブジェクトのステータスをDEATHにする
											this.status = STATUS_DEATH;
										};
// ====================================================================================================