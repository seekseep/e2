var shaker = new Object();

shaker.event = false;

// shaker.xFlag = 1; // 1 : PLUS, 0 : MINUS 
shaker.yFlag = 1; // 1 : PLUS, 0 : MINUS
// shaker.zFlag = 1; // 1 : PLUS, 0 : MINUS

// shaker.xShake = 0;
shaker.yShake = 0;
// shaker.zShake = 0;

shaker.reset = function(){
	shaker.xFlag = 1;
	shaker.yFlag = 1;
	shaker.zFlag = 1;

	shaker.xShake = 0;
	shaker.yShake = 0;
	shaker.zShake = 0;
}

function addControlTouchEvent(){
	$('#controlMessage')
		.bind('touchstart', function(event){
			event.preventDefault()
		})
		.bind('touchmove', function(event){
			event.preventDefault()
		})
		.bind('touchend', function(event){
			event.preventDefault()
		});
}

var controlStick 			= new Object();
controlStick.getMargin		= 	function(){
									var margin = this.eTime - this.sTime;
									return margin;
								};

function addStickTouchEvent(){
	$('#controlStickBody')
		.bind('touchstart', function(e){

			e.preventDefault();

			controlStick.lastX = 0;
			controlStick.lastY = 0;	
			
			var d = new Date();
			var t = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000) + d.getMilliseconds();
			controlStick.sTime = t;
		})
		.bind('touchmove', function(e){

			e.preventDefault();
			var t = e.originalEvent.touches[0];	

			controlStick.lastX = t.clientX;
			controlStick.lastY = t.clientY;		

			$(this).css({
				top 	: t.clientY,
				left	: t.clientX
			})

		})
		.bind('touchend', function(e){
			e.preventDefault();

			var d = new Date();
			var t = (d.getHours() * 3600000) + (d.getMinutes() * 60000) + (d.getSeconds() * 1000) + d.getMilliseconds();
			controlStick.eTime = t;

			if(controlStick.getMargin() > 200){
				var rate = 5;
				var x = rate * (controlStick.lastX / window.innerWidth * 2 - 1);
				var y = rate * (controlStick.lastY / window.innerHeight * 2 - 1);

				visitor.sendMoveMessage({'x' : x, 'y' : y});
			}

			$(this).attr('style', '');
		});
}

function addShakeMotionEvent(){
	if(!shaker.event){
		shaker.event = true;
		window.addEventListener('devicemotion', shakeMotionEvent);
	}
}

function removeShakeMotionEvent(){
	if(shaker.event){	
		shaker.event = false;
		window.removeEventListener('devicemotion', shakeMotionEvent, false);
	}
}

function shakeMotionEvent(e){
	var g = e.accelerationIncludingGravity;

	if(g.y > 0 && shaker.yFlag == 0){
		shaker.yShake++;
		shaker.yFlag++;
	}else if(g.y < 0 && shaker.yFlag == 1){
		shaker.yShake++;
		shaker.yFlag--;
	}

	if(shaker.yShake > 10){
		shaker.reset();
		visitor.sendResizeMssage({'size': 3});
	}
}


$(document).ready(function() {
	addStickTouchEvent();
	addControlTouchEvent();
});