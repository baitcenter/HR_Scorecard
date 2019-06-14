<template>
  <div>
    <fieldset class="box">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>First Shift</b></legend>
      <FirstShiftProduction v-if="DepartmentToScore == 'PRODUCTION' || DepartmentToScore == 'ALL'"></FirstShiftProduction>
      <FirstShiftLogistics v-if="DepartmentToScore == 'LOGISTICS' || DepartmentToScore == 'ALL'"></FirstShiftLogistics>
      <FirstShiftMaintenance v-if="DepartmentToScore == 'MAINTENANCE' || DepartmentToScore == 'ALL'"></FirstShiftMaintenance>
      <FirstShiftQuality v-if="DepartmentToScore == 'QUALITY' || DepartmentToScore == 'ALL'"></FirstShiftQuality>
    </fieldset>
  </div>
</template>

<script>
import FirstShiftProduction from './FirstShiftProduction.vue'
import FirstShiftLogistics from './FirstShiftLogistics.vue'
import FirstShiftMaintenance from './FirstShiftMaintenance.vue'
import FirstShiftQuality from './FirstShiftQuality.vue'

export default {
  components: {
    FirstShiftProduction,
    FirstShiftLogistics,
    FirstShiftMaintenance,
    FirstShiftQuality
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
