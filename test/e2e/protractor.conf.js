exports.config = {
  allScriptsTimeout: 15000,
  specs: [
    'scenarios.js'
  ],
  onPrepare:function(){
    browser.driver.manage().window().setSize(800,600);
  },
  directConnect: true,
  chromeDriver: '../../node_modules/protractor/selenium/chromedriver',
  firefoxDriver: '../../node_modules/protractor/selenium/chromedriver',
    
  /*
  chromeDriver: '../../node_modules/chromedriver/bin/chromedriver',
  */

  multiCapabilities: [{
      'browserName' : 'chrome'
    },{
      'browserName' : 'firefox'
    }
  ],
  baseUrl: 'http://localhost:3000/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    defaultTimeoutInterval: 60000
  }
};
