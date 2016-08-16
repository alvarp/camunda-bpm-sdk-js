'use strict';

var Q = require('q');
var AbstractClientResource = require('./../abstract-client-resource');

/**
 * No-Op callback
 */
function noop() {}


/**
 * Message Resource
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var Message = AbstractClientResource.extend();

/**
 * Path used by the resource to perform HTTP queries
 * @type {String}
 */
Message.path = 'message';

/**
 * Deliver a message with the given params
 */
Message.deliver = function(data, done) {
  return this.http.post(this.path, {
    data: data,
    done: done
  });
};

module.exports = Message;