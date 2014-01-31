// ====================================================================================================
// BIGSCREEN
// ==
// ビッグスクリーン全体の操作の根幹を担う
// ====================================================================================================
// ビッグスクリーンオブジェクト
var bigscreen = new Object();

// イベントコードの取得
bigscreen.getEventCode = function(){
	this.eventCode = $('#bigscreenApp').attr('data-eventcode');
}

bigscreen.start = function(){
	$('#bigscreenApp').attr('data-status', 'active');

	//　メッセージマネージャーを起動する
	messagesManager.start();
}


bigscreen.stop = function(){
	$('#bigscreenApp').attr('data-status', 'suspension');

	// メッセージマネージャーを停止する
	messagesManager.stop();	
}

// ビッグスクリーンのステータスの取得

// var eventCode = "";
// var bigscreen 			= new Object();	
// bigscreen.getMessage 		= 	function(){
// 									$.ajax(
// 											{
// 												url 		: './php/getMessage.php',
// 												type 		: 'GET',
// 												dataType 	: 'text',
// 												data 		: {'eventCode' : eventCode},
// 											}
// 										)
// 									.done(function(data) {
// 										console.log(data);
// 										eval(data);							
// 									})
// 									.fail(function() {
// 										console.log("error");
// 									})
// 									.always(function() {
// 									});
// 								} 

// bigscreen.startGetMessage 	= 	function(){
// 									this.timer = setInterval(bigscreen.getMessage, 180);
// 								}

// bigscreen.stopGetMessage 	=	function(){
// 									clearInterval(this.timer);
// 								} 

$(document).ready(function() {

	bigscreen.getEventCode();
	console.log('event code is ', bigscreen.eventCode);

	bigscreen.start();


	// setTimeout(function(){
	// 	bigscreen.startGetMessage();
	// }, 500);
});