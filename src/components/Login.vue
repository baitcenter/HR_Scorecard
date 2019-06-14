<template>
  <div class="center" style="max-width: 500px">
    <p class="is-size-3" style="margin-bottom: 5px">Welcome to the Scorecard App</p>
    <input v-model="UserId" v-on:keyup.enter="Login" class="input" style="margin-bottom: 10px">    
    <button v-on:click="Login" class="button is-primary is-normal">Login</button>
    <button v-on:click="Test" class="button is-info is-normal">Audit</button> 
  </div>
</template>

<script>
import TeamMember from '../models/TeamMember'

export default {
  data () {
    return {
      
    }
  },
  computed: {
    UserId: {
      get () {
        return this.$store.state.UserId
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setUserId', value);
      }
    }
  }, 
  methods: {
    Login () {
      if (TeamMember.find(this.UserId)) {
        console.log(this.UserId);
        if (TeamMember.find(this.UserId).teamMemberID) {
          // console.log /g(this.UserId);
          this.$store.commit('setLoggedIn', true);
          this.$store.commit('setLoggingIn', false);
        }
      }         
      else {
        alert("Incorrect UserId");
        // console.log /g(this.UserId);        
      }                 
    },
    Test () {
      if (TeamMember.find(this.UserId)) {
        if (TeamMember.find(this.UserId).teamMemberID && this.UserId === '059048') {
          // console.log /g(this.UserId);
          this.$store.commit('setLoggedIn', true);
          this.$store.commit('setTesting', true);
          this.$store.commit('setLoggingIn', false);
        }
        else {
          alert("You do not have permission to Test");
        }
      }         
      else {
        alert("Incorrect UserId");
        // console.log /g(this.UserId);        
      }
    }
  }
}
</script>