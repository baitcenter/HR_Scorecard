// Competency Model
import { Model } from '@vuex-orm/core';
var count = 0;

export default class Competency extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'competencies';

  static primaryKey = 'competencyID';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    console.log(`New instance of Competency is being created ${count++}`);
    return {
      competencyID: this.attr(Number),
      competencyName: this.attr(String),
      competencyTooltip: this.attr(String),
    };
  };

  static methodConf = {
    http: {
      url: '/competencies'
    },
    methods: {
      $fetch: {
        name: 'fetch',
        http: {
          url: '',
          method: 'get',
        },
      },
      $get: {
        name: 'get',
        http: {
          url: '/:competencyID',
          method: 'get',
        },
      },
    },
  }
}