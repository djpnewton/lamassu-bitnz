'use strict';

var BitNZTickerClient = require('bitnz');
var async = require('async');

var BitNZTicker = function() {
  this.client = new BitNZTickerClient();
};

BitNZTicker.factory = function factory() {
  return new BitNZTicker();
};

function fetchNZD(client, callback) {
  client.ticker(function (err, res) {
    if (err) return callback(err);
    callback(null, {NZD: {currency: 'NZD', rate: res.ask}});
  });
}

BitNZTicker.prototype.ticker = function ticker(currencies, callback) {
  if (currencies.length > 1) return callback(new Error('Unsupported currencies.'));

  var currency = currencies[0];
  if (currency === 'NZD')
    return fetchNZD(this.client, callback);
};

module.exports = BitNZTicker;
