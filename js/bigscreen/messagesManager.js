// ====================================================================================================
// MESSAGESMANAGER
// ==
// メッセージの追加・操作・更新を行う
// ====================================================================================================
var MMCALL_ADD		= 1;
var MMCALL_OPERATE	= 2;
// == 
var MMMTYPE_VISITOR 	= 1;
var MMMTYPE_HPATH 		= 2;
var MMMTYPE_HWALL 		= 3;
var MMMTYPE_HVERTICAL	= 4;
var MMMTYPE_HHORIZONTAL	= 5;
// ==
var MMSTATUS_SLEEP		= 0;
var MMSTATUS_ACTIVE		= 1;
// ==
var MMUPDATEINTERVAL 	= 50;
// ====================================================================================================

// メッセージマネージャー
var messagesManager 	= new Object;

messagesManager.status 	= MMSTATUS_SLEEP;

// メッセージオブジェクトの更新頻度
messagesManager.updateInterval = 100;

// メッセージを格納
messagesManager.list = new Object;

messagesManager.idExist = function(id){
	var m = messagesManager.list[id];

	if(m){
		return true;
	}else{
		return false;
	}
}

messagesManager.call = function(o){
	switch(o.mmCall){
		case MMCALL_ADD 	: return this.add(o.cmd); 		break;
		case MMCALL_OPERATE	: return this.operate(o.cmd);	break;
	}
}

messagesManager.add 	= function(cmd){

	if(this.idExist(cmd.option.id)){
		console.log('重複したIDです。');
	}else{
		var message = new Object();

		switch(cmd.mType){
			case MMMTYPE_VISITOR 		: message.__proto__ = visitorMessage_prototype;				break;
			case MMMTYPE_HPATH 			: message.__proto__ = hostPathMessage_prototype;			break;
			case MMMTYPE_HWALL 			: message.__proto__ = hostRectWallMessage_prototype;		break;
			case MMMTYPE_HVERTICAL		: message.__proto__ = hostRectVerticalMessage_prototype;	break;
			case MMMTYPE_HHORIZONTAL	: message.__proto__ = hostRectHorizontalMessage_prototype;	break;
		}

		message.born(cmd.option);

		this.list[message.id] = message;
	
		return message;
	}
}

messagesManager.operate = function(o){
	if(!this.idExist(o.id)){
		console.log('IDが存在しません。');
	}else{
		this.list[o.id].addMessageCommand(o);
	}
}
// Windowオブジェクトに呼び出される為 'this' は使わない。
messagesManager.update = function(){
	for(var id in messagesManager.list){

		var res = messagesManager.list[id].update();

		if(!res){
			delete messagesManager.list[id];
		}
	}
}

messagesManager.updateStart = function(){
	if(!this.timer){
		this.timer = setInterval(this.update, this.updateInterval);
		console.log("更新を開始しました。");
		return true;
	}else{
		console.log("既に更新は始まっています。");
	}
}

messagesManager.updateStop = function(){
	if(this.timer){
		clearInterval(this.timer);
		console.log("更新を終了しました。");
	}else{
		console.log("更新は始まっていません。");
	}
}

messagesManager.start = function(){

	if(!this.status == MMSTATUS_ACTIVE){
		if(messagesManager.updateStart()){
			this.status = MMSTATUS_ACTIVE;
			console.log("MessageManagerを起動しました。");
		}else{
			console.log("MessageManagerを起動に失敗しました。");
		}
	}else{
		console.log("MessageManagerは既に起動しています。");
	}

}

messagesManager.stop = function(){

	if(this.status == MMSTATUS_ACTIVE){
		if(this.updateStop()){
			this.status = MMSTATUS_SLEEP;
			console.log("MessageManagerを停止しました。");
		}else{
			console.log("MessageManagerの停止に失敗しました。");
		}
	}else{
		console.log("MessageManagerは起動していません。")
	}

}