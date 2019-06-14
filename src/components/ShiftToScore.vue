<template>
  <div>
      <fieldset class="box">
        <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Select Shift</b></legend>
        <div class="select">
          <select v-model="ShiftToScore">
            <option disabled value="">Select Shift</option>
            <option v-for="shift in Shifts" v-bind:value="shift.value"  v-bind:key="shift.value">{{ shift.value }}</option>
          </select>
        </div>  
      </fieldset>
  </div>
</template>

<script>
  import shifts from '../assets/shifts.json'
  
  export default {
    data() {
      return { 
        Shifts: []
      }
    },
    computed: {
      ShiftToScore: {
        get () {
          // console.log /g(this.$store.state.ShiftToScore);
          return this.$store.state.ShiftToScore;
        },
        set (value) {
          // console.log /g(value);
          this.$store.commit('setShiftToScore', value);
        }         
      } 
    },
    methods: {
      GetShifts () {
        this.Shifts = shifts;
      }
    },
    beforeMount () {
      this.GetShifts();
    }
  }
</script>