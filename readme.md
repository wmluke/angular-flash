# angular-flash

A flash service and directive for setting and displaying flash messages in [Angular JS](http://angularjs.org).  Specifically, the flash service is a publisher of flash messages and the flash directive is a subscriber to flash messages.  The flash directive leverages the Twitter Bootstrap Alert component.

## Installation

Load the `angular-flash.service` and the `angular-flash.bootstrap-directive` modules in your app.

```javascript
angular.module('app', ['angular-flash.service', 'angular-flash.flash-alert-directive']);
```

## Usage

Use the `flash` service to publish a flash messages...

```javascript

var FooController = function(flash){
    // Publish a success flash
    flash.success = 'Do it live!';

    // Publish a error flash
    flash.error = 'Fail!';
};

FooController.$inject = ['flash'];

```

Use the `flash-alert` directive to subscribe to flash messages...

```html
<!-- Subscribe to success flash messages. -->
<div flash-alert="success" flash-alert-active="in" class="alert fade" style="display:none;">
    <strong class="alert-heading">Congrats!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Subscribe to error flash messages. -->
<div flash-alert="error" class="alert" style="display:none;">
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

<!-- Subscribe to all flash messages. -->
<div flash-alert class="alert" style="display:none;">
    <strong class="alert-heading">Boo!</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

```

When a flash message is published, the `flash-alert` directive will add a class of the form `alert-<type>`, add classes specified in `flash-alert-active`, and then show the element for 5 seconds.

### Flash Service API

#### Properties
Set and get flash messages with the following flash properties...

* success
* info
* warn
* error

#### Methods

subscribe:
    Register a subscriber callback function to be notified of flash messages.  The subscriber function has two arguments: `message` and `type`.