###version 0.0.0

*This is in development and is not recommended to develop with as a base until version 0.0.1. You can still look under the hood to see how things work by following the installation process.*

The sample application that is built from this code is viewable at 
[bob-angular](http://bob-angular.herokuapp.com/)

This project is an application skeleton, influenced by and forked from angular-seed,
[https://github.com/angular/angular-seed](https://github.com/angular/angular-seed)
It uses three.js [http://threejs.org/] to provide a means to map 2D Web content to 3D space. 

The application is preconfigured to install the Angular framework, three.js, and required third-party frameworks. The seed app contains video, Leaflet map tiles, SVG and HTML content, built on top of bootstrap, JQuery, less and other familiar frameworks. It also includes unit and e2e tests.

### Prerequisites

You must have node.js and its package manager (npm) installed. All other dependencies
are managed by node through package.json, and then bower through bower.json. You can 
get node and npm from [http://nodejs.org/](http://nodejs.org/).

### Clone bob-angular

In the terminal, in the directory where you want to install the app, git clone the 
bob-angular repository. Then, run *npm start* to install and launch the node 
web server; or *npm install* and *bower install* to merely install the application
dependencies. 

*Permission issues may occur if the directory permission and user permissions are different.*

```
git clone https://github.com/KevinEverywhere/bob-angular.git
cd bob-angular
npm start 
```

### Install Dependencies

There are server-side, application and testing dependencies loaded in  `npm`, 
the [node package manager][npm], and in the front-end development dependencies
through `bower`, a [client-side code package manager][bower].

The npm install and npm start scripts will install two new directories, 
and then populate them with imported code:

* `node_modules` - contains the npm packages for the tools we need
* `app/libs` - contains the angular framework files

*The `libs` folder is put into the app folder  through the `.bowerrc` file when 
'bower install' is run.

### Run the Application

The application should be testable in localhost:3000 by running _npm start_. If that port is already being used, look at the console to see which port that the application found available.

```
npm start
```

The app should now be running at <code>http://localhost:3000/</code> (or an alternative that was found to be available at runtime).

####Troubleshooting
The most typical problems in _npm start_ involve permission issues, availability of port, and software availability. Ensure that you have the correct software installed to begin, and that the directory in which you are running npm start contains the bob-angular seed files. Consult your console, and Google, to take care of any issues unique to your system.

## Directory Layout

```
index.js                               --> the file containing the webserver
app/                                   --> application source files
  assets/                              --> media, CSS JS, JSON assets
    css, js, media
  components/                          --> view or feature based components
    footer, main, context, navigation  --> view components
    youtube, leaflet, svg              --> feature (vendor) based components
  shared/                              --> feature based shared services
    three_module, country_module        
  libs/                                --> repository for bower-created 
    3l, angular, bootstrap, three.js,      source files from 'npm start' or  
    jquery, less, ui-router, others        'bower install' 
  app.js                               --> main application module
  index.html                           --> the entrace point to the app.
karma.conf.js                          --> config file for Karma unit tests 
TODO:
  index-async.html                     --> index.html with asynchronous loads
e2e-tests/                             --> end-to-end tests
```

## Testing

There will be two kinds of tests in the bob-angular seed application: Unit tests and End to End tests.

This section will be expanded as the content is updated and made available for view and testing.

## Contact

For more information on bob-angular please contact kevin@planetkevin.com

[angular]: http://angularjs.org/
[three]: http://threejs.org/
[express]: http://expressjs.com/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[less]: http://lesscss.org/
[leaflet]:http://leafletjs.com/
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/


