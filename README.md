###version 0.0.0

*bob-angular is currently in ongoing development. It will progress to version 0.0.1 when all initial functionality, unit and end to end tests are in place.*

The sample application that is built from this code is viewable at 
[bob-angular][bobangular]. The client-side code can be seen at the 
[bob-angular-app][bobangularApp] repository.

This project is influenced by and borrows from [angular-seed][angularseed]. It uses [three.js][three] to provide a means to map 2D Web content to 3D space. It also contains an [express][express] server, with [node][node]-[postgres][postgres] backend.

The application is preconfigured to install the [Angular][angular] framework, three.js, and required third-party frameworks. The seed app contains video, [Leaflet][leaflet] map tiles, SVG and HTML content, built on top of [bootstrap][bootstrap], [JQuery][jquery], [less][less] and other familiar frameworks. It also includes unit and e2e tests. The application itself is built by grunt into the dist directory. It is built during the install process and can be seen at the bob-angular-app repository.

### Feedback and Blog

A blog is being launched at [https://bobangular.wordpress.com/][bobangularWP]
You must have [node.js][node] and its package manager ([npm][npm]) installed. All other dependencies
are managed by node through package.json, and then [bower][bower] through bower.json and [grunt][grunt]
through Gruntfile. You can get node and npm from [nodejs][node].

### Prerequisites

You must have [node.js][node] and its package manager ([npm][npm]) installed. All other dependencies
are managed by node through package.json, and then [bower][bower] through bower.json and [grunt][grunt]
through Gruntfile. You can get node and npm from [nodejs][node].

### Clone bob-angular

In the terminal, in the directory where you want to install the app, git clone the 
bob-angular repository. Then, run *npm start* to install and launch the node 
web server; or *npm install* to merely install the application dependencies without
launching the web server. 

*Permission issues may occur if the directory permission and user permissions are different.*

```
git clone https://github.com/KevinEverywhere/bob-angular.git
cd bob-angular
npm start 
```

### Install Dependencies

There are server-side, application and testing dependencies loaded in [npm][npm], 
the node package manager, and in the front-end development dependencies through 
[bower][bower], a client-side code package manager.

The npm install and npm start scripts will install two new directories, 
and then populate them with imported code:

* `node_modules` - contains the npm packages for the tools we need
* `app/libs` - contains the angular framework files

*The `libs` folder is put into the app folder  through the `.bowerrc` file when 
'bower install' is run.

### Distribute Code

The next step is handled internally: through Gruntfile, grunt selects the 
necessary files from app/libs and creates a directory structure child to the 
dist directory. The application run from app and dist/app are the same in 
function, but dist/app files are less than a quarter the size.

### Run the Application

The application should be testable in localhost:3000 by running _npm start_. 
If that port is already being used, look at the console to see which port 
that the application found available.

```
npm start
```

The app should now be running at <code>http://localhost:3000/</code> (or an alternative that was found to be available at runtime).

####Troubleshooting

_The most common errors with installation require nothing more than running the start or install commands two or more times._ 

The most typical problems in _npm start_ involve permission issues, availability of port, and software availability. The first thing I always try with node is running _npm start_ or _npm install_ more than once. If you are getting different errors when you install, it is because the installation process is still moving forward. Internal errors in a dependency can partially break an install. Try to avoid running as sudo, this is not usually required.

Ensure that you have the correct software installed to begin, and that the directory in which you are running npm start contains the bob-angular seed files. Consult your console, and Google, to take care of any issues unique to your system.

## Directory Layout

```
.bowerrc                               --> directs bower to load libs
.gitignore                             --> the files that are excluded
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
bower.json                             --> client-side libraries to install
exports.index.js                       --> express server for testing
Gruntfile.js                           --> Creates the files that go in dist
index.js                               --> express server 
karma.conf.js                          --> config file for Karma unit tests 
package.json                           --> instruction files for npm 
Procfile                               --> runs _node index.js_ on heroku
dist/                                  --> grunt-created after bower install
node_modules/                          --> created during install
tests/                                 --> supporting files for tests 
tests/e2e-tests/                       --> end-to-end tests


```

## Testing

All of the unit and E2E tests were written using the [Jasmine][jasmine] framework.

### Unit Tests

The [karma][karma] unit tests are set up in the components folders that they are associated with. Additional tests will be developed for services distinctly and throughout the app as opportunities are identified.

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

The E2E tests require two terminal windows to be open: one with the local server, the other for [protractor][protractor]. This is facilitated by first starting the server by entering the following into the terminal:

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
Some other scripts you may find useful once it is installed are:

```
node index.js            (for starting express server)
node exports.index.js    (express testing server, with instructions)
npm run launch-selenium  (for starting selenium server)

```

The test section, like the other parts of this experiment, is incomplete. It will include device and server combinations as they are ready for publishing.

The application uses a postgres database with one table and four fields. There is an SQL file at the URL below that can be used to create a table on your system if you want to have the postgres component function. Within the application, default text JSON is available for those without the database.

```
/app/assets/media/countries.sql
```


bob-angular is currently under constant development. As features are added and content explored, additional tests will be added to those currently included.

## Contact

For more information on bob-angular please contact kevin@planetkevin.com

[angular]: http://angularjs.org/
[angularseed]:https://github.com/angular/angular-seed
[three]: http://threejs.org/
[express]: http://expressjs.com/
[postgres]: http://www.postgresql.org/
[git]: http://git-scm.com/
[grunt]: http://gruntjs.com/
[bower]: http://bower.io
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[less]: http://lesscss.org/
[bootstrap]:http://getbootstrap.com/
[jquery]: http://jquery.org/
[leaflet]:http://leafletjs.com/
[protractor]: https://github.com/angular/protractor
[jasmine]: http://jasmine.github.io
[karma]: http://karma-runner.github.io
[bobangular]: http://bob-angular.herokuapp.com/
[bobangularApp]:https://github.com/KevinEverywhere/bob-angular-app
[bobangularWP]:https://bobangular.wordpress.com/

