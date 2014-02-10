
// ============================================================
// ビジターメッセージオブジェクト
//
var visitorMessage_prototype = new Object;
// --
visitorMessage_prototype.__proto__ = message_prototype;
// ============================================================

// ============================================================
// ビジターメッセージ定数
// ============================================================

visitorMessage_prototype.layer 			= 'visitorLayer';

visitorMessage_prototype.liveTimeMax 	= 30000 / MMUPDATEINTERVAL;

visitorMessage_prototype.createMessageElement 	= function(o){

											// --
											// HTML要素の作成

											$('<div>')
												.attr({'id' : this.id + '_vmshape'})
												.addClass('vmshape')
												.appendTo('#' + this.id + '_body');


											$('<div>')
												.attr({'id'	: this.id + '_vmtext'})
												.addClass('vmtext')
												.appendTo('#' + this.id + '_body');

											// --
											// シェイプ情報の取得

											var shapePath 	= shapePathManager[o.shapeId];
											var shapeColor 	= colorCodeManager[o.colorId];

											// --
											// シェイプの描画

											var sPaper = Raphael(this.id + '_vmshape');

											// --

											var shapeBBox =	Raphael.pathBBox(shapePath);

											var	vbX 	= 0;
											var vbY 	= 0;
											var vbW 	= shapeBBox.x + shapeBBox.x2;
											var vbH 	= shapeBBox.y + shapeBBox.y2;

											sPaper.setViewBox(vbX, vbY, vbW, vbH, true);

											// --

											var shape = sPaper
															.path(shapePath)
															.attr({
																'x' 			: 0,
																'y' 			: 0,
																'fill' 			: shapeColor,
																'stroke-width'	: 0,
																'stroke-color'	: 'rgba(255,255,255,0)'
															});

											// --

											$(sPaper.canvas)
												.removeAttr('width')
												.removeAttr('height')
												.removeAttr('style');

											// --

											// テキスト情報の取得

											if(o.text.length > 0){

												var text = o.text.replace(/[\n\r]/g, '');

												var tPaper = Raphael(this.id + '_vmtext');
												var tPaperLength = 100;

												$(tPaper.canvas)
													.removeAttr('width')
													.removeAttr('height')
													.removeAttr('style');												

												tPaper.setViewBox(0, 0, tPaperLength, tPaperLength, true);

												var tmpTextStr 		= "";
												var insertTextStr	= "";
												var line = 1;

												for(var i = 0; i < text.length; i++){
													
													tmpTextStr += text.slice(i, (i + 1));

													var tmpText = tPaper.text(0,0,tmpTextStr);

													if(tmpText.getBBox().width < tPaperLength * 0.8){
														insertTextStr += text.slice(i, (i + 1));
													}else{
														insertTextStr += '\n' + text.slice(i, (i + 1));
														line++;
													}

													tmpText.remove();

													tmpTextStr = insertTextStr;

													if(line > 3){
														insertTextStr = insertTextStr.slice(0, (insertTextStr.length -2));
														break;
													}
												}

												var tmpText = tPaper.text(0,0,insertTextStr);

												var rX = 0;
												var rY = (tPaperLength * 0.9) - tmpText.getBBox().height;
												var rW = tPaperLength;
												var rH = tmpText.getBBox().height + tPaperLength * 0.1;

												var bgRect 	= tPaper.rect(rX, rY, rW, rH)
																.attr({
																	'fill' 			: '#FFF',
																	'fill-opacity'	: 0.5,
																	'stroke'		: '#FFF',
																	'stroke-width'	: 0,
																	'stroke-opacity': 0
																});

												var tX = tPaperLength / 2;
												var tY = tPaperLength * 0.95 - (tmpText.getBBox().height / 2);
												var text 	= tPaper.text(tX, tY, insertTextStr);

												tmpText.remove();
											}

										}