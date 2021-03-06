exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  allScriptsTimeout: 30000,
  specs: [
    'scenarios.js'
  ],

  // Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
  capabilities: {
    browserName: 'safari',
    'appium-version': '1.0',
    platformName: 'iOS',
    platformVersion: '7.1',
    deviceName: 'iPad Simulator',
  },
  baseUrl: 'http://localhost:3000/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    showColors: true,
    isVerbose: true,
    defaultTimeoutInterval: 30000
  },

  // configuring wd in onPrepare
  // wdBridge helps to bridge wd driver with other selenium clients
  // See https://github.com/sebv/wd-bridge/blob/master/README.md
  onPrepare: function () {
  //  browser.driver.manage().window().setSize(800,600);
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }
};

