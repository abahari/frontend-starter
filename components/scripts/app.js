(function () {
	'use strict';
	var $ = require('./libs/jquery-1.11.3');

		//modules = require('./main');

    var x = new (require('./modules/increment'))();


    x.init();


    /*var mycounter = new Counter();
    var mycounter2 = new Counter();*/
	function initApp () {
	 // require('./increment')($);
		$.each(modules.module, function(i, module) {
			// 	var modulesRequire = require(module.main)($);
			require(__dirname + module).init();

		});
	}



	$(function (){
		//initApp();
	})



})();
