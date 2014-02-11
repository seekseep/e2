// ============================================================
// ホストメッセージオブジェクト
//
var hostMessage_prototype = new Object;
// --
hostMessage_prototype.__proto__ = message_prototype;
// ============================================================

// ============================================================
// liveTime の定義
hostMessage_prototype.liveTimeMax 	= Infinity;
// layer の定義
hostMessage_prototype.layer 		= 'hostLayer1'
// ============================================================