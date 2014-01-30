// ====================================================================================================
// HOST-MESSAGE
// ==
// 管理者側がPCを用いて送信できるメッセージ
// 行える操作は削除のみ
// ====================================================================================================
var hostMessage_prototype = new Object();

// メッセージオブジェクトを受け継ぐ
hostMessage_prototype.__proto__ 	= 	message_prototype;

// アップデートコマンド
hostMessage_prototype.updateMessageCommand = function(){

													if(this.status != STATUS_DEATH){

														// キューからメッセージコマンドを取り出す
														var option = this.getMessageCommand();
														this.call(option);

													}

													// 今の状態を返す
													return this.status;
												};
// コールメソッド
visitorMessage_prototype.call 				=	function(o){
													switch(o.type){
														case COMMAND_APPEAR		: this.appear(o); break;
														case COMMAND_DISAPPEAR	: this.disappear(o); break;
														case COMMAND_STAY		: this.stay(o); break;
														default: ;
													}

													return;
												};												


// bornメソッドの定義
hostMessage_prototype.born			= 	function(o){

											var type 	= o.mType;
											this.id 	= o.id;

											// 要素の設定
											var ele = $('<div>')
														.attr('id', this.id)
														.addClass('message host')
														.appendTo('#' + o.layer);

											// 初期状態は不可視
											ele.css('display', 'none');

											// 各メッセージタイプの要素の設定
											switch(o.mType){
												case 'rect'	: this.setRectMessageElement(o); break;
												case 'path'	: this.setPathMessageElement(o); break;
												default	: ;
											}
																							
											// メッセージ作成
											createHostMessage(o);

											// コマンドキューの作成
											this.commandQueue = new Array();

											// メッセージコマンドに変更
											this.type = COMMAND_APPEAR;

											// APPEARコマンドを追加
											this.addMessageCommand(o);

											// ステータスの書き換え
											// ステイコマンドの登録
											if(o.liveTime != -1){
												this.status = STATUS_ACTIVE;

												var stayNum = o.liveTime / updater.interval;

												var cmd = new Obejct();

												// コマンドタイプの定義
												var cmd.type = COMMAND_STAY;

												// ステイ回数の定義
												var cmd.time = stayNum;

											}else{
												this.status = STATUS_PHOENIX;
											}
										};

hostMessage_prototype.setRectMessageElement	= function(){

												if(rType == o.rType){// 水平

													// サイズの計算
													var h = window.innerHeight * o.size / 100;

													ele.css({
														'width'		: 100%,
														'height'	: h + '%'
													});


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

												}else if(rType == o.rType){		// 垂直

													// サイズの計算
													var w = window.innerHeight * o.size/ 100;

													ele.css({
														'width'		: w + '%',
														'height'	: '100%'
													})

													// 位置の計算
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

												}else if(rType == o.rType){			// 全面

													ele.css({
														'width' : '100%',
														'height': '100%',
														'top'	: '50%',
														'left' 	: '50%'
													});

												}

											}

hostMessage_prototype.bsetPathMessageElement	= function(){

													// テキストを入れる正方形の一辺の長さ
													var textBoxLength = (window.innerHeight * o.size / 100) + 'px';

													ele.css({
														width: textBoxLength,
														height: textBoxLength
													});

													// c -> class, t -> top, l -> left
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



hostMessage_prototype.registerMotion	= 	function(o){
												this.setAppear(o);
												this.setSurvivalTime(o);
												// this.dispappear(o);
											}

hostMessage_prototype.appear			= 	function(o){

												// 出現前の情報
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
												if(o.appear.fadeIn){

													var sec;
													switch(o.appearfadeIn.speed){
														case 'slow' 	: sec = ' 1s'; 		break;
														case 'middle'	: sec = ' .5s';		break;
														case 'high'		: sec = ' .25s'; 	break;
														default			: sec = ' 0s';
													}

													var del;
													switch(o.appear.fadeIn.delay){
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
												if(o.appear.slideIn){
													var sec;
													switch(o.appear.slideIn.speed){
														case 'slow' 	: sec = ' 1s'; 		break;
														case 'middle'	: sec = ' .5s';		break;
														case 'high'		: sec = ' .25s'; 	break;
														default			: sec = ' 0s';
													}

													var del;
													switch(o.appear.slideIn.delay){
														case 'none'		: del = ' 0s'; 		break;
														case 'short'	: del = ' .25s'; 	break;
														case 'middle'	: del = ' .5s'; 	break;
														case 'long'		: del = ' 1s'; 		break;
														default 		: del = ' 0s';
													}

													var dir = 1;
													var rate;													

													switch(o..appearslideIn.length){
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

												// transitionが登録されている場合
												if(transitionP != ""){

													// 最後のカンマを取り除く
													transitionP = transitionP.slice(0, -1);

													// 各ベンダープリフェックスに対応してプロパティを定義
													$('#' + this.id + ' .mbody').css('-webkit-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-moz-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-ms-transition', transitionP);
													$('#' + this.id + ' .mbody').css('-o-transition', transitionP);
													$('#' + this.id + ' .mbody').css('transition', transitionP);

												}

												// 変化前のCSSを定義
												$('#' + this.id + ' .mbody').css(before.css);
														
												// メッセージを可視化
												$('#' + this.id).css('display', 'block');

												
												// メッセージを表示状態に戻す
												$('#' + this.id).css = {
																	top : 0,
																	left: 0,
																	opacity: 1,
																	width: '100%',
																	height: '100%'
																}
											}


hostMessage_prototype.dispappear		= 	function(o){

											}										

// ====================================================================================================
// ====================================================================================================

var GROBAL_DEBUG;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}