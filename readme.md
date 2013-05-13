# angular-flash

A flash service and directive for setting and displaying flash messages in [Angular JS](http://angularjs.org).  Specifically, the flash service is a publisher of flash messages and the flash directive is a subscriber to flash messages.  The flash directive leverages the Twitter Bootstrap Alert component.

### Installation

Load the `angular-flash.service` and the `angular-flash.bootstrap-directive` modules in your app.

```javascript
angular.module('app', ['angular-flash.service', 'angular-flash.bootstrap-directive']);
```

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