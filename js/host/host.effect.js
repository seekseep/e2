var grobalNavigater 	= new Object;

var localNaviGroup		= new Object;

var hostPagesGroups 	= new Object;

var colorList	= new Array();
var shapeList	= new Array();

$(document).ready(function(){

	// =============================================

	var items = $(".globalNaviItem");
	grobalNavigater.items = new Array();
	for(var i = 0; i < items.length; i++){
		var item = items[i];
		grobalNavigater.items.push(item);
		$(item).attr('data-grobalNavigaterItemNumber', i);
	}
	$(grobalNavigater.items[0]).addClass('current');

	// =============================================

	var navis = $(".localNavi");
	localNaviGroup.navis = new Array();
	for(var i = 0; i < navis.length; i++){

		var navi 	= new Object();
		navi.navi 	= navis[i];
		navi.items	= new Array();

		var sele 	= $(navi.navi).children('.localNaviItems').children('.localNaviItem');
		var items 	= $(sele);
		for(var j = 0; j < items.length; j++){
			$(items[j]).attr('data-localNavigaterItemNumver', j);
			navi.items.push(items[j]);
		}
		$(navi.items[0]).addClass('current');

		$(navi.navi).attr('data-localNavigaterNumber', i);
		if(i > 0){
			$(navi.navi).addClass('overBottom');
		}

		localNaviGroup.navis.push(navi);
	}
	$(localNaviGroup.navis[0].navi).addClass('current');

	// =============================================

	var groups = $(".hostPagesGroup");
	hostPagesGroups.items = new Array();
	for(var i = 0; i < groups.length; i++){

		var item = new Object();
		item.group = groups[i];
		item.pages = new Array();


		var pages = $(item.group).children('.hostPage');
		for(var j = 0; j < pages.length; j++){
			item.pages[j] = pages[j];
			if(j > 0){
				$(item.pages[j]).addClass('overRight');
			}
		}
		$(item.pages[0]).addClass('current');

		if(i > 0){
			$(item.group).addClass('overBottom');
		}

		hostPagesGroups.items.push(item);
	}
	$(hostPagesGroups.items[0].group).addClass('current');

	// =============================================

	grobalNavigater.change = function(number){
		for(var i = 0; i < this.items.length; i++){
			$(this.items[i]).removeClass('current');
			if(i == number){
				$(this.items[i]).addClass('current');
			}
		}
		localNaviGroup.navigatorItemChange(number);
	}

	localNaviGroup.navigatorChange = function(number){
		for(var i = 0; i < this.navis.length; i++){
			if(i < number){
				$(this.navis[i].navi)
					.removeClass('current')
					.removeClass('overBottom')
					.addClass('overTop');
			}else if(i == number){
				$(this.navis[i].navi)
					.removeClass('overTop')
					.removeClass('overBottom')
					.addClass('current');
			}else if(i > number){
				$(this.navis[i].navi)
					.removeClass('current')
					.removeClass('overTop')
					.addClass('overBttom');
			}
		}

		for(var i = 0; i < this.navis[number].items.length; i++){
			$(this.navis[number].items).removeClass('current');
		}

		// console.log($(this.navis[number].items[0]));
		$(this.navis[number].items[0]).addClass('current');
	}

	localNaviGroup.navigatorItemChange = function(number){

		for(var i = 0; i < this.navis.length; i++){
			for(var j = 0; j < this.navis[i].items.length; j++){
				if(j != number){
					$(this.navis[i].items[j])
						.removeClass('current')
				}else if(j == number){
					$(this.navis[i].items[j])
						.addClass('current');
				}
			}
		}

		hostPagesGroups.pageChange(number);
	}

	hostPagesGroups.pageGroupChange = function(number){
		for(var i = 0; i < this.items.length; i++){
			if(i < number){
				$(this.items[i].group)
					.removeClass('current')
					.removeClass('overBottom')
					.addClass('overTop');
			}else if(i == number){
				$(this.items[i].group)
					.removeClass('overTop')
					.removeClass('overBottom')
					.addClass('current');
			}else if(i > number){
				$(this.items[i].group)
					.removeClass('current')
					.removeClass('overTop')
					.addClass('overBottom');
			}	
		}
	}

	hostPagesGroups.pageChange = function(number){
		for(var i = 0; i < this.items.length; i++){
			for(var j = 0; j< this.items[i].pages.length; j++){
				if(j < number){
					$(this.items[i].pages[j])
						.removeClass('current')
						.removeClass('overRight')
						.addClass('overLeft');
				}else if(j == number){
					$(this.items[i].pages[j])
						.removeClass('overLeft')
						.removeClass('overRight')
						.addClass('current');
				}else if(j > number){
					$(this.items[i].pages[j])
						.removeClass('current')
						.removeClass('overLeft')
						.addClass('overRight');
				}
			}
		}
	}


	// =============================================

	for(var i = 0; i < grobalNavigater.items.length; i++){
		$(grobalNavigater.items[i]).click(function(){
			var num = $(this).attr('data-grobalNavigaterItemNumber');


			grobalNavigater.change(num);
			localNaviGroup.navigatorChange(num);
			hostPagesGroups.pageChange(0);
			hostPagesGroups.pageGroupChange(num);
		});
	}

	for(var i = 0; i < localNaviGroup.navis.length; i++){
		for(var j = 0; j < localNaviGroup.navis[i].items.length; j++){
			$(localNaviGroup.navis[i].items[j]).click(function(){
				var num = $(this).attr('data-localnavigateritemnumver');
				localNaviGroup.navigatorItemChange(num);
			})
		}
	}

	// ==============================================
	// DBから取り出したデータをListに登録する

	// カラーリスト
	var size = $('#colorListData > input').size();
	for(var i = 0; i < size; i++){

		var ele = $('#colorListData > input')[i];

		var lc = $(ele).data('listcode');
		var ln = $(ele).data('listnumber');
		var cc = $(ele).data('colorcode');

		if(!colorList[lc]){
			colorList[lc] = new Array();
		}

		colorList[lc][ln] = cc;
	}

	// シェイプリスト
	var size = $('#shapeListData > input').size();
	for(var i = 0; i < size; i++){

		var ele = $('#shapeListData > input')[i];

		var lc = $(ele).data('listcode');
		var ln = $(ele).data('listnumber');
		var sp = $(ele).data('shapepath');

		if(!shapeList[lc]){
			shapeList[lc] = new Array();
		}

		shapeList[lc][ln] = sp;
	}

	// ==============================================
	// DBに登録済みのデータを表示する

	// スタートロゴ
	var ccId = $('#registerStartLogoPage .selectedsample').data('colorcode');
	var spId = $('#registerStartLogoPage .selectedsample').data('shapepath');

	var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
	var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');

	var option = {
		'id' 	: 'startLogoSample',
		'type'  : 'path',
		'data'	: {
			'path' : sp,
			'color': cc
		}
	}

	flexibleSvg(option);

	// エンドロゴ
	var ccId = $('#registerEndLogoPage .selectedsample').data('colorcode');
	var spId = $('#registerEndLogoPage .selectedsample').data('shapepath');

	var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
	var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');	

	var option = {
		'id' 	: 'endLogoSample',
		'type'  : 'path',
		'data'	: {
			'path' : sp,
			'color': cc
		}
	}

	flexibleSvg(option);

	// メッセージシェイプ
	var slId = $('#registerVisitorMessageShapePage .selectedsample').data('shapelist');

	var slist = shapeList[slId];

	for(var i = 1; i < slist.length; i++){

		var itemId = 'shape_list_item_' + i;

		var item = $('<li>')
						.attr('id', itemId)
						.appendTo('#messageShapeSample');

		var div = $('<div>')
						.attr('id', itemId + '_body')
						.appendTo('#' + itemId);

		var option = {
			'id' 	: itemId + '_body',
			'type'  : 'path',
			'data'	: {
				'path' : slist[i],
				'color': '#EEE'
			}
		}

		flexibleSvg(option);
	}

	// メッセージカラー
	var clId = $('#registerVisitorMessageColorPage .selectedsample').data('colorlist');

	var clist = colorList[clId];

	for(var i = 1; i < clist.length; i++){

		var itemId = 'color_list_item_' + i;

		var item = $('<li>')
						.attr('id', itemId)
						.appendTo('#messageColorSample');

		var div = $('<div>')
						.attr('id', itemId + '_body')
						.appendTo('#' + itemId)
						.css({'background-color': '#' + clist[i]});
	}

	// ==============================================
	// DBにから登録な選択肢をリストにして出力
	// 登録済みであることを反映させる

	// スタートロゴ
	// エンドロゴ
	// 形式が同じであるため同時に生成する

	// カラーの選択肢
	var size = $('#colorListData > input').size();
	for(var i = 0; i < size; i++){

		var ele = $('#colorListData > input')[i];

		var itemId = $(ele).data('id');
		var item = $('<li>')
						.attr('data-id', itemId)
						.appendTo('#startLogoColor, #endLogoColor');

		var body = $('<div>')
						.css({
							'background-color' : '#' + $(ele).data('colorcode')
						})
						.appendTo(item);
	}

	// カラーの選択肢
	var size = $('#shapeListData > input').size();
	for(var i = 0; i < size; i++){

		var ele = $('#shapeListData > input')[i];

		var itemId = $(ele).data('id');
		var item = $('<li>')
						.attr('data-id', itemId)
						.appendTo('#startLogoShape, #endLogoShape');

		// スタートロゴ
		var bodyId = 'start_' + itemId + '_body';
		var body = $('<div>')
						.attr('id', bodyId)
						.appendTo('#startLogoShape > li[data-id=' + itemId + ']');
		
		var option = {
			'id' 	: bodyId,
			'type'	: 'path',
			'data'	: {
				'path' : $(ele).data('shapepath'),
				'color': '#EEE'
			}
		}

		flexibleSvg(option);

		// エンドロゴ
		var bodyId = 'end_' + itemId + '_body';
		var body = $('<div>')
						.attr('id', bodyId)
						.appendTo('#endLogoShape > li[data-id=' + itemId + ']');
		
		var option = {
			'id' 	: bodyId,
			'type'	: 'path',
			'data'	: {
				'path' : $(ele).data('shapepath'),
				'color': '#EEE'
			}
		}

		flexibleSvg(option);
	}

	// メッセージシェイプ
	for(var lc = 1; lc < shapeList.length; lc++){

		var unit = $('<li>')
						.attr('data-listcode', lc)
						.appendTo('#messageShapes');

		var unitBody = $('<ul>')
							.appendTo(unit);

		for(var ln = 1; ln < shapeList[lc].length; ln++){

			var item = $('<li>')
							.appendTo(unitBody);

			var itemBodyId = 'message_shapes_body_' + lc + '_' + ln;
			var itemBody   = $('<div>')
								.attr('id', itemBodyId)
								.appendTo(item);

			var option = {
				'id' 	: itemBodyId,
				'type'	: 'path',
				'data'	: {
					'path' : shapeList[lc][ln],
					'color': '#EEE'
				}
			}

			flexibleSvg(option);
		}
	}

	// メッセージカラー
	for(var lc = 1; lc < colorList.length; lc++){

		var unit = $('<li>')
						.attr('data-listcode', lc)
						.appendTo('#messageColors');

		var unitBody = $('<ul>')
							.appendTo(unit);

		for(var ln = 1; ln < colorList[lc].length; ln++){

			var item = $('<li>')
							.appendTo(unitBody);

			var itemBodyId = 'message_colors_body_' + lc + '_' + ln;
			var itemBody   = $('<div>')
								.attr('id', itemBodyId)
								.appendTo(item)
								.css({'background-color' : '#' + colorList[lc][ln]});
		}
	}

	// 選択中の項目の反映
	// スタートロゴ
	var selectedId = $('#registerStartLogoPage .selectedsample').data('colorcode');
	$('#startLogoColor > li[data-id=' + selectedId + ']').addClass('selected');

	var selectedId = $('#registerStartLogoPage .selectedsample').data('shapepath');
	$('#startLogoShape > li[data-id=' + selectedId + ']').addClass('selected');

	// エンドロゴ
	var selectedId = $('#registerEndLogoPage .selectedsample').data('colorcode');
	$('#endLogoColor > li[data-id=' + selectedId + ']').addClass('selected');

	var selectedId = $('#registerEndLogoPage .selectedsample').data('shapepath');
	$('#endLogoShape > li[data-id=' + selectedId + ']').addClass('selected');

	// メッセージシェイプ
	var selectedId = $('#registerVisitorMessageShapePage .selectedsample').data('shapelist');
	$('#messageShapes > li[data-listcode=' + selectedId + ']').addClass('selected');

	// メッセージカラー
	var selectedId = $('#registerVisitorMessageColorPage .selectedsample').data('colorlist');
	$('#messageColors > li[data-listcode=' + selectedId + ']').addClass('selected');


	// 選択肢のクリック時の処理
	// スタート シェイプ
	$('#startLogoShape > li').click(function(){

		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#startLogoShape > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したID
			var selectedId = $(this).data('id');

			// サンプルの値の変更
			$('#registerStartLogoPage .selectedsample').attr('data-shapepath', selectedId);

			// サンプルの描画		
			var ccId = $('#registerStartLogoPage .selectedsample').attr('data-colorcode');
			// console.log(ccId)
			var spId = $('#registerStartLogoPage .selectedsample').attr('data-shapepath');
			// console.log(spId);

			var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
			var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');

			var option = {
				'id' 	: 'startLogoSample',
				'type'  : 'path',
				'data'	: {
					'path' : sp,
					'color': cc
				}
			}

			flexibleSvg(option);

		}else{
			return false;
		}
	});
	// スタート カラー
	$('#startLogoColor > li').click(function(){

		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#startLogoColor > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したID
			var selectedId = $(this).data('id');

			// サンプルの値の変更
			$('#registerStartLogoPage .selectedsample').attr('data-colorcode', selectedId);

			// サンプルの描画		
			var ccId = $('#registerStartLogoPage .selectedsample').attr('data-colorcode');
			// console.log(ccId)
			var spId = $('#registerStartLogoPage .selectedsample').attr('data-shapepath');
			// console.log(spId);

			var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
			var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');
			// console.log(cc, sp);

			var option = {
				'id' 	: 'startLogoSample',
				'type'  : 'path',
				'data'	: {
					'path' : sp,
					'color': cc
				}
			}

			// console.log(option);

			flexibleSvg(option);

		}else{
			return false;
		}
	});
	// エンド シェイプ
	$('#endLogoShape > li').click(function(){

		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#endLogoShape > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したID
			var selectedId = $(this).data('id');

			// サンプルの値の変更
			$('#registerEndLogoPage .selectedsample').attr('data-shapepath', selectedId);

			// サンプルの描画		
			var ccId = $('#registerEndLogoPage .selectedsample').attr('data-colorcode');
			var spId = $('#registerEndLogoPage .selectedsample').attr('data-shapepath');

			// データの参照
			var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
			var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');

			var option = {
				'id' 	: 'endLogoSample',
				'type'  : 'path',
				'data'	: {
					'path' : sp,
					'color': cc
				}
			}

			// console.log(option);

			flexibleSvg(option);

		}else{
			return false;
		}
	});
	// エンド カラー
	$('#endLogoColor > li').click(function(){

		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#endLogoColor > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したID
			var selectedId = $(this).data('id');

			// サンプルの値の変更
			$('#registerEndLogoPage .selectedsample').attr('data-colorcode', selectedId);

			// サンプルの描画		
			var ccId = $('#registerEndLogoPage .selectedsample').attr('data-colorcode');
			var spId = $('#registerEndLogoPage .selectedsample').attr('data-shapepath');

			var cc = '#' + $('#colorListData > input[data-id=' + ccId +']').data('colorcode');
			var sp = $('#shapeListData > input[data-id=' + spId +']').data('shapepath');

			var option = {
				'id' 	: 'endLogoSample',
				'type'  : 'path',
				'data'	: {
					'path' : sp,
					'color': cc
				}
			}

			flexibleSvg(option);

		}else{
			return false;
		}
	});

	// メッセージシェイプ
	$('#messageShapes > li').click(function() {
		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#messageShapes > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したリストコード
			var slId = $(this).data('listcode');

			// サンプルの値の変更
			$('#registerVisitorMessageShapePage .selectedsample').attr('data-shapelist', slId);

			// サンプルの初期化
			$('#messageShapeSample').empty();

			var slist = shapeList[slId];
			for(var i = 1; i < slist.length; i++){

				var itemId = 'shape_list_item_' + i;

				var item = $('<li>')
								.attr('id', itemId)
								.appendTo('#messageShapeSample');

				var div = $('<div>')
								.attr('id', itemId + '_body')
								.appendTo('#' + itemId);

				var option = {
					'id' 	: itemId + '_body',
					'type'  : 'path',
					'data'	: {
						'path' : slist[i],
						'color': '#EEE'
					}
				}

				flexibleSvg(option);
			}

		}else{
			return;
		}
	});

	// メッセージシェイプ
	$('#messageColors > li').click(function() {
		if(!$(this).hasClass('selected')){

			// クラスの変更
			$('#messageColors > li.selected').removeClass('selected');
			$(this).addClass('selected');

			// 選択したリストコード
			var slId = $(this).data('listcode');

			// サンプルの値の変更
			$('#registerVisitorMessageColorPage .selectedsample').attr('data-colorlist', slId);

			// サンプルの初期化
			$('#messageColorSample').empty();

			var clist = colorList[slId];
			// console.log(slId, clist);
			for(var i = 1; i < clist.length; i++){

				var itemId = 'color_list_item_' + i;

				var item = $('<li>')
								.attr('id', itemId)
								.appendTo('#messageColorSample');

				var div = $('<div>')
								.css({'background-color' : '#' + clist[i]})
								.appendTo(item);
			}

		}else{
			return;
		}
	});
	// ==============================================
	// 変更されたイベント情報をDBに反映させる

	// スタートロゴ
	$('#startLogoRegisterButton').click(function(){

		var eventCode 	= $('#hostApp').attr('data-eventcode');
		var colorId 	= $('#registerStartLogoPage .selectedsample').attr('data-colorcode');
		var shapeId 	= $('#registerStartLogoPage .selectedsample').attr('data-shapepath');

		$.ajax({
			url: './php/setStartLogo.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'			: eventCode,
				'startlogoshapeid'	: shapeId,
				'startlogocolorid'	: colorId,
			},
		})
		.done(function(data) {
			console.log(data);
			if(data){
				alert('登録完了しました。');
			}else{
				alert('登録失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

	// エンドロゴ
	$('#endLogoRegisterButton').click(function(){

		var eventCode 	= $('#hostApp').attr('data-eventcode');
		var colorId 	= $('#registerEndLogoPage .selectedsample').attr('data-colorcode');
		var shapeId 	= $('#registerEndLogoPage .selectedsample').attr('data-shapepath');

		$.ajax({
			url: './php/setEndLogo.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'			: eventCode,
				'endlogoshapeid'	: shapeId,
				'endlogocolorid'	: colorId,
			},
		})
		.done(function(data) {
			if(data){
				alert('登録完了しました。');
			}else{
				alert('登録失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

	// シェイプリスト
	$('#shapeListRagisterButton').click(function(){
		var eventCode 	= $('#hostApp').attr('data-eventcode');
		var listCode 	= $('#registerVisitorMessageShapePage .selectedsample').attr('data-shapelist');

		$.ajax({
			url: './php/setEventShapeList.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'			: eventCode,
				'shapelistcode'		: listCode,
			},
		})
		.done(function(data) {
			if(data){
				alert('登録完了しました。');
			}else{
				alert('登録失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

	// カラーリスト
	$('#colorListRagisterButton').click(function(){
		var eventCode 	= $('#hostApp').attr('data-eventcode');
		var listCode 	= $('#registerVisitorMessageColorPage .selectedsample').attr('data-colorlist');
		
		$.ajax({
			url: './php/setEventColorList.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'			: eventCode,
				'colorlistcode'		: listCode,
			},
		})
		.done(function(data) {
			if(data){
				alert('登録完了しました。');
			}else{
				alert('登録失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

	// ==============================================
	// ロード時のイベント状態を反映させる
	if($('#statusView').data('status')){
		$('#statusView').addClass('active');
	}else{
		$('#statusView').addClass('stop');
	}

	$('#stop_button').click(function(){
		$("#statusView")
			.removeClass('active')
			.addClass('stop')
			.attr('data-status', 0);

		var eventCode 	= $('#hostApp').attr('data-eventcode');

		$.ajax({
			url: './php/setStatus.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'	: eventCode,
				'status'	: 0
			},
		})
		.done(function(data) {
			if(data){
				alert('ステータスを変更しました。');
			}else{
				alert('ステータスの変更に失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

	$('#active_button').click(function(){
		$("#statusView")
			.removeClass('stop')
			.addClass('active')
			.attr('data-status', 1);

		var eventCode 	= $('#hostApp').attr('data-eventcode');

		$.ajax({
			url: './php/setStatus.php',
			type: 'POST',
			dataType: 'text',
			data: {
				'eventcode'	: eventCode,
				'status'	: 1
			},
		})
		.done(function(data) {
			if(data){
				alert('ステータスを変更しました。');
			}else{
				alert('ステータスの変更に失敗しました。');
			}
		})
		.fail(function() {
			alert('通信に失敗しました。');
		});
	});

});