// = visitor.startPage
// - 説明
// 		~ visitor.html の startPage の装飾を行う
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

// ドキュメントが準備できたら行う処理
$(document).ready(function() {

	setEventLogo();
	
});

// イベントロゴを作成する
function setEventLogo(){

	drawEventLogo();

}	

// イベントロゴの描画
function drawEventLogo(){

	var logoId 		= 'startLogo';
	var shapePath	= visitorStartLogoData.data.path;
	var shapeColor 	= '#' + visitorStartLogoData.data.color;

	var option = {
		'id'	: logoId,
		'type' 	: 'path',
		'data' 	: {
			'path'	: shapePath,
			'color'	: shapeColor
		}
	};

	flexibleSvg(option);
}