// ============================================================
// ホストレクトメッセージオブジェクト
//
var hostRectMessage_prototype = new Object;
// --
hostRectMessage_prototype.__proto__ = hostMessage_prototype;
// ============================================================

// ============================================================
// ホストレクトメッセージオブジェクト
//
var HRM_TEXTARIGN_LEFT 		= 1;
var HRM_TEXTARIGN_RIGHT 	= 2;
var HRM_TEXTARIGN_CENTER 	= 3;
// ============================================================


hostRectMessage_prototype.rectProperties =	{
											'rectColor'	: '#EEE',
											'text'		: '',
											'textColor'	: '#333',
											'textAlign' : HRM_TEXTARIGN_CENTER
										}

hostRectMessage_prototype.createMessageElement = function(o){

												// --

												if(o.rectColor){
													this.rectProperties.rectColor = o.rectColor;
												}

												if(o.text){
													this.rectProperties.text = o.text;
												}

												if(o.textColor){
													this.rectProperties.textColor = o.textColor;
												}

												// --

												$('<div>')
													.attr({'id' : this.id + '_hmrect'})
													.addClass('hmrect')
													.appendTo('#' + this.id + '_body')
													.css({
														'background-color' : this.rectProperties.rectColor
													});

												$('<div>')
													.attr({'id' : this.id + '_hmtext'})
													.addClass('hmtext')
													.appendTo('#' + this.id + '_body');

												// --

												this.setRectSize();

												// --

												if(this.rectProperties.text.length > 0){

													var tPaper = Raphael(this.id + '_hmtext')
																	.setViewBox(0,0,100,100);

													$(tPaper.canvas)
														.removeAttr('width')
														.removeAttr('height')
														.removeAttr('style');

													var textX, textAnc, AspectRatio;
													switch(this.rectProperties.textAlign){
														case HRM_TEXTARIGN_LEFT :
																textX 	= 5;
																textAnc	= 'start';
																AspectRatio = 'xMinYMid meet';
															break;
														case HRM_TEXTARIGN_CENTER:
																textX 		= 50;
																textAnc 	= 'middle';
																AspectRatio = 'xMidYMid meet';
															break;
														case HRM_TEXTARIGN_RIGHT:
																textX 	= 95;
																textAnc	= 'end';
																AspectRatio = 'xMaxYMid meet';
															break;
														default : ;
													}

													var text = tPaper
																	.text(textX, 50, this.rectProperties.text)
																	.attr({
																		'fill'			: this.rectProperties.textColor,
																		'font-size' 	: 33,
																		'text-anchor'	: textAnc
																	});
													tPaper.canvas.setAttribute('preserveAspectRatio', AspectRatio);
												}
											}