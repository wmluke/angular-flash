// Karma configuration
// Generated on Mon Apr 15 2013 14:05:03 GMT-0700 (PDT)

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
    JASMINE,
    JASMINE_ADAPTER,
    'bower_components/jquery/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'src/**/*.js',
    'test/unit/**/*-spec.js'
];

//preprocessors = {
//    'src/**/*.js': 'coverage'
//};

// list of files to exclude
exclude = [

];

// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
//reporters = ['progress', 'coverage', 'junit'];
reporters = ['progress'];

//coverageReporter = {
//    type: 'html',
//    dir: 'coverage/'
//};

// web server port
port = 9876;

// cli runner port
runnerPort = 9100;

// enable / disable colors in the output (reporters and logs)
colors = true;

// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;

// enable / disable watching file and executing tests whenever any file changes
autoWatch = false;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;

// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;
