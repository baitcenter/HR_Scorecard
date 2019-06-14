<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Absence</b></legend>
        <label><b>Scheduled (Or FMLA)</b>
        <input v-model="Scheduled" v-bind:value="true" type="radio" name="scheduled" style="margin-right: 10px">
        </label>
        <label><b>Unscheduled</b>
        <input v-model="Scheduled" v-bind:value="false" type="radio" name="scheduled">
        </label>
      </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  computed: {
    Absence: {
      get () {
        console.log(this.$store.state.Absence);
        return this.$store.state.Absence;
      }
    },
    Scheduled: {
      get () {
        console.log(this.$store.state.Scheduled);
        return this.$store.state.Scheduled;
      },
      set (value) {
        console.log(value);
        this.persistScheduled(value);
        this.insertAbsenceScoreByMasterScoreIdPromise(this.$store.state.MasterScoreId, this.Absence, value);
        this.$store.commit('setScheduled', value);
      }
    }
  },
  methods: {
    persistScheduled (scheduledScoreValue) {
      var masterScoreId = this.$store.state.MasterScoreId;
      console.log(masterScoreId);

      var query = `mutation scheduledScoreByMasterScoreId($MasterScoreID: Int!, $ScheduledScoreValue: Boolean!) {scheduledScoreByMasterScoreId(masterScoreID:$MasterScoreID, absenceScoreAbsentScheduledValue:$ScheduledScoreValue) {absenceScoreAbsentScheduledValue}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"ScheduledScoreValue": scheduledScoreValue }
        })
      })
      .then(res => res.json())
      .then(data => {
        // console.log(data);        
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