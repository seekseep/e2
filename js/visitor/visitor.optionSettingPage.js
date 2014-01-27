// = visitor.optionSettingPage.js
// - 説明
// 		~ visitor.html の optionSettingPage の装飾を行う
// - 文字コード
// 		~ UTF-8
// - 依存するライブラリ
// 		~ jQuery 	1.10.2
//		~ Raphaël	2.1.2
// - 参照されるファイル
//		~ visitor.html
// - 作成者
//		~ ヨコヤマタク
// 		~ B2266@oic.jp
// - 最終更新日
//		~ 2013-12-05

$(document).ready(function() {
	setMessageColorSelecterButtonEvent();
	setMessageTextInputTextBoxEvent();
});


function setMessageColorSelecterButtonEvent(){
	$('#setMessageColor .selecterButtonBody').click(function(){
		var code 	= $('#setMessageColor').attr('data-selecteditemcode');
		var color 	= '#' + colorCodeManager[code];

		changeMessageColor(color);
	})
}

function setMessageTextInputTextBoxEvent(){
	$('#changeTextButton .buttonBody').click(function(){
		changeMessageText();
	});
}

function changeMessageColor(color){
	for(var i = 0; i < shapePathManager.length; i++){
		var paper = messageShapePapers[i];
		paper.getById('shape').attr({'fill' : color});
	}
}

function changeMessageText(){

	var text 	= $("#setMessageText input[type=text]").val();
	var mText 	= $('#setMessageShape .text');
	var mWords	= $('#setMessageShape .words');
	
	var texts = $(".text");
	var option = {
			'data' 	: {
				'words' : text
			}
		}

	console.log(messageText);
	for(var i = 0; i < texts.length; i++){

		option.id = $(texts[i]).attr('id');
		console.log(option);
		var res = messageText(option);
		console.log(res);

	}
	
}

