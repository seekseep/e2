// even.dataManager.js

var dataManager_prototype = {
	setData		: function(){

						this.data = {};

						var body = '#' + this.srcId + '> input';

						for(var i = 0; i < $(body).size(); i++){

							var content = $('#' + this.srcId + ' > input')[i];

							var name 	= $(content).attr('name');
							var data 	= $(content).val();
							var src 	= 'this.data.' + name + ' = "' + data + '";';

							eval(src);  
						}

						$('#' + this.srcId).remove();
					},
	getData		: function(name){
						var data 	= '';
						var src 	= 'data = this.data.' + name;
						eval(src);

						if(data){
							return data;							
						}else{
							return false;
						}

					}
};

var visitorStartLogoData = {
	__proto__ 	: dataManager_prototype,
	srcId		:'visitorStartLogoData'
}

var visitorEndLogoData = {
	__proto__ 	: dataManager_prototype,
	srcId		:'visitorEndLogoData'
}

$(document).ready(function() {
	visitorStartLogoData.setData();
	visitorEndLogoData.setData();
});