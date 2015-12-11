(function () {
  'use strict';

  //var $ = require('jquery');
  // init
  CreateCounter.index = 0;


  function CreateCounter  () {

  }

  function privateFn() {
    // un traitement X mais seulement dans ce module
  }


  CreateCounter.prototype.increment = function () {
    return ++CreateCounter.index
  };

  //console.log($);


  // init module
  CreateCounter.prototype.init = function () {
    console.log(CreateCounter.prototype.increment());
  };

  // PUBLIC MODULE
    // -------------

    // Expose the following interface:

  module.exports = CreateCounter




})();
