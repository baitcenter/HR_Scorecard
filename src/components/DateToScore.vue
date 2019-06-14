<template>
  <div>
      <fieldset class="box" style="margin-top: 15px">
          <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Select Date</b></legend>
          <datepicker v-model="DateToScore" class="input"></datepicker>        
      </fieldset>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import moment from 'moment'

  import store from '../store'
  
  import Score from '../models/Score'
  import TeamMember from '../models/TeamMember';
  // import TodaysScore from '../models/TodaysScore'

  export default {
    data: function () {
      return {
        
      }
    },
    components: {
      Datepicker
    },
    mounted: function () {
      // console.log /g(this.DateToScore);
      this.getSelectedDateScores(this.DateToScore);
    },         
    computed: {
      DateToScore: {
        get () {
            // console.log /g(this.$store.state.DateToScore);
            return this.$store.state.DateToScore;
        },
        set (value) {
            var mmDdYyyyDate = moment(value).format('L');
            // console.log /g(mmDdYyyyDate);
            this.getSelectedDateScores(mmDdYyyyDate);                        
            this.$store.commit('setDateToScore', mmDdYyyyDate);
        }  
      },
    },
    methods: {
      getSelectedDateScores (dateToScore) {
        // console.log /g(store.state.entities.teamMembers.data);
        // console.log /g(TeamMember.all());         
        var query = `query scoresByDate($DateToScore: String!) {
          scoresByDate(scoreDate: $DateToScore) {
            scoreDate
            scoreTeamMemberID
            scoreStatusID
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
            variables: { "DateToScore": dateToScore }
          })
        })
        .then(res => res.json())
        .then(data => {
          
          console.log(TeamMember.all());
          
          // reset TeamMember.all() scoreStatusID to ""
          for (let teamMember of TeamMember.all()) {
            TeamMember.update({
              where: teamMember.teamMemberID,
              data: { scoreStatusID: "" }
            })
          }
          
          for (let scoreData of data.data.scoresByDate) {           
            TeamMember.update({
              where: scoreData.scoreTeamMemberID,
              data: { scoreStatusID: scoreData.scoreStatusID }
            })            
          }          
          
          this.$store.commit('setFrstShftPrdctnTmMmbrs', TeamMember.query().where('teamMemberShiftID', 1).where('teamMemberDepartmentCode', 'S28200').get());
          this.$store.commit('setFrstShftLgstcsTmMmbrs', TeamMember.query().where('teamMemberShiftID', 1).where('teamMemberDepartmentCode', 'S28340').get());
          this.$store.commit('setFrstShftMntncTmMmbrs', TeamMember.query().where('teamMemberShiftID', 1).where('teamMemberDepartmentCode', 'S28320').get());
          this.$store.commit('setFrstShftQltyTmMmbrs', TeamMember.query().where('teamMemberShiftID', 1).where('teamMemberDepartmentCode', 'S28330').get());
          
          this.$store.commit('setScndShftPrdctnTmMmbrs', TeamMember.query().where('teamMemberShiftID', 2).where('teamMemberDepartmentCode', 'S28200').get());
          this.$store.commit('setScndShftLgstcsTmMmbrs', TeamMember.query().where('teamMemberShiftID', 2).where('teamMemberDepartmentCode', 'S28340').get());
          this.$store.commit('setScndShftMntncTmMmbrs', TeamMember.query().where('teamMemberShiftID', 2).where('teamMemberDepartmentCode', 'S28320').get());
          this.$store.commit('setScndShftQltyTmMmbrs', TeamMember.query().where('teamMemberShiftID', 2).where('teamMemberDepartmentCode', 'S28330').get());

          this.$store.commit('setThrdShftPrdctnTmMmbrs', TeamMember.query().where('teamMemberShiftID', 3).where('teamMemberDepartmentCode', 'S28200').get());
          this.$store.commit('setThrdShftLgstcsTmMmbrs', TeamMember.query().where('teamMemberShiftID', 3).where('teamMemberDepartmentCode', 'S28340').get());
          this.$store.commit('setThrdShftMntncTmMmbrs', TeamMember.query().where('teamMemberShiftID', 3).where('teamMemberDepartmentCode', 'S28320').get());
          this.$store.commit('setThrdShftQltyTmMmbrs', TeamMember.query().where('teamMemberShiftID', 3).where('teamMemberDepartmentCode', 'S28330').get());         
        });
      }      
    }              
  }
</script>