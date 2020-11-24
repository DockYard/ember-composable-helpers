/* globals describe, it */
/* jshint node: true, esnext: false, expr: true */
/* jscs: disable */
'use strict';

var addonIndex = require('../index');
/* eslint: disable */
/* eslint-disable node/no-unpublished-require */
var expect = require('chai').expect;

describe('index', function() {
  describe('#exclusionFilter', function() {
    it('should return `true` if a file is in the blacklist', function() {
      var name = 'range';
      var dummyRegex = new RegExp('.*');
      var lists = {
        blacklist: ['range', 'inc']
      };
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.true;
    });

    it('should return `false` if a file is not in the blacklist', function() {
      var name = 'pipe';
      var dummyRegex = new RegExp('.*');
      var lists = {
        blacklist: ['range', 'inc']
      };
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `false` if a file is in the whitelist', function() {
      var name = 'range';
      var dummyRegex = new RegExp('.*');
      var lists = {
        whitelist: ['range', 'inc']
      };
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `true` if a file is not in the whitelist', function() {
      var name = 'range';
      var dummyRegex = new RegExp('.*');
      var lists = {
        whitelist: ['inc']
      };
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.true;
    });

    it('should return `false` if a file is in both the whitelist and blacklist', function() {
      var name = 'range';
      var dummyRegex = new RegExp('.*');
      var lists = {
        blacklist: ['range'],
        whitelist: ['range', 'inc']
      };
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });

    it('should return `false` if both lists are empty', function() {
      var name = 'range';
      var dummyRegex = new RegExp('.*');
      var lists = {};
      var result = addonIndex.exclusionFilter(name, dummyRegex, lists);

      expect(result).to.be.false;
    });
  });

  describe('#generateWhitelist', function() {
    it('should return files to whitelist when both `only` and `expect` are defined' , function() {
      var dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec'],
        except: ['inc']
      };
      var expectedResult = ['range', 'pipe', 'dec'];
      var result = addonIndex.generateWhitelist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });

    it('should return files to whitelist when `only` is defined' , function() {
      var dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec']
      };
      var expectedResult = ['range', 'pipe', 'inc', 'dec'];
      var result = addonIndex.generateWhitelist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });
  });

  describe('#generateBlacklist', function() {
    it('should return files to blacklist when both `only` and `expect` are defined' , function() {
      var dummyConfig = {
        only: ['range', 'pipe', 'inc', 'dec'],
        except: ['inc']
      };
      var expectedResult = ['inc'];
      var result = addonIndex.generateBlacklist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });

    it('should return files to blacklist when `except` is defined' , function() {
      var dummyConfig = {
        except: ['range', 'pipe', 'inc', 'dec']
      };
      var expectedResult = ['range', 'pipe', 'inc', 'dec'];
      var result = addonIndex.generateBlacklist(dummyConfig);

      expect(result).to.eql(expectedResult);
    });
  });
});
/* jscs:enable */
