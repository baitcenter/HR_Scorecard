// TeamMember Model
import { Model } from '@vuex-orm/core';
//import { TEAMMEMBERS } from '@/_datastores/teammembers.data';
//import store from '@/store';
var count = 0;

export default class TeamMember extends Model {
// This is the name used as module name of the Vuex Store.
  static entity = 'teamMembers';

    static primaryKey = 'teamMemberID';

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields() {
      // console.log /g(`New instance of TeamMember is being created ${count++}`);
      
      return {
        scoreStatusID: this.attr(String),
        teamMemberID: this.attr(String),
        firstName: this.attr(String),
        lastName: this.attr(String),
        teamMemberShiftID: this.attr(Number),
        teamMemberDepartmentCode: this.attr(String),
        teamMemberPosition: this.attr(String),
      };
    };

    get fullName() {
      return `${this.firstName} ${this.lastName}`;
    };

    static methodConf = {
      // http: {
      //   url: '/teammembers'
      // },
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
            url: '/:teamMemberID',
            method: 'get',
          },
        },
      },
    }
};