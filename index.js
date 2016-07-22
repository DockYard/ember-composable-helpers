/* jshint node: true, esnext: false */
/* jscs: disable */
'use strict';

var Funnel = require('broccoli-funnel');
var path = require('path');
var intersection = require('./lib/intersection');
var difference = require('./lib/difference');

module.exports = {
  name: 'ember-composable-helpers',

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    if (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    this.app = app;
    this.app.options = this.app.options || {};

    var config = this.app.options[this.name] || {};
    this.whitelist = this.generateWhitelist(config);
    this.blacklist = this.generateBlacklist(config);
  },

  treeForAddon: function() {
    // see: https://github.com/ember-cli/ember-cli/issues/4463
    var tree = this._super.treeForAddon.apply(this, arguments);
    return this.filterHelpers(tree, new RegExp('^modules\/' + this.name + '\/helpers\/', 'i'));
  },

  filterHelpers: function(tree, regex) {
    var whitelist = this.whitelist;
    var blacklist = this.blacklist;
    var _this = this;

    // exit early if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      return new Funnel(tree);
    }

    return new Funnel(tree, {
      exclude: [function(name) {
        return _this.exclusionFilter(name, regex, {
          whitelist: whitelist,
          blacklist: blacklist
        });
      }]
    });
  },

  exclusionFilter: function(name, regex, lists) {
    var whitelist = lists.whitelist || [];
    var blacklist = lists.blacklist || [];
    var isAddonHelper = regex.test(name);
    var helperName = path.basename(name, '.js');
    var isWhitelisted = whitelist.indexOf(helperName) !== -1;
    var isBlacklisted = blacklist.indexOf(helperName) !== -1;

    // non-helper, don't exclude
    if (!isAddonHelper) {
      return false;
    }

    // don't exclude if both lists are empty
    if (whitelist.length === 0 && blacklist.length === 0) {
      return false;
    }

    // don't exclude if both whitelisted and blacklisted
    if (isWhitelisted && isBlacklisted) {
      return false;
    }

    // only whitelist defined
    if (whitelist.length && blacklist.length === 0) {
      return !isWhitelisted;
    }

    // only blacklist defined
    if (blacklist.length && whitelist.length === 0) {
      return isBlacklisted;
    }

    return !isWhitelisted || isBlacklisted;
  },

  generateWhitelist: function(addonConfig) {
    var only = addonConfig.only || [];
    var except = addonConfig.except || [];

    if (except && except.length) {
      return difference(only, except);
    }

    return only;
  },

  generateBlacklist: function(addonConfig) {
    var only = addonConfig.only || [];
    var except = addonConfig.except || [];

    if (only && only.length) {
      return intersection(except, only);
    }

    return except;
  }
};
/* jscs: enable */
