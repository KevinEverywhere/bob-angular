'use strict';

describe('bobApp', function() {
console.log("describing bobapp");

  browser.get('http://localhost:3000/#/');

  browser.waitForAngular(
    function(){
      console.log("angular ready")
    }
    );

  describe('bobApp.navigation', function() {
    console.log("GOT HERE");
    it('should have by id #navigation in the main window', function() {
       var ele = element(by.id('navigation'));
       expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.footer', function() {
    it('should have by id #footer in the main window', function() {
       var ele = element(by.id('footer'));
       expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.context', function() {
    it('should have #context in the main window', function() {
       var ele = element(by.css('#context'));
       expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.main', function() {
    it('should have #main in the main window', function() {
      var _link=element(by.id("homeLink"));
      _link.click();
      var ele = element(by.css('#main'));
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.youtube', function() {
    it('should have #youtube in the main window', function() {
      var _link=element(by.id("videoLink"));
      _link.click();
      var ele = element(by.css('#youtube'));
      expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.leaflet', function() {
    it('should have #leaflet in the main window', function() {
      var _link=element(by.id("mapLink"));
      _link.click();
       var ele = element(by.css('#leaflet'));
       expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

  describe('bobApp.svg', function() {
    it('should have #svg in the main window', function() {
      var _link=element(by.id("svgLink"));
      _link.click();
       var ele = element(by.css('.svgDiv'));
       expect(browser.isElementPresent(ele)).toBe(true);
    });
  });

});
