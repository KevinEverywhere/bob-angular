# bob-angular — A D3-Three seed for AngularJS apps

This project is an application skeleton, influenced by and forked from angular-seed,
[https://github.com/angular/angular-seed](https://github.com/angular/angular-seed)
It provides a Three D metaphor with sample page and use scenarios.

The application is preconfigured to install the Angular framework, three.js, d3, less,
and required third-party frameworks. The seed app provides navigation and transition 
functionality, API-powered 3D content panes, as well as development and testing tools.

### Prerequisites

You must have node.js and its package manager (npm) installed. All other dependencies
are managed by node through package.json, and then bower thrugh bower.json. You can 
get node and npm from [http://nodejs.org/](http://nodejs.org/).

### Clone bob-angular

In the terminal, in the directory where you want to install the app, git clone the 
bob-angular repository. Then, run *npm start* to install and launch the node 
web server; or *npm install* and *bower install* to merely install the application
dependencies. 

In the terminal, in the directory where you want to install the app, git clone the 
bob-angular repository. Then, run *npm start* to install and launch the node 
web server; or *npm install* and *bower install* to merely install the application
dependencies. 

*Permission issues may occur if the directory permission and user permissions are different*

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

*The `libs` folder is put into the app folder  through the `.bowerrc` file.

### Run the Application

The application can be tested in localhost:8000 by running npm start

```
npm start
```

The app should now be running at `http://localhost:8000/app/`. The most typical
problems in npm start involve permission issues and software availability. Ensure
that you have the correct software installed to begin, and that the directory in
which you are running npm start contains the bob-angular seed files. This directory
will 


## Directory Layout

```
app/                                   --> all of the source files for the application
  assets/                              --> asset and creation media, CSS JS, JSON files
    css, js, media
  components/                          --> view or feature based components
    footer, main, media, navigation    --> view components
    youtube, googlemap                 --> feature (vendor) based components
  shared/                              --> feature based shared components (services)
    three_module                       --> angular three service used by view pontts 
  libs/                                --> the repository for bower installed JS files
    3l, angular, bootstrap, three.js,  --> bower-maintained source files created after
    jquery, less, ui-router, others        running 'npm start' or 'bower install' 
  app.js                               --> main application module
  index.html                           --> the entrace point to the app.
TODO:
  index-async.html                     --> index.html with asynchronous JavaScript loads
karma.conf.js                          --> config file for running unit tests with Karma
e2e-tests/                             --> end-to-end tests
```

## Testing

There will be two kinds of tests in the bob-angular seed application: Unit tests and End to End tests.

This section will be expanded as the content is updated and made available for view and testing.

## Contact

For more information on bob-angular please contact kevin@planetkevin.com

[angular]: http://angularjs.org/
[git]: http://git-scm.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[travis]: https://travis-ci.org/
[http-server]: https://github.com/nodeapps/http-server
