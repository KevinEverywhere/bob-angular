
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    '*.js'
  ],
  onPrepare:function(){
    browser.driver.manage().window().setSize(800,600);
  },


  directConnect: true,
  chromeDriver: '../../node_modules/protractor/selenium/chromedriver',

  multiCapabilities: [

      {
        'browserName' : 'chrome'
      }, 
      {
        'browserName' : 'firefox'
      }
    ],
/*
  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:3000/',*/
  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    defaultTimeoutInterval: 30000
  }
};
