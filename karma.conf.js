module.exports = function(config){
  config.set({

    basePath : './',

    files : [

      'app/libs/bootstrap/dist/js/bootstrap.js',
      'app/libs/d3/d3.js',
      'app/libs/html5-boilerplate/js/vendor/modernizr-2.6.2.min.js',
      'app/libs/leaflet/dist/leaflet.js',
      'app/libs/three.js/index.js',
      'app/libs/OrbitControls/index.js',
      'app/libs/css-3d-renderer/index.js',
      'app/libs/ui-router/release/angular-ui-router.js',
      'app/libs/localCRUD/index.js'
      'app/libs/3l/3L/3L.less',
      'app/libs/angular/angular.js',
      'app/libs/angular-loader/angular-loader.js',
      'app/libs/angular-mocks/angular-mocks.js',
      'app/libs/angular-route/angular-route.js',
      'app/libs/html5-boilerplate/css/normalize.css',
      'app/libs/html5-boilerplate/css/main.css',
      'app/libs/jquery/dist/jquery.min.js',
      'app/libs/leaflet/dist/leaflet.css',
      'app/libs/bootstrap/dist/css/bootstrap.css',
      'app/libs/ui-router/release/angular-ui-router.js',
      'app/shared/three_module.js',
      'app/shared/country_module.js',
      'app/assets/**/*.*',
      'app/components/**/*.js',
      'app/view*/**/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
