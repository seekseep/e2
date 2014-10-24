// ====================================================================================================
// ====================================================================================================
// メッセージ管理オブジェクト
var messagesManager_prototype = new Object();
// addメソッド定義
messagesManager_prototype.add　= 	function(o){
										// idの取り出し
										var id = o.id;

										// 重複の確認
										if(this.list[id]){										
											console.log("重複したadd命令です。メッセージオブジェクトの生成ができません。");
										}else{
											// メッセージオブジェクトの定義
											var message = new Object();

											// 管理メッセージのプロトタイプを受け継ぐ
											message.__proto__  = this.messageProto;

											// メッセージ作成用のオプションに自分の作成先のレイヤーを追加
											o.layer = this.layer;
											
											// BORNメソッドの呼び出し
											message.born(o);

											// messagesオブジェクトに追加(コマンド受け渡し用)
											this.list[message.id] = message;
											// updaterオブジェクトに追加(アップデート用)
											updater.list[message.id] = message;											
										}
									};
// controlメソッド定義
messagesManager_prototype.control = function(cmd){
										var id 		= cmd.id;
										// 存在確認
										if(this.list[id]){
											var option 	= cmd.o;
											this.list[id].call(cmd);
										}
									}
// ====================================================================================================
// ====================================================================================================

// ====================================================================================================
// ビジターメッセージ管理オブジェクト
var visitorMessagesManager	= new Object();

// メッセージ管理オブジェクトを受け継ぐ
visitorMessagesManager.__proto__  	= messagesManager_prototype;

// 管理メッセージのプロトタイプの定義
visitorMessagesManager.messageProto = visitorMessage_prototype;

// 作成先レイヤー名
visitorMessagesManager.layer 		= 'visitorLayer';

// 管理するメッセージを保存
visitorMessagesManager.list			= new Object();
// ====================================================================================================

// ====================================================================================================
// ホストメッセージ管理オブジェクト
var host1MessagesManager	= new Object();

// メッセージ管理オブジェクトを受け継ぐ
host1MessagesManager.__proto__  	= messagesManager_prototype;

// 管理メッセージのプロトタイプの定義
host1MessagesManager.messageProto 	= hostMessage_prototype;

// 作成先レイヤー名
host1MessagesManager.layer 			= 'hostLayer1';

// 管理するメッセージを保存
host1MessagesManager.list			= new Object();
// ====================================================================================================

// ====================================================================================================
// ホストメッセージ管理オブジェクト
var host2MessagesManager	= new Object();

// メッセージ管理オブジェクトを受け継ぐ
host2MessagesManager.__proto__  	= messagesManager_prototype;

// 管理メッセージのプロトタイプの定義
host2MessagesManager.messageProto 	= hostMessage_prototype;

// 作成先レイヤー名
host2MessagesManager.layer 			= 'hostLayer2';

// 管理するメッセージを保存
host2MessagesManager.list			= new Object();
// ====================================================================================================