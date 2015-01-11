'use strict';

var test = require('tap').test;
var Ticker = require('../lib/ticker').factory();

// Note: BitcoinAverage is rate limited. If you call the test more than once
// it will error.
test('Read ticker', function(t){
  Ticker.ticker(['NZD'], function(err, results) {
    t.plan(5 * 1 + 1);
    t.equal(err, null, 'There should be no error');
    for (var currency in results) {
      var result = results[currency];      
      t.notEqual(result, null, 'There should be a result');
      t.equal(result.error, undefined, 'The result should contain no error');
      t.equal(result.currency, currency, 'The result should be ' + currency);
      t.notEqual(result.rate, undefined, 'A rate should have been returned');
      t.ok(parseFloat(result.rate, 10), 'The rate should be a float');

    }
    t.end();      
  });
});

test('Read ticker just NZD', function(t){
  Ticker.ticker(['NZD'], function(err, results) {
    t.plan(5 * 1 + 1);
    t.equal(err, null, 'There should be no error');
    for (var currency in results) {
      var result = results[currency];
      t.notEqual(result, null, 'There should be a result');
      t.equal(result.error, undefined, 'The result should contain no error');
      t.equal(result.currency, currency, 'The result should be ' + currency);
      t.notEqual(result.rate, undefined, 'A rate should have been returned');
      t.ok(parseFloat(result.rate, 10), 'The rate should be a float');
    }
    t.end();      
  });
});

test('Read ticker just EUR', function(t){
  Ticker.ticker(['NZD'], function(err, results) {
    t.plan(5 * 1 + 1);  // Note: returns both EUR and USD
    t.equal(err, null, 'There should be no error');
    for (var currency in results) {
      var result = results[currency];
      t.notEqual(result, null, 'There should be a result');
      t.equal(result.error, undefined, 'The result should contain no error');
      t.equal(result.currency, currency, 'The result should be ' + currency);
      t.notEqual(result.rate, undefined, 'A rate should have been returned');
      t.ok(parseFloat(result.rate, 10), 'The rate should be a float');
    }
    t.end();      
  });
});

test('Read ticker with EUR, ILS', function(t){
  Ticker.ticker(['EUR', 'ILS'], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();      
  });
});

test('Read ticker with just ILS', function(t){
  Ticker.ticker(['ILS'], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();      
  });
});

test('Read ticker with empty array', function(t){
  Ticker.ticker([], function(err, results) {
    t.plan(1);
    t.ok(err, 'There should be an error');
    t.end();      
  });
});
