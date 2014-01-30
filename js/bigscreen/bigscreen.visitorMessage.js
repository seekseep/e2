// ====================================================================================================
// VISITOR-MESSAGE(2000)
// ==
// 参加者側がスマートフォンを用いて操作することのできるメッセージ
// ====================================================================================================

// ビジターメッセージオブジェクト
var visitorMessage_prototype = new Object();

// メッセージオブジェクトを受け継ぐ
visitorMessage_prototype.__proto__ 	= 	message_prototype;

// messageCommandUpdate 
visitorMessage_prototype.updateMessageCommand = function(){
													// キューからメッセージコマンドを取り出す
													var option = this.getMessageCommand();

													if(option){	// メッセージコマンドが存在したら

														this.hitSkyTime = 0;
														this.zIndex({'z' : 1});
														this.call(option);

														return true;
													}else{
														this.hitSkyTime++;
														
														if(this.hitSkyTime > 1000){
														
															this.status = STATUS_DEATH;
															console.log('dEATH');
															return false;
														
														}else{
														
															if(this.size > 10){
														
																var size = 0.01 * this.size;
																this.resize({'size'	: -(size)});
																this.zIndex({'z' 	: -1});
														
															}
														
															return true;
														}
													}									
												};

// 実行されたコマンドをタイプで判別し、それぞれのメソッドを呼び出す
visitorMessage_prototype.call 				=	function(o){
													switch(o.type){
														case COMMAND_STAY 		: this.stay(o); 	break;
														case COMMAND_MOVE 		: this.move(o); 	break;
														case COMMAND_RESIZE 	: this.resize(o); 	break;
														case COMMAND_OPACITY	: this.opacity(o); 	break;
														case COMMAND_REMOVE 	: this.remove(); 	break;
														default 				: break;
													}

													return;
												};

// bornメソッドの定義
visitorMessage_prototype.born		= 	function(o){
											console.log('called : ', o);

											// id の定義
											this.id = o.id;

											// 要素の作成
											var ele = $('<div>')
														.css('display', 'none')
														.attr('id', this.id)
														.addClass('message')
														.appendTo('#' + o.layer);

											// メッセージの作成情報の抽出
											var messageId 		= o.id;
											var messagePath		= shapePathManager[o.shapeCode];
											var messageColor 	= '#' + colorCodeManager[o.colorCode];
											var messageText 	= o.text;

											// メッセージの初期値を指定
											this.x 			= getRandomInt(10,90);
											this.y 			= -50;
											this.z 			= 1;
											this.size   	= 10;
											this.opacity 	= 1;


											// スタイルの設定
											$('#' + this.id)
												.css({
													'opacity'							: this.opacity,
													'left'								: this.x + '%',
													'top'								: this.y + '%',
													'z-index'							: this.z,
													'width'								: this.size * $(window).innerHeight() / 100 + 'px',
													'height'							: this.size * $(window).innerHeight() / 100 + 'px',
												})
												.css('display', 'block');

											// メッセージの中身の作成用のオプションの定義
											var cmOption = {
													'id'	 	: messageId,
													'shapePath'	: messagePath,
													'shapeColor': messageColor,
													'textWords' : messageText
												};

											// メッセージの中身の作成
											var papers = createVisitorMessage(cmOption);

											// paperオブジェクトの保存
											this.sPaper = papers.sPaper;
											this.tPaper = papers.tPaper;	

											// 出現時の座標定義
											var appearX = this.x;
											var appearY = getRandomInt(10,90);

											// 出現用のメッセージコマンドの定義
											var nextCommand = {
												type 	: COMMAND_MOVE,
												x 		: appearX,
												y 		: appearY,
												absolute: true
											}

											// ステータスの書き換え
											this.status = STATUS_ACTIVE;

											// コマンドキューの作成
											this.commandQueue = new Array();

											// コマンドを登録
											this.addMessageCommand(nextCommand);
										};
// メッセージを動かす。絶対値と相対値を指定できる。
visitorMessage_prototype.move 				= 	function(o){
													// = 値指定方法の判断
													if(o.absolute){
														// - 絶対値指定
														this.x = o.x;
														this.y = o.y;
													}else{
														// - 相対値指定
														this.x += o.x;
														this.y += o.y;
													}

													// = 限界値判定
													// - x値の判定
													if(this.x > 100){ this.x = 100;}
													if(this.x < 0){ this.x = 0;}
													// - y値の判定
													if(this.y > 100){ this.y = 100;}
													if(this.y < 0){ this.y = 0;}
													
													// = CSSの指定
													$('#' + this.id).css({
														'left' 	: this.x + '%',
														'top'	: this.y + '%'
													});
												}

// メッセージの大きさを変える。絶対値と相対値を指定できる。
visitorMessage_prototype.resize 			= 	function(o){
													// = 値指定方法の判断
													if(o.absolute){
														// - 絶対値指定
														this.size = o.size;
													}else{
														// - 相対値指定
														this.size += o.size;
													}

													// = 限界値判定
													if(this.size > 100)	{　this.size = 100; }
													if(this.size < 10)	{　this.size = 10;  }

													// = CSSの指定
													$('#' + this.id).css({
														'font-size'	: this.size / 10 + 'em',
														'width'		: this.size * $(window).innerHeight() / 100 + 'px',
														'height'	: this.size * $(window).innerHeight() / 100 + 'px'
													});
												};

// メッセージの透明度を変える。絶対値と相対値を指定できる。
visitorMessage_prototype.opacity 			= 	function(o){
													if(o.absolute){
														this.opacity = o.opacity;
													}else{
														this.opacity += o.opacity;
													}

													if(this.opacity > 1)	{　this.opacity = 100; }
													if(this.opacity < 0)	{　this.opacity = 0;  }


													$('#' + this.id).css({
														'opacity'	: this.opacity
													});
												};

// z-indexを変える。絶対値と相対値を指定できる。
visitorMessage_prototype.zIndex			= 	function(o){
													if(o.absolute){
														this.z = o.z;
													}else{
														this.z += o.z;
													}

													$('#' + this.id).css({
														'z-index'	: this.z
													});
												}
// ====================================================================================================