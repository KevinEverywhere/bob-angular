module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/libs/angular/angular.js',
      'app/app.js',
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/bootstrap/dist/js/bootstrap.js',
      'app/libs/d3/d3.js',
      'app/libs/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
      'app/libs/leaflet/dist/leaflet.js',
      'app/libs/three.js/index.js',
      'app/libs/OrbitControls/index.js',
      'app/libs/css-3d-renderer/index.js',
      'app/libs/ui-router/release/angular-ui-router.js',
      'app/libs/localCRUD/index.js',
      'app/libs/angular-loader/angular-loader.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/libs/angular-route/angular-route.js',
      'app/shared/d3_module.js',
      'app/shared/three_module.js',
      'app/shared/country_module.js',
      'app/libs/less/dist/less-1.7.0.min.js',
      'app/libs/html5-boilerplate/css/normalize.css',
      'app/libs/html5-boilerplate/css/main.css',
      'app/libs/leaflet/dist/leaflet.css',
      'app/libs/bootstrap/dist/css/bootstrap.css',
      'app/assets/js/startup.js',
   /*   'app/assets/js/world.json', */
      'app/components/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],


    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-html2js-preprocessor'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
