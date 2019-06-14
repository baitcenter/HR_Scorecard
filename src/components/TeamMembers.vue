<template>
  <div>
    <h1 v-if="LoggingIn === false" class="is-size-3" >Hello, {{ UserName }}</h1>
    <hr v-if="LoggingIn === false">
    <Testing v-if="Testing === true && LoggingIn === false"></Testing> 
    <h2 v-if="Testing === false && LoggingIn === false" class="is-size-3"><b>Team Member Selection</b></h2>
    <!-- <hr v-if="Testing === false && LoggingIn === false"> -->
    <ShiftToScore v-if="Testing === false && LoggingIn === false"></ShiftToScore>
    <DepartmentToScore v-if="Testing === false && LoggingIn === false"></DepartmentToScore>
    <DateToScore v-if="Testing === false && LoggingIn === false"></DateToScore>
    
    <button v-if="Testing === false && LoggingIn === false" v-on:click="goToLogin" class="button is-primary is-normal" style="margin-top: 15px; margin-bottom: 15px">Back to Login Page</button>

    <FirstShift v-if="(ShiftToScore == '1ST' || ShiftToScore == 'ALL') && Testing === false && LoggingIn === false"></FirstShift>

    <button v-if="(ShiftToScore == 'ALL' || DepartmentToScore == 'ALL') && Testing === false && LoggingIn === false" v-on:click="goToLogin" class="button is-primary is-normal" style="margin-top: 15px; margin-bottom: 15px">Back to Login Page</button>

    <SecondShift v-if="(ShiftToScore == '2ND' || ShiftToScore == 'ALL') && Testing === false && LoggingIn === false" style="margin-top: -15px;"></SecondShift>

    <button v-if="(ShiftToScore == 'ALL' || DepartmentToScore == 'ALL') && Testing === false && LoggingIn === false" v-on:click="goToLogin" class="button is-primary is-normal" style="margin-top: 15px; margin-bottom: 15px">Back to Login Page</button>

    <ThirdShift v-if="(ShiftToScore == '3RD' || ShiftToScore == 'ALL') && Testing === false && LoggingIn === false" style="margin-top: -15px;"></ThirdShift>

    <button v-if="(ShiftToScore == 'ALL' || DepartmentToScore == 'ALL') && Testing === false && LoggingIn === false" v-on:click="goToLogin" class="button is-primary is-normal" style="margin-top: 15px">Back to Login Page</button> 
  </div>
</template>

<script>
import TeamMember from '../models/TeamMember'

// import Testing from './SCORE_INPUT/Testing2.vue'
import Testing from './SCORE_INPUT/Testing3.vue'
import ShiftToScore from './ShiftToScore.vue'
import DepartmentToScore from './DepartmentToScore.vue'
import DateToScore from './DateToScore.vue'
import FirstShift from './FirstShift.vue'
import SecondShift from './SecondShift.vue'
import ThirdShift from './ThirdShift.vue'

export default {
  data () {
    return {
      UserName: ''
    }
  },
  mounted: function () {    
    this.getUserName();    
  },
  components: {
    Testing,
    ShiftToScore,
    DepartmentToScore,
    DateToScore,
    FirstShift,
    SecondShift,
    ThirdShift    
  },
  computed: {
    Testing: {
      get () {
        return this.$store.state.Testing;
      }
    },
    ShiftToScore: {
      get () {
        // console.log /g(this.$store.state.ShiftToScore);
        return this.$store.state.ShiftToScore;
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setShiftToScore', value);
      }         
    },
    DepartmentToScore: {
      get () {
        // console.log /g(this.$store.state.ShiftToScore);
        return this.$store.state.DepartmentToScore;
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setDepartmentToScore', value);
      }         
    },
    LoggingIn: {
      get () {
        return this.$store.state.LoggingIn;
      }
    } 
  },
  methods: {
    getUserName () {
      this.UserName = TeamMember.find(this.$store.state.UserId).fullName;
    },
    goToLogin () {
      this.$store.state.LoggingIn = true;
    }
  }   
}
</script>
