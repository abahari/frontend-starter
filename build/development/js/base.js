(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
	'use strict';

	var Counter = require('./increment');
    var mycounter = new Counter();
    var mycounter2 = new Counter();
	
	console.log(mycounter.increment()); 
	console.log(mycounter.increment()); 
	console.log(mycounter.increment()); 
	console.log(mycounter.increment()); 
	console.log(mycounter.increment()); 
	console.log(mycounter.increment()); 
	console.log(mycounter2.increment()); 
	console.log(mycounter2.increment());  
	console.log(mycounter2.increment()); 
	console.log(mycounter2.increment()); 
	console.log(mycounter2.increment()); 
	console.log(mycounter2.increment());
	console.log('it correct');
	
	

})();
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
},{"./increment":2}],2:[function(require,module,exports){
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
},{}]},{},[1])