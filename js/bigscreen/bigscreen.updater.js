var updater = new Object();

updater.list = new Object();

updater.interval = 200;//(ms)

updater.add = function(message){
	this.list[message.id] = message;
	if(this.list[message.id]){
		return true;
	}else{
		return false;
	}
}

updater.remove = function(message){
	if(delete this.list[message.id]){
		return true;
	}else{
		return false;
	}
}

updater.update = function(){
	for(var id in updater.list){

		var m = updater.list[id];

		var r = m.updateMessageCommand();

		if(!r){
			m.remove();
			delete updater.list[id];
		}
	}
}

updater.start = function(){
	console.log("updater's update method had started.");
	console.log("Hi, I'm taku, this System's creater:) \nI hope You enjoy this system.\nHave a Good time with this System.");
	this.timer = setInterval(updater.update, this.interval);
}

updater.stop = function(){
	console.log("updater's update method had stopped.");	
	clearInterval(this.timer);
}

updater.start();