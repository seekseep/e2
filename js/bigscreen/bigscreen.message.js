// ====================================================================================================
// MESSAGE
// ==
// ビッグスクリーン上で動くメッセージ
// ====================================================================================================
// メッセージオブジェクトが共通で使う定数
// ==
var STATUS_IMMATURE		= 1;
var STATUS_ACTIVE		= 2;
var STATUS_ANIMATING	= 3;
var STATUS_DEATH		= 4;
var STATUS_KUMAMUSHI	= 5;
// ====================================================================================================

// メッセージオブジェクト
var message_prototype = new Object();

// 初期のステータスはIMMATURE(未熟)
message_prototype.status = STATUS_IMMATURE

// キューに入ったメッセージコマンドを取得する
message_prototype.getMessageCommand = 	function(){
											return this.commandQueue.shift();
										};

// キューにメッセージコマンドを追加する
message_prototype.addMessageCommand = 	function(o){
											if(this.status == STATUS_ACTIVE){
												this.commandQueue.push(o);
												return true;
											}else if(this.status == STATUS_KUMAMUSHI){
												this.initCommandQueue();
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
// キューの初期化
message_prototype.initCommandQueue	= function(){
											this.commandQueue = new Array();
										};

// キューに入ったコマンドを実行する
// アップデートの処理は各メッセージに委ねる
message_prototype.updateMessageCommand = function(){};

// 何もしないがコマンドが実行される。待機する。
message_prototype.stay 				=	function(o){
											// timeオプションが指定されている場合
											if(o.time){

												if(!o.time == 0){
													// 回数指定の場合は1減らして挿入
													if(o.time > 0){
														o.time = Math.floor(o.time - 1);
													}
													this.wedgeMessageCommand(o);
												}											}
										};

// メッセージの要素を削除する。ステータスを書き変える。
message_prototype.destroy 			= 	function(){
											// 要素を取り除く
											$('#' + this.id).remove();

											// キューをなくす
											delete this.commandQueue;

											// オブジェクトのステータスをDEATHにする
											this.status = STATUS_DEATH;
										};
// ====================================================================================================