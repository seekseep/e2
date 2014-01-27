// even.flexibleSvg.js
// フレキシブルなSVGを生成する
// 引数はオブジェクト
// option = {
// 	id 		: ELEMENT_ID,
// 	type 	: 'path',
// 	data 	: {
// 		path	: "M00,112",
// 		color 	: '#000'
// 		}
// }

function flexibleSvg(option){

	// 要素の中身を初期化
	$('#' + option.id).empty();

	// 引数から基礎となる値を取り出す
	var id 		= option.id;
	var type 	= option.type;

	var paper = Raphael(id);

	if(type == 'path'){

		// 引数から描画に必要な値を取り出す
		var path 	= option.data.path;
		var color 	= option.data.color;

		// バウンディングボックスの取得
		var bBox =	Raphael.pathBBox(path);

		// viewBoxの算出
		var	vbX 		= 0;
		var vbY 		= 0;
		var vbWidth 	= bBox.x + bBox.x2;
		var vbHeight 	= bBox.y + bBox.y2;

		// viewBoxの定義
		paper.setViewBox(vbX, vbY, vbWidth, vbHeight, true);

		// パスの描画
		var shape = paper
					.path(path)
					.attr({
						'x' 			: 0,
						'y' 			: 0,
						'fill' 			: color,
						'stroke-width'	: 0,
						'stroke-color'	: 'rgba(255,255,255,0)'
					});

		// IDの設定
		shape.id = 'shape';

	}else{
		console.log(option, 'typeの値が不正です。');
		return;
	}

	// SVGを包括する要素のクラスの追加
	$('#' + id)
		.addClass('flexiblesvg');

	// SVG要素の属性値の操作
	$('#' + id + ' ' + 'svg')
		.removeAttr('width')
		.removeAttr('height')
		.removeAttr('style');
		
	return paper;
}
