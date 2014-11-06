'use strict';

describe('bobApp.context', function() {

  beforeEach(module('bobApp.context'));

  describe('context controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var threeContextController =  new Date(); // $controller('ThreeContextController');
      expect(threeContextController).toBeDefined();
    }));

  });
});