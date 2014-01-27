visitorMessagesManager.add({id : 'v_0001', pathCode : 1, colorCode : 1, text : 'No.1 is me'});

for(var j = 1; j <= 8; j++){
	for(var i = 0; i < 100; i++){

		if((i + j * 2) % 10){
			var testX = getRandomInt(-10,10);
			var testY = getRandomInt(-10,10);
			console.log('visitorMessagesManager.control({ id 	: "v_000' + j + '", o : { type : COMMAND_MOVE, x : ' + testX + ', y : ' + testY + '}});');
		}else{
			console.log('visitorMessagesManager.control({ id 	: "v_000' + j + '", o : { type : COMMAND_RESIZE, size : 2');
		}
	}
}


visitorMessagesManager.add({id : 'v_0002', pathCode : 2, colorCode : 2, text : '二番じゃだめなんですか？'});
visitorMessagesManager.add({id : 'v_0003', pathCode : 3, colorCode : 4, text : '三枚目登場'});
visitorMessagesManager.add({id : 'v_0004', pathCode : 4, colorCode : 8, text : '四露死苦'});
visitorMessagesManager.add({id : 'v_0005', pathCode : 5, colorCode : 10, text : '五臓'});
visitorMessagesManager.add({id : 'v_0006', pathCode : 5, colorCode : 12, text : '六腑'});
visitorMessagesManager.add({id : 'v_0007', pathCode : 3, colorCode : 11, text : 'なななななななななななななななななななn'});
visitorMessagesManager.add({id : 'v_0008', pathCode : 2, colorCode : 9, text : '八方美人で何が悪い'});

