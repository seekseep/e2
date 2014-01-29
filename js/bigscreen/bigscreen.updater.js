// ====================================================================================================
// UPDATER
// ==
// リストに登録されたメッセージオブジェクトのアップデートする
// ====================================================================================================

// ====================================================================================================
var UPDATA_INTERVAL	= 200;
// ====================================================================================================

// ====================================================================================================

// アップデートオブジェクト
var updater = new Object();

// メッセージオブジェクトを格納する
updater.list = new Object();

// インターバル時間
this.interval = UPDATA_INTERVAL;

// メッセージオブジェクトを追加する
updater.add = function(message){
	this.list[message.id] = message;
	if(this.list[message.id]){
		return true;
	}else{
		return false;
	}
}

// メッセージオブジェクトを取り除く
updater.remove = function(message){
	if(delete this.list[message.id]){
		return true;
	}else{
		return false;
	}
}

// 格納されたメッセージオブジェクトをアップデートをする
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

// アップデータを開始する
updater.start = function(){
	if(this.timer){
		console.log("updater is already started");		
	}else{
		this.timer = setInterval(updater.update, this.interval);
		console.log("updater's update method had started.");
	}
}

// アップデータを停止する
updater.stop = function(){
	if(!this.timer){
		console.log("updater is not running");
	}else{
		clearInterval(this.timer);
		delete this.timer;	
		console.log("updater's update method had stopped.");	
	}
}