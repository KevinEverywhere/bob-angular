###version 0.0.0

*This is in development and is not recommended to develop with as a base until version 0.0.1. You can still look under the hood to see how things work by following the installation process.*

The sample application that is built from this code is viewable at 
[bob-angular](http://bob-angular.herokuapp.com/)

This project is an application skeleton, influenced by and forked from [angular-seed](https://github.com/angular/angular-seed). It uses [three.js](http://threejs.org/) to provide a means to map 2D Web content to 3D space. 

The application is preconfigured to install the Angular framework, three.js, and required third-party frameworks. The seed app contains video, Leaflet map tiles, SVG and HTML content, built on top of bootstrap, JQuery, less and other familiar frameworks. It also includes unit and e2e tests.

### Prerequisites

You must have node.js and its package manager (npm) installed. All other dependencies
are managed by node through package.json, and then bower through bower.json. You can 
get node and npm from [nodejs](http://nodejs.org/).

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
tests/                                 --> supporting files for tests 
e2e-tests/                             --> end-to-end tests
```

## Testing

### Unit Tests

The karma unit tests are set up in the components folders that they are associated with. Additional tests will be developed for services distinctly and throughout the app as opportunities are identified.

Sample file and location:

```
app/components/footer/footer.html
                      footer.js
                      footer_test.js
```

In the example above, the footer_test file contains the actual karma tests that are run.  To run the unit tests, enter the following into the terminal:

```
npm test
```

### E2E Tests                      

The E2E tests require two terminal windows to be open: one with the local server, the other for protractor. This is facilitated by first starting the server by entering the following into the terminal:

```
npm start
```
This window will launch an express server at localhost:3000. If this port is not available, you may need to edit exports.index.js. The console will give you a message to start the actual protractor in a new terminal window. From the same directory where you launched the server, bob-angular, enter:

```
npm run protractor
```

The results of the tests will be given in the second console window after running the script.


### One Script for Unit and E2E Tests

A streamlined testing mechanism is available through entering the following command at the root of the repository:

```
npm run fulltest
```
This will run the unit tests first and then launch the server for protractor e2e testing in a second window. The e2e component requires you to open a new window while the server is running in the original window. From the same directory where you launched the server, bob-angular, enter:

```
npm run protractor
```

The e2e testing will be expanded soon to iOS and other devices. 

This software is dynamic and will be evolving. As features are added, they will be associated with test files and methods as needed.

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


