<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Second Shift</b></legend>
      <SecondShiftProduction v-if="DepartmentToScore == 'PRODUCTION' || DepartmentToScore == 'ALL'"></SecondShiftProduction>
      <SecondShiftLogistics v-if="DepartmentToScore == 'LOGISTICS' || DepartmentToScore == 'ALL'"></SecondShiftLogistics>
      <SecondShiftMaintenance v-if="DepartmentToScore == 'MAINTENANCE' || DepartmentToScore == 'ALL'"></SecondShiftMaintenance>
      <SecondShiftQuality v-if="DepartmentToScore == 'QUALITY' || DepartmentToScore == 'ALL'"></SecondShiftQuality>
    </fieldset>
  </div>
</template>

<script>
import SecondShiftProduction from './SecondShiftProduction.vue'
import SecondShiftLogistics from './SecondShiftLogistics.vue'
import SecondShiftMaintenance from './SecondShiftMaintenance.vue'
import SecondShiftQuality from './SecondShiftQuality.vue'

export default {
  components: {
    SecondShiftProduction,
    SecondShiftLogistics,
    SecondShiftMaintenance,
    SecondShiftQuality
  },
  computed: {
    DepartmentToScore: {
      get () {
        // console.log /g(this.$store.state.DepartmentToScore);
        return this.$store.state.DepartmentToScore;
      },
      set (value) {
        // console.log /g(value);
        this.$store.commit('setDepartmentToScore', value);
      }         
    } 
  }
}
</script>