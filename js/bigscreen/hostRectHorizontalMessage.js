// ============================================================
// ホストレクトウォールメッセージオブジェクト
//
var hostRectHorizontalMessage_prototype = new Object;
// --
hostRectHorizontalMessage_prototype.__proto__ = hostRectMessage_prototype;
// ============================================================

hostRectHorizontalMessage_prototype.setRectSize = function(){
												$('#' + this.id + '_hmrect')
													.css({
														'width'	: window.innerWidth + 'px',
														'height': '100%'
													});
												$('#' + this.id + '_hmtext')
													.css({
														'width'	: window.innerWidth + 'px'
													});	
											}