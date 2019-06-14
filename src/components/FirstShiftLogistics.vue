<template>
  <div>
    <fieldset>
      <legend><b>Logistics</b></legend>
      <!-- <select v-model="ChosenTeamMember">
        <option disabled value="">Select a Team Member</option>
        <option v-for="teamMember in FrstShftLgstcsTmMmbrs" v-bind:value="teamMember.teamMemberID" v-bind:key="teamMember.teamMemberID" v-bind:class="{ 'noScore': (teamMember.scoreStatusID == noScore), 'scoreSaved': (teamMember.scoreStatusID == scoreSaved), 'scoreSubmitted': (teamMember.scoreStatusID == scoreSubmitted), 'teamMemberAbsent': (teamMember.scoreStatusID == teamMemberAbsent) }">{{ teamMember.firstName }} {{ teamMember.lastName }}</option>
      </select> -->
      <span v-for="teamMember in FrstShftLgstcsTmMmbrs" v-bind:key="teamMember.fullName">
        <input v-model="ChosenTeamMember" type="radio" name="teamMember" v-bind:id="teamMember.teamMemberID" v-bind:value="teamMember" v-bind:key="teamMember.teamMemberID" v-on:change="getMasterScoreId">
        <label v-bind:for="teamMember.teamMemberID" v-bind:class="{ 'noScore': (teamMember.scoreStatusID == noScore), 'scoreSaved': (teamMember.scoreStatusID == scoreSaved), 'scoreSubmitted': (teamMember.scoreStatusID == scoreSubmitted), 'teamMemberAbsent': (teamMember.scoreStatusID == teamMemberAbsent) }">{{ teamMember.firstName }} {{ teamMember.lastName }} {{ teamMember.scoreStatusID }}</label>
      </span>
    </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {
      noScore: '',
      scoreSaved: '1',
      scoreSubmitted: '2',
      teamMemberAbsent: '3'
    }    
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
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setIsTeamMemberChosen', true);
        this.$store.commit('setChosenTeamMember', value);
      }
    },
    FrstShftLgstcsTmMmbrs: {
      get () {
        return this.$store.state.FrstShftLgstcsTmMmbrs
      }
    }
  },
  methods: {
    getPunctualityScores (masterScoreId) {
      if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query punctualityScoreByMasterScoreId($MasterScoreID: Int!) {punctualityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            punctualityScoreValue
            masterScoreID
            punctualityScoreID
            punctualityComments
          }
        }`; 
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json())
        .then(data => {
          // console.log /g(data);
          this.$store.commit('setPunctuality', data.data.punctualityScoreByMasterScoreId.punctualityScoreValue);    
          this.$store.commit('setPunctualityComment', data.data.punctualityScoreByMasterScoreId.punctualityScoreComments);    
        });
      }
    },
    getAbsenceScores (masterScoreId) {
      // console.log /g(this.ChosenTeamMember.scoreStatusID);
      // console.log /g(this.ChosenTeamMember);
      if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query absenceScoreByMasterScoreId($MasterScoreID: Int!) {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            absenceScoreValue
            masterScoreID
            absenceScoreID
            absenceScoreAbsentScheduledValue
          }
        }`; 
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json())
        .then(data => {
          // console.log /g(data);
          this.$store.commit('setAbsence', data.data.absenceScoreByMasterScoreId.absenceScoreValue);
          this.$store.commit('setScheduled', data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue);
        });
      }
    },
    getMasterScoreId () {
      var scoreTeamMemberID = this.ChosenTeamMember.teamMemberID, 
          scoreDate = this.DateToScore;
            
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
        var masterScoreId = data.data.scoreByTeamMemberIdDate.scoreID;
        this.$store.commit('setMasterScoreId', masterScoreId);
        this.getAbsenceScores(masterScoreId);
        this.getPunctualityScores(masterScoreId);
      });
    }    
  }
}
</script>