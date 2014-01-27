// createMessage() は
// 	id 						メッセージを一意に特定するID
// 	shapePath 				シェイプのパス
// 	shapeColor 				シェイプのカラー　					
// 	textWords　				テキストの内容
// 	textColor　				テキストの色
// 	textBackgroundColor　	テキストの背景色
// をもとにメッセージを生成する


function createMessage(option){

	// 要素の中を空にする
	$('#' + option.id).empty();

	// 引数から値を取り出す
	var messageId 	= option.id;
	var shapePath 	= option.shapePath;
	var shapeColor 	= option.shapeColor;
	var textWords 	= option.textWords;
	var textColor 	= option.textColor;
	var textBGColor = option.textBackgroundColor;

	// 要素の設定
	$('#' + messageId).addClass('message');
	$('<div>')
		.attr('id', messageId + '_shape')
		.addClass('shape')
		.appendTo('#' + messageId);
	$('<div>')
		.attr('id', messageId + '_text')
		.addClass('text')
		.appendTo('#' + messageId);

	var shapeOption = {
		'id'		: messageId + '_shape',
		'type' 		: 'path',
		'data' 		: {
				'path' 	: shapePath,
				'color' : shapeColor
			}
	};
	var sPaper = flexibleSvg(shapeOption);

	var textOption = {
		'id' 		: messageId + '_text',
		'data' 		: {
			'words'			: textWords,
 			'font-color' 	: textColor,
			'background'	: textBGColor
		}
	}
	var tPaper = messageText(textOption);

	return {
		'sPaper' : sPaper,
		'tPaper' : tPaper
	};
}