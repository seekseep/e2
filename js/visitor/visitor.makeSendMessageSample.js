// visitor.makeSendMessageSample.js

var sendFlag = false;

function makeSendMessageSample(){

	console.log("this is meakeSendMessageSample");

	var shapeCode = $('#setMessageShape').attr('data-selecteditemcode');
	var colorCode = $('#setMessageColor').attr('data-selecteditemcode');

	var pdata 	= shapePathManager[shapeCode];
	var cdata	= '#' + colorCodeManager[colorCode];
	var tdata 	= $('input[name=visitorName]').val();

	var option = {
		'id' 			: 'senddingMessage',
		'shapePath' 	: pdata,
		'shapeColor'	: cdata,
		'textWords' 	: tdata
	}

	visitor.messageShapeCode	= shapeCode;
	visitor.messageColorCode	= colorCode;
	visitor.messageTextWords 	= tdata;
	console.log(visitor);

	createVisitorMessage(option);

	// ===================

	$("#senddingMessage")
		// タッチスタート
		.bind("touchstart", function(e){
			e.preventDefault();
			var t = e.originalEvent.touches[0];

			$(this)
				.removeClass('free')
				.addClass('active');

			console.log(t);
		})
		.bind("touchmove", function(e){
			e.preventDefault();
			var t = e.originalEvent.touches[0];			

			$(this).css({
				top 	: t.screenY,
				left	: t.screenX
			})
			.attr('data-lastY', t.screenY);

			if(t.screenY < $(window).innerHeight() * 0.5){
				if(!sendFlag){
					sendFlag = true;
					$(this)
						.attr('class', 'message')
						.addClass('sendding')
					setTimeout(sendMesageConduct, 1000);
				}
			}
		})
		.bind("touchend",function(e){
			e.preventDefault();

			$(this)
				.removeClass('active')
				.addClass('free');

			$(this).attr('style', '');
		});
}

function sendMesageConduct(){
	$('#visitorApp')
		.attr('class', '')
		.addClass('controlMessageView');

		// addメッセージの送信
		visitor.sendAddMessage();

		// モーションセンサーの登録
		addShakeMotionEvent();
}