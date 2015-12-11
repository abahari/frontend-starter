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