// even.codeManager.js

var colorCodeManager = new Array();
var shapePathManager = new Array();

$(document).ready(function() {

	for(var i = 0; i < $('#eventShapeList > input').size(); i++){

		var sp	= $($('#eventShapeList > input')[i]).attr('data-shapepath');

		shapePathManager[i] = sp;
	}

	for(var i = 0; i < $('#eventColorList > input').size(); i++){

		var sp	= $($('#eventColorList > input')[i]).attr('data-colorcode');

		colorCodeManager[i] = sp;
	}

});