# ember-functional-helpers [![Build Status](https://travis-ci.org/DockYard/ember-functional-helpers.svg?branch=master)](https://travis-ci.org/DockYard/ember-functional-helpers) [![npm version](https://badge.fury.io/js/ember-functional-helpers.svg)](https://badge.fury.io/js/ember-functional-helpers) [![Ember Observer Score](http://emberobserver.com/badges/ember-functional-helpers.svg)](http://emberobserver.com/addons/ember-functional-helpers)

Functional helpers for Ember.

```no-highlight
ember install ember-functional-helpers
```

## Usage

### Pipe
Pipes the return values of actions in a sequence of actions.

```hbs
<button {{action (pipe addToCart purchase redirectToThankYouPage) item}}>
  1-Click Buy
</button>
```

### Map By
Maps an array on a property.

```hbs
{{#each (map-by users "fullName") as |name|}}
  {{name}}
{{/each}}
```

### Sort By
Sort an array by given properties.

```hbs
{{#each (sort-by users "lastName" "firstName") as |user|}}
  {{user.lastName}}, {{user.firstName}}
{{/each}}
```

You can append `:desc` to properties to sort in reverse order.

```hbs
{{#each (sort-by users "age:desc") as |user|}}
  {{user.firstName}} {{user.lastName}} ({{user.age}})
{{/each}}
```

### Filter By
Filters an array on a property.

```hbs
{{#each (filter-by users "isActive" true) as |user|}}
  {{user.name}} is active!
{{/each}}
```

If you omit the third argument it will test if the property is truthy.
```hbs
{{#each (filter-by users "address") as |user|}}
  {{user.name}} has an address specified!
{{/each}}
```

You can also pass an action as third argument:
```hbs
{{#each (filter-by users age (action "olderThan" 18)) as |user|}}
  {{user.name}} is older than eighteen!
{{/each}}
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
