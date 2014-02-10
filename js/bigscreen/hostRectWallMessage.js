// ============================================================
// ホストレクトウォールメッセージオブジェクト
//
var hostRectWallMessage_prototype = new Object;
// --
hostRectWallMessage_prototype.__proto__ = hostRectMessage_prototype;
// ============================================================

hostRectWallMessage_prototype.setRectSize = function(){
												$('#' + this.id + '_hmrect')
													.css({
														'width'	: window.innerWidth + 'px',
														'height': window.innerHeight + 'px'
													});
																								$('#' + this.id + '_hmrect')
												$('#' + this.id + '_hmtext').css({
														'width': window.innerWidth + 'px'
													});	
											}