


function createHostMessage(o){

	// message-body の作成
	$('<div>')
		.attr('id', o.id + '_body')
		.addClass('mbody')
		.appendTo('#' + o.id);

	// タイプごとの要素の作成
	if(o.mType == HMESSAGE_RECT){
		$('<div>')
			.attr('id', o.id + '_rect')
			.addClass('rect')
			.css({
				'background-color' : o.rectColor
			})
			.appendTo('#' + o.id + '_body');

		$('<div>')
			.attr('id', o.id + '_text')
			.addClass('text')
			.appendTo('#' + o.id + '_body');

		var tPaper = Raphael(o.id + '_text')
						.setViewBox(0,0,100,100, false);

		var AspectRatio, textX, textAnc;
		switch(o.textAlign){
			case TEXTALIGN_LEFT :
					AspectRatio = 'xMinYMid meet';
					textX		= 0;
					textAnc 	= 'start'; 
				break;
			case TEXTALIGN_CENTER :
					AspectRatio = 'xMidYMid meet';
					textX 		= 50;
					textAnc 	= 'middle';
				break;
			case TEXTALIGN_RIGHT :
					AspectRatio = 'xMaxYMid meet';
					textX 		= 100;
					textAnc 	= 'end';
				break;
		}

		$('#' + o.id + '_text > svg')
			.removeAttr('width')
			.removeAttr('height')
			.removeAttr('style');

		$('#' + o.id + '_text > svg')[0].setAttribute('preserveAspectRatio', AspectRatio);

		var tx = tPaper.text(textX,30,o.text)
					.attr({
						'fill'			: o.textColor,
						'font-size' 	: 30,
						'text-anchor'	: textAnc
					});

	}else if(o.mType == HMESSAGE_PATH){

		$('<div>')
			.attr('id', o.id + '_shape')
			.addClass('shape')
			.appendTo('#' + o.id + '_body');

		var option = {
			id 		: o.id + '_shape',
			type 	: 'path',
			data 	: {
				path	: o.path,
				color 	: o.shapeColor
				}
		}

		flexibleSvg(option);
	}
}