// ====================================================================================================
// HOST-MESSAGE(3000)
// ==
// 管理者側がPCを用いて送信できるメッセージ
// 行える操作は削除のみ
// ====================================================================================================
var MCALL_APPEAR 		= 5;
var MCALL_DISAPPEAR 	= 6;
// ==
var DIRECTION_UP 		= 1;
var DIRECTION_DOWN 		= 2;
var DIRECTION_RIGHT		= 3;
var DIRECTION_LEFT		= 4;
// ==
var SPEED_SLOW			= 1;
var SPEED_MIDDLE		= 2;
var SPEED_HIGH			= 3;
// ==
var LENGTH_NEAR			= 1;
var LENGTH_MIDDLE		= 2;
var LENGTH_FAR			= 3;
// ==
var DELAY_NONE			= 1;
var DELAY_SHORT			= 2;
var DELAY_MIDDLE		= 3;
var DELAY_LONG			= 4;
// ==
var SIZE_MIN			= 1;
var SIZE_SMALL			= 2;
var SIZE_LARGE			= 3;
var SIZE_MAX			= 4;
// ==
var HMESSAGE_RECT		= 1;
var HMESSAFE_PATH		= 2;
// ==
var HMESSAGE_HORIZON	= 1;
var HMESSAGE_VERTICAL	= 2;
var HMESSAGE_WALL		= 3;
// ==
var BASEPOINT_TOP		= 1;
var BASEPOINT_BOTTOM	= 2;
var BASEPOINT_LEFT		= 3;
var BASEPOINT_RIGHT		= 4;
var BASEPOINT_CENTER	= 5;
var BASEPOINT_MIDDLE	= 6;
// ==
var BASEPOINT_LEFT_TOP		= 1;
var BASEPOINT_LEFT_MIDDLE	= 2;
var BASEPOINT_LEFT_BOTTOM	= 3;
var BASEPOINT_CENTER_TOP	= 4;
var BASEPOINT_CENTER_MIDDLE	= 5;
var BASEPOINT_CENTER_BOTTOM	= 6;
var BASEPOINT_RIGHT_TOP		= 7;
var BASEPOINT_RIGHT_MIDDLE	= 8;
var BASEPOINT_RIGHT_BOTTOM	= 9;
// == 
var TEXTALIGN_LEFT			= 1;
var TEXTALIGN_CENTER		= 2;
var TEXTALIGN_RIGHT			= 3;
// ====================================================================================================
/*	ホストメッセージ
{
	'id'		: 'ID' string
	'mType' 	: HMESSAGE_RECT or HMESSAGE_PATH
	'rType' 	: HMESSAGE_HORIZON or HMESSAGE_VERTICAL or HMESSAGE_WALL

	'basePoint'	:
		// HORIZON
		BASEPOINT_TOP or BASEPOINT_MIDDLE or BASEPOINT_BOTTOM
		// VERTICAL
		BASEPOINT_LEFT or BASEPOINT_CENTER or BASEPOINT_RIGHT
		// --
		// PATH
		BASEPOINT_TOP_LEFT orBASEPOINT_TOP_CENTER orBASEPOINT_TOP_RIGHT
		or BASEPOINT_MIDDLE_LEFT or BASEPOINT_MIDDLE_CENTER or BASEPOINT_MIDDLE_RIGHT
		or BASEPOINT_BOTTOM_LEFT or BASEPOINT_BOTTOM_CENTER or BASEPOINT_BOTTOM_RIGHT
	'size'		: 10,
	'rectColor' : '#EEE',
	'text'		: 'SAMPLETEXTSAMPLETEXTSAMPLETEXTSAMPLETEXT  ',
	'textAlign' : TEXTALIGN_LEFT or TEXTALIGN_CENTER or TEXTALIGN_RIGHT
	'textColor' : '#333',
	'appear'	: {
						'type'		: MCALL_APPEAR,
						'slideIn'	: {
											'direction' : DIRECTION_UP or DIRECTION_DOWN or DIRECTION_RIGHT or DIRECTION_LEFT
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'length'	: LENGTH_NEAR or LENGTH_MIDDLE or LENGTH_FAR
										},
						'fadeIn'	: {
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT	or DELAY_MIDDLE
										},
						'sizingIn'	: {
											'size'		: SIZE_MIN or SIZE_SMALL or SIZE_LARGE or SIZE_MAX
											'speed' 	: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT or DELAY_MIDDLE or DELAY_LONG
										}
					},
	'stay'		: {
						'type'	: MCALL_STAY
						'time'	: -1 or 0 or int
					},
	'disappear'	: {
						'type'		: MCALL_DISAPPEAR,
						'slideOut'	: {
											'direction' : DIRECTION_UP or DIRECTION_DOWN or DIRECTION_RIGHT or DIRECTION_LEFT
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'length'	: LENGTH_NEAR or LENGTH_MIDDLE or LENGTH_FAR
										},
						'fadeOut'	: {
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT	or DELAY_MIDDLE
										},
						'sizingOut'	: {
											'size'		: SIZE_MIN or SIZE_SMALL or SIZE_LARGE or SIZE_MAX
											'speed' 	: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT or DELAY_MIDDLE or DELAY_LONG
										}

					}
}
*/
// ====================================================================================================
var hostMessage_prototype = new Object();

// メッセージオブジェクトを受け継ぐ
hostMessage_prototype.__proto__ 	= 	message_prototype;

// アップデートコマンド
hostMessage_prototype.updateMessageCommand = function(){

													if(this.status == STATUS_ACTIVE){
														// キューからメッセージコマンドを取り出す
														var option = this.getMessageCommand();
														if(option){
															this.call(option);
														}
													}

													// 今の状態を返す
													return this.status;
												};
// コールメソッド
hostMessage_prototype.call 				=	function(o){
													switch(o.type){
														case MCALL_APPEAR		: this.appear(o); break;
														case MCALL_DISAPPEAR	: this.disappear(o); break;
														case MCALL_STAY		: this.stay(o); break;
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
														.addClass('message host');

											// 要素の挿入
											switch(o.layer){
												case MMLAYER_HOST1 : ele.appendTo('#hostLayer1'); break;
												case MMLAYER_HOST2 : ele.appendTo('#hostLayer2'); break;
												default : return;
											}

											// 初期状態は不可視
											ele.css('display', 'none');

											// 各メッセージタイプの要素の設定
											switch(o.mType){
												case HMESSAGE_RECT	: this.setRectMessageElement(o); break;
												case HMESSAGE_PATH	: this.setPathMessageElement(o); break;
												default		: ;
											}
																							
											// メッセージ作成
											createHostMessage(o);

											// コマンドキューの作成
											this.commandQueue = new Array();

											// ステータスの変更
											this.status = STATUS_ACTIVE;

											// APPEARコマンドを追加
											o.appear.type =  MCALL_APPEAR;
											this.addMessageCommand(o.appear);

											// STAYコマンドを追加
											o.stay.type = MCALL_STAY;
											if(o.stay.time != 0){
												this.addMessageCommand(o.stay);
											}

											// DISAPPEARコマンドの追加
											o.disappear.type = MCALL_DISAPPEAR;
											this.addMessageCommand(o.disappear);

											return true;
										};

hostMessage_prototype.setRectMessageElement	= function(o){

												var ele = $('#' + o.id);

												ele.css('background-color', o.rectColor);

												if(o.rType == HMESSAGE_HORIZON){// 水平

													// サイズの計算
													var h = window.innerHeight * o.size / 100;

													ele.css({
														'width'		: '100%',
														'height'	: h + '%'
													});

													// 位置の計算
													switch(o.basePoint){
														case BASEPOINT_TOP :
															ele
															 .css({'top'　: '0%',　'left'　: '50%'})
															 .addClass('bpct');
															break;
														case BASEPOINT_MIDDLE :
															ele
															 .css({ 'top' : '50%', 'left' : '50%'});
															break;
														case BASEPOINT_BOTTOM :
															ele
															 .css({'top' : '100%', 'left' : '50%'})
															 .addClass('bpcb');
															break;
														default 	: break;
													}

												}else if(o.rType == HMESSAGE_VERTICAL){		// 垂直

													// サイズの計算
													var w = window.innerHeight * o.size/ 100;

													ele.css({
														'width'		: w + '%',
														'height'	: '100%'
													})

													// 位置の計算
													switch(o.basePoint){
														case BASEPOINT_LEFT :
															ele
															 .css({'top' : '50%', 'left' : '0%'})
															 .addClass('bplm');
															break;
														case BASEPOINT_CENTER :
															ele
															 .css({'top' : '50%', 'left' : '50%'});
															break;
														case BASEPOINT_RIGHT :
															ele
															 .css({'top' : '50%', 'left' : '100%'})
															 .addClass('bprm');
															break;
														default 	: break;
													}

												}else if(o.rType == HMESSAGE_WALL){			// 全面

													ele.css({
														'width' : '100%',
														'height': '100%',
														'top'	: '50%',
														'left' 	: '50%'
													});

												}


											}

hostMessage_prototype.setPathMessageElement	= function(){

													var ele = $('#' + o.id);

													// テキストを入れる正方形の一辺の長さ
													var textBoxLength = (window.innerHeight * o.size / 100) + 'px';

													ele.css({
														width: textBoxLength,
														height: textBoxLength
													});

													// c -> class, t -> top, l -> left
													var c, t, l;

													switch(o.basePoint){
														case  BASEPOINT_LEFT_TOP:
															c = "bplt";
															t = '33.33%';
															l = '33.33%';
															break;
														case BASEPOINT_LEFT_MIDDLE:
															c = 'bplm';
															t = '50%';
															l = '33.33%';
															break;
														case BASEPOINT_LEFT_BOTTOM:
															c = 'bplb';
															t = '66.66%';
															l = '33.33%';
															break;
														case BASEPOINT_CENTER_TOP:
															c = 'bpct';
															t = '33.33%';
															l = '50%';
															break;
														case BASEPOINT_CENTER_MIDDLE:
															c = '';
															t = '50%';
															l = '50%';
															break;
														case BASEPOINT_CENTER_BOTTOM:
															c = 'bpcb';
															t = '66.66%';
															l = '50%';
															break;
														case BASEPOINT_RIGHT_TOP:
															c = 'bprt';
															t = '33.33%';
															l = '66.66%';
															break;
														case BASEPOINT_RIGHT_CENTER:
															c = 'bprm';
															t = '50%';
															l = '66.66%';
															break;
														case BASEPOINT_RIGHT_BOTTOM:
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

hostMessage_prototype.appear			= 	function(o){

												// 出現前の情報
												var before 		= new Object();
												before = {
															top : 0,
															left: 0,
															opacity: 1,
															width: '100%',
															height: '100%'
														}

												var transitionP = "";


												// フェードインエフェクトの値の指定
												// エフェクトのない場合は変化の時間を0sにする
												var fadeInSec;
												switch(o.fadeIn.speed){
													case SPEED_SLOW 	: fadeInSec = 1.0; 	break;
													case SPEED_MIDDLE	: fadeInSec = 0.5;	break;
													case SPEED_HIGH		: fadeInSec = 0.25; break;
													default				: fadeInSec = 0.0;
												}

												var fadeInDel;
												switch(o.fadeIn.delay){
													case DELAY_NONE		: fadeInDel = 0.0; 	break;
													case DELAY_SHORT	: fadeInDel = 0.25; break;
													case DELAY_MIDDLE	: fadeInDel = 0.5; 	break;
													case DELAY_LONG		: fadeInDel = 1.0; 	break;
													default 			: fadeInDel = 0.0;
												}

												// 透明にする
												before.opacity = 0;

												// del 秒後に sec秒かけて変化する
												transitionP += "opacity " + fadeInSec + 's' + ' ease ' + fadeInDel + 's, ';


												// スライドイン
												var slideInSec;
												switch(o.slideIn.speed){
													case SPEED_SLOW		: slideInSec = 1.0; 	break;
													case SPEED_MIDDLE	: slideInSec = 0.5;		break;
													case SPEED_HIGH		: slideInSec = 0.25; 	break;
													default				: slideInSec = 0.0;
												}

												var slideInDel;
												switch(o.slideIn.delay){
													case DELAY_NONE		: slideInDel = 0.0; 	break;
													case DELAY_SHORT	: slideInDel = 0.25; 	break;
													case DELAY_MIDDLE	: slideInDel = 0.5; 	break;
													case DELAY_LONG		: slideInDel = 1.0; 	break;
													default				: slideInDel = 0.0;
												}

												var dir = 1;
												var rate;													

												switch(o.slideIn.length){
													case LENGTH_NEAR 	: rate = 1; break;
													case LENGTH_MIDDLE	: rate = 2; break;
													case LENGTH_FAR		: rate = 3; break;
													default	: rate = 0;
												}

												var direction 	= o.slideIn.direction;
												if(direction == DIRECTION_UP || direction == DIRECTION_DOWN){ // Y軸方向のスライド

													if(direction == DIRECTION_DOWN){
														dir = -1;
													}


													before.top 	= 100 * rate * dir + '%';
													transitionP += 'top ' + slideInSec + 's ' + ' ease ' + slideInDel + 's, ';
													transitionP += 'left 0s ease 0s, ';

												}else if(direction == DIRECTION_LEFT || direction == DIRECTION_RIGHT){

													if(direction == DIRECTION_LEFT){
														dir = -1;
													}
													
													before.left = 100 * rate * dir + '%';
													transitionP += 'top 0s ease 0s,';
													transitionP += 'left ' 	+ slideInSec + 's' + ' ease' + slideInDel + 's, ';
												}else{
													transitionP += 'top 0s ease 0s, ';
													transitionP += 'left 0s ease 0s, ';
												}

												// サイジングイン
												var sizingInSec;
												switch(o.sizingIn.speed){
													case SPEED_SLOW 	: sizingInSec = 1.0; 	break;
													case SPEED_MIDDLE	: sizingInSec = 0.5;	break;
													case SPEED_HIGH		: sizingInSec = 0.25; 	break;
													default				: sizingInSec = 0.0;
												}

												var sizingInDel;
												switch(o.sizingIn.delay){
													case DELAY_NONE		: sizingInDel = 0.0; 	break;
													case DELAY_SHORT	: sizingInDel = 0.25; 	break;
													case DELAY_MIDDLE	: sizingInDel = 0.5; 	break;
													case DELAY_LONG		: sizingInDel = 1.0; 	break;
													default 			: sizingInDel = 0.0;
												}

												var sizingInSize;
												switch(o.sizingIn.size){
													case SIZE_MIN 		: sizingInSize = '0%';		break;
													case SIZE_SMALL		: sizingInSize = '50%'; 	break;
													case SIZE_LARGE		: sizingInSize = '200%';	break;
													case SIZE_MAX		: sizingInSize = '400%';  	break;
												}

												before.width 	= sizingInSize;
												before.height 	= sizingInSize;
												transitionP += " width "  + sizingInSec + 's ' + 'ease ' + sizingInDel + 's,';
												transitionP += " height " + sizingInSec + 's ' + 'ease ' + sizingInDel + 's';

												console.log(transitionP);

												// 各ベンダープリフェックスに対応してプロパティを定義
												$('#' + this.id + ' .mbody').css('-webkit-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-moz-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-ms-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-o-transition', transitionP);
												$('#' + this.id + ' .mbody').css('transition', transitionP);

												// 変化前のCSSを定義
												$('#' + this.id + ' .mbody').css(before);
														
												// メッセージを可視化
												$('#' + this.id).css('display', 'block');
						
												// メッセージを表示状態に戻す
												$('#' + this.id + ' .mbody').css({
																	top : 0,
																	left: 0,
																	opacity: 1,
																	width: '100%',
																	height: '100%'
																});

												// transition中のあいだはdisappearコマンドを実行させない為に
												// animatingにする。
												this.status = STATUS_ANIMATING;

												// transitionが終わったときにステータスをアクティブにする
												$('#' + this.id + ' .mbody')
													.on('webkitTransitionEnd', function(){
														this.status = STATUS_ACTIVE;
														$('#' + this.id + ' .mbody').off('webkitTransitionEnd');
													});
												$('#' + this.id + ' .mbody').on('mozTransitionEnd', function(){
														this.status = STATUS_ACTIVE;
														$('#' + this.id + ' .mbody').on('mozTransitionEnd');		
													});
												$('#' + this.id + ' .mbody').on('oTransitionEnd', function(){
														this.status = STATUS_ACTIVE;
														$('#' + this.id + ' .mbody').on('oTransitionEnd');		
													});
												$('#' + this.id + ' .mbody').on('transitionend', function(){
														this.status = STATUS_ACTIVE;
														$('#' + this.id + ' .mbody').on('transitionend');		
													});
											}


hostMessage_prototype.disappear		= 	function(o){

												// 消滅後の状態
												var after 		= new Object();
												after = {
															top : 0,
															left: 0,
															opacity: 1,
															width: '100%',
															height: '100%'
														}

												var animatingTime 	= 0;
												var transitionP 	= "";


												// フェードインエフェクトの値の指定
												// エフェクトのない場合は変化の時間を0sにする
												var fadeOutSec;
												switch(o.fadeOut.speed){
													case SPEED_SLOW 	: fadeOutSec = 1.0; 	break;
													case SPEED_MIDDLE	: fadeOutSec = 0.5;		break;
													case SPEED_HIGH		: fadeOutSec = 0.25; 	break;
													default				: fadeOutSec = 0.0;
												}

												var fadeOutDel;
												switch(o.fadeOut.delay){
													case DELAY_NONE		: fadeOutDel = 0.0; 	break;
													case DELAY_SHORT	: fadeOutDel = 0.25; 	break;
													case DELAY_MIDDLE	: fadeOutDel = 0.5; 	break;
													case DELAY_LONG		: fadeOutDel = 1.0; 	break;
													default 			: fadeOutDel = 0.0;
												}

												// 透明にする
												after.opacity = 0;

												// del 秒後に sec秒かけて変化する
												transitionP += "opacity" + fadeOutSec + ' ease' + fadeOutDel + ',';

												// アニメーション時間の更新
												if(fadeOutSec + fadeOutDel > animatingTime){
													animatingTime = fadeOutSec + fadeOutDel;
												}


												// スライドイン
												var slideOutSec;
												switch(o.slideOut.speed){
													case SPEED_SLOW		: slideOutSec = 1.0; 	break;
													case SPEED_MIDDLE	: slideOutSec = 0.5;	break;
													case SPEED_HIGH		: slideOutSec = 0.25; 	break;
													default				: slideOutSec = 0.0;
												}

												var slideOutDel;
												switch(o.slideOut.delay){
													case DELAY_NONE		: slideOutDel = 0.0; 	break;
													case DELAY_SHORT	: slideOutDel = 0.25; 	break;
													case DELAY_MIDDLE	: slideOutDel = 0.5; 	break;
													case DELAY_LONG		: slideOutDel = 1.0; 	break;
													default				: slideOutDel = 0.0;
												}

												var dir = 1;
												var rate;													

												switch(o.slideOut.length){
													case LENGTH_NEAR 	: rate = 1; break;
													case LENGTH_MIDDLE	: rate = 2; break;
													case LENGTH_FAR		: rate = 3; break;
													default	: rate = 0;
												}

												var direction 	= o.slideOut.direction;
												if(direction == DIRECTION_UP || direction == DIRECTION_DOWN){ // Y軸方向のスライド

													if(direction == DIRECTION_DOWN){
														dir = -1;
													}


													after.top 	= 100 * rate * dir + '%';
													transitionP += 'top' + slideOutSec + ' ease' + slideOutDel + ',';
													transitionP += 'left 0s ease 0s,';

												}else if(direction == DIRECTION_LEFT || direction == DIRECTION_RIGHT){

													if(direction == DIRECTION_LEFT){
														dir = -1;
													}
													
													after.left = 100 * rate * dir + '%';
													transitionP += 'top 0s ease 0s,';
													transitionP += "left" 	+ slideOutSec + ' ease' 	+ slideOutDel 	+ ',';
												}else{
													transitionP += 'top 0s ease 0s,';
													transitionP += 'left 0s ease 0s,';
												}

												// アニメーション時間の更新
												if(slideOutSec + slideOutDel > animatingTime){
													animatingTime = slideOutSec + slideOutDel;
												}

												// サイジングアウト
												var sizingOutSec;
												switch(o.sizingOut.speed){
													case SPEED_SLOW 	: sizingOutSec = 1.0; 	break;
													case SPEED_MIDDLE	: sizingOutSec = 0.5;	break;
													case SPEED_HIGH		: sizingOutSec = 0.25; 	break;
													default				: sizingOutSec = 0.0;
												}

												var sizingOutDel;
												switch(o.sizingOut.delay){
													case DELAY_NONE		: sizingOutDel = 0.0; 	break;
													case DELAY_SHORT	: sizingOutDel = 0.25; 	break;
													case DELAY_MIDDLE	: sizingOutDel = 0.5; 	break;
													case DELAY_LONG		: sizingOutDel = 1.0; 	break;
													default 			: sizingOutDel = 0.0;
												}

												var sizingOutSize;
												switch(o.sizingOut.size){
													case SIZE_MIN 		: sizingOutSize = '0%';		break;
													case SIZE_SMALL		: sizingOutSize = '50%'; 		break;
													case SIZE_LARGE		: sizingOutSize = '200%';	 	break;
													case SIZE_MAX		: sizingOutSize = '400%';  	break;
												}

												after.width 	= sizingOutSize;
												after.height 	= sizingOutSize;
												transitionP += " width"  + sizingOutSec + ' ease' + sizingOutDel;
												transitionP += " height" + sizingOutSec + ' ease' + sizingOutDel;

												// アニメーション時間の更新
												if(sizingOutSec + sizingOutDel > animatingTime){
													animatingTime = sizingOutSec + sizingOutDel;
												}

												// 各ベンダープリフェックスに対応してプロパティを定義
												$('#' + this.id + ' .mbody').css('-webkit-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-moz-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-ms-transition', transitionP);
												$('#' + this.id + ' .mbody').css('-o-transition', transitionP);
												$('#' + this.id + ' .mbody').css('transition', transitionP);

												
												// 要素を不透明にする
												$('#' + this.id).css('opacity', 1);

												// すべてのアニメーションが終わった瞬間に透明にする
												transitionP = "opacity 0s linear " + animatingTime + 'sec';

												$('#' + this.id).css('-webkit-transition', transitionP);
												$('#' + this.id).css('-moz-transition', transitionP);
												$('#' + this.id).css('-ms-transition', transitionP);
												$('#' + this.id).css('-o-transition', transitionP);
												$('#' + this.id).css('transition', transitionP);

												// 変化前のCSSを定義
												$('#' + this.id + ' .mbody').css(after);
												$('#' + this.id).css('opacity', 0);
												
												// mbodyのtransitionが終わったらデストロイメソッドを実行
												$('#' + this.id + ' .mbody').on('webkitTransitionEnd', this.desyroy);
												$('#' + this.id + ' .mbody').on('mozTransitionEnd', this.desyroy);
												$('#' + this.id + ' .mbody').on('oTransitionEnd', this.desyroy);
												$('#' + this.id + ' .mbody').on('transitionend', this.desyroy);
											}										

// ====================================================================================================
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}