var eventCode = "";
var bigscreen 			= new Object();
	
bigscreen.getMessage 		= 	function(){
									$.ajax(
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
									});
								} 

bigscreen.startGetMessage 	= 	function(){
									this.timer = setInterval(bigscreen.getMessage, 180);
								}

bigscreen.stopGetMessage 	=	function(){
									clearInterval(this.timer);
								} 

$(document).ready(function() {

	eventCode = $('#bigscreenApp').attr('data-eventCode');
	console.log('event code is ', eventCode);

	setTimeout(function(){
		bigscreen.startGetMessage();
	}, 500);
});