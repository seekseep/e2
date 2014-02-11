$(document).ready(function(){

	// ==
	// [0]
	$('#menu_icon svg').click(beMenuVisible);
	// ==

	// ==
	// [1]
	$('menu a').click(function(){},changePage);
	// ==
});

// ==
// [0]
function beMenuVisible(){
	$('menu').addClass('visible');

	$('header').on('click', beMenuUnvisible);
	$('nav').on('click', beMenuUnvisible);
	$('#content').on('click', beMenuUnvisible);

	return false;
}
// --
function beMenuUnvisible(){
	$('menu').removeClass('visible');

	$('header').off('click', beMenuUnvisible);
	$('nav').off('click', beMenuUnvisible);
	$('#content').off('click', beMenuUnvisible);

	return false;
}
// ==

// ==
// [1]
function loadPage(){

	var href	= location.href;
	var hashPos = href.search(/#/);
	if(hashPos){
		var hash 	= href.slice(hashPos, hash.length);	
	}
}