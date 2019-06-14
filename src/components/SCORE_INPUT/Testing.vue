<template>
  <div>
      <h1>Testing</h1>
      <fieldset>
          <legend><b>Select Dates</b></legend>
          <label>Start Date:</label>
            <datepicker v-model="ScoreDateStart"></datepicker>          
          <label>End Date:</label>
            <datepicker v-model="ScoreDateEnd"></datepicker>                    
      </fieldset>
      <button v-on:click="getScoresInDateRange(ScoresRow, ScoresRows)">Get Scores</button>
      <hr>
      <table border="1">
        <tr>
          <td>Name</td>
          <td>Date</td>
          <td>Score ID</td>
          <td>Attendance</td>
          <td>Attendance Scheduled</td>
          <td>Punctuality Score</td>          
          <td>Productivity Score</td>
          <td>Productivity Line Goal</td>
          <td>Productivity Line Performance</td>
          <td>Values Score</td>
          <td>Competencies Score</td>
          <td>Total</td>
        </tr>
        <tr v-for="scoreRow in ScoresRows" v-bind:key="scoreRow.scoreID">
          <td>{{scoreRow.fullName}}</td>
          <td>{{scoreRow.scoreDate}}</td>
          <td>{{scoreRow.scoreID}}</td>
          <td>{{scoreRow.attendance}}</td>
          <td>{{scoreRow.attendanceScheduled}}</td>
          <td>{{scoreRow.punctualityScore}}</td>
          <td>{{scoreRow.productivityScore}}</td>
          <td>{{scoreRow.productivityLineGoal}}</td>
          <td>{{scoreRow.productivityLinePerformance}}</td>
          <td>{{scoreRow.valuesScore}}</td>
          <td>{{scoreRow.competenciesScore}}</td>
          <td>{{scoreRow.totalScore}}</td>          
        </tr>
      </table>     
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'

import TeamMember from '../../models/TeamMember'

export default {
  data () {
    return {
      ScoreDateStart: '02/04/2019',
      ScoreDateEnd: '03/29/2019',
      FullName: '', 
      ScoreDate: '',
      Attendance: '',
      PunctualityScore: '',
      PunctualityOnTime: '',
      PunctualityNotOnTime: '',
      ProductivityScore: '',
      ProductivityLineGoal: '',
      ProductivityLinePerformance: '',
      Values: '',
      Competencies: '',
      ScoresRow (fullName, scoreDate, scoreID, attendance, attendanceScheduled, punctualityScore, productivityScore, productivityLineGoal, productivityLinePerformance, valuesScore, competenciesScore, totalScore) {
        console.log(`${scoreID} ${fullName} ${scoreDate} ${attendance}  ${attendanceScheduled}  ${punctualityScore} ${productivityScore}  ${productivityLineGoal} ${productivityLinePerformance} ${valuesScore} ${competenciesScore} ${totalScore}`);
        this.fullName = fullName; 
        this.scoreDate = scoreDate;
        this.scoreID = scoreID; 
        this.attendance = attendance;
        this.attendanceScheduled = attendanceScheduled;
        this.punctualityScore = punctualityScore;       
        this.productivityScore = productivityScore, 
        this.productivityLineGoal = productivityLineGoal,
        this.productivityLinePerformance = productivityLinePerformance,
        this.valuesScore = valuesScore,
        this.competenciesScore = competenciesScore,
        this.totalScore = totalScore
      },
      ScoresRows: []
    }
  },
  components: {
    Datepicker
  },
  methods: {
    getTeamMemberName () {
      this.UserName = TeamMember.find(this.$store.state.UserId).fullName;
    },

    getAbsenceScores ({url, masterScoreId}) {
      // console.log /gg(this.ChosenTeamMember.scoreStatusID);
      // console.log /gg(this.ChosenTeamMember);
      // if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query absenceScoreByMasterScoreId($MasterScoreID: Int!) {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            absenceScoreValue
            masterScoreID
            absenceScoreID
            absenceScoreAbsentScheduledValue
          }
        }`; 
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json());
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query absenceScoreByMasterScoreId($MasterScoreID: Int!) {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            absenceScoreValue
            masterScoreID
            absenceScoreID
            absenceScoreAbsentScheduledValue
          }
        }`,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json());
      // }
    },

    getPunctualityScores ({url, masterScoreId}) {
      // if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query punctualityScoreByMasterScoreId($MasterScoreID: Int!) {punctualityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            punctualityScoreValue
            masterScoreID
            punctualityScoreID
            punctualityComments
          }
        }`; 
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json());
        
        fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query punctualityScoreByMasterScoreId($MasterScoreID: Int!) {punctualityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            punctualityScoreValue
            masterScoreID
            punctualityScoreID
            punctualityComments
          }
        }`,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json());
      // }
    },

    getProductivityScores (masterScoreId) {
      // console.log /gg(this.ChosenTeamMember.scoreStatusID);
      // console.log /gg(this.ChosenTeamMember);
      if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query productivityScoreByMasterScoreId($MasterScoreID: Int!) {productivityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            productionDailyLineID
            productivityScoreComments
            productionDailyLinePerformance
            masterScoreID
            productivityScoreID
            productivityScoreValue
            productivityScoreOverride
          }
        }`; 
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json())
        .then(data => {
          // console.log /gg(data);
          this.$store.commit('setProductivity', data.data.productivityScoreByMasterScoreId.productivityScoreValue);  
          this.$store.commit('setProductivityScoreOverride', data.data.productivityScoreByMasterScoreId.productivityScoreOverride);this.$store.commit('setProductionDailyLinePerformance', data.data.productivityScoreByMasterScoreId.productionDailyLinePerformance);
          this.$store.commit('setProductionDailyLineID', data.data.productivityScoreByMasterScoreId.productionDailyLineID);
        });
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query productivityScoreByMasterScoreId($MasterScoreID: Int!) {productivityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            productionDailyLineID
            productivityScoreComments
            productionDailyLinePerformance
            masterScoreID
            productivityScoreID
            productivityScoreValue
            productivityScoreOverride
          }
        }`,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => {
          console.log(res.json());
        });        
      }
    },

    getValuesScores (masterScoreId) {
      // console.log /gg(this.ChosenTeamMember.scoreStatusID);
      // console.log /gg(this.ChosenTeamMember);
      // console.log /gg(masterScoreId);
      if (this.ChosenTeamMember.scoreStatusID != '0') {
        
        // var masterScoreId = parseInt(masterScoreId);
        var query = `query coreValueScoreByMasterScoreId($MasterScoreID: Int!) {coreValueScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            valuesScoreID
            valuesScoreValues            
            valuesScoreComments
            masterScoreID            
          }
        }`;
                
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json())
        .then(data => {
          // console.log /gg(data);
          this.$store.commit('setValuesArray', data.data.coreValueScoreByMasterScoreId.valuesScoreValues);

          // console.log /gg(data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b) => a + b));

          // if valuesScoreValues array contains a 0 setValues to 0, if else setValues sums to 15 setValues to 31.5, if else setValues sums to greater than 15 setValues to 33, else setValues to 30
          if (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.includes(0)) {
            this.$store.commit('setValues', 0); 
          } 
          else if (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b) => a + b) === 15) {            
            this.$store.commit('setValues', 31.5);
          } 
          else if (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b) => a + b) > 15) {
            this.$store.commit('setValues', 33);
          } 
          else {
            this.$store.commit('setValues', 30);
          }
          
          this.$store.commit('setSafety', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[0]);
          this.$store.commit('setRespect', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[1]);        this.$store.commit('setIntegrity', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[2]);        this.$store.commit('setTeamwork', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[3]);
          this.$store.commit('setInnovation', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[4]);
          this.$store.commit('setQualityOfWork', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[5]);
          this.$store.commit('setCustomerFocus', data.data.coreValueScoreByMasterScoreId.valuesScoreValues[6]);     
        });        
      }
    },

    getCompetenciesScores (masterScoreId) {
      console.log(this.ChosenTeamMember.scoreStatusID);
      console.log(this.ChosenTeamMember);
      console.log(masterScoreId);
      if (this.ChosenTeamMember.scoreStatusID != '0') {
        var query = `query competencyScoreByMasterScoreId($MasterScoreID: Int!) {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            competencyScoreID
            competencyArrayIDs            
            competencyScoreValues
            competencyScoreComments
            masterScoreID            
          }
        }`;
                
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          var competencyArrayIndex = 0;
          var compentencyScore = data.data.competencyScoreByMasterScoreId.competencyScoreValues.reduce((a, b) => a + b);
          
          this.$store.commit('setCompetenciesArray', data.data.competencyScoreByMasterScoreId.competencyScoreValues);
          this.$store.commit('setCompetenciesArrayIDs', data.data.competencyScoreByMasterScoreId.competencyArrayIDs);

          // this.$store.state.CompetencyScores

          for (let competency in this.$store.state.CompetencyScores) {          
            var competencyScoresIndexKeyValue = {index: '', key: '', value: ''};            

            console.log(competency);
            console.log(this.$store.state.CompetencyScores[competency]);       
            console.log(data.data.competencyScoreByMasterScoreId.competencyArrayIDs);
            console.log(data.data.competencyScoreByMasterScoreId.competencyArrayIDs.includes(parseInt(competency)));

            if (data.data.competencyScoreByMasterScoreId.competencyArrayIDs.includes(parseInt(competency))) {
              console.log(`includes( ${competency} )`);
              for (let key in this.$store.state.CompetencyScores[competency]) {
                console.log(key);
                competencyScoresIndexKeyValue.index = competency; 
                competencyScoresIndexKeyValue.key = key;
                competencyScoresIndexKeyValue.value = this.$store.state.CompetenciesArray[competencyArrayIndex];
                console.log(competencyScoresIndexKeyValue);
                this.$store.commit('setCompetencyScores', competencyScoresIndexKeyValue);
                competencyArrayIndex++;
              }           
            }                
          }
          console.log(this.$store.state.CompetencyScores);

          // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
          if (data.data.competencyScoreByMasterScoreId.competencyArrayIDs.length === 7) {
            console.log(`Competencies Score: ${compentencyScore}`);
            if (compentencyScore < 13) {
              this.$store.commit('setCompetencies', 0);
            }
            else if (compentencyScore > 15) {
              this.$store.commit('setCompetencies', 33);
            }
            else {
              switch (compentencyScore) {
                case 13:
                case 14:
                case 15:
                  this.$store.commit('setCompetencies', 30);
                break;
                default: 
                  alert('MISSSED a Productivity score possibility'); 
                  console.log('MISSSED a possibility');
                  break;
              }
            }            
          }

          // if competencyArrayIDs array contains 8 elements => if compentencyScore < 15 'setCompetencies' to 0, else if compentencyScore > 17 'setCompetencies'to 33, else case 15:, case 16:, case 17: 'setCompetencies' to 30
          else {
            console.log(`Competencies Score: ${compentencyScore}`);
            if (compentencyScore < 15) {
              this.$store.commit('setCompetencies', 0);
            }
            else if (compentencyScore > 17) {
              this.$store.commit('setCompetencies', 33);
            }
            else {
              switch (compentencyScore) {
                case 15:
                case 16:
                case 17:
                  this.$store.commit('setCompetencies', 30);
                break;
                default: 
                  alert('MISSSED a Productivity score possibility'); 
                  console.log('MISSSED a possibility');
                  break;
              }
            }     
          }          
        });
      }

      var query = `query competencyScoreByMasterScoreId($MasterScoreID: Int!) {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            competencyScoreID
            competencyArrayIDs            
            competencyScoreValues
            competencyScoreComments
            masterScoreID            
          }
        }`;
                
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query competencyScoreByMasterScoreId($MasterScoreID: Int!) {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            competencyScoreID
            competencyArrayIDs            
            competencyScoreValues
            competencyScoreComments
            masterScoreID            
          }
        }`,
            variables: { "MasterScoreID": masterScoreId }
          })
        })
        .then(res => {
          res.json();
        });
    },

    getScoresInDateRange (ScoresRow, ScoresRows) {
      var thenCycleCntr0 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr1 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr2 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr2 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr3 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr4 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr5 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr6 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();

      var thenCycleCntr7 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();
      var thenCycleCntr8 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();
      var thenCycleCntr9 = (function () {
                            var cntr = -1;
                            return function () {
                              cntr += 1;
                              return cntr;
                            }
                          })();      

      var mmDdYyyyDateStart, mmDdYyyyDateEnd;

      var query = `query scoresByDateRange($ScoreDateStart: String!, $ScoreDateEnd: String! ) {
          scoresByDateRange(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd) {
            scoreID
            scoreDate
            scoreTeamMemberID
            absenceScoreID
            punctualityScoreID
            productivityScoreID
            competencyScoreID            
            valuesScoreID
            totalScore
          }
        }`;

      var requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];     

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');

      var getScoresDataArray = function () {
        console.log(ScoresDataArray);
        for (let score of ScoresDataArray) {
          console.log(score);
          console.log(Object.keys(score));
        }
        ScoresDataArray.length = 0;
      };

      fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query,
            variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd": mmDdYyyyDateEnd  }
          })
        })
        .then(res => res.json())
        .then(data => {
          
          this.ScoresRows.length = 0;
          // console.log(data);
          scores.length = 0;
          // console.log(data.data.scoresByDateRange);
          var scoresCntr = 0;
          for (let score of data.data.scoresByDateRange) {
            if (scoresCntr <= 10) {
              scores.push(score);
              scoresCntr++;
            }                         
          }
          console.log(scores);               
          
          var absencePromise = function (masterScoreId) {
            // let mstrScoreId = masterScoreId;             
            return fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query absenceScoreByMasterScoreId($MasterScoreID: Int!) {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
                absenceScoreValue
                masterScoreID
                absenceScoreID
                absenceScoreAbsentScheduledValue
              }
            }`,
                variables: { "MasterScoreID": masterScoreId }
              })
            })
            .then(res => res.json());
          };
          
          var punctualityPromise = function (masterScoreId) {
            let mstrScoreId = masterScoreId;          
            return fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query punctualityScoreByMasterScoreId($MasterScoreID: Int!) {punctualityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
                punctualityScoreValue
                masterScoreID
                punctualityScoreID
                punctualityComments
              }
            }`,
                variables: { "MasterScoreID": masterScoreId }
              })
            })
            .then(res => res.json());
          }            

          var productivityPromise = function (masterScoreId) {
            let mstrScoreId = masterScoreId;
            return fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query productivityScoreByMasterScoreId($MasterScoreID: Int!) {productivityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
                productionDailyLineID
                productivityScoreComments
                productionDailyLinePerformance
                masterScoreID
                productivityScoreID
                productivityScoreValue
                productivityScoreOverride
              }
            }`,
                variables: { "MasterScoreID": masterScoreId }
              })
            })
            .then(res => res.json());
          }

          var valuesPromise = function (masterScoreId) {
            let mstrScoreId = masterScoreId;
            return fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query coreValueScoreByMasterScoreId($MasterScoreID: Int!) {coreValueScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
                  valuesScoreID
                  valuesScoreValues            
                  valuesScoreComments
                  masterScoreID            
                }
              }`,
                variables: { "MasterScoreID": masterScoreId }
              })
            })
            .then(res => res.json());
          }

          var competencyPromise = function (masterScoreId) {
            let mstrScoreId = masterScoreId;
            return fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query competencyScoreByMasterScoreId($MasterScoreID: Int!) {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
                competencyScoreID
                competencyArrayIDs            
                competencyScoreValues
                competencyScoreComments
                masterScoreID            
              }
            }`,
                variables: { "MasterScoreID": masterScoreId }
              })
            })
            .then(res => res.json());                
          }         
          
          // return Promise.all(scores.map( score => {
          var getScoresByMasterScoreIdLoop = function (scores) {
            let promiseArray = [],
                scoreDateArray = [],
                fullNameArray = [],
                scoreIDArray = [],
                totalScoreArray = [],
                displayRowCount = 0;
                      
            for (let score of scores) {
              // let promiseArray = [];
              promiseArray.push([]);
              console.log(score);
              for (let promiseFunctionIndex = 0; promiseFunctionIndex <= 8; promiseFunctionIndex++) {
                console.log(displayRowCount);             

                console.log(promiseFunctionIndex);
                
                switch (promiseFunctionIndex) {
                  case 0:
                    console.log('Case 0: ' + score.scoreID);         
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = absencePromise(score.scoreID);
                    
                    break;
                  case 1:
                    console.log('Case 1: ' + score.scoreID);
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = punctualityPromise(score.scoreID);
                    
                    break;
                  case 2:
                    console.log('Case 2: ' + score.scoreID);
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = productivityPromise(score.scoreID);
                    
                    break;
                  case 3:
                    console.log('Case 3: ' + score.scoreID);
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = valuesPromise(score.scoreID);
                    
                    break;
                  case 4:
                    console.log('Case 4: ' + score.scoreID);
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = competencyPromise(score.scoreID);
                    
                    break;
                  case 5:
                    console.log('Case 5: ' + score.scoreID);

                    promiseArray[displayRowCount][promiseFunctionIndex] = TeamMember.find(score.scoreTeamMemberID).fullName;
                    
                    break;
                  case 6:
                    console.log('Case 6: ' + score.scoreID);

                    promiseArray[displayRowCount][promiseFunctionIndex] = score.scoreDate; 
                    
                    break;
                  case 7:
                    console.log('Case 7: ' + score.scoreID);
                    
                    promiseArray[displayRowCount][promiseFunctionIndex] = score.scoreID;

                    break;
                  case 8:
                    console.log('Case 8: ' + score.scoreID);

                    promiseArray[displayRowCount][promiseFunctionIndex] = score.totalScore;

                    break;
                  default:
                    console.log("no such case in switch statement promiseFunctionIndex");
                }                    
              }
              displayRowCount++;                                   
            }                 

            console.log(promiseArray);            
            console.log(scoresCntr);

            // for (let array of promiseArray) {            

            //   console.log(promiseArrayIndex);
            //   console.log(array[promiseArrayIndex]);             
            //   console.log(array);
            //   console.log(scoreDateArray);
            //   console.log(scoreIDArray);
            //   console.log(fullNameArray);
            //   console.log(totalScoreArray);


            for (let promiseArrayIndex = 0; promiseArrayIndex < scoresCntr; promiseArrayIndex++) {

              let fullName = '',
                  scoreDate = '',
                  scoreID = '',
                  attendance = '',
                  attendanceScheduled = '',
                  punctualityScore = '',
                  productivityScore = '',
                  productivityLineGoal = '',
                  productivityLinePerformance = '',
                  valuesScore = '',
                  competenciesScore = '',
                  totalScore = '',
                  thenCycleCntr = 0;                     
              
              console.log(promiseArray[promiseArrayIndex].length);

              for (let index = 0; index < promiseArray[promiseArrayIndex].length; index++) {
                
                console.log(index);              
                
                switch (index) {                        
                  case 0:
                    console.log('Case 0 ' + index);
                    // let cntr0 = 0
                    // console.log(cntr0);
                    promiseArray[promiseArrayIndex][index].then(data => {
                      console.log(data.data.absenceScoreByMasterScoreId);
                      
                      if (data.data.absenceScoreByMasterScoreId != null) {
                        
                        console.log(ScoresRows);                     
                                             
                        ScoresRows[thenCycleCntr0()]['attendance'] = data.data.absenceScoreByMasterScoreId.absenceScoreValue;
                        
                        ScoresRows[thenCycleCntr1()]['attendanceScheduled'] = data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue;
                        
                        
                      }
                      else {
                        ScoresRows[thenCycleCntr0()]['attendance'] = null;
                        
                        
                      }                           
                    });
                    break;
                  case 1:
                    console.log('Case 1 ' + index);
                    
                    promiseArray[promiseArrayIndex][index].then(data => {
                      console.log(data.data.punctualityScoreByMasterScoreId);
                      
                      if (data.data.punctualityScoreByMasterScoreId != null) {
                         
                        ScoresRows[thenCycleCntr3()]['punctualityScore'] = data.data.punctualityScoreByMasterScoreId.punctualityScoreValue;
                        
                        
                      }
                      else {
                        ScoresRows[thenCycleCntr3()]['punctualityScore'] = null;
                        
                        
                      }                                                 
                    });
                    break;
                  case 2:
                    console.log('Case 2 ' + index);
                    
                    promiseArray[promiseArrayIndex][index].then(data => {
                      console.log(data.data.productivityScoreByMasterScoreId);
                      
                      if (data.data.productivityScoreByMasterScoreId != null) {
                        
                        ScoresRows[thenCycleCntr5()]['productivityLineGoal'] = data.data.productivityScoreByMasterScoreId.productivityScoreValue;
                        ScoresRows[thenCycleCntr6()]['productivityLinePerformance'] = data.data.productivityScoreByMasterScoreId.productivityLineGoal;
                        ScoresRows[thenCycleCntr7()]['productivityScore'] = data.data.productivityScoreByMasterScoreId.productionDailyLinePerformance;
                        
                        
                      }
                      else {
                        ScoresRows[thenCycleCntr5()]['productivityLineGoal'] = null;
                        ScoresRows[thenCycleCntr6()]['productivityLinePerformance'] = null;
                        ScoresRows[thenCycleCntr7()]['productivityScore'] = null;
                        
                        
                      }       
                    });
                    break;
                  case 3:
                    console.log('Case 3 ' + index);
                    
                    promiseArray[promiseArrayIndex][index].then(data => {
                      console.log(data.data.coreValueScoreByMasterScoreId);
                      
                      if (data.data.coreValueScoreByMasterScoreId != null) {
                        
                        ScoresRows[thenCycleCntr8()]['valuesScore'] = data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce(function (a, b) {return a + b;});
                        
                                            
                      }
                      else {
                        ScoresRows[thenCycleCntr8()]['valuesScore'] = null;
                        
                        
                      }                             
                    });
                    break;
                  case 4:
                    console.log('Case 4 ' + index);
                    
                    promiseArray[promiseArrayIndex][index].then(data => {
                      console.log(data.data.competencyScoreByMasterScoreId);
                      
                      if (data.data.competencyScoreByMasterScoreId != null) {
                        
                        ScoresRows[thenCycleCntr9()]['competenciesScore'] = data.data.competencyScoreByMasterScoreId.competencyScoreValues.reduce(function (a, b) {return a + b;});            
                        
                        
                      }
                      else {
                        ScoresRows[thenCycleCntr9()]['competenciesScore'] = null;                                            
                      }                             
                    });
                    break;
                  case 5: 
                    console.log('Case 5 ' + index);

                    fullName = promiseArray[promiseArrayIndex][index];
                    break;
                  case 6:
                    console.log('Case 6 ' + index);

                    scoreDate = promiseArray[promiseArrayIndex][index];
                    break;
                  case 7:
                    console.log('Case 7 ' + index);

                    scoreID = promiseArray[promiseArrayIndex][index];
                    break;
                  case 8:
                    console.log('Case 8 ' + index);

                    totalScore = promiseArray[promiseArrayIndex][index];
                    break;
                  default:
                    console.log('Unhandled case');
                }              
              }
              console.log(`${fullName} ${scoreDate} ${scoreID} ${attendance} ${attendanceScheduled} ${punctualityScore} ${productivityScore} ${productivityLineGoal} ${productivityLinePerformance} ${valuesScore} ${competenciesScore} ${totalScore}`);

              let scoresRow = new ScoresRow(fullName, scoreDate, scoreID, attendance, attendanceScheduled, punctualityScore, productivityScore, productivityLineGoal, productivityLinePerformance, valuesScore, competenciesScore, totalScore);

              ScoresRows.push(scoresRow);                    
            }                
          };

          getScoresByMasterScoreIdLoop(scores);             
        });        
      }
  }
}
</script>