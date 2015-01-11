'use strict';

var BitNZClient = require('bitnz');

var SATOSHI_FACTOR = Math.pow(10,8);

var BitNZTrade = function(config) {
  this.client = new BitNZClient(config.bitnzKey, config.bitnzSecret, config.clientId);
  this._currency = config.currency || 'NZD';
  this._fudgeFactor = config.fudgeFactor;  
};

BitNZTrade.factory = function factory(config) {
  return new BitNZTrade(config);
};

// Public functions

BitNZTrade.prototype.balance = function balance(callback) {
  this.client.balance(function(err, json) {
    if (err) {
      return callback(err);
    }

    if (json.error) { 
      console.dir(json.error); // DEBUG
      return callback(new Error(json.error));
    }
    console.log(json);
    // jshint camelcase: false
    callback(null, parseFloat(json.nzd_available, 10));
    // jshint camelcase: true
  });
};

BitNZTrade.prototype.currency = function currency() {
  return this._currency;
};

BitNZTrade.prototype.purchase = function purchase(satoshis, currentPrice, callback) {
  console.log("fudge: ", this._fudgeFactor);
  
  var bitcoins = satoshis / SATOSHI_FACTOR;
  var price = currentPrice * this._fudgeFactor;
  var priceStr = price.toFixed(2);
  var amountStr = bitcoins.toFixed(8);
  this.client.orders_buy_create(function(err, json){
    if (err) {
      return callback(err);
    }

    if (json.error) {
      if (json.error.__all__) 
        if (json.error.__all__.isArray)
          return callback(new Error(json.error.__all__).join("; "));
        else
          return callback(new Error(json.error.__all__));
      return callback(new Error(json.error));
    }

    callback(err, json);
  }, amountStr, priceStr);
};

module.exports = BitNZTrade;
