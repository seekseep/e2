// = visitor.js
// - 説明
// visitorオブジェクトを定義する為のjavascriptファイル
// ライブラリが読み込まれた時点でvisitorオブジェクトを定義する
// visitorオブジェクトとはイベント参加者のクライアントで動作するオブジェクト
// sendMessage.phpにAjaxでデータをGETで送信する
// データはjavascriptのオブジェクトで作成される
// - 文字コード
// 		~ UTF-8
// - 依存するライブラリ
// 		~ jQuery 	1.10.2
// - 依存するファイル
//		~ visitor.html
// 		~ sendMessage.php
// - 作成者
//		~ ヨコヤマタク
// 		~ B2266@oic.jp
// - 最終更新日
//		~ 2013-11-30

var visitor;

var visitor_prototype = {
	// = ユーザー情報
	visitorIdHeader 		: "v_",
	visitorId 				: null,
	// = 状態情報
	createFlag 				: 0,		// 0 : 作成前, 1 : 作成中, 2 : saliseolammrup
	messageFlag				: 0,
	// = メッセージ情報
	messageShapeCode	: null,
	messageColorCode	: null,
	messageTextWords 		: null,
	// = visitor設定メソッド
	initVisitor 			: function(){
								// ユーザーIDの取得
								this.setUserId();
								// イベントIDの取得
								this.setEventId();
							},
	// = 送信用メソッド
	// - ADDメッセージの作成
	sendAddMessage 	: function(){

							if(this.createFlag == 0){

								var eCode 		= this.eventCode;
								var vId 		= this.visitorId;
								var shapeCode 	= this.messageShapeCode;
								var colorCode 	= this.messageColorCode;
								var textWords 	= this.messageTextWords;

								console.log(this.visitorId);

								var message = {
									'eventCode' : eCode,
									'manager' 	: 'visitor',
									'id'    	: vId,
									'type' 		: 'add',
									'shapeCode' : shapeCode,
									'colorCode' : colorCode,
									'text' 		: textWords
								};

								this.createFlag = 1;
								this.sendMessage(message);
							}
						},
	// - RESIZEメッセージの作成
	sendResizeMssage	: function(val){

							var message = {
								'eventCode' : this.eventCode,
								'manager' 	: 'visitor',
								'id'		: this.visitorId,
								'type' 		: 'resize',
								'size'		: val.size
							};

							this.sendMessage(message);

						},
						
	// - MOVEメッセージの作成
	sendMoveMessage	: function(val){

							var message = {
								'eventCode' : this.eventCode,
								'manager' 	: 'visitor',
								'id'		: this.visitorId,
								'type' 		: 'move',
								'x' 		: val.x,
								'y' 		: val.y
							};

							this.sendMessage(message);
						},
	// - メッセージの送信
	sendMessage 	: function(mes){
							$.ajax({
								url: './php/sendMessage.php',
								type: 'GET',
								dataType: 'text',
								data: mes
							})
							.done(function(data) {
							})
							.fail(function() {
								// console.log("error");
							})
							.always(function() {
								// console.log("complete");
							});
						},
	// = データセット用メソッド
	// - ユーザーデバイスの取得
	setUserDevise 	: function(){

						// 処理
						//
						//
						//

						this.userDevise 		= null;
						this.userBrowser 		= null;
						this.userOS 			= null;
						this.userAccelerometer 	= null;
					},
	// - ユーザーIDの取得
	setUserId		: function(){
						// ID取得済み判定
						if(this.visitorId  == null){
							// 未取得
							var now 	= new Date();
							var yyyy	= ("0000" + now.getFullYear().toString()).slice(-4);
							var mm 		= ("00"	  +	(now.getMonth()+1).toString()).slice(-2);
							var dd		= ("00"   +	now.getDate().toString()).slice(-2);
							var hh 		= ("00"   + now.getHours().toString()).slice(-2);
							var mi 		= ("00"	  + now.getMinutes().toString()).slice(-2);
							var ss  	= ("00"	  + now.getSeconds().toString()).slice(-2);
							var mise	= ("000" + now.getMilliseconds().toString()).slice(-3);
							var rrrr	= Math.floor(Math.random() * 1000).toString();

							this.visitorId = "u_" + yyyy + mm + dd + hh + mi + ss + mise + rrrr;
						}else{
							// 取得済み
						}
					},
	// - イベントIDの取得
	setEventId		: function(){
							this.eventCode = $('#visitorApp').attr('data-eventCode');
						}
	
}

// = ドキュメント読み込み完了時の処理
$(document).ready(function(){
	// - visitorオブジェクトのプロトタイプチェイン(継承に類似)
	visitor = { __proto__ : visitor_prototype }
	// - visitorオブジェクトの初期設定
	// 		~UserIdとEventIdの取得
	visitor.setEventId();
	visitor.setUserId();
});