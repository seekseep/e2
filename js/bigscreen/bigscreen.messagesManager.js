// ====================================================================================================
// MESSAGESMANAGER
// ==
// メッセージの追加・操作・更新を行う
// ====================================================================================================
var MMCALL_ADD		= 1;
var MMCALL_OPERATE	= 2;
// == 
var MMLAYER_HOST1		= 1;
var MMLAYER_HOST2		= 2;
var MMLAYER_VISITOR		= 3;
// ==
var MMSTATUS_SLEEP		= 0;
var MMSTATUS_ACTIVE		= 1;
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

	switch(o.mmcall){
		case MMCALL_ADD 	: this.add(o.cmd); 		break;
		case MMCALL_OPERATE	: this.operate(o.cmd);	break;
		default: ;
	}

}

messagesManager.add 	= function(o){

	if(this.idExist(o.id)){
		console.log('重複したIDです。');
	}else{
		var message = new Object();

		switch(o.layer){
			case MMLAYER_VISITOR : message.__proto__ = visitorMessage_prototype; break;
			case MMLAYER_HOST1	:
			case MMLAYER_HOST2	: message.__proto__ = hostMessage_prototype;	break;
			default: ;
		}

		if(!message.born(o)){
			console.log("BORNメソッドの実行に失敗しました。");
		}

		this.list[message.id] = message;

	}
}

messagesManager.operate = function(o){
	if(!this.idExist(o.id)){
		console.log('IDが存在しません。');
	}else{
		this.list[o.id].addMessageCommand(o);
	}
}

messagesManager.update = function(){
	for(var id in messagesManager.list){

		var m = messagesManager.list[id];

		var r = m.updateMessageCommand();

		if(!r){
			m.destroy();
			delete messagesManager.list[id];
		}
	}
}

messagesManager.updateStart = function(){
	if(!messagesManager.timer){
		messagesManager.timer = setInterval(messagesManager.update, messagesManager.updateInterval);
		console.log("更新を開始しました。");
		return true;
	}else{
		console.log("既に更新は始まっています。");
	}
}

messagesManager.updateStop = function(){
	if(messageManager.timer){
		clearInterval(messageManager.timer);
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

	if(!this.status == MMSTATUS_ACTIVE){
		if(messagesManager.updateStop()){
			this.status = MMSTATUS_SLEEP;
			console.log("MessageManagerを停止しました。");
		}else{
			console.log("MessageManagerの停止に失敗しました。");
		}
	}else{
		console.log("MessageManagerは起動していません。")
	}

}