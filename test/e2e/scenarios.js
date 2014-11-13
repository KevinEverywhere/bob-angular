'use strict';

describe('bobApp', function() {
  var ptor;

  browser.get('http://localhost:3000/');
  ptor = protractor.getInstance();

  describe('bobApp.navigation', function() {
    it('should have #navigation in the main window', function() {
       var ele = element(by.css('#navigation'));
       expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.footer', function() {
    it('should have #footer in the main window', function() {
       var ele = element(by.css('#footer'));
       expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });
  
  describe('bobApp.context', function() {
    it('should have #context in the main window', function() {
       var ele = element(by.css('#context'));
       expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.main', function() {
    it('should have #main in the main window', function() {
      var _link=element(by.binding("homeLink"));
      _link.click();
      var ele = element(by.css('#main'));
      expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.youtube', function() {
    it('should have #youtube in the main window', function() {
      var _link=element(by.binding("videoLink"));
      _link.click();
      var ele = element(by.css('#youtube'));
      expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.leaflet', function() {
    it('should have #leaflet in the main window', function() {
      var _link=element(by.binding("mapLink"));
      _link.click();
       var ele = element(by.css('#leaflet'));
       expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.svg', function() {
    it('should have #svg in the main window', function() {
      var _link=element(by.binding("svgLink"));
      _link.click();
       var ele = element(by.css('.svgDiv'));
       expect(ptor.isElementPresent(ele)).toBe(true);
    });
  });

});
