<template>
  <div>
    <h1 class="is-size-3">This is the {{ DateToScore }} Scoring Page for {{ ChosenTeamMember.fullName }}</h1>
    <button v-on:click="goToTeamMemberSelection" class="button is-primary is-normal" style="margin-top: 15px">Back to Team Member Selection Page</button> 
    <!-- <DateToScoreForThisTeamMember></DateToScoreForThisTeamMember>  -->
    <hr>
    <Total></Total>
    <Attendance></Attendance>
    <Punctuality v-if="Absence === false"></Punctuality>
    <Productivity v-if="Absence === false"></Productivity>
    <button v-if="Absence === false" v-on:click="goToTeamMemberSelection" class="button is-primary is-normal" style="margin-top: 15px">Back to Team Member Selection Page</button>
    <Values v-if="Absence === false"></Values>    
    <button v-if="Absence === false" v-on:click="goToTeamMemberSelection" class="button is-primary is-normal" style="margin-top: 15px; margin-bottom: 15px">Back to Team Member Selection Page</button>
    <Competencies v-if="Absence === false"></Competencies>
    <Total v-if="Absence === false"></Total>
    <hr>
    <button v-on:click="goToTeamMemberSelection" class="button is-primary is-normal" style="margin-bottom: 15px" v-if="Absence === false">Back to Team Member Selection Page</button>
    <div>          
      <button v-if="UserAccessLevel >= 3" v-on:click="lock" class="button"  style="background-color:green">Lock</button>         
      <button v-if="UserAccessLevel >= 3" v-on:click="unlock" class="button" style="background-color:orange">Unlock</button>
    </div>          
  </div>
</template>

<script>
import DateToScoreForThisTeamMember from './DateToScoreForThisTeamMember'
import Total from './SCORE_INPUT/Total.vue'
import Attendance from './SCORE_INPUT/Attendance.vue'
import Punctuality from './SCORE_INPUT/Punctuality.vue'
import Productivity from './SCORE_INPUT/Productivity.vue'
import Values from './SCORE_INPUT/Values.vue'
import Competencies from './SCORE_INPUT/Competencies.vue'
// import Testing from './SCORE_INPUT/Testing.vue'
// import Testing from './SCORE_INPUT/Testing2.vue'
// import Testing from './SCORE_INPUT/Comparison-Testing2.vue'
// import Testing from './SCORE_INPUT/Testing3.vue'

export default {
  data () {
    return {
      
    }
  },
  components: {
    DateToScoreForThisTeamMember,
    Total,
    Attendance,
    Punctuality,
    Productivity,
    Values,
    Competencies,
    // Testing
  },
  computed: {
    DateToScore: {
      get () {
        return this.$store.state.DateToScore
      }
    },
    ChosenTeamMember: {
      get () {
        // console.log /g(this.$store.state.ChosenTeamMember);
        return this.$store.state.ChosenTeamMember;
      }
    },
    Absence: {
      get () {
        // console.log /g(this.$store.state.Absence);
        return this.$store.state.Absence;
      }
    },
    UserAccessLevel: {
      get () {
        console.log(this.$store.state.UserAccessLevel);
        return this.$store.state.UserAccessLevel; 
      }
    }
  },
  methods: {
    goToTeamMemberSelection () {
      this.$store.commit('setIsTeamMemberChosen', false);
      // this.$store.commit('setAbsence', false);
      var scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore,
          competencyScoresIndexKeyValue = {index: '', key: '', value: ''},
          count = 0;

      for (let cmptncyScore of this.$store.state.CompetencyScores) {        
        if (cmptncyScore[Object.keys(cmptncyScore)[0]] != "") {
          // console.log(cmptncyScore);
          competencyScoresIndexKeyValue.index = count;
          competencyScoresIndexKeyValue.key = Object.keys(cmptncyScore)[0];
          competencyScoresIndexKeyValue.value = '';
          console.log(competencyScoresIndexKeyValue);
          this.$store.commit('setCompetencyScores', competencyScoresIndexKeyValue);          
          // competencyScoreArray.push(parseInt(cmptncyScore[Object.keys(cmptncyScore)[0]]));
        }
        count++;
      }     
            
      // console.log /g(scoreTeamMemberID);
      // console.log /g(scoreDate);
    
      var query = `query scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!) {
        scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate) {
          scoreID
        }
      }`;     
      
      // // console.log /g(scoreByTeamMemberIdDate);
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate": scoreDate }
        })
      })
      .then(res => res.json())
      .then(data => {
        // console.log /g(data);
      });              
    },
    lock () {
      console.log(this.UserAccessLevel);

      var scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore,
          masterScoreId = this.$store.state.MasterScoreId;
            
      console.log(scoreTeamMemberID);
      // console.log(scoreDate);

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query: `mutation scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!, $ScoreStatusID: Int!) {
        scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate, scoreStatusID: $ScoreStatusID) {scoreStatusID}}`,
          variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate": scoreDate, "ScoreStatusID": 2}
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);             
      });
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query: `mutation setScoreStatusIdScoresByMasterScoreId($MasterScoreID: Int!, $ScoreStatusID: Int!) {
        setScoreStatusIdScoresByMasterScoreId(masterScoreID: $MasterScoreID, scoreStatusID: $ScoreStatusID) {scoreStatusID}}`,
          variables: { "MasterScoreID": masterScoreId, "ScoreStatusID": 2}
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.goToTeamMemberSelection();       
      });
    },
    unlock () {
      console.log(this.UserAccessLevel);

      var scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore,
          masterScoreId = this.$store.state.MasterScoreId;;
            
      console.log(scoreTeamMemberID);
      // console.log /g(scoreDate);

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query: `mutation scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!, $ScoreStatusID: Int!) {
        scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate, scoreStatusID: $ScoreStatusID) {scoreStatusID}}`,
          variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate": scoreDate, "ScoreStatusID": 1}
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);               
      });

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query: `mutation setScoreStatusIdScoresByMasterScoreId($MasterScoreID: Int!, $ScoreStatusID: Int!) {
        setScoreStatusIdScoresByMasterScoreId(masterScoreID: $MasterScoreID, scoreStatusID: $ScoreStatusID) {scoreStatusID}}`,
          variables: { "MasterScoreID": masterScoreId, "ScoreStatusID": 1}
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.goToTeamMemberSelection();       
      });
    }
  }
}
</script>