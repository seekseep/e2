var pager = new Object();

pager.init 	= function(e){

	this.e = e;								// 親要素

	this.n = $(e + ' > .page').size();			// 子要素の数

	this.f = $(e + ' > .page')[0]; 				// 子要素の最初
	this.l = $(e + ' > .page')[this.n - 1]; 	// 子要素の最後

	for(var i = 0; i < this.n; i++){
		$($(e + ' > .page')[i])
			.css({
				'z-index' : this.n - i
			})
			.attr('data-number', i);
	}


	// すべての小要素にネクストクラスを降る
	$($(e + ' > .page')).addClass('next');	

	// 一番最初の小要素にカレントクラスを降る
	$($(e + ' > .page')[0])
		.removeClass('next')
		.addClass('current');

}

pager.next 	= function(){
	var cur = $(this.e + ' > .page.current');
	var nex = $(this.e + ' > .page.current').next('.next');

	if(nex.length > 0){

		cur.removeClass('current').addClass('prev');

		nex.removeClass('next').addClass('current');

		console.log("next : success");
	}else{
		console.log("next : fail");		
	}
}

pager.prev 	= function(){
	var cur = $(this.e + ' > .page.current');
	var pre = $(this.e + ' > .page.current').prev('.prev');

	if(pre.length > 0){

		cur.removeClass('current').addClass('next');

		pre.removeClass('prev').addClass('current');

		console.log("prev : success");
	}else{
		console.log("prev : fail");		
	}
}

pager.first = function(){

	// すべての小要素にネクストクラスを降る
	$($(this.e + ' > .page'))
		.removeClass('current')
		.removeClass('prev')
		.addClass('next');	

	// 一番最初の小要素にカレントクラスを降る
	$($(this.e + ' > .page')[0])
		.removeClass('next')
		.addClass('current');

}

pager.last 	= function(){

	// すべての小要素にネクストクラスを降る
	$($(this.e + ' > .page'))
		.removeClass('current')
		.removeClass('next')	
		.addClass('prev');	

	// 一番最初の小要素にカレントクラスを降る
	$($(this.e + ' > .page')[this.n - 1])
		.removeClass('prev')
		.addClass('current');

}

jQuery(document).ready(function($) {
	pager.init('body');

	$('body > *').click(function(){
		pager.next();
	})

	$('body > *').dbclick(function(){
		pager.prev();
	})
	
});