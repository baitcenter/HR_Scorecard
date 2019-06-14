<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Productivity</b></legend>
        <div style="margin-bottom: 10px"><b>          
          Productivity Daily - All - Score: </b><input class="input" v-model="Productivity" disabled>          
        </div>
        <div style="margin-bottom: 10px">
          <div v-if="UserAccessLevel >= 3">
            <label><b>EE</b>
            <input v-model="Productivity" v-bind:value="33" type="radio"  name="productivity" :disabled="ProductivityScoreOverride || ScoreStatusID" style="margin-right: 10px">
            </label>
            <label><b>PW</b>
            <input v-model="Productivity" v-bind:value="30" type="radio"   name="productivity" :disabled="ProductivityScoreOverride || ScoreStatusID" style="margin-right: 10px">
            </label>
            <label><b>NI</b>
            <input v-model="Productivity" v-bind:value="0" type="radio"  name="productivity" :disabled="ProductivityScoreOverride || ScoreStatusID" style="margin-right: 10px">
            </label>
            <span>
              <label><b>Score Override</b>
              <input v-model="ProductivityScoreOverride"    v-bind:checked="ProductivityScoreOverride" type="checkbox"    name="scoreOverride">
              </label>
            </span>
          </div>          
          <!-- <button v-on:click="OpenProductivityComment">Comment</button>
          <fieldset v-bind:class="{ 'comment-container': ProductivityCommentOpen }" v-if="ProductivityCommentOpen === true">
            <b>Productivity Comment</b>
            <input type="text" v-model="DisplayProductivityComment">
            <button type="button" v-on:click="AddProductivityComment">Add</button>
            <button type="button" v-on:click="CloseProductivityComment">Close</button> 
          </fieldset> -->
        </div>        
        <div style="margin-bottom: 10px">
          <label><b>Line Goal</b>
          <div class="select" style="margin-left: 10px">
            <select v-model="ProductionDailyLineID"   :disabled="ProductivityScoreOverride || ScoreStatusID" >
              <option disabled value="">Line Select</option>
              <option v-for="lineGoal in LineGoals"   v-bind:value="lineGoal.lineID" v-bind:key="lineGoal.lineID">{{  lineGoal.lineID }} Goal: {{ lineGoal.lineGoal }}%</option>
            </select>
          </div>
          </label>                     
        </div>
        <span><b>Line Performance</b></span>
        <span>
          <input v-model="ProductionDailyLinePerformance" type="number" class="input" step="1" min="0" max="100" :disabled="ProductivityScoreOverride ||  ScoreStatusID">
        </span>               
    </fieldset>
  </div>
</template>

<script>
export default {
  data () {
    return {
      LineGoals: '',
      selectedLineGoal: '',
      EE: '',
      PW: '',
      NI: ''
    }
  },
  created: function () {
    this.getLineGoals();
    this.setUserAccessLevel();
  },
  computed: {
    Productivity: {
      get () {
        // // console.log /g(this.$store.state.Productivity);
        if (this.$store.state.Productivity < 25) {
          // console.log /g("< 25");
          this.NI = true;
          this.EE = false;
          this.PW = false;
          // // console.log /g(this.NI);          
        } 
        else if (this.$store.state.Productivity >= 33) {
          // // console.log /g(">= 33");
          this.EE = true;
          this.PW = false;
          this.NI = false;
          // // console.log /g(this.EE);          
        }
        else {
          switch (this.$store.state.Productivity) {
            case 25:
            case 26:
            case 27:
            case 28:
            case 29:
            case 30:
            case 31:
            case 32:
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // console.log /g(this.PW);
              break;
            default:
              alert('MISSSED a Productivity score possibility'); 
              // // console.log /g('MISSSED a possibility');
              break;
          }
        }

        // this.persistProductivity(this.$store.state.Productivity);
        // this.$store.commit('setProductivity', this.$store.state.Productivity);
        // this.persistProductivity(value);
        return this.$store.state.Productivity;
      },
      set (value) {
        console.log(value);
        this.persistProductivity(value);
        this.$store.commit('setProductivity', value);
      }
    },
    UserAccessLevel: {
      get () {
        console.log(this.$store.state.UserAccessLevel);
        return this.$store.state.UserAccessLevel;
      }
    },
    ProductivityScoreOverride: {
      get () {
        // // console.log /g(this.$store.state.ProductivityScoreOverride);
        return this.$store.state.ProductivityScoreOverride;
      },
      set (value) {
        console.log(value);
        this.persistProductivityScoreOverride(value);
        this.insertProductivityScoreOverrideByMasterID (
          this.$store.state.MasterScoreId,      
          value
        );
        this.$store.commit('setProductivityScoreOverride', value);
      }
    },
    ProductionDailyLinePerformance:{
      get () {
        // // console.log /g(this.$store.state.ProductionDailyLinePerformance);
        return this.$store.state.ProductionDailyLinePerformance;
      },
      set (value) {
        console.log(value);
        console.log(this.selectedLineGoal);

        var value = parseInt(value);
        var performanceScoreVariance = value - this.selectedLineGoal;

        // // console.log /g(`performanceScoreVariance ${performanceScoreVariance}`);

        if (performanceScoreVariance <= -6) {
          // // console.log /g("<= -6");
          this.NI = true;
          this.EE = false;
          this.PW = false;
          // // console.log /g(this.NI);
          this.$store.commit('setProductivity', 0);          
          this.persistProductivity(0);
        } 
        else if (performanceScoreVariance >= 15) {
          // // console.log /g(">= 15");
          this.EE = true;
          this.PW = false;
          this.NI = false;
          // // console.log /g(this.EE);
          this.$store.commit('setProductivity', 33);
          this.persistProductivity(33);
        }
        else {
          switch (performanceScoreVariance) {
            case -5:
              // // console.log /g("-5");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 25);
              this.persistProductivity(25);
              break;
            case -4:
              // // console.log /g("-4");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 26);
              this.persistProductivity(26);
              break;
            case -3:
              // // console.log /g("-3");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 27);
              this.persistProductivity(27);
              break;
            case -2:
              // // console.log /g("-2");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 28);
              this.persistProductivity(28);
              break;
            case -1:
              // // console.log /g("-1");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 29);
              this.persistProductivity(29);
              break;
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
              // // console.log /g("0-4");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 30);
              this.persistProductivity(30);
              break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
              // // console.log /g("5-9");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 31);
              this.persistProductivity(31);
              break;
            case 10:
            case 11:
            case 12:
            case 13:
            case 14:
              // // console.log /g("10-14");
              this.PW = true;
              this.NI = false;
              this.EE = false;
              // // console.log /g(this.PW);
              this.$store.commit('setProductivity', 32);
              this.persistProductivity(32);
              break;
            default:
              alert('MISSSED a Productivity score possibility'); 
              // // console.log /g('MISSSED a possibility');
              break;
          }
        }               
        
        // // console.log /g(this.Productivity);
        this.persistProductionDailyLinePerformance(value);
        this.insertProductionDailyLinePerformanceByMasterID(          
          this.$store.state.MasterScoreId,
          value
        );
        console.log(this.$store.state.MasterScoreId);
        this.insertProductivityScoreValueByMasterID (
          this.$store.state.MasterScoreId,
          this.Productivity      
        );
        this.$store.commit('setProductionDailyLinePerformance', value);
      }
    },
    ProductionDailyLineID: {
      get () {
        // // console.log /g(this.LineGoals);
        // // console.log /g(this.$store.state.ProductionDailyLineID);
        this.getSelectedLineGoal(this.$store.state.ProductionDailyLineID);
        return this.$store.state.ProductionDailyLineID;
      },
      set (value) {
        // // console.log /g(value);
        this.persistProductionDailyLineID(value);
        this.insertProductionDailyLineIDByMasterID(
          this.$store.state.MasterScoreId,
          value
        );
        this.$store.commit('setProductionDailyLineID', value);
      }
    },
    ProductivityComment: {
      get () {       
        console.log(this.$store.state.ProductivityComment);      
        return this.$store.state.ProductivityComment;
      },
      
      set (value) {
        console.log(value);
        this.$store.commit('setProductivityComment', value);
      }
    },
    DisplayProductivityComment: {
      get () {
          console.log(this.$store.state.DisplayProductivityComment);
          return this.$store.state.DisplayProductivityComment;
      },
      set (value) {
        this.$store.commit('setDisplayProductivityComment', value); 
      } 
    },
    UserId: {
      get () {
        return this.$store.state.UserId;
      }
    },
    ProductivityCommentOpen: {
      get () {
        console.log(this.$store.state.ProductivityComment);
        return this.$store.state.ProductivityComment;
      }
    },
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
    }   
  },
  methods: {
    setUserCommentArray (lastUserCommentId, store, persistProductivity) {
      console.log(lastUserCommentId)
      lastUserCommentId.then(function(data) {
        let commentId = data + 1;
        console.log(commentId);
        store.commit('setProductivityComment', [commentId]);
        persistProductivity([commentId]);
      });
    },
      
    AddProductivityComment () {
      let dsplyPrdctvtyCmmnt = this.DisplayProductivityComment,
          userId = this.UserId,
          punctualityCommentArray = [];

      function insertUserCommmentsByCommentId (commentId) {
        console.log(commentId);
        console.log(dsplyPrdctvtyCmmnt);
        console.log(userId);          
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation insertUserCommmentsByCommentId
                    ($commentID: Int, $commentText: String, $commentUserID: String, $commentDateTime: String) {
                      insertUserCommmentsByCommentId(            
                        commentID: $commentID,
                        commentText: $commentText,
                        commentUserID: $commentUserID,
                        commentDateTime: $commentDateTime
                      ) {
                          commentID
                          commentText
                          commentUserID
                          commentDateTime
                        }
                    }`,
                    variables: {
                      "commentID": commentId,
                      "commentText": dsplyPrdctvtyCmmnt,
                      "commentUserID": userId,
                      "commentDateTime": new Date()
                    }
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {             
            console.log(data.data);              
            return data.data;
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        });

      }
      
      let lastUserCommentId = fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `{
                    getLastUserCommentsDocument {
                      commentID
                      commentText
                      commentUserID
                      commentDateTime
                    }
                  }`
          })
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {            
          return data.data.getLastUserCommentsDocument.commentID;
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ',    error.message);
      });
      
      lastUserCommentId.then(function(data) {
        let commentId = data + 1;                
        return insertUserCommmentsByCommentId(commentId);
      });

      this.setUserCommentArray(lastUserCommentId, this.$store, this.persistPunctualityComments);      
    },

    OpenProductivityComment () {
      console.log(this.ProductivityComment);      
      let store = this.$store;
      
      if (this.ProductivityComment != '') {       
        let productivityComment = fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query userCommmentsByCommentId($commentID: Int) {
                      userCommmentsByCommentId(commentID: $commentID) {
                        commentID
                        commentText
                        commentUserID
                        commentDateTime
                      }
                    }`,
                    variables: {"commentID": this.ProductivityComment[0]}
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.userCommmentsByCommentId);
            return data.data.userCommmentsByCommentId.commentText;
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation:  ', error.message);
        });

        productivityComment.then(function (data){            
          store.commit('setDisplayProductivityComment', data);   
        });
      }    

      this.$store.commit('setCommentOpen', true);
      this.$store.commit('setProductivityCommentOpen', true);
    },

    setUserAccessLevel () {
      console.log(this.UserId);
      let store = this.$store;                  
          
      let userAccessLevel = fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query userAccessLevelByTeamMemberId($teamMemberID: String) {
                    userAccessLevelByTeamMemberId(teamMemberID: $teamMemberID) {
                      teamMemberID
                      userAccessLevel
                    }
                  }`,
                  variables: {"teamMemberID": this.UserId.toString()}
          })
        })
        .then(function(res) {
          return res.json();
        })
        .then(function(data) {
          console.log(data);
          return data.data;
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation:  ', error.message);
      });

      //parseInt(

      userAccessLevel.then(function (data){
        console.log(data);            
        store.commit('setUserAccessLevel', data.userAccessLevelByTeamMemberId.userAccessLevel); 
      });
    },
    
    getLineGoals () {
      var query = `{lineGoals {
                    lineID
                    lineGoal
                    }
                  }`

      fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { }
          })
        })
        .then(res => res.json())
        .then(data => {
          // // console.log /g(data);
          this.LineGoals = data.data.lineGoals;           
        });
    },
    
    getSelectedLineGoal (productionDailyLineID) {
      for (let lineGoalObj of this.LineGoals) {
        // // console.log /g(lineGoalObj);
        // // console.log /g(productionDailyLineID);
        if (lineGoalObj.lineID === productionDailyLineID) {
          this.selectedLineGoal = lineGoalObj.lineGoal; 
        }
      }
      // // console.log /g(this.selectedLineGoal);
      return this.selectedLineGoal;
    },
    
    persistProductivity (productivityScoreValue) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // // console.log /g(masterScoreId);

      var query = `mutation productivityScoreByMasterScoreId($MasterScoreID: Int!, $ProductivityScoreValue: Float!) {productivityScoreByMasterScoreId(masterScoreID:$MasterScoreID, productivityScoreValue:$ProductivityScoreValue) {productivityScoreValue}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"ProductivityScoreValue": productivityScoreValue }
        })
      })
      .then(res => res.json())
      .then(data => {
        // // console.log /g(data);        
      });
    },
    
    persistProductivityScoreOverride (productivityScoreOverride) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // // console.log /g(masterScoreId);

      var query = `mutation productivityScoreOverrideByMasterScoreId($MasterScoreID: Int!, $ProductivityScoreOverride: Boolean!) {productivityScoreOverrideByMasterScoreId(masterScoreID:$MasterScoreID, productivityScoreOverride:$ProductivityScoreOverride) {productivityScoreOverride}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"ProductivityScoreOverride": productivityScoreOverride }
        })
      })
      .then(res => res.json())
      .then(data => {
        // // console.log /g(data);        
      });
    },
    
    persistProductionDailyLineID (productionDailyLineID) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // // console.log /g(masterScoreId);

      var query = `mutation productionDailyLineIDByMasterScoreId($MasterScoreID: Int!, $ProductionDailyLineID: String!) {productionDailyLineIDByMasterScoreId(masterScoreID:$MasterScoreID, productionDailyLineID:$ProductionDailyLineID) {productionDailyLineID}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"ProductionDailyLineID": productionDailyLineID }
        })
      })
      .then(res => res.json())
      .then(data => {
        // // console.log /g(data);        
      });
    },
    
    persistProductionDailyLinePerformance (productionDailyLinePerformance) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // // console.log /g(masterScoreId);

      var query = `mutation productionDailyLinePerformanceByMasterScoreId($MasterScoreID: Int!, $ProductionDailyLinePerformance: Int!) {productionDailyLinePerformanceByMasterScoreId(masterScoreID:$MasterScoreID, productionDailyLinePerformance: $ProductionDailyLinePerformance) {productionDailyLinePerformance}}`;
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({            
          query,
          variables: { "MasterScoreID": masterScoreId,"ProductionDailyLinePerformance": productionDailyLinePerformance }
        })
      })
      .then(res => res.json())
      .then(data => {
        // // console.log /g(data);        
      });
    },
    
    insertProductivityScoreValueByMasterID (
      masterScoreID,
      productivityScoreValue      
    ) {
      console.log(masterScoreID);
      console.log(productivityScoreValue);

      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation  insertProductivityScoreValueByMasterID(    
                $masterScoreID: Int, 
                $productivityScoreValue: Float                  
              ) {
                   insertProductivityScoreValueByMasterID(            
                    masterScoreID: $masterScoreID, 
                    productivityScoreValue: $productivityScoreValue,           
                  ) {
                      masterScoreID,
                      productivityScoreValue                      
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID,  "productivityScoreValue": productivityScoreValue }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    
    insertProductionDailyLineIDByMasterID (
      masterScoreID,      
      productionDailyLineID     
    ) {
      console.log(masterScoreID);
      console.log(productionDailyLineID);
      
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation  insertProductionDailyLineIDByMasterID(    
                $masterScoreID: Int,                    
                $productionDailyLineID: String,                  
              ) {
                   insertProductionDailyLineIDByMasterID(            
                    masterScoreID: $masterScoreID,                    
                    productionDailyLineID: $productionDailyLineID    
                  ) {
                      masterScoreID,                     
                      productionDailyLineID
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID,    "productionDailyLineID":  productionDailyLineID }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    
    insertProductionDailyLinePerformanceByMasterID (
      masterScoreID,
      productionDailyLinePerformance      
    ) {
      console.log(masterScoreID);
      console.log(productionDailyLinePerformance);

      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation  insertProductionDailyLinePerformanceByMasterID(    
                $masterScoreID: Int, 
                $productionDailyLinePerformance: Int                  
              ) {
                   insertProductionDailyLinePerformanceByMasterID(            
                    masterScoreID: $masterScoreID, 
                    productionDailyLinePerformance:   $productionDailyLinePerformance                    
                  ) {
                      masterScoreID,                      
                      productionDailyLinePerformance
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID, "productionDailyLinePerformance":  productionDailyLinePerformance }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    
    insertProductivityScoreOverrideByMasterID (
      masterScoreID,      
      productivityScoreOverride
    ) {
      console.log(masterScoreID);
      console.log(productivityScoreOverride);

      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation  insertProductivityScoreOverrideByMasterID(    
                $masterScoreID: Int,               
                $productivityScoreOverride: Boolean    
              ) {
                   insertProductivityScoreOverrideByMasterID(            
                    masterScoreID: $masterScoreID,                   
                    productivityScoreOverride: $productivityScoreOverride 
                  ) {
                      masterScoreID,                      
                      productivityScoreOverride
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID,  "productivityScoreOverride":   productivityScoreOverride }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    
    insertProductivityScoreCommentsByMasterID (
      masterScoreID,      
      productivityScoreComments
    ) {
      console.log(masterScoreID);
      console.log(productivityScoreComments);

      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation  insertProductivityScoreCommentsByMasterID(    
                $masterScoreID: Int,               
                $productivityScoreComments: [Int]    
              ) {
                   insertProductivityScoreCommentsByMasterID(            
                    masterScoreID: $masterScoreID,                   
                    productivityScoreComments: $productivityScoreComments
                  ) {
                      masterScoreID,                      
                      productivityScoreComments
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID,  "productivityScoreComments":   productivityScoreComments }
        })
      })
      .then(function(res) {
        return res.json();
      })
      .then(function(data) {
        console.log(data.data);
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    }
  }
}
</script>