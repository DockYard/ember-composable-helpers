/* globals describe, it */
/* jshint node: true, esnext: false, expr: true */
/* jscs: disable */
'use strict';

var difference = require('../../lib/difference');
/* eslint-disable node/no-unpublished-require */
var expect = require('chai').expect;

describe('difference', function() {
  it('finds the difference between 2 arrays', function() {
    var a = ['foo', 'bar', 'baz'];
    var b = ['bar', 'baz', 'qux'];
    var expectedResult = ['foo'];
    var result = difference(a, b);

    expect(result).to.eql(expectedResult);
  });

  it('finds the difference between 2 arrays', function() {
    var a = ['foo', 'bar', 'baz'];
    var b = ['bar', 'baz', 'qux'];
    var expectedResult = ['qux'];
    var result = difference(b, a);

    expect(result).to.eql(expectedResult);
  });
});
/* jscs:enable */
