<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Total</b></legend>
        <div><b>Score: </b>{{ setTotal() }}</div>
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
    Punctuality: {
      get () {
        console.log(this.$store.state.Punctuality);
        return this.$store.state.Punctuality;
      },
    },
    Productivity: {
      get () {
        console.log(this.$store.state.Productivity);
        return this.$store.state.Productivity;
      }
    },
    Values: {
      get () {
        console.log(this.$store.state.Values);
        return this.$store.state.Values;
      },
    },
    Competencies: {
      get () {
        console.log(this.$store.state.Competencies);
        return this.$store.state.Competencies;
      }
    },
    MasterScoreId: {
      get () {
        console.log(this.$store.state.MasterScoreId);
        return this.$store.state.MasterScoreId;
      }
    },
    Total: {
      get () {
        console.log(this.$store.state.Total);     

        return this.$store.state.Total;
      },
      // set () {
        

      //   this.persistTotal(total);

      //   this.$store.commit('setTotal', total);
      // }
    }     
  },
  methods: {
    setTotal () {
      let total = this.Punctuality + this.Productivity + this.Values + this.Competencies;
      console.log(this.Total);
      
      if (this.Absence === true) {
        total = 0;
      }

      this.persistTotal(total);

      this.$store.commit('setTotal', total);   

      return this.Total;
    },
    persistTotal (total) {
      console.log(total);
      console.log(this.MasterScoreId);
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation totalByMasterScoreId(
            $scoreID: Int,
            $totalScore: Float,
          ) {
            totalByMasterScoreId(
              scoreID: $scoreID,
              totalScore: $totalScore,              
              ) {
                scoreID                              
              }
          }`,
          variables: {
            "scoreID": this.MasterScoreId,
            "totalScore": total            
          }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation:  ', error.message);
      });
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `mutation totalScoreByMasterScoreId(
            $masterScoreID: Int,
            $totalScore: Float,
          ) {
            totalScoreByMasterScoreId(
              masterScoreID: $masterScoreID,
              totalScore: $totalScore,              
              ) {
                masterScoreID                              
              }
          }`,
          variables: {
            "masterScoreID": this.MasterScoreId,
            "totalScore": total            
          }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation:  ', error.message);
      });
    }
  }
}
</script>