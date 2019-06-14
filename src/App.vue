<template>
<!-- style="margin-top: 20px; margin-right: 20px; margin-bottom: 20px; margin-left: 20px" -->
  <div class="App container" style="margin-top: 20px; margin-bottom: 20px;"     v-bind:class="{ centerContainer: Testing }">
    <fieldset class="box">
      <Login v-if="LoggedIn === false || LoggingIn === true"></Login>
      <TeamMembers v-if="LoggedIn === true && IsTeamMemberChosen === false"></TeamMembers>
      <ScoreInput v-if="IsTeamMemberChosen === true"></ScoreInput>
    </fieldset>    
  </div>  
</template>

<script>
import axios from 'axios'
import store from './store'

import Login from './components/Login.vue'
import TeamMembers from './components/TeamMembers.vue'
import ScoreInput from './components/ScoreInput.vue'

import TeamMember from './models/TeamMember';

export default {
  data() {
    return {
      // ChosenTeamMemberChanged
    }
  },
  created: function () {
    this.getTeamMembers();
  },

  store,

  components: {
    Login,
    TeamMembers,
    ScoreInput
  },
  computed: {
    Testing: {
      get () {
        return this.$store.state.Testing;
      }
    },
    LoggedIn: {
      get () {
        return this.$store.state.LoggedIn;
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setLoggedIn', value);
      }
    },
    LoggingIn: {
      get () {
        return this.$store.state.LoggingIn;
      }
    },
    IsTeamMemberChosen: {      
      get () {
        // console.log /g("IsTEAMMemberChosen changed");
        return this.$store.state.IsTeamMemberChosen;
      }
    },
    CommentOpen: {
      get () {
        return this.$store.state.CommentOpen;
      }
    }
  },
  methods: {
    getTeamMembers () {
      axios.get('http://apcc-srvm-01:3000/sql/apps')
      .then(res => {
        console.log(res.data);        
        TeamMember.insert( {data: res.data} );
        // console.log /g(TeamMember.all());
        // console.log /g(store.state.entities.teamMembers);
        // // // console.log /g(this.$store.state.TeamMembers);
      })
      .catch(res => {
        alert(res);
      });
    }
  },  
}
</script>

<style src="../static/css/bulma.css"></style>

<style>
  .center {
    margin: auto;
    width: 50%;
    padding: 10px;
  }
  
  .centerContainer {
    margin-left: 8%;
  }

  .radio-to-button {
    list-style-type:none;
    margin:25px 0 0 0;
    padding:0;
  }

  .radio-to-button li {
    float:left;
    margin:0 5px 5px 0;
    width:200px;
    height:40px;
    position:relative;    
  }

  .radio-to-button label, .radio-to-button input {
    display:block;
    position:absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    border-radius: 4px;
  }

  .radio-to-button input[type="radio"] {
    opacity:0.011;
    z-index:100;
  }

  .radio-to-button input[type="radio"]:checked + label {
    background:rgb(236, 226, 226);
  }

  .radio-to-button label {
    padding:5px;
    border:1px solid #CCC; 
    cursor:pointer;
    z-index:90;
  }

  .radio-to-button label:hover {
    background:#DDD;
  }

  .overlay {
    background-color: rgba(1, 1, 1, 0.7);
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }

  .noScore {
    color: red
  }

  .scoreSaved {
    color: orange;    
  }

  .scoreSubmitted {
    color: green
  }

  .teamMemberAbsent {
    color: black
  }

  .comment-mask {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
  }

  .comment-container {
    width: 300px;    
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  body {
    font-family: Helvetica, Arial, sans-serif;
  }

  table,td {
    border:1px solid black;
  }
</style>