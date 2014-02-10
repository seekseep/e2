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
var M_CMDTYPE_SIZE 		= 4;
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
// ステータス変更メッソド
//
// message_prototype.beWating 		= function(){
// 										this.status = M_STATUS_WATING;
// 										return this.isWating();
// 									};
// message_prototype.beAnimating 	= function(){
// 										this.status = M_STATUS_DEATH;
// 										return this.isAnimating();
// 									};
// ============================================================

// ============================================================
// ステータス確認メッソド
//
// message_prototype.isWating 		= function(){
// 										if(this.status == M_STATUS_WATING){
// 											return true;
// 										}else{
// 											return false;
// 										}
// 									};
// message_prototype.isAnimating 	= function(){
// 										if(this.status == M_STATUS_ANIMATING){
// 											return true;
// 										}else{
// 											return false;
// 										}
// 									};
// ============================================================

// ============================================================
// HTML要素作成・削除メソッド
//
message_prototype.default = {
					'x'				: 50,
					'y' 			: 50,
					'z'				: 100,
					'size'			: 10,
					'liveTime'		: 10000,
					'opacity'		: 1,
					'appearEffect'	: {
										'fade' 		: true,
										'slide'		: false,
										'size'		: false 
									},
					'disappearEffect': {
										'fade' 		: true,
										'slide'		: false,
										'size'		: false 
									}		
				};
message_prototype.born			= function(o){

										if(!o.id){
											return false;
										}else{
											this.id = o.id;
										}

										if(o.appearEffect){
											this.appearEffect = o.appearEffect;
										}else{
											this.appearEffect = this.default.appearEffect;
										}

										if(o.liveTime){
											this.liveTimeMax	= o.liveTime;
										}else{
											this.liveTimeMax 	= this.default.liveTime;
										}

										if(o.disappearEffect){
											this.disappearEffect = o.disappearEffect;
										}else{
											this.disappearEffect = this.default.disappearEffect;
										}

										// --
										if(isNumber(o.x)){
											this.x 	= o.x;
										}else{
											this.x 	= this.default.x;
										}

										if(isNumber(o.y)){
											this.y 	= o.y;
										}else{
											this.y 	= this.default.y;
										}

										if(o.size){
											this.size = o.size;
										}else{this.size = this.default.size;
										}

										if(o.z){
											this.z = o.z;
										}else{
											this.z = this.default.z;
										}

										if(o.opacity){
											this.opacity = o.opacity;
										}else{
											this.opacity = this.default.opacity;
										}

										if(o.layer){
											this.layer = o.layer;
										}

										// --

										this.wrapElement	= $('<div>')
																.attr({
																	'id' 				: o.id,
																	'data-messageid'	: o.id
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
																	'id' 				: o.id + '_body',
																	'data-messageid'	: o.id
																})
																.addClass('message_body')
																.appendTo('#' + o.id)[0];
										this.readyToAppear();


										this.createMessageElement(o);

										this.initQueue();
										this.initLiveTime();

										this.pushCmd({'type' : M_CMDTYPE_APPEAR});

										// .message_bodyのトランジッション中にステイコマンドを実行させる
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
										case M_CMDTYPE_POSITION 	: res = this.position(cmd.o); 		break;
										case M_CMDTYPE_SIZE			: res = this.size(cmd.o); 			break;
										case M_CMDTYPE_OPACITY 		: res = this.opacity(cmd.o); 		break;
										case M_CMDTYPE_ZINDEX 		: res = this.zindex(cmd.o); 		break;
										case M_CMDTYPE_STAY 		: res = this.stay(cmd.o); 			break;
										case M_CMDTYPE_REMOVE 		: res = this.remove();				break;
									}

									return res;
								};

// ステイメソッドはオブジェクトの存在をメッセージマネージャーに伝え、無動作を行う。
message_prototype.stay 			= function(o){ 
									
									if(o.time){
										this.unshiftCmd({
												'type'	: M_CMDTYPE_STAY,
												'o'		: { 'time' : (o.time - 1) }
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

									if(this.appearEffect.fade){
										style.opacity = 0;
									}

									switch(this.appearEffect.slide){
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

									switch(this.appearEffect.size){
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
message_prototype.disappear		= function(o){

										var style = {
											'opacity'	: '1',
											'top' 		: '50%',
											'left'		: '50%',
											'width'		: '100%',
											'height'	: '100%'
										}

										if(this.disappearEffect.fade){
											style.opacity = 0;
										}

										switch(this.disappearEffect.slide){
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

										switch(this.disappearEffect.size){
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

										return this.matrix();
									};
message_prototype.size 				= function(o){

										if(o.absolute){
											this.size = o.size;
										}else{
											this.size += o.size;
										}

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
