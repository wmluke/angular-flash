# angular-flash

[![Build Status](https://travis-ci.org/wmluke/angular-flash.png?branch=master)](https://travis-ci.org/wmluke/angular-flash)

A flash service and directive for setting and displaying flash messages in [Angular JS](http://angularjs.org).  Specifically, the flash service is a publisher of flash messages and the flash directive is a subscriber to flash messages.  The flash directive leverages the Twitter Bootstrap Alert component.

## Installation

Download [angular-flash.min.js](https://github.com/wmluke/angular-flash/blob/master/dist/angular-flash.min.js) or install with bower.

```bash
$ bower install angular-flash --save
```

Load the `angular-flash.service` and the `angular-flash.flash-alert-directive` modules in your app.

```javascript
angular.module('app', ['angular-flash.service', 'angular-flash.flash-alert-directive']);
```

## Configure

```javascript
angular.module('app', ['angular-flash.service', 'angular-flash.flash-alert-directive']).config(function (flashProvider) {
        .config(function (flashProvider) {
        
            // Support bootstrap 3.0 "alert-danger" class with error flash types
            flashProvider.errorClassnames.push('alert-danger');

            /**
             * Also have...
             *
             * flashProvider.warnClassnames
             * flashProvider.infoClassnames
             * flashProvider.successClassnames
             */

        })
})
```

## Usage

Use the `flash` service to publish a flash messages...

```javascript

var FooController = function(flash){
    // Publish a success flash
    flash.success = 'Do it live!';

    // Publish a error flash
    flash.error = 'Fail!';

    // Publish an info flash to the `alert-1` subscriber
    flash.to('alert-1').info = 'Only for alert 1';
};

FooController.$inject = ['flash'];

```

Use the `flash-alert` directive to subscribe to flash messages...

```html
<!-- Subscribe to success flash messages. -->
<div flash-alert="success" active-class="in" class="alert fade">
    <strong class="alert-heading">Congrats!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Subscribe to error flash messages. -->
<div flash-alert="error" active-class="in" class="alert fade">
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Subscribe to all flash messages. -->
<div flash-alert active-class="in" class="alert fade">
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Subscribe to all flash messages sent to `alert-1`. -->
<div id="alert-1" flash-alert active-class="in" class="alert fade">
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Set the display duration in milli-secs.  Default is 5000, 0 disables the fade-away. -->
<div flash-alert active-class="in" class="alert fade" duration="0">
    <!-- Manually hide the alert with `hide()` -->
    <button type="button" class="close" ng-click="hide()">&times;</button>
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>
```

When a flash message is published, the `flash-alert` directive will add a class of the form `alert-<type>` and also add classes specified in `active-class`.  Then after 5 seconds it will remove them.

The example above leverages Twitter Bootstrap CSS3 transitions: `fade` and `in`.

### FlashProvider API

```javascript
flashProvider.errorClassnames
flashProvider.warnClassnames
flashProvider.infoClassnames
flashProvider.successClassnames
```

### Flash Service API

#### Properties
Set and get flash messages with the following flash properties...

* success
* info
* warn
* error

#### Methods

##### subscribe(listener, [type])
Register a subscriber callback function to be notified of flash messages.  The subscriber function has two arguments: `message` and `type`.

##### clean()
Clear all subscribers and flash messages.

## Contributing

### Prerequisites

The project requires [Bower](http://bower.io), [Grunt](http://gruntjs.com), and [PhantomJS](http://phantomjs.org).  Once you have installed them, you can build, test, and run the project.

### Build & Test

To build and run tests, run either...

```bash
$ make install
```

or

```bash
$ npm install
$ bower install
$ grunt install
```

### Demo & Develop

To run a live demo or do some hackery, run...

```bash
$ grunt server
```
