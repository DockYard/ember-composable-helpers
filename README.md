# ember-functional-helpers [![Build Status](https://travis-ci.org/DockYard/ember-functional-helpers.svg?branch=master)](https://travis-ci.org/DockYard/ember-functional-helpers) [![npm version](https://badge.fury.io/js/ember-functional-helpers.svg)](https://badge.fury.io/js/ember-functional-helpers)

Functional helpers for Ember.

```no-highlight
ember install ember-functional-helpers
```

## Usage

### Compose
Composes two actions in the form of `(f ∘ g)(x)`. Each action must return a value.

```hbs
<button {{action (compose save createNewItem) "Foo"}}>
  Create and save item
</button>
```

### Pipe
Pipes the return values of actions in a sequence of actions. 

```hbs
<button {{action (pipe addToCart purchase redirectToThankYouPage) item}}>
  1-Click Buy
</button>
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Legal

[DockYard](http://dockyard.com/ember-consulting), Inc &copy; 2016

[@dockyard](http://twitter.com/dockyard)

[Licensed under the MIT license](http://www.opensource.org/licenses/mit-license.php)
