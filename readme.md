# angular-common

Some of my common Angular JS directives and services that I reuse across my various projects.

## Flash

A flash service and directive for setting a displaying flash messages.  Specifically, the flash service is a publisher of flash messages and the flash directive is a subscriber to flash messages.  The flash directive leverages the Twitter Bootstrap Alert component.

### Usage

```html
<!-- Bootstrap alert -->
<div class="alert" style="display:none;" flash>
    <strong class="alert-heading">{{flash.heading}}</strong>
    <span class="alert-message">{{flash.message}}</span>
</div>

```

```javascript

var FooController = function(flash){
    // Send a success flash
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

Include the `angular-common.flash-service` module in your app.

```javascript
    angular.module('app', ['angular-common.flash-service']);
```