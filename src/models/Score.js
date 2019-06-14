// Score Model
import { Model } from '@vuex-orm/core';
var count = 0;

export default class Score extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'scores';

  static primaryKey = 'scoreID';

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    // console.log /g(`New instance of Score is being created ${count++}`);
    return {
      scoreID: this.attr(Number),
      scoreInEditState: this.attr(Boolean),
      scoreTeamMemberID: this.attr(String),
      scoreUserID: this.attr(String),
      positionTeamMember: this.attr(String),
      departmentTeamMember: this.attr(String),
      shiftTeamMemberID: this.attr(Number),
      scoreStatusID: this.attr(Number),
      scoreDate: this.attr(null),
      scoreCreatedDateTime: this.attr(null),
      scoreSubmittedDateTime: this.attr(null),
      absenceScoreID: this.attr(Number),
      competencyScoreID: this.attr(Number),
      productivityScoreID: this.attr(Number),
      punctualityScoreID: this.attr(Number),
      valuesScoreID: this.attr(Number),
      totalScore: this.attr(Number),
    };
  };

  static methodConf = {
    http: {
      url: ''
    },
    methods: {
      $fetch: {
        name: 'fetch',
        http: {
          url: '/masterscores',
          method: 'get',
        },
      },
      $get: {
        name: 'get',
        http: {
          url: '/masterscores',
          method: 'get',
        },
      },
      $create: {
        name: 'create',
        http: {
          url: '/submitmasterscore',
          method: 'put',
        },
      },
      $update: {
        name: 'update',
        http: {
          url: '/submitmasterscore',
          method: 'put',
        },
      },
      $delete: {
        name: 'delete',
        http: {
          url: '',
          method: 'delete',
        },
      },
    },
  }
}