(function () {
	'use strict';

	//var $ = require('jquery');

	function CreateCounter () {
		this.index = 0;
	}
	

	CreateCounter.prototype.increment = function () {
	  return this.index++
	};

	//console.log($);


	// PUBLIC MODULE
    // -------------

    // Expose the following interface:

    module.exports = CreateCounter; 



})();