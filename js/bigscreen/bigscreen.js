var eventCode = "";
var bigscreen 			= new Object();

bigscreen.ws 				= 	null;

bigscreen.initWebSocket 	= 	function(){
									this.ws 	= 	new WebSocket('ws://133.242.163.169:8082/bigscreen');
									this.ws.sendJSON	= function(obj){
										this.send(JSON.stringify(obj));
									}
									this.ws.onopen = function(){
										var obj 			= 	{};
										obj.type 		= 	"join";
										obj.eventCode 	= 	eventCode;
										this.sendJSON(obj);
									}
									this.ws.onmessage = function(msg){
										console.log(msg.data);
										try{
											var recvObj = JSON.parse(msg.data);
											//console.log(recvObj);
											if(recvObj.type == COMMAND_ADD){
												visitorMessagesManager.add(recvObj);
											}else if(recvObj.type == COMMAND_MOVE ||recvObj.type == COMMAND_RESIZE){
												visitorMessagesManager.control(recvObj);
											}
										}catch(e){}
									}
};

bigscreen.getMessage 		= 	function(){
									/*$.ajax(
											{
												url 		: './php/getMessage.php',
												type 		: 'GET',
												dataType 	: 'text',
												data 		: {'eventCode' : eventCode},
											}
										)
									.done(function(data) {
										console.log(data);
										eval(data);							
									})
									.fail(function() {
										console.log("error");
									})
									.always(function() {
									});*/
								} 

bigscreen.startGetMessage 	= 	function(){
									//this.timer = setInterval(bigscreen.getMessage, 180);
								}

bigscreen.stopGetMessage 	=	function(){
									clearInterval(this.timer);
								} 

$(document).ready(function() {

	eventCode = $('#bigscreenApp').attr('data-eventCode');
	console.log('event code is ', eventCode);

	bigscreen.initWebSocket();
	setTimeout(function(){
		bigscreen.startGetMessage();
	}, 500);
});
