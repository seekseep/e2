// ====================================================================================================
// HOST-MESSAGE(3000)
// ==
// 管理者側がPCを用いて送信できるメッセージ
// 行える操作は削除のみ
// ====================================================================================================
var DIRECTION_UP 		= 3001;
var DIRECTION_DOWN 		= 3002;
var DIRECTION_RIGHT		= 3003;
var DIRECTION_LEFT		= 3004;
// ==
var SPEED_SLOW			= 3011;
var SPEED_MIDDLE		= 3012;
var SPEED_HIGH			= 3013;
// ==
var LENGTH_NEAR			= 3021;
var LENGTH_MIDDLE		= 3022;
var LENGTH_FAR			= 3023;
// ==
var DELAY_NONE			= 3031;
var DELAY_SHORT			= 3032;
var DELAY_MIDDLE		= 3033;
var DELAY_LONG			= 3034;
// ==
var SIZE_MIN			= 3041;
var SIZE_SMALL			= 3042;
var SIZE_LARGE			= 3043;
var SIZE_MAX			= 3044;
// ==
var HMESSAGE_RECT		= 3101;
var HMESSAFE_PATH		= 3102;
// ==
var HMESSAGE_HORIZON	= 3111;
var HMESSAGE_VERTICAL	= 3112;
var HMESSAGE_WALL		= 3113;
// ==
var BASEPOINT_TOP		= 3121;
var BASEPOINT_BOTTOM	= 3122;
var BASEPOINT_LEFT		= 3123;
var BASEPOINT_RIGHT		= 3124;
var BASEPOINT_CENTER	= 3125;
var BASEPOINT_MIDDLE	= 3126;
// ==
var BASEPOINT_LEFT_TOP		= 3131;
var BASEPOINT_LEFT_MIDDLE	= 3132;
var BASEPOINT_LEFT_BOTTOM	= 3133;
var BASEPOINT_CENTER_TOP	= 3134;
var BASEPOINT_CENTER_MIDDLE	= 3135;
var BASEPOINT_CENTER_BOTTOM	= 3136;
var BASEPOINT_RIGHT_TOP		= 3137;
var BASEPOINT_RIGHT_MIDDLE	= 3138;
var BASEPOINT_RIGHT_BOTTOM	= 3139;
// == 
var TEXTALIGN_LEFT			= 3141;
var TEXTALIGN_CENTER		= 3142;
var TEXTALIGN_RIGHT			= 3143;
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
						'type'		: COMMAND_APPEAR,
						'slideIn'	: {
											'direction' : DIRECTION_UP or DIRECTION_DOWN or DIRECTION_RIGHT or DIRECTION_LEFT
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'length'	: LENGTH_NEAR or LENGTH_MIDDLE or LENGTH_FAR
										},
						'feadIn'	: {
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT	or DELAY_MIDDLE
										},
						'sizingIn'	: {
											'size'		: SIZE_MIN or SIZE_SMALL or SIZE_LARGE or SIZE_MAX
											'speed' 	: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'delay' 	: DELAY_NONE or DELAY_SHORT or DELAY_MIDDLE or DELAY_LONG
										}
					},
	'disappear'	: {
						'type'		: COMMAND_DISAPPEAR,
						'slideOut'	: {
											'direction' : DIRECTION_UP or DIRECTION_DOWN or DIRECTION_RIGHT or DIRECTION_LEFT
											'speed'		: SPEED_SLOW or SPEED_MIDDLE or SPEED_HIGH
											'length'	: LENGTH_NEAR or LENGTH_MIDDLE or LENGTH_FAR
										},
						'feadOut'	: {
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
												default		: ;
											}
																							
											// メッセージ作成
											createHostMessage(o);

											// コマンドキューの作成
											this.commandQueue = new Array();

											// メッセージコマンドに変更
											this.type = COMMAND_APPEAR;

											// APPEARコマンドを追加
											this.addMessageCommand(o.appear);

											// ステータスの書き換え
											// ステイコマンドの登録
											if(o.liveTime != -1){
												// ステータスの変更
												this.status = STATUS_ACTIVE;

												var cmd = new Obejct();

												// コマンドタイプの定義
												var cmd.type = COMMAND_STAY;

												// ステイ回数の定義
												var cmd.time = o.liveTime / updater.interval;

											}else{
												this.status = STATUS_KUMAMUSHI;
											}

										};

hostMessage_prototype.setRectMessageElement	= function(o){

												if(o.rType = HMESSAGE_HORIZON){// 水平

													// サイズの計算
													var h = window.innerHeight * o.size / 100;

													ele.css({
														'width'		: 100%,
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

												}else if(o.rType = HMESSAGE_VERTICAL){		// 垂直

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

												}else if(o.rType = HMESSAGE_WALL){			// 全面

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

												// フェードイン
												if(o.fadeIn){

													var sec;
													switch(o.fadeIn.speed){
														case SPEED_SLOW 	: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													var del;
													switch(o.fadeIn.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default 			: del = ' 0s';
													}

													// 透明にする
													before.opacity = 0;
													// del 秒後に sec秒かけて変化する
													transitionP += "opacity" + sec + ' ease' + del + ',';

												}

												// スライドイン
												if(o.slideIn){
													var sec;
													switch(o.slideIn.speed){
														case SPEED_SLOW		: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													var del;
													switch(o.slideIn.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default				: del = ' 0s';
													}

													var dir = 1;
													var rate;													

													switch(o.slideIn.length){
														case LENGTH_NEAR 	: rate = 1; break;
														case LENGTH_MIDDLE	: rate = 2; break;
														case LENGTH_FOR		: rate = 3; break;
													}

													var direction 	= o.slideIn.direction;
													if(direction == DIRECTION_UP || direction == DIRECTION_DOWN){

														if(direction == DIRECTION_DOWN){
															dir = -1;
														}

														console.log(100, rate, dir, '%');
														before.top 	= 100 * rate * dir + '%';
														transitionP += "top" 	+ sec 	+ ' ease' 	+ del 	+ ',';

													}else if(direction == DIRECTION_LEFT || direction == DIRECTION_RIGHT){

														if(direction == DIRECTION_LEFT){
															dir = -1;
														}
														
														before.left = 100 * rate * dir + '%';
														transitionP += "left" 	+ sec 	+ ' ease' 	+ del 	+ ',';
									
													}
												}


												// サイジングイン
												if(o.sizingIn){

													var sec;
													switch(o.sizingIn.speed){
														case SPEED_SLOW 	: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													var del;
													switch(o.sizingIn.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default 			: del = ' 0s';
													}

													var size;
													switch(o.sizingIn.size){
														case SIZE_MIN 		: size = '0%';		break;
														case SIZE_SMALL		: size = '50%'; 	break;
														case SIZE_LARGE		: size = '200%'; 	break;
														case SIZE_MAX		: size = '400%';    break;
													}

													before.width 	= size;
													before.height 	= size;
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
												$('#' + this.id + ' .mbody').css(before);
														
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

												var after 	= new Object();

												// アニメーションの時間
												var animationTime = 0;

												// transitionプロパティ
												// ベンダープリフェックスに対応するため、変化する値とは別で指定する
												var transitionP = "";

												// 消滅時のアニメーションの終了値
												after = {
															'top '		: 0,
															'left'		: 0,
															'opacity'	: 1,
															'width'		: '100%',
															'height'	: '100%'
														}

												// フェードアウト　
												if(o.fadeOut){

													// アニメーション時間
													var sec;
													switch(o.fadeOut.speed){
														case SPEED_SLOW 	: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													// 待機時間
													var del;
													switch(o.fadeOut.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default 			: del = ' 0s';
													}

													// 最大値の確認
													if(sec + del > animationTime){
														animationTime = sec + del;
													}

													// 透明にする
													opacity.opacity = 0;

													// del 秒後に sec秒かけて変化する
													transitionP += "opacity" + sec + ' ease' + del + ',';

												}

												// スライドアウト
												if(o.slideOut){

													// アニメーション時間
													var sec;
													switch(o.slideOut.speed){
														case SPEED_SLOW		: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													// 
													var del;
													switch(o.slideOut.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default				: del = ' 0s';
													}

													// 最大値の確認
													if(sec + del > animationTime){
														animationTime = sec + del;
													}

													var dir = 1;
													var rate;													

													// スライドアウト先の距離
													switch(o.slideOut.length){
														case LENGTH_NEAR 	: rate = 1; break;
														case LENGTH_MIDDLE	: rate = 2; break;
														case LENGTH_FOR		: rate = 3; break;
													}

													// スライドアウトの方向
													var direction 	= o.slideOut.direction;
													if(direction == DIRECTION_UP || direction == DIRECTION_DOWN){

														if(direction == DIRECTION_DOWN){
															dir = -1;
														}

														console.log(100, rate, dir, '%');
														before.top 	= 100 * rate * dir + '%';
														transitionP += "top" 	+ sec 	+ ' ease' 	+ del 	+ ',';

													}else if(direction == DIRECTION_LEFT || direction == DIRECTION_RIGHT){

														if(direction == DIRECTION_LEFT){
															dir = -1;
														}
														
														before.left = 100 * rate * dir + '%';
														transitionP += "left" 	+ sec 	+ ' ease' 	+ del 	+ ',';
									
													}
												}

												// サイジングアウト
												if(o.sizingOut){

													// アニメーション時間
													var sec;
													switch(o.sizingOut.speed){
														case SPEED_SLOW 	: sec = ' 1s'; 		break;
														case SPEED_MIDDLE	: sec = ' .5s';		break;
														case SPEED_HIGH		: sec = ' .25s'; 	break;
														default				: sec = ' 0s';
													}

													// 待機時間
													var del;
													switch(o.sizingOut.delay){
														case DELAY_NONE		: del = ' 0s'; 		break;
														case DELAY_SHORT	: del = ' .25s'; 	break;
														case DELAY_MIDDLE	: del = ' .5s'; 	break;
														case DELAY_LONG		: del = ' 1s'; 		break;
														default 			: del = ' 0s';
													}

													// 最大値の確認
													if(sec + del > animationTime){
														animationTime = sec + del;
													}

													// 変化の大きさ
													var size;
													switch(o.sizingOut.size){
														case SIZE_MIN 		: size = '0%';		break;
														case SIZE_SMALL		: size = '50%'; 	break;
														case SIZE_LARGE		: size = '200%'; 	break;
														case SIZE_MAX		: size = '400%';    break;
													}

													before.width 	= size;
													before.height 	= size;
													transitionP += " width" 	+ sec 	+ ' ease' 	+ del 	+ ',';
													transitionP += " height" 	+ sec 	+ ' ease' 	+ del 	+ ',';

												}


											}										

// ====================================================================================================
// ====================================================================================================

var GROBAL_DEBUG;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}