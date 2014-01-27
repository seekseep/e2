// visitor.selecterButtons.js

var messageShapePapers = new Array();

function makeOptionSelecter(){

	makeSelecterButtons();
	makeSelecterItems();
	setSelecterButtons();
	setOptionSelecter();
	
}

function makeSelecterItems(){

	var	selectItems = $('<section>').addClass('selectItems').appendTo('.optionSelecter');

	makeMessageShapeItems();
	makeMessageColorItems();

}

function makeMessageShapeItems(){

	// 初期の色を定義
	var shapeColor 	= '#' + colorCodeManager[0];

	for(var i = 0; i < shapePathManager.length; i++){

		// IDの定義
		var itemId = 'shapeItem_' + i;

		// 選択項目要素の作成
		$('<div>')
			.attr('id', itemId)
			.addClass('selectItem')
			.appendTo('#setMessageShape > .selectItems');

		// パスの定義
		var shapePath 	= shapePathManager[i];

		// オプションの作成
		var option = {
			'id' 		: itemId,
			'shapePath'	: shapePath,
			'shapeColor': shapeColor,
		}

		// メッセージの作成
		var paper = createVisitorMessage(option);

		// メッセージのpaperを配列に入れる
		messageShapePapers.push(paper.sPaper);
	}

	// 選択項目数と初期の選択項目の番号を記録
	$('#setMessageShape').attr('data-itemnum', shapePathManager.length);
	$('#setMessageShape').attr('data-selectedItemCode', 0);

	// 項目が１つ以上ある場合は選択を可能にする
	if(shapePathManager.length > 1){
		$('#setMessageShape .nextSelecterButton').addClass('clickable');		
	}
}

function makeMessageColorItems(){

	for(var i = 0; i < colorCodeManager.length; i++){
		$('<div>')
			.addClass('selectItem')
			.appendTo('#setMessageColor > .selectItems')
			.css({'background-color' : '#' + colorCodeManager[i]});
	}

	// 選択項目数と初期の選択項目の番号を記録
	$('#setMessageColor').attr('data-itemnum', colorCodeManager.length);
	$('#setMessageColor').attr('data-selectedItemCode', 0);

	// 項目が１つ以上ある場合は選択を可能にする
	if(colorCodeManager.length > 1){
		$('#setMessageColor .nextSelecterButton').addClass('clickable');
	}
}

function makeSelecterButtons(){
	var selecterButtons 		= $('<section>').addClass('selecterButtons');
	var prevSelecterButton 		= $('<section>').addClass('prevSelecterButton selecterButton');
	var nextSelecterButton 		= $('<section>').addClass('nextSelecterButton selecterButton');
	var selecterButtonBody 		= $('<div>').addClass('selecterButtonBody');
	var selecterButtonArrow 	= $('<div>').addClass('selecterButtonArrow');
	var selecterButtonArrowBody = $('<span>').addClass('selecterButtonArrowBody');


	selecterButtons.appendTo('.optionSelecter');
	prevSelecterButton.appendTo('.selecterButtons');
	nextSelecterButton.appendTo('.selecterButtons');
	selecterButtonBody.appendTo('.selecterButton');
	selecterButtonArrow.appendTo('.selecterButtonBody');
	selecterButtonArrowBody.appendTo('.selecterButtonArrow');
}

function setOptionSelecter(){
	$('.selectItems > *:first-child').addClass('currentItem');
	$('.selectItems > *:not(:first-child)').addClass('nextItem');
}

function setSelecterButtons(){

		$('.selecterButtonBody').click(function(event) {

			var buttonBody 		= $(this);
			var button 			= $(this).parent();

			// ボタンが押せるか
			if(button.hasClass('clickable')){

				var optionSelecter = $(button.parent().parent());

				var max			= parseInt(optionSelecter.attr('data-itemnum'), 10);;
				var current		= parseInt(optionSelecter.attr('data-selectedItemCode'), 10);
				var currentItem	= optionSelecter.children('section.selectItems').children('div.selectItem.currentItem');


				button.parent().children().addClass('clickable');

				if(button.hasClass('nextSelecterButton')){

					current++;


					if(current >= max - 1){
						current = max - 1;
						button.removeClass('clickable');
					}

					var nextItem;
					if(nextItem = currentItem.next()){
						currentItem
							.removeClass('currentItem')
							.addClass('prevItem');
						nextItem
							.removeClass('nextItem')
							.addClass('currentItem');
					}

				}else if(button.hasClass('prevSelecterButton')){

					current--;

					if(current <= 0){
						current = 0;
						button.removeClass('clickable');
					}

					var prevItem;
					if(prevItem = currentItem.prev()){
						currentItem
							.removeClass('currentItem')
							.addClass('nextItem');
						prevItem
							.removeClass('prevItem')
							.addClass('currentItem');
					}

				}
				optionSelecter.attr('data-selectedItemCode', current);

			}

		});
}

$(document).ready(function() {
	makeOptionSelecter();
});