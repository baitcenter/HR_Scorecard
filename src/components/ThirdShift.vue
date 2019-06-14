<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Third Shift</b></legend>
      <ThirdShiftProduction v-if="DepartmentToScore == 'PRODUCTION' || DepartmentToScore == 'ALL'"></ThirdShiftProduction>
      <ThirdShiftLogistics v-if="DepartmentToScore == 'LOGISTICS' || DepartmentToScore == 'ALL'"></ThirdShiftLogistics>
      <ThirdShiftMaintenance v-if="DepartmentToScore == 'MAINTENANCE' || DepartmentToScore == 'ALL'"></ThirdShiftMaintenance>
      <ThirdShiftQuality v-if="DepartmentToScore == 'QUALITY' || DepartmentToScore == 'ALL'"></ThirdShiftQuality>
    </fieldset>
  </div>
</template>

<script>
import ThirdShiftProduction from './ThirdShiftProduction.vue'
import ThirdShiftLogistics from './ThirdShiftLogistics.vue'
import ThirdShiftMaintenance from './ThirdShiftMaintenance.vue'
import ThirdShiftQuality from './ThirdShiftQuality.vue'

export default {
  components: {
    ThirdShiftProduction,
    ThirdShiftLogistics,
    ThirdShiftMaintenance,
    ThirdShiftQuality
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