'use strict';

var AbstractClientResource = require('./../abstract-client-resource');

/**
 * Process Instance Resource
 *
 * @class
 * @memberof CamSDK.client.resource
 * @augments CamSDK.client.AbstractClientResource
 */
var ProcessInstance = AbstractClientResource.extend(
/** @lends  CamSDK.client.resource.ProcessInstance.prototype */
  {

  },

/** @lends  CamSDK.client.resource.ProcessInstance */
  {
  /**
   * API path for the process instance resource
   */
    path: 'process-instance',

  /**
   * Retrieve a single process instance
   *
   * @param  {uuid}     id    of the process instance to be requested
   * @param  {Function} done
   */
    get: function(id, done) {
      return this.http.get(this.path +'/'+ id, {
        done: done
      });
    },


  /**
   * Creates a process instance from a process definition
   *
   * @param  {Object}   params
   * @param  {String}   [params.id]
   * @param  {String}   [params.key]
   * @param  {Object.<String, *>} [params.variables]
   * @param  {requestCallback} [done]
   */
    create: function(params, done) {
      return this.http.post(params, done);
    },

    list: function(params, done) {
      var path = this.path;

    // those parameters have to be passed in the query and not body
      path += '?firstResult='+ (params.firstResult || 0);
      path += '&maxResults='+ (params.maxResults || 15);

      return this.http.post(path, {
        data: params,
        done: done
      });
    },

    count: function(params, done) {
      var path = this.path + '/count';

      return this.http.post(path, {
        data: params,
        done: done
      });
    },

    /**
   * Retrieve a process instance activities.
   *
   * @param  {uuid}     id    of the process instance to be requested
   * @param  {Function} done
   */
    getActivities: function(id, done) {
      return this.http.get(this.path +'/'+ id + '/activity-instances', {
        done: done
      });
    },

  /**
   * Post process instance modifications
   * @see http://docs.camunda.org/api-references/rest/#process-instance-modify-process-instance-execution-state-method
   *
   * @param  {Object}           params
   * @param  {UUID}             params.id                     process instance UUID
   *
   * @param  {Array}            params.instructions           Array of instructions
   *
   * @param  {Boolean}          [params.skipCustomListeners]  Skip execution listener invocation for
   *                                                          activities that are started or ended
   *                                                          as part of this request.
   *
   * @param  {Boolean}          [params.skipIoMappings]       Skip execution of input/output
   *                                                          variable mappings for activities that
   *                                                          are started or ended as part of
   *                                                          this request.
   *
   * @param  {requestCallback}  done
   */
    modify: function(params, done) {
      return this.http.post(this.path + '/' + params.id + '/modification', {
        data: {
          instructions:         params.instructions,
          skipCustomListeners:  params.skipCustomListeners,
          skipIoMappings:       params.skipIoMappings
        },
        done: done
      });
    },

    /**
     *  Delete a process instance.
     *
     * @param {UUID}            id
     * @param {requestCallback} done
     */
    delete: function(id, done) {
      return this.http.del(this.path + '/' + id + '', {
        data: {},
        done: done
      });
    },

    /**
     * Insert or update a process instance variable.
     *
     * @param id
     * @param name
     * @param value
     * @param done
     * @return {*}
     */
    upsertVariable: function (id, name, value, done) {
      return this.http.put(this.path + '/' + id + '/variables/' + name, {
        data: {value : value, type: "String"},
        done: done
      });
    }
  }
);


module.exports = ProcessInstance;
