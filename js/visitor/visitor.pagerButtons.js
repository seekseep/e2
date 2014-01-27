function setStartPagePagerButton(){
	$('#startPage .pagerButtonBody').click(function(){
		$('#visitorApp').attr('class', '').addClass('optionSettingPageView');
	});
}

function setOptionSettingPagerButton(){
	$('#optionSettingPage .pagerButtonBody').click(function(){
		$('#visitorApp').attr('class', '').addClass('sendMessagePageView');
		makeSendMessageSample();
	});
}

$(document).ready(function() {
	setStartPagePagerButton();
	setOptionSettingPagerButton();
});