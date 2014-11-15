exports.config = {
  seleniumAddress: 'http://localhost:4723/wd/hub',

  specs: [
    'basic/*_spec.js'
  ],

  // Reference: https://github.com/appium/sample-code/blob/master/sample-code/examples/node/helpers/caps.js
  capabilities: {
    browserName: 'safari',
    'appium-version': '1.0',
    platformName: 'iOS',
    platformVersion: '7.1',
    deviceName: 'IPad Simulator',
  },

  baseUrl: 'http://localhost:8000',

  // configuring wd in onPrepare
  // wdBridge helps to bridge wd driver with other selenium clients
  // See https://github.com/sebv/wd-bridge/blob/master/README.md
  onPrepare: function () {
    var wd = require('wd'),
      protractor = require('protractor'),
      wdBridge = require('wd-bridge')(protractor, wd);
    wdBridge.initFromProtractor(exports.config);
  }
};