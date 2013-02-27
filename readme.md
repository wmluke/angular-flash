# angular-common

Some common Angular JS directives and services that I reuse across my various projects.

## Flash

A flash service and directive for setting and displaying flash messages.  Specifically, the flash service is a publisher of flash messages and the flash directive is a subscriber to flash messages.  The flash directive leverages the Twitter Bootstrap Alert component.

### Usage

```html
<!-- Subscribe to flash messages. -->
<div flash class="alert" style="display:none;">
    <strong class="alert-heading">{{flash.heading}}</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

```

```javascript

var FooController = function(flash){
    // Publish a success flash
    flash.success = 'Do it live!';
};

FooController.$inject = ['flash'];

```

#### Flash Service API

##### Properties
Set and get flash messages with the following flash properties...

* success
* info
* warn
* error

##### Methods

subscribe:
    Register a subscriber function to be notified of flash messages.

### Installation

Load the `angular-common.bootstrap-directives` and the `angular-common.flash-service` modules in your app.

```javascript
angular.module('app', ['angular-common.bootstrap-directives', 'angular-common.flash-service']);
```

## startInterval

The `startInterval` service provides an Angular aware interval.

### Usage

```javascript

var FooController = function ($scope, startInterval, SomeFeed, $timeout) {

    $scope.items = [];
    $scope.count = 0;
    $scope.elapsed = 0;

    /**
     * Create and start an interval to load feed items every 2 seconds.
     */
    var _interval = startInterval(function (count, elapsed) {
        SomeFeed.findAll()
            .success(function (items) {
                // Angular ready: No need for $apply
                $scope.items = items;
                $scope.count = count;
                $scope.elapsed = elapsed;
            })
            .error(function () {
                // Stop the interval and restart it in 5 seconds.
                _interval.run = false;
                $timeout(function () {
                    _interval.run = true;
                }, 5000);
            });
    }, 2000);

    /**
     * Be sure to stop the interval when the current scope is destroyed.
     */
    $scope.$on('$destroy', function () {
        if (_interval && _interval.run) {
            _interval.run = false;
        }
    });
};

FooController.$inject = ['$scope', 'startInterval', 'SomeFeed', '$timeout'];

```

### Installation

Load the `angular-common.interval-service` module in your app.

```javascript
angular.module('app', ['angular-common.interval-service']);
```