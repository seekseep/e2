// ============================================================
// ホストパスメッセージオブジェクト
//
var hostPathMessage_prototype = new Object;
// --
hostPathMessage_prototype.__proto__ = hostMessage_prototype;
// ============================================================

hostPathMessage_prototype.pathProperty = {
												'path' 	: 'M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z',
												'color'	: '#000',
											}

hostPathMessage_prototype.createMessageElement = function(o){

											// --

											if(o.path){
												this.pathProperty.path = o.path; 
											}

											if(o.color){
												this.pathProperty.color = o.color; 
											}

											// --

											$('<div>')
												.attr('id', this.id + '_hmshape')
												.addClass('hmshape')
												.appendTo('#' + this.id + '_body');

											var sPaper = Raphael(this.id + '_hmshape');

											$(sPaper.canvas)
												.removeAttr('width')
												.removeAttr('height')
												.removeAttr('style');

											var shapeBBox =	Raphael.pathBBox(this.pathProperty.path);

											var	vbX 	= 0;
											var vbY 	= 0;
											var vbW 	= shapeBBox.x + shapeBBox.x2;
											var vbH 	= shapeBBox.y + shapeBBox.y2;

											sPaper.setViewBox(vbX, vbY, vbW, vbH, true);

											var shape = sPaper
															.path(this.pathProperty.path)
															.attr({
																'x' 			: 0,
																'y' 			: 0,
																'fill' 			: this.pathProperty.color,
																'stroke-width'	: 0,
																'stroke-color'	: 'rgba(255,255,255,0)'
															});

										};