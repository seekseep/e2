// ============================================================
// データマネージャーオブジェクト
//
var dataManager_prototype = new Object();
// ============================================================

// ============================================================
// データ登録メソッド
dataManager_prototype.register	= function(id){

									this.datas = new Object();

									var children = $('#' + id).children('input');
									for(var i = 0; i < children.length; i++){
										var name 	= $(children.length[i]).attr('data-name');

										if(name){
											this.datas[name] = new Object();
										}
									}


									return this.datas;
								};
// ============================================================

// ============================================================
// データ取得メソッド
dataManager_prototype.get 		= function(name){
									var value = 
								}; 
// ============================================================
