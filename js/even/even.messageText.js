// even.flexibleSvg.js
// フレキシブルなSVGを生成する
// 引数はオブジェクト
// option = {
// 	id 		: ELEMENT_ID,
// 	data 	: {
// 		words		: "SAMPLETEXT",
// 		font-color 	: '#000',
//		background	: '#EEE'
// 		}
// }

var tmpTexts = new Array();

function messageText(o){

	var tId = o.id;

	// 中身を空にする
	$('#' + tId)
		.empty();

	var words 		= o.data.words;
	// console.log(words);

	if(words && words.length > 0){	

		// テキスト用のSVG
		var paper = Raphael(tId);
		// ビューボックスの定義
		paper.setViewBox(0, 0, 100, 100, true);
		// svg要素の初期化
		$('#' + tId + " > svg")
			.removeAttr('width')
			.removeAttr('height')
			.removeAttr('style')
			.css({
				'width' 	: '100%',
				'height' 	: '100%'
			});

		// メッセージの幅に合うように
		// 改行と文字の大きさを調整していく
		// 文字の大きさはデフォルトで9に設定
		// 文字列が一行で収まる場合は文字の大きさを大きくする

		var rowWords 	= new Array();				// 調整前の文字列
		var wordsCnt	= 0;						// 調整前の文字列のインデックス

		var insWords 	= new Array();						// 調整後の文字列を一行ずつ入れる
		var insWordsLin = 1;						// 調整後の文字列の行数を数える

		var str 		= "";						// 確定前の文字列

		var wordSize 	= 9;						// 文字の大きさ


		// 返還前文字列を配列に変換
		for(wordsCnt = 0; wordsCnt < words.length; wordsCnt++){
			rowWords.push(words[wordsCnt]);
		}
		// console.log(rowWords);

		// 挿入文字列を作成
		while(rowWords.length){

			// 変換前文字列の先頭の文字を作業用文字列に追加	
			str += rowWords.shift();
			// console.log("str", str);

			// 作業用文字列のバウンディングボックスを作成
			var tmpText = paper.text(0,0, str).attr({'font-size' : 9});
			var bBox	= tmpText.getBBox();
			var bWidth 	= bBox.width;
			// console.log("bWidth", bWidth);

			// バウンディングボックスの幅が90を上回るとき
			if(bWidth > 90){
				var tmpStr = str.slice(0, str.length - 1);
				// console.log("tmpStr", tmpStr);

				str = str[str.length - 1];
				// console.log("str", str);

				insWords.push(tmpStr + "\n");
				// console.log(insWords);
			}
			tmpText.remove();


			// 調整前文字列が空であるとき
			if(rowWords.length == 0){
				tmpStr = str;
				insWords.push(tmpStr);
				// console.log(insWords, insWords.length);
			}

			// 挿入文字列が三行を上回るとき
			// console.log(insWords.length);
			if(insWords.length > 3){

				insWords.length = 3;

				break;
			}
		}

		// 文字の描画
		var insStr 	= "";
		while(insWords.length){
			insStr += insWords.shift();
		}
		var words 	= paper.text(50,50, insStr).attr({'font-size': 9});

		// 文字のバウンディングボックス
		var bBox 	= words.getBBox();

		// 背景の描画
		var bgRectSize = {
			width  	: 100,
			height 	: bBox.height + 10
		}
		var bgRectPos = {
			x 		: 0,
			y 		: 100 - bgRectSize.height
		}

		var bgRect	= paper
						.rect(bgRectPos.x, bgRectPos.y, bgRectSize.width, bgRectSize.height)
						.attr({
							'fill' 			: 'rgba(255,255,255,0.6)',
							'stroke-width'	: 0
						});

		// 重なり制御のためテキストを書き直す
		// 先にテキストを書いたのはバウンディングボックスを得るため
		words.remove();
		var words 	= paper.text(0,0, insStr, paper.getFont("Arial"), 9).attr({fill: "#000"});
		var bBox 	= words.getBBox();
		words.attr({
				'x' 		: 50,
				'y'			: 100 - (bgRectSize.height / 2),
				'font-size' : 9
			});
	}

	return paper;
}