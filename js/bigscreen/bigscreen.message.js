// ====================================================================================================
// メッセージオブジェクト
var message_prototype = new Object();

// キューに入ったメッセージコマンドを取得する
message_prototype.getMessageCommand = 	function(){
											return this.commandQueue.shift();
										};
// キューにメッセージコマンドを追加する
message_prototype.addMessageCommand = 	function(o){
											console.log(this.status, STATUS_ACTIVE);
											if(this.status == STATUS_ACTIVE || this.status == STATUS_LEFT){
												this.commandQueue.push(o);
												return true;
											}else{
												return false;
											}
										};
// キューにメッセージコマンドを割り込ませる
message_prototype.wedgeMessageCommand = function(o){
											if(this.status == STATUS_ACTIVE || this.status == STATUS_LEFT){
												this.commandQueue.unshift(o);
											}else{
												return false;
											}
										};
// キューに入ったコマンドを実行する
message_prototype.updateMessageCommand = function(){
											var option = this.getMessageCommand();

											if(option){
												this.hitSkyTime = 0;
												this.call(option);
												return true;
											}else{
												this.hitSkyTime++;
												if(this.hitSkyTime > 1000){
													this.status = STATUS_DEATH;
													console.log('DEATH');
													return false;
												}else{												
													return true;
												}
											}									
										};

// 実行されたコマンドをタイプで判別し、それぞれのメソッドを呼び出す
message_prototype.call 				=	function(o){
											switch(o.type){
												case COMMAND_STAY 		: this.stay(o); 	break;
												case COMMAND_MOVE 		: this.move(o); 	break;
												case COMMAND_RESIZE 	: this.resize(o); 	break;
												case COMMAND_OPACITY	: this.opacity(o); break;
												case COMMAND_REMOVE 	: this.remove(); 		break;
												default 				: break;
											}

											return;
										};

// 何もしないがコマンドが実行される。待機する。
message_prototype.stay 				=	function(o){
											if(o.time > 0){
												option.time = option.time - 1;
												this.wedgeMessageCommand(option);
											}else{
												return;
											}
										};

// メッセージの要素を削除する。ステータスを書き変える。
message_prototype.remove 			= 	function(){
											$('#' + this.id).remove();
											this.status = STATUS_DEATH;
										};
// ====================================================================================================
// ====================================================================================================

// ====================================================================================================
// ====================================================================================================
// ビジターメッセージオブジェクト
var visitorMessage_prototype = new Object();

// メッセージオブジェクトを受け継ぐ
visitorMessage_prototype.__proto__ 	= 	message_prototype;

// messageCommandUpdate 
visitorMessage_prototype.updateMessageCommand = function(){
													var option = this.getMessageCommand();

													if(option){
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

// bornメソッドの定義
visitorMessage_prototype.born		= 	function(o){
											console.log('called : ', o);

											// id の定義
											this.id = o.id;
											console.log('added id : ', this);


											console.log('layer : ', $('#' + o.layer));

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
											this.y 			= '-50%';
											this.z 			= 50;
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

											console.log($('#' + this.id));

											// メッセージの中身の作成用のオプションの定義
											var cmOption = {
													'id'	 	: messageId,
													'shapePath'	: messagePath,
													'shapeColor': messageColor,
													'textWords' : messageText
												};
											console.log('cmOption', cmOption);
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

//
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

visitorMessage_prototype.death 		=	function(){
											this.status = STATUS_DEATH;
										}
// ====================================================================================================
// ====================================================================================================

// ====================================================================================================
// ====================================================================================================
// ホストメッセージオブジェクト
var hostMessage_prototype = new Object();

// メッセージオブジェクトを受け継ぐ
hostMessage_prototype.__proto__ 	= 	message_prototype;

// bornメソッドの定義
hostMessage_prototype.born			= 	function(o){

											var type 	= o.mType;
											this.id 	= o.id;

											// 要素の設定
											var ele = $('<div>')
														.attr('id', this.id)
														.addClass('message host')
														.appendTo('#' + o.layer);

											ele.css('display', 'none');

											var type = o.mType;
											if(type == 'rect'){

												// 要素のサイズを決めるオブジェクト初期値には100を入れ変更がある場合上書き
												var size = {
													width : 100,
													height: 100
												};

												var rType = o.rType;
												if(rType == 'horizon'){// 水平

													// サイズの計算
													var h = window.innerHeight * o.size / 100;

													// 位置の計算
													var top;
													switch(o.basePoint){
														case 'top' 		:
															ele
															 .css({'top'　: '0%',　'left'　: '50%'})
															 .addClass('bpct');
															break;
														case 'middle'	:
															ele
															 .css({ 'top' : '50%', 'left' : '50%'});
															break;
														case 'bottom'	:
															ele
															 .css({'top' : '100%', 'left' : '50%'})
															 .addClass('bpcb');
															break;
														default 	: break;
													}

													// CSSの再定義
													ele.css({
														'width' : '100%',
														'height': h,
													});

													size.height = o.size;

												}else if(rType == 'vertical'){		// 垂直

													// サイズの計算
													var w = window.innerHeight * o.size/ 100;

													// 位置の計算
													var left;
													switch(o.basePoint){
														case 'left' :
															ele
															 .css({'top' : '50%', 'left' : '0%'})
															 .addClass('bplm');
															break;
														case 'center' :
															ele
															 .css({'top' : '50%', 'left' : '50%'});
															break;
														case 'right' :
															ele
															 .css({'top' : '50%', 'left' : '100%'})
															 .addClass('bprm');
															break;
														default 	: break;
													}

													ele.css({
														'width' : w,
														'height': '100%'
													});

													size.width 	= o.size;

												}else if(rType == 'wall'){			// 全面

													ele.css({
														'width' : '100%',
														'height': '100%',
														'top'	: '50%',
														'left' 	: '50%'
													});

												}
											}else if(type == 'path'){

												var length = (window.innerHeight * o.size / 100) + 'px';

												ele.css({
													width: length,
													height: length
												})

												var c, t, l;

												switch(o.basePoint){
													case 'left top' 	:
														c = "bplt";
														t = '33.33%';
														l = '33.33%';
														break;
													case 'left middle' 	:
														c = 'bplm';
														t = '50%';
														l = '33.33%';
														break;
													case 'left bottom' 	:
														c = 'bplb';
														t = '66.66%';
														l = '33.33%';
														break;
													case 'center top' 	:
														c = 'bpct';
														t = '33.33%';
														l = '50%';
														break;
													case 'center middle':
														c = '';
														t = '50%';
														l = '50%';
														break;
													case 'center bottom':
														c = 'bpcb';
														t = '66.66%';
														l = '50%';
														break;
													case 'right top' 	:
														c = 'bprt';
														t = '33.33%';
														l = '66.66%';
														break;
													case 'right middle' :
														c = 'bprm';
														t = '50%';
														l = '66.66%';
														break;
													case 'right bottom' :
														c = 'bprb';
														t = '66.66%';
														l = '66.66%';
														break;
												}
												ele
												.css({
													'top'  : t,
													'left' : l
												})
												.addClass(c);
											}
																							
											// メッセージ作成
											createHostMessage(o);

											// ステータスの書き換え
											this.status = STATUS_ACTIVE;

											// コマンドキューの作成
											this.commandQueue = new Array();

											// メッセージの動きを登録
											this.registerMotion(o);

										};
hostMessage_prototype.registerMotion	= 	function(o){
												this.appear(o);
												// this.dispappear(o);
											}

hostMessage_prototype.appear			= 	function(o){

												var before 		= new Object();
												before.css = {
															top : 0,
															left: 0,
															opacity: 1,
															width: '100%',
															height: '100%'
														}

												var transitionP = "";

												// フェードイン　不透明から透明へ
												// o.feadIn = {
												// 	speed : 'slow' or 'middle' or 'high',
												// 	delay : 'none' or 'short' or 'middle' or 'long'	
												// }
												if(o.fadeIn){

													var sec;
													switch(o.fadeIn.speed){
														case 'slow' 	: sec = ' 1s'; 		break;
														case 'middle'	: sec = ' .5s';		break;
														case 'high'		: sec = ' .25s'; 	break;
														default			: sec = ' 0s';
													}

													var del;
													switch(o.fadeIn.delay){
														case 'none'		: del = ' 0s'; 		break;
														case 'short'	: del = ' .25s'; 	break;
														case 'middle'	: del = ' .5s'; 	break;
														case 'long'		: del = ' 1s'; 		break;
														default 		: del = ' 0s';
													}

													// 不透明にする
													before.css.opacity = 0;
													// del 秒後に sec秒かけて変化する
													transitionP += "opacity" + sec + ' ease' + del + ',';

												}

												// スライドイン	外部から内部
												// o.slideIn = {
												//  direction	: 'up' or 'right' or 'down' or 'left',
												//  length		: 'near' or 'middl' or 'far',
												// 	speed 		: 'slow' or 'middle' or 'high',
												// 	delay 		: 'none' or 'short' or 'middle' or 'long'	
												// }
												if(o.slideIn){
													var sec;
													switch(o.slideIn.speed){
														case 'slow' 	: sec = ' 1s'; 		break;
														case 'middle'	: sec = ' .5s';		break;
														case 'high'		: sec = ' .25s'; 	break;
														default			: sec = ' 0s';
													}

													var del;
													switch(o.slideIn.delay){
														case 'none'		: del = ' 0s'; 		break;
														case 'short'	: del = ' .25s'; 	break;
														case 'middle'	: del = ' .5s'; 	break;
														case 'long'		: del = ' 1s'; 		break;
														default 		: del = ' 0s';
													}

													var dir = 1;
													var rate;													

													console.log("o.slideIn.length", o.slideIn.length);
													switch(o.slideIn.length){
														case 'near' 	: rate = 1; break;
														case 'middle'	: rate = 2; break;
														case 'far'		: rate = 3; break;
													}

													var direction 	= o.slideIn.direction;
													if(direction == 'up' || direction == 'down'){

														if(direction == 'down'){
															dir = -1;
														}

														console.log(100, rate, dir, '%');
														before.css.top 	= 100 * rate * dir + '%';
														transitionP += "top" 	+ sec 	+ ' ease' 	+ del 	+ ',';

													}else if(direction == 'left' || direction == 'right'){

														if(direction == 'left'){
															dir = -1;
														}
														
														before.css.left = 100 * rate * dir + '%';
														transitionP += "left" 	+ sec 	+ ' ease' 	+ del 	+ ',';
									
													}
												}


												// サイジングイン	拡大縮小する
												// o.sizingIn = {
												//  size		: 'min' or 'small' or 'large' or 'max'
												// 	speed 		: 'slow' or 'middle' or 'high',
												// 	delay 		: 'none' or 'short' or 'middle' or 'long'	
												// }
												if(o.sizingIn){

													var sec;
													switch(o.sizingIn.speed){
														case 'slow' 	: sec = ' 1s'; 		break;
														case 'middle'	: sec = ' .5s';		break;
														case 'high'		: sec = ' .25s'; 	break;
														default			: sec = ' 0s';
													}

													var del;
													switch(o.sizingIn.delay){
														case 'none'		: del = ' 0s'; 		break;
														case 'short'	: del = ' .25s'; 	break;
														case 'middle'	: del = ' .5s'; 	break;
														case 'long'		: del = ' 1s'; 		break;
														default 		: del = ' 0s';
													}

													var size;
													switch(o.sizingIn.size){
														case 'min' 		: size = '0%';		break;
														case 'small'	: size = '50%'; 	break;
														case 'large'	: size = '200%'; 	break;
														case 'max'		: size = '400%';    break;
													}

													before.css.width 	= size;
													before.css.height 	= size;
													transitionP += " width" 	+ sec 	+ ' ease' 	+ del 	+ ',';
													transitionP += " height" 	+ sec 	+ ' ease' 	+ del 	+ ',';

												}

												if(transitionP != ""){

													transitionP = transitionP.slice(0, -1);

													$('#' + this.id + ' .mbody').css('-webkit-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-moz-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-ms-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-o-transition', transitionP);
													$('#' + this.id + ' .mbody').css('transition', transitionP);

												}

												console.log(before.css);
												$('#' + this.id + ' .mbody').css(before.css);
														
												$('#' + this.id).css('display', 'block');

												var after 	= new Object();
												after.type = 'css';

												after.css = {
														top : 0,
														left: 0,
														opacity: 1,
														width: '100%',
														height: '100%'
													}

												var res = this.addMessageCommand(after);
												console.log(res, this.commandQueue);
											}

hostMessage_prototype.dispappear		= 	function(o){

											}

hostMessage_prototype.updateMessageCommand = function(){

													var option = this.getMessageCommand();

													if(option){	// キューがある状態

														if(option.type == 'css'){
															$('#' + this.id + ' .mbody').css(option.css);
														}

														return true;
													}else{	// キューがないとき
														if(this.status == STATUS_DEATH){
															return false;
														}

														return true;
													}									
												};											

// ====================================================================================================
// ====================================================================================================

var GROBAL_DEBUG;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}