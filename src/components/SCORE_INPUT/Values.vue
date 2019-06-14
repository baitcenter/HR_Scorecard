<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Values</b></legend>
        <label style="margin-bottom: 15px"><b>Values Score: </b>
          <input class="input" v-model="Values" disabled style="margin-bottom: 10px">
        </label>  
        <div>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Safety</b></legend>
              <label><b>EE</b>
              <input v-model="Safety" v-bind:value="3" type="radio" name="safety" style="margin-right: 10px">
              </label>
              <label><b>PW</b>
              <input v-model="Safety" v-bind:value="2" type="radio" name="safety" style="margin-right: 10px">
              </label>
              <label><b>NI</b>
              <input v-model="Safety" v-bind:value="0" type="radio" name="safety">
              </label>
              <!-- <button v-on:click="SafetyComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Respect</b></legend>
              <label><b>EE</b>
              <input v-model="Respect" v-bind:value="3" type="radio" name="respect" style="margin-right: 10px">
              </label>
              <label><b>PW</b>
              <input v-model="Respect" v-bind:value="2" type="radio" name="respect" style="margin-right: 10px">
              </label>
              <label><b>NI</b>
              <input v-model="Respect" v-bind:value="0" type="radio" name="respect">
              </label>
              <!-- <button v-on:click="RespectComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Integrity</b></legend>
              <label><b>EE</b>
              <input v-model="Integrity" v-bind:value="3" type="radio" name="integrity" style="margin-right: 10px">
              </label>
              <label><b>PW</b>
              <input v-model="Integrity" v-bind:value="2" type="radio" name="integrity" style="margin-right: 10px">
              </label>
              <label><b>NI</b>
              <input v-model="Integrity" v-bind:value="0" type="radio" name="integrity">
              </label>
              <!-- <button v-on:click="IntegrityComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Teamwork</b></legend>
              <label><b>EE</b>
              <input v-model="Teamwork" v-bind:value="3"  style="margin-right: 10px" type="radio" name="teamwork">
              </label>
              <label><b>PW</b>
              <input v-model="Teamwork" v-bind:value="2"  style="margin-right: 10px" type="radio" name="teamwork">
              </label>
              <label><b>NI</b>
              <input v-model="Teamwork" v-bind:value="0" type="radio" name="teamwork">
              </label>
              <!-- <button v-on:click="TeamworkComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Innovation</b></legend>
              <label><b>EE</b>
              <input v-model="Innovation" v-bind:value="3"  style="margin-right: 10px" type="radio" name="innovation">
              </label>
              <label><b>PW</b>
              <input v-model="Innovation" v-bind:value="2"  style="margin-right: 10px" type="radio" name="innovation">
              </label>
              <label><b>NI</b>
              <input v-model="Innovation" v-bind:value="0" type="radio" name="innovation">
              </label>
              <!-- <button v-on:click="InnovationComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Quality of Work</b></legend>
              <label><b>EE</b>
              <input v-model="QualityOfWork" v-bind:value="3"  style="margin-right: 10px" type="radio" name="qualityOfWork">
              </label>
              <label><b>PW</b>
              <input v-model="QualityOfWork" v-bind:value="2"  style="margin-right: 10px" type="radio" name="qualityOfWork">
              </label>
              <label><b>NI</b>
              <input v-model="QualityOfWork" v-bind:value="0" type="radio" name="qualityOfWork">
              </label>
              <!-- <button v-on:click="QualityOfWorkComment">Comment</button> -->
          </fieldset>
          <fieldset :disabled="ScoreStatusID" class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Customer Focus</b></legend>
              <label><b>EE</b>
              <input v-model="CustomerFocus" v-bind:value="3"  style="margin-right: 10px" type="radio" name="customerFocusValues">
              </label>
              <label><b>PW</b>
              <input v-model="CustomerFocus" v-bind:value="2"  style="margin-right: 10px" type="radio" name="customerFocusValues">
              </label>
              <label><b>NI</b>
              <input v-model="CustomerFocus" v-bind:value="0" type="radio" name="customerFocusValues">
              </label>
              <!-- <button v-on:click="CustomerFocusComment">Comment</button> -->
          </fieldset>          
        </div>           
    </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {      
    }
  },
  created: function () {
    
  },
  computed: {
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
    },   
    ValuesArray: {
      get () {
        console.log(this.$store.state.ValuesArray);
        return this.$store.state.ValuesArray;
      },
      set (value) {
        console.log(value);
        // this.persistValues(value);
        // this.$store.commit('setValues', value);
      }
    },
    Values: {
      get () {
        // console.log /g(this.$store.state.Values);
        return this.$store.state.Values;
      },
      set (value) {
        console.log(value);
        // this.persistValues(value);
        // this.$store.commit('setValues', value);
      }
    },
    Safety: {
      get () {
        // console.log /g(this.$store.state.Safety);
        return this.$store.state.Safety;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[0] = value;
        // Start here -- adding this.insertValuesScoreByMasterIdPromise        
        this.persistValuesArray(this.ValuesArray);

        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setSafety', value);
      }
    },
    Respect:{
      get () {
        // console.log /g(this.$store.state.Respect);
        return this.$store.state.Respect;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[1] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setRespect', value);
      }
    },
    Integrity: {
      get () {
        // console.log /g(this.$store.state.Integrity);
        return this.$store.state.Integrity;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[2] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setIntegrity', value);
      }
    },
    Teamwork: {
      get () {
        // console.log /g(this.$store.state.Teamwork);
        return this.$store.state.Teamwork;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[3] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setTeamwork', value);
      }
    },
    Innovation: {
      get () {
        // console.log /g(this.$store.state.Innovation);
        return this.$store.state.Innovation;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[4] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setInnovation', value);
      }
    },
    QualityOfWork: {
      get () {
        // console.log /g(this.$store.state.QualityOfWork);
        return this.$store.state.QualityOfWork;
      },
      set (value) {
        // console.log /g(value);
        this.ValuesArray[5] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        else if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        else {
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setQualityOfWork', value);
      }
    },
    CustomerFocus: {
      get () {
        // console.log /g(this.$store.state.CustomerFocus);
        return this.$store.state.CustomerFocus;
      },
      set (value) {
        console.log(value);
        console.log(this.ValuesArray[6]);
        console.log(this.ValuesArray);
        this.ValuesArray[6] = value;
        this.persistValuesArray(this.ValuesArray);
        if (this.ValuesArray.includes(0)) {
            this.$store.commit('setValues', 0); 
        } 
        if (this.ValuesArray.reduce((a, b) => a + b) === 15) {            
          this.$store.commit('setValues', 31.5);
        } 
        if (this.ValuesArray.reduce((a, b) => a + b) > 15) {
          this.$store.commit('setValues', 33);
        } 
        if (this.ValuesArray.reduce((a, b) => a + b) === 14){
          this.$store.commit('setValues', 30);
        }
        this.$store.commit('setCustomerFocus', value);
      }
    }
  },
  methods: {
    insertValuesScoreByMasterIdPromise (          
      valuesScoreValues,  
      valuesScoreComments,
      masterScoreID     
    ) {
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation InsertValuesScoreByMasterID(    
                $masterScoreID: Int, 
                $valuesScoreValues: [Int], 
                $valuesScoreComments: [[Int]],                    
              ) {
                  insertValuesScoreByMasterID(            
                    masterScoreID: $masterScoreID, 
                    valuesScoreValues: $valuesScoreValues, 
                    valuesScoreComments: $valuesScoreComments  
                  ) {
                      masterScoreID,
                      valuesScoreValues,
                      valuesScoreComments                   
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID,    "valuesScoreValues": valuesScoreValues,  "valuesScoreComments":   valuesScoreComments }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',     error.message);
      });
    },
    persistValuesArray (valuesArray) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // console.log /g(masterScoreId);

      this.insertValuesScoreByMasterIdPromise(valuesArray, [[],[],[],[],[],[],[]], masterScoreId);

      var query = `mutation coreValueScoreByMasterScoreId($MasterScoreID: Int!, $ValuesScoreValues: [Int]!) {coreValueScoreByMasterScoreId(masterScoreID:$MasterScoreID, valuesScoreValues: $ValuesScoreValues){valuesScoreValues}}`;

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId, "ValuesScoreValues": valuesArray }
        })
      })
      .then(res => res.json())
      .then(data => {
        // console.log /g(data);        
      });
    }
  }  
}
</script>