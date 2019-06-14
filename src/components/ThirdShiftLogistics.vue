<template>
  <div>
    <fieldset>
      <legend><b>Logistics</b></legend>
      <select v-model="ChosenTeamMember">
        <option disabled value="">Select a Team Member</option>
        <option v-for="teamMember in ThrdShftLgstcsTmMmbrs" v-bind:value="teamMember.teamMemberID" v-bind:key="teamMember.teamMemberID" v-bind:class="{ 'noScore': (teamMember.scoreStatusID == noScore), 'scoreSaved': (teamMember.scoreStatusID == scoreSaved), 'scoreSubmitted': (teamMember.scoreStatusID == scoreSubmitted), 'teamMemberAbsent': (teamMember.scoreStatusID == teamMemberAbsent) }">{{ teamMember.firstName }} {{ teamMember.lastName }}</option>
      </select>
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
    ThrdShftLgstcsTmMmbrs: {
      get () {
        return this.$store.state.ThrdShftLgstcsTmMmbrs
      }
    }
  }
}
</script>