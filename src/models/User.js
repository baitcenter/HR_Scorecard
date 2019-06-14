// User Model
import { Model } from '@vuex-orm/core';
var count = 0;

export default class User extends Model {  
  // This is the name used as module name of the Vuex Store.
  static entity = 'users';
  
  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {    
    // console.log /g(`New instance of user is being created ${count++}`);    
    return {
      numberOfRecords: this.increment(),
      id: this.attr(null),
      userID: this.attr(String),
      userClassID: this.attr(String),
      loginStatus: this.attr(false),
    };
  };
}