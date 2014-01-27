//------------------------------------------------------------------------------------------
// = visitor.effect.js
// - 説明
// visitor画面のアニメーションや効果を設定するjavascriptファイル
// 
//
// - 文字コード
// 		~ UTF-8
// - 依存するライブラリ
// 		~ jQuery 	1.10.2
//		~ Raphaël	2.1.2
// - 依存するファイル
// 		~ visitor.js
//		~ visitor.html
// - 作成者
//		~ ヨコヤマタク
// 		~ B2266@oic.jp
// - 最終更新日
//		~ 2013-11-30
//------------------------------------------------------------------------------------------

// = グローバル変数
var visitorEffect;

// = プロトタイプ
// - visitorEffectオブジェクト
var visitorEffect_prototype = {
	// = マネージャー
	pagesManager 			: 	{ __proto__ : visitorPagesManagement_prototype},
	// = フィールド
	eventColors 			: 	[	
									// カラーリストの初期値
									"#1abc9c","#16a085","#2ecc71","#27ae60",
									"#3498db","#2980b9","#9b59b6","#8e44ad",
									"#f1c40f","#f39c12","#e67e22","#d35400",
									"#e74c3c","#c0392b","#34495e","#2c3e50"
								],

	// = イベント情報取得
	// - 
	// - 使用可能色の取得
	getEventColors 			: 	function(){
									// ajaxを用いて色の配列を取得する
									var userColorList = [];
									this.eventColors = null;
									this.eventColors = userColorList;
								},

	// = タッチイベント定義用メソッド
	// - ドキュメント全体のタッチイベントの無効化
	resetDocumentTouchEvent : 	function(){
									$(document)
										.bind('touchstart', function(event){
											event.preventDefault();
										})
										.bind('touchmove', function(event){
											event.preventDefault();
										})
										.bind('touchend', function(event){
											event.preventDefault();
										});
								}
};

// - visitorPagesManagementオブジェクト
var visitorPagesManagement_prototype ={
	// = フィールド
	pageIds			:  	new Array(),
	currentPage 	: 	null,
	// = 初期設定用メソッド
	initManager 	: 	function(){
							// すべての
							for(var i = 0; i < $('article#visitorApp > section').size; i++){
								var id = $('article#visitorApp > section')[i].id;
								this.pageIds.push(id);
							}
						},
	// = ページ遷移用メソッド
	nextPage		: 	function(){
							this.currentPage.goToNextPage();
						},
	beforePage 		: 	function(){
							this.currentPage.goToBeforePage();
						}
}

// - visitorPageSectionオブジェクト
var visitorPage_prototype = {
	// = フィールド
	// - セクションID
	pageId 				: null,
	// - ボタン用DOMオブジェクト(jQueryオブジェクト)
	nextButton 			: null,
	beforeButtom 		: null,
	// = メソッド
	// - 初期設定メソッド
	initPage 	: 	function(){

							},
	// - ボタン指定メソッド
	setBeforeButton 	: 	function(){
										var jqObj = $('#' + this.pageId + ' > ' + '.beforeButton');

										if(jqObj){
											this.beforeButton =  jqObj;
											this.beforeButton
												.click()
												.bind('touchend',function(){});
											return true;
										}else{
											return false;
										}
									},
	setNextButton 		: 	function(){
										var jqObj = $('#' + this.pageId + ' > ' + '.nextButton');

										if(jqObj){
											this.nextButton =  jqObj;
											return true;
										}else{
											return false;
										}
									}
}

// ドキュメント読み込み時の処理
$(document).ready(function(){

	// ドキュメント全体のタッチイベントを無効化



	// スタート画面から次へ移動
	$('#visitorStartNextButton div.sendble')
	.click(function(){
		$('article#visitorStart + article')
			.addClass('current');
		$('article#visitorStart')
			.css({'margin-top' : - + $(window).innerHeight() + 'px'});
		setTimeout(
			function(){
				$('article#visitorStart').removeClass('current');
			},1000);
	})
	.bind(function(){
		$('article#visitorStart + article')
			.addClass('current');
		$('article#visitorStart')
			.css({'margin-top' : - + $(window).innerHeight() + 'px'});
		setTimeout(
			function(){
				$('article#visitorStart').removeClass('current');
			},1000);
	});

	// 名前を入力に関してイベント
	$('input[name=userName]')
		.keydown(function(event){
			setTimeout(setUserOptionSendButton, 1);
			if(event.keyCode == 13){
				$('#userOptionSendButton div.sendble').click();
			}
		})
		.focusout(function(event){
			setTimeout(setUserOptionSendButton, 1);
		});

	// 色をクリックしたとき
	$('#colorList li')
	.bind('touchend', function(event){
		event.preventDefault();
		visitor.userColor = $(this).children('div').css('background-color');

		$('#colorList li.selected').removeClass('selected');
		$(this).addClass('selected');

		$('body').css('background-color', visitor.userColor);

		setUserOptionSendButton();										
	})
	.click(function(){
		visitor.userColor = $(this).children('div').css('background-color');

		$('#colorList li.selected').removeClass('selected');
		$(this).addClass('selected');

		$('#visitorOptionSetting').css('background-color', visitor.userColor);

		// 参加者情報設定画面からの移動
		setUserOptionSendButton();
	});

});

var setUserOptionSendButtonEventSetFlag = 0;

function setUserOptionSendButton(){
	if(($('input[name=userName]').val().length != 0) && (visitor.userColor != null)){
		$('#userOptionSendButton > div').addClass('sendble');
		visitor.userName = $('input[name=userName]').val();
		if(setUserOptionSendButtonEventSetFlag == 0){
				setUserOptionSendButtonEventSetFlag = 1;
				$('#userOptionSendButton div.sendble')
					.click(function(){
						$('article#visitorOptionSetting + article')
							.addClass('current');
						$('article#visitorOptionSetting')
							.css({'margin-top' : - + $(window).innerHeight() + 'px'});
						createVisitorMessageBall();

						setTimeout(
							function(){
								$('article#visitorOptionSetting').removeClass('current');
								
							},1000);
					})
					.bind(function(){
						$('article#visitorOptionSetting + article')
							.addClass('current');
						$('article#visitorOptionSetting')
							.css({'margin-top' : - + $(window).innerHeight() + 'px'});
						createVisitorMessageBall();
						
						setTimeout(
							function(){
								$('article#visitorOptionSetting').removeClass('current');

							},1000);
					});
		}
	}else{
		$('#userOptionSendButton > div').removeClass('sendble');
	}
}

function createVisitorMessageBall(){

	var color 		= new String(visitor.userColor);
	var inputName	= new String(visitor.userName);
	var outputName 	= "";


	var i = 0;
	while(inputName[i] && i < 20){
		if(i % 5 == 0 && i > 0){
			outputName += "\n";
		}
		outputName += inputName[i];
		console.log(i + ":\n" + i % 5 + ":\n" + outputName);
		i++;
	}

	// messageBall 要素の中身を殻にする
	$('div#messageBall').empty();

	var  paper = Raphael('messageBall');
	paper.setViewBox(0,0,100,100);

	$('div#messageBall svg').css({
		'cursor' 	: 'pointer',
		'width' 	: '100%',
		'height'	: '100%',
		'display'	: 'block',
		'margin'	: '0',
		'padding'	: '0'
	});

	var ball = paper.circle(50,50,45)
					.attr({
						'fill' 				: color,
						'stroke' 			: 'rgba(0,0,0,0.5)',
						'stroke-width'		: 0,
						'-webkit-transition': 'all .2s ease 0s',
						   '-moz-transition': 'all .2s ease 0s',
						    '-ms-transition': 'all .2s ease 0s',
						     '-o-transition': 'all .2s ease 0s',
						        'transition': 'all .2s ease 0s'
					});

	var name = paper.text(50, 50, outputName)
					.attr({
						'color' : '#FFF'
					});

	var mBall = paper.set(ball, name)
					.hover(
						function(){
							// マウスが上に重なったとき
							ball.attr({
								'stroke-width' : 10,
							});
						},
						function(){
							// マウスが離れたとき
							ball.attr({
								'stroke-width' : 0,
							});
						});

	// イベントの登録				
	setMessageBallEvent();
}

function setMessageBallEvent(){

	var mouse = "none";

	$('div#messageBall')
		.mousedown(function(event) {
			console.log('mousedown');
			mouse = "down";
		})
		.mouseup(function(event) {
			console.log('mouseup');
			mouse = "up";
			$(this).css({
				top 	: 90 + '%',
				left 	: 50 + '%',
			});
		})
		.mousemove(function(event){

			console.log(event);

			if(mouse == "down"){
				console.log('drug');
				$(this).css({
					top 	: event.screenY + 'px',
					left 	: event.screenX + 'px'	
				});
			}else{
				console.log('move');
			}
		});

}