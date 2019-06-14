<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Attendance</b></legend>
        <label><b>Absent</b>
        <input v-model="Absence" v-bind:value="true" type="radio" name="Absence" :disabled="ScoreStatusID" style="margin-right: 10px">
        </label>
        <label><b>Present</b>
        <input v-model="Absence" v-bind:value="false" type="radio" name="Absence" :disabled="ScoreStatusID">
        </label>
      </fieldset>
      <Absent v-if="Absence === true"></Absent>
  </div>  
</template>

<script>
import Absent from './Absent.vue';

export default {
  data () {
    return {

    }
  },
  components: {
    Absent
  },
  beforeMount: function () {
    this.getScoreStatusId();
  },
  computed: {
    DateToScore: {
      get () {
        return this.$store.state.DateToScore
      }
    },
    ChosenTeamMember: {
      get () {
        return this.$store.state.ChosenTeamMember
      }      
    },
    Scheduled: {
      get () {
        return this.$store.state.Scheduled;
      }
    },
    Absence: {
      get () {
        return this.$store.state.Absence;
      },
      set (value) {
        // Start here tomorrow --- 
        var scoreSaved = 1,
            absent = 3;
        // console.log /g(value);
        this.persistAbsence(value);
        if (value === true) {
          this.persistScoreStatusId(absent);
        } else {
          this.persistScoreStatusId(scoreSaved);
        }
        // this.$store.commit('setScheduled', null);
        this.insertAbsenceScoreByMasterScoreIdPromise(this.$store.state.MasterScoreId, value, this.Scheduled);
        this.$store.commit('setAbsence', value);
      }
    },
    ScoreStatusID: {
      get () {
        console.log(this.$store.state.ScoreStatusID);
        
        if (this.$store.state.ScoreStatusID == 2) {
          console.log(this.$store.state.ScoreStatusID);
          return true;
        } 
        else {
          return false;
        }               
      }
    }    
  },
  methods: {
    getScoreStatusId () {
      let scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore,
          store = this.$store;
            
      // console.log /g(scoreTeamMemberID);
      // console.log /g(scoreDate);

      var query = `query scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!) {
        scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate) {scoreStatusID}}`;

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate": scoreDate}
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data.scoreByTeamMemberIdDate.scoreStatusID);
        store.commit('setScoreStatusID', data.data.scoreByTeamMemberIdDate.scoreStatusID); 
      });     
    },
    persistAbsence (absenceScoreValue) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // console.log /g(masterScoreId);

      var query = `mutation absenceScoreByMasterScoreId($MasterScoreID: Int!, $AbsenceScoreValue: Boolean!) {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID, absenceScoreValue:$AbsenceScoreValue) {absenceScoreValue}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"AbsenceScoreValue": absenceScoreValue }
        })
      })
      .then(res => res.json())
      .then(data => {
        // console.log /g(data);        
      });
    },
    persistScoreStatusId (scoreStatusID) {
      var scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore;
            
      // console.log /g(scoreTeamMemberID);
      // console.log /g(scoreDate);

      var query = `mutation scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!, $ScoreStatusID: Int!) {
        scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate, scoreStatusID: $ScoreStatusID) {scoreStatusID}}`;

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate": scoreDate, "ScoreStatusID": scoreStatusID}
        })
      })
      .then(res => res.json())
      .then(data => {
        // console.log /g(data);        
      });
    },
    insertAbsenceScoreByMasterScoreIdPromise (masterScoreID, absenceScoreValue, absenceScoreAbsentScheduledValue) {
      console.log(masterScoreID);
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation InsertAbsenceScoreByMasterScoreID(    
                $masterScoreID: Int!, 
                $absenceScoreValue: Boolean, 
                $absenceScoreAbsentScheduledValue: Boolean    
              ) {
                  insertAbsenceScoreByMasterScoreID(            
                    masterScoreID: $masterScoreID, 
                    absenceScoreValue: $absenceScoreValue, 
                    absenceScoreAbsentScheduledValue: $absenceScoreAbsentScheduledValue          
                  ) {
                      masterScoreID,
                      absenceScoreValue,
                      absenceScoreAbsentScheduledValue
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID, "absenceScoreValue": absenceScoreValue, "absenceScoreAbsentScheduledValue": absenceScoreAbsentScheduledValue  }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    }
  }
}
</script>