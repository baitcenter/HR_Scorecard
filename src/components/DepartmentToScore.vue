<template>
  <div>
      <fieldset class="box" style="margin-top: 15px">
        <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Select Department</b></legend>
        <div class="select">
          <select v-model="DepartmentToScore">
            <option disabled value="">Select Department</option>
            <option v-for="department in Departments"   v-bind:value="department.value" v-bind:key="department.value">{{  department.value }}</option>
          </select>
        </div>  
      </fieldset>
  </div>
</template>

<script>
  import departments from '../assets/departments.json'
  
  export default {
    data() {
      return { 
        Departments: []
      }
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
    },
    methods: {
      GetDepartments () {
        this.Departments = departments;
      }
    },
    beforeMount () {
      this.GetDepartments();
    }
  }
</script>
