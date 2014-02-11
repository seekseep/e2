// ============================================================
// メッセージオブジェクト
//
var message_prototype = new Object;
// ============================================================

// ============================================================
// メッセージオブジェクト定数
//
// ステータス
var M_STATUS_CALLOW 	= 0;
var M_STATUS_WATING		= 1;
var M_STATUS_ANIMATING 	= 2;
var M_STATUS_DEATH		= 3;
// ==
// コマンドタイプ
// BODY系
var M_CMDTYPE_APPEAR 	= 1;
var M_CMDTYPE_DISAPPEAR = 2;
// WRAP系
var M_CMDTYPE_POSITION 	= 3;
var M_CMDTYPE_RESIZE 	= 4;
var M_CMDTYPE_OPACITY 	= 5;
var M_CMDTYPE_ZINDEX 	= 6;
var M_CMDTYPE_STAY 		= 7;
var M_CMDTYPE_REMOVE 	= 8;
// ==
// 出現／消滅効果
var M_EFFECT_SLIDE_UP 		= 1;
var M_EFFECT_SLIDE_DOWN 	= 2;
var M_EFFECT_SLIDE_RIGHT	= 3;
var M_EFFECT_SLIDE_LEFT 	= 4;
var M_EFFECT_SLIDE_LENGTH	= 1000;
var M_EFFECT_SIZE_MAX 		= 1;
var M_EFFECT_SIZE_MIN 		= 2;
var M_EFFECT_SIZE_MAXSIZE 	= 1000;
var M_EFFECT_SIZE_MINSIZE 	= 0;
// ============================================================

// ============================================================
// HTML要素作成・削除メソッド
//
// 出現効果初期値
message_prototype.appearFade		= true;
message_prototype.appearSlide		= false;
message_prototype.appearSize		= false;
// 消滅効果初期値
message_prototype.disappearFade		= true;
message_prototype.disappearSlide	= false;
message_prototype.disappearSize		= false;
// 座標情報初期値
message_prototype.x 				= 50;
message_prototype.y 				= 50;
// サイズ情報初期値
message_prototype.size 				= 10;


message_prototype.born			= function(o){

										if(o.id){
											this.id = o.id;
										}else{
											return false;
										}

										// 出現効果の設定
										if(o.appearFade){	this.appearFade 	= o.appearFade;}
										if(o.appearSlide){	this.appearSlide 	= o.appearSlide;}
										if(o.appearSize){	this.appearSize 	= o.appearSize;}

										// 生存時間の設定
										if(o.liveTime){	this.liveTimeMax = o.liveTime}

										// 消滅効果の設定
										if(o.disappearFade){	this.disappearFade 	= o.disappearFade;}
										if(o.disappearSlide){	this.disappearSlide	= o.disappearSlide;}
										if(o.disappearSize){	this.disappearSize 	= o.disappearSize;}

										// 座標の設定
										if(isNumber(o.x)){	this.x	= o.x;}
										if(isNumber(o.y)){	this.y 	= o.y;}
										if(isNumber(o.z)){	this.z	= o.z;}

										// 大きさの設定
										if(isNumber(o.size)){ this.size = o.size; }

										// レイヤーの設定
										if(o.layer){　this.layer = o.layer;　}

										// --

										// メッセージの包括部の要素の作成
										this.wrapElement	= $('<div>')
																.attr({
																	'id' 				: this.id
																})
																.addClass('message message_wrap')
																.css({
																	'top' 	: this.y + '%',
																	'left'	: this.x + '%',
																	'width'	: this.size * window.innerHeight / 100 + 'px',
																	'height': this.size * window.innerHeight / 100 + 'px',
																})
																.appendTo('#' + this.layer)[0];

										this.bodyElement	= $('<div>')
																.attr({
																	'id' 				: this.id + '_body',
																})
																.addClass('message_body')
																.appendTo(this.wrapElement);

										// 出現の準備
										this.readyToAppear();

										// メッセージ本体を作成
										this.createMessageElement(o);

										// コマンドキューの初期化
										this.initQueue();

										// 生存時間の設定
										this.initLiveTime();

										// 出現コマンドをキューに入れる
										this.pushCmd({'type' : M_CMDTYPE_APPEAR});

										// 出現効果中に他のコマンドが実行されることを防ぐ為にステイコマンドをキューに入れる
										var stayTime = 1000 / MMUPDATEINTERVAL;
										this.pushCmd({'type' : M_CMDTYPE_STAY, 'o' : {'time' : stayTime}});

										return this;
									};
message_prototype.destroy 		= function(){

										this.initQueue();

										this.pushCmd({'type' : M_CMDTYPE_DISAPPEAR});

										// .message_bodyのトランジッション中にステイコマンドを実行させる
										var stayTime = 1000 / MMUPDATEINTERVAL;
										this.pushCmd({'type' : M_CMDTYPE_STAY, 'o' : {'time' : stayTime}});

										this.pushCmd({'type' : M_CMDTYPE_REMOVE});

										return true;
									};
message_prototype.remove 		= function(){
										$(this.wrapElement).remove();

										return false;
									};
// ============================================================

// ============================================================
// コマンドキュー操作メソッド
//
message_prototype.initQueue		= function(){
										this.cmdQueue = new Array();

										return true;
									};
message_prototype.pushCmd		= function(cmd){
										if(this.cmdQueue){
											return this.cmdQueue.push(cmd);	
										}else{
											return false;
										}
									};
message_prototype.unshiftCmd		= function(cmd){
										if(this.cmdQueue){
											return this.cmdQueue.unshift(cmd);	
										}else{
											return false;
										}
									};									
message_prototype.shiftCmd 		= function(){
										if((this.cmdQueue) && (this.cmdQueue.length > 0)){
											return this.cmdQueue.shift();
										}else{
											return false;
										}
									};
// ============================================================

// ============================================================
// 状態更新メソッド
//
message_prototype.update 		= function(){

										var cmd = this.shiftCmd();

										if(cmd){

											this.zIndex({'z' : 1});
											return this.call(cmd);

										}else{

											this.zIndex({'z' : 0, 'absolute' : true});
											this.liveTimeDecriment();

											if(this.liveTime < 0){
													this.destroy();
											}

											return true;
										}
									};
message_prototype.call 			= function(cmd){

									var res = false;

									switch(cmd.type){
										case M_CMDTYPE_APPEAR 		: res = this.appear(); 				break;
										case M_CMDTYPE_DISAPPEAR 	: res = this.disappear(); 			break;
										case M_CMDTYPE_POSITION 	: res = this.position(cmd); 		break;
										case M_CMDTYPE_RESIZE		: res = this.resize(cmd); 			break;
										case M_CMDTYPE_OPACITY 		: res = this.opacity(cmd); 		break;
										case M_CMDTYPE_ZINDEX 		: res = this.zindex(cmd); 		break;
										case M_CMDTYPE_STAY 		: res = this.stay(cmd); 			break;
										case M_CMDTYPE_REMOVE 		: res = this.remove();				break;
									}

									return res;
								};

// ステイメソッドはオブジェクトの存在をメッセージマネージャーに伝え、無動作を行う。
message_prototype.stay 			= function(cmd){ 
									
									if(cmd.time){
										this.unshiftCmd({
												'type'	: M_CMDTYPE_STAY,
												'time'	: (cmd.time - 1)
											});
									}

									return true;
								};
// ============================================================

// ============================================================
// LiveTime管理メソッド
message_prototype.initLiveTime = function(){
									this.liveTime = this.liveTimeMax;

									return this.liveTime;
								}

message_prototype.liveTimeDecriment = function(){
									this.liveTime--;

									return this.liveTime;	
								}
// ============================================================

// ============================================================
// BODY操作系メソッド
message_prototype.readyToAppear	= function(){

									var style = {
										'opacity'	: '1',
										'top' 		: '50%',
										'left'		: '50%',
										'width'		: '100%',
										'height'	: '100%'
									}

									if(this.appearFade){
										style.opacity = 0;
									}

									switch(this.appearSlide){
										case M_EFFECT_SLIDE_UP :
												style.top 	= (50 - M_EFFECT_SLIDE_LENGTH) + '%';
											break;
										case M_EFFECT_SLIDE_DOWN :
												style.top 	= (50 + M_EFFECT_SLIDE_LENGTH) + '%';
											break;
										case M_EFFECT_SLIDE_LEFT :
												style.left 	= (50 - M_EFFECT_SLIDE_LENGTH) + '%';
											break;
										case M_EFFECT_SLIDE_RIGHT :
												style.left 	= (50 + M_EFFECT_SLIDE_LENGTH) + '%';
											break;
										default :
										;
									}

									switch(this.appearSize){
										case M_EFFECT_SIZE_MAX :
												style.width 	= M_EFFECT_SIZE_MAXSIZE + '%';
												style.height 	= M_EFFECT_SIZE_MAXSIZE + '%';
											break;
										case M_EFFECT_SIZE_MIN :
												style.width 	= M_EFFECT_SIZE_MINSIZE + '%';
												style.height 	= M_EFFECT_SIZE_MINSIZE + '%';
											break;
										default : ;	
									}

									$(this.bodyElement).css(style);
								};						
message_prototype.appear		= function(){

										$(this.bodyElement).css({
											'top' 		: '50%',
											'left'		: '50%',
											'width' 	: '100%',
											'height'	: '100%',
											'opacity'	: '1'
										});

										return true;
									};
// --
message_prototype.disappear		= function(){

										var style = {
											'opacity'	: '1',
											'top' 		: '50%',
											'left'		: '50%',
											'width'		: '100%',
											'height'	: '100%'
										}

										if(this.disappearFade){
											style.opacity = 0;
										}

										switch(this.disappearSlide){
											case M_EFFECT_SLIDE_UP :
													style.top 	= (50 - M_EFFECT_SLIDE_LENGTH) + '%';
												break;
											case M_EFFECT_SLIDE_DOWN :
													style.top 	= (50 + M_EFFECT_SLIDE_LENGTH) + '%';
												break;
											case M_EFFECT_SLIDE_LEFT :
													style.left 	= (50 - M_EFFECT_SLIDE_LENGTH) + '%';
												break;
											case M_EFFECT_SLIDE_RIGHT :
													style.left 	= (50 + M_EFFECT_SLIDE_LENGTH) + '%';
												break;
											default :;
										}

										switch(this.disappearSize){
											case M_EFFECT_SIZE_MAX :
													style.width 	= M_EFFECT_SIZE_MAXSIZE + '%';
													style.height 	= M_EFFECT_SIZE_MAXSIZE + '%';
												break;
											case M_EFFECT_SIZE_MIN :
													style.width 	= M_EFFECT_SIZE_MINSIZE + '%';
													style.height 	= M_EFFECT_SIZE_MINSIZE + '%';
												break;
											default :;	
										}

										$(this.bodyElement).css(style);
										
										return true;
									};								
// ============================================================

// ============================================================
// 操作系メソッド
// すべてのメソッドはmatrixメソッドに集約される
// matrixメソッドを直接呼び出すときは必ず絶対値指定にする
// プロパティごとのそうた位置指定は出来ない
message_prototype.matrix 			= function(o){

											if(o){
												if(o.x){ this.x = o.x; }
												if(o.y){ this.y = o.y; }
												if(o.z){ this.z = o.z; }
												if(o.size){ this.size = o.size; }
												if(o.opacity){ this.opacity = o.opacity; }
												if(o.z){ this.z = o.zx}
											}

											$(this.wrapElement).css({
												'top'		: this.y + '%',
												'left'		: this.x + '%',
												'z-index'	: this.z,
												'width' 	: this.size * window.innerHeight / 100 + 'px',
												'height' 	: this.size * window.innerHeight / 100 + 'px',
												'opacity'	: this.opacity
											});

											return true;
										};
message_prototype.position 			= function(o){

										if(o.absolute){
											this.x = o.x;
											this.y = o.y;
										}else{
											this.x += o.x;
											this.y += o.y;
										}

										if(this.x > 100){ this.x = 100; }
										if(this.x < 0){ this.x = 0; }

										if(this.y > 100){ this.y = 100; }
										if(this.y < 0){ this.y = 0; }

										return this.matrix();
									};
message_prototype.resize 				= function(o){

										if(o.absolute){
											this.size = o.size;
										}else{
											this.size += o.size;
										}

										if(this.size > 100){ this.size = 100; }
										if(this.size < 10){ this.size = 10; }

										return this.matrix();
									};									
message_prototype.visible 			= function(o){

										if(o){
											this.opacity = 1;
										}else{
											this.opacity = 0;
										}

										return this.matrix();
									};
message_prototype.zIndex 			= function(o){

										if(o.absolute){
											this.z = o.z;
										}else{
											this.z += o.z;
										}

										return this.matrix();
									};
// ============================================================

// ============================================================
// その他
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// ============================================================
