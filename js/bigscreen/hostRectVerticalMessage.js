// ============================================================
// ホストレクトウォールメッセージオブジェクト
//
var hostRectVerticalMessage_prototype = new Object;
// --
hostRectVerticalMessage_prototype.__proto__ = hostRectMessage_prototype;
// ============================================================

hostRectVerticalMessage_prototype.setRectSize = function(){
												$('#' + this.id + '_hmrect')
													.css({
														'width'	: '100%',
														'height': window.innerHeight + 'px'
													});
											}