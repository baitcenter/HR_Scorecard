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
      <button v-on:click="getScoresInDateRange()">Populate "All Scores" DB</button>
      <button v-on:click="displayScoresInDateRange(ScoresRow, ScoresRows)">Display Scores</button>
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
      ScoresRow (fullName, scoreDate, scoreID, attendance, attendanceScheduled, punctualityScore, productivityScore, productivityLineGoal, productivityLinePerformance, valuesScore, competenciesScore, totalScore) {
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
    getScoresInDateRange () {
      var mmDdYyyyDateStart, mmDdYyyyDateEnd;

      var query = `query scoresByDateRange($ScoreDateStart: String!, $ScoreDateEnd: String! ) {
          scoresByDateRange(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd) {
            scoreID
            scoreDate
            scoreTeamMemberID
            scoreUserID
            scoreInEditState
            positionTeamMemberID
            departmentTeamMemberID
            shiftTeamMemberID
            scoreStatusID
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

      // console.log(this.ScoreDateStart);
      // console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');     

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
      .then(function(res) { 
        res.json()
      })
      .then(function(data) {
        console.log(data.data.scoresByDateRange);
        
        var insertAbsenceScoreByMasterScoreIdPromise = function (masterScoreID, absenceScoreValue, absenceScoreAbsentScheduledValue) {
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
            res.json();
          })
          .then(function(data) {
            console.log(data.data);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        var absencePromise = function (masterScoreId) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;             
          fetch('http://apcc-srvm-01:4000/graphql', {
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
          .then(function(res) {
            res.json();
          })
          .then(function(data) {
            console.log(data.data.absenceScoreByMasterScoreId);

            let insertAbsenceScoreByMasterScoreIdPromises = [];            
            
            if (data.data.absenceScoreByMasterScoreId != null) {
              insertAbsenceScoreByMasterScoreIdPromises.push  (insertAbsenceScoreByMasterScoreIdPromise(data.data.absenceScoreByMasterScoreId.masterScoreID,  data.data.absenceScoreByMasterScoreId.absenceScoreValue, data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue));
            }
            else {
              insertAbsenceScoreByMasterScoreIdPromises.push  (insertAbsenceScoreByMasterScoreIdPromise(null, null, null));
            }

            Promise.all(insertAbsenceScoreByMasterScoreIdPromises);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        var insertPunctualityScoreByMasterIdPromise = function (masterScoreID, punctualityScoreValue, punctualityComments) {
          console.log(masterScoreID  + ' ' + punctualityScoreValue + ' ' + punctualityComments);
          fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation InsertPunctualityScoreByMasterID(    
                    $masterScoreID: Int, 
                    $punctualityScoreValue: Int, 
                    $punctualityComments: [Int]    
                  ) {
                      insertPunctualityScoreByMasterID(            
                        masterScoreID: $masterScoreID, 
                        punctualityScoreValue: $punctualityScoreValue, 
                        punctualityComments: $punctualityComments 
                      ) {
                          masterScoreID,
                          punctualityScoreValue,
                          punctualityComments
                        }
                }`, 
                    variables: { "masterScoreID": masterScoreID, "punctualityScoreValue": punctualityScoreValue, "punctualityComments": punctualityComments  }
            })
          })
          .then(function(res) {
            res.json();
          })
          .then(function(data) {
            console.log(data.data);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };

        var punctualityPromise = function (masterScoreId) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;          
          fetch('http://apcc-srvm-01:4000/graphql', {
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
          .then(function(res) {
            res.json();
          })
          .then(function(data) {
            console.log(data.data.punctualityScoreByMasterScoreId);

            let insertPunctualityScoreByMasterIdPromises = [];            
            
            if (data.data.punctualityScoreByMasterScoreId != null) {
              insertPunctualityScoreByMasterIdPromises.push  (insertPunctualityScoreByMasterIdPromise(data.data.punctualityScoreByMasterScoreId.masterScoreID,  data.data.punctualityScoreByMasterScoreId.punctualityScoreValue, data.data.punctualityScoreByMasterScoreId.punctualityComments));
            }
            else {
              insertPunctualityScoreByMasterIdPromises.push  (insertPunctualityScoreByMasterIdPromise(null, null, null));
            }

            Promise.all(insertPunctualityScoreByMasterIdPromises);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        var insertProductivityScoreByMasterIdPromise = function(
          masterScoreID,
          productivityScoreValue,
          productionDailyLineID,
          productionDailyLinePerformance,
          productivityScoreOverride
        ) {
          fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation InsertProductivityScoreByMasterID(    
                    $masterScoreID: Int, 
                    $productivityScoreValue: Float, 
                    $productionDailyLineID: String,    
                    $productionDailyLinePerformance: Int,
                    $productivityScoreOverride: Boolean    
                  ) {
                      insertProductivityScoreByMasterID(            
                        masterScoreID: $masterScoreID, 
                        productivityScoreValue: $productivityScoreValue, 
                        productionDailyLineID: $productionDailyLineID,
                        productionDailyLinePerformance: $productionDailyLinePerformance,
                        productivityScoreOverride: $productivityScoreOverride 
                      ) {
                          masterScoreID,
                          productivityScoreValue,
                          productionDailyLineID,
                          productionDailyLinePerformance,
                          productivityScoreOverride
                        }
                }`, 
                    variables: { "masterScoreID": masterScoreID, "productivityScoreValue": productivityScoreValue, "productionDailyLineID": productionDailyLineID, "productionDailyLinePerformance": productionDailyLinePerformance, "productivityScoreOverride": productivityScoreOverride }
            })
          })
          .then(function(res) {
            res.json()
          })
          .then(function(data) {
            console.log(data.data);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;
        };

        var productivityPromise = function (masterScoreId) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;
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
          .then(function(res) {
            res.json()
          })
          .then(function(data) {
            console.log(data.data.productivityScoreByMasterScoreId);

            let insertProductivityScoreByMasterIdPromises = [];

            if (data.data.productivityScoreByMasterScoreId != null) {
              insertProductivityScoreByMasterIdPromises.push(insertProductivityScoreByMasterIdPromise(
                data.data.productivityScoreByMasterScoreId.masterScoreID,
                data.data.productivityScoreByMasterScoreId.productivityScoreValue,
                data.data.productivityScoreByMasterScoreId.productionDailyLineID,
                data.data.productivityScoreByMasterScoreId.productionDailyLinePerformance,
                data.data.productivityScoreByMasterScoreId.productivityScoreOverride,
              ));
            }
            else {
              insertProductivityScoreByMasterIdPromises.push(insertProductivityScoreByMasterIdPromise(null, null, null, null, null));
            }

            Promise.all(insertProductivityScoreByMasterIdPromises);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };

        var insertValuesScoreByMasterIdPromise = function (          
          valuesScoreValues,  
          valuesScoreComments,
          masterScoreID,     
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
                    variables: { "masterScoreID": masterScoreID, "valuesScoreValues": valuesScoreValues, "valuesScoreComments": valuesScoreComments }
            })
          })
          .then(function(res) {
            res.json();
          })
          .then(function(data) {
            console.log(data.data);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };

        var valuesPromise = function (masterScoreId) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;
          fetch('http://apcc-srvm-01:4000/graphql', {
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
          .then(function(res) {
            res.json();
          })
          .then(function(data) {
            console.log(data.data.coreValueScoreByMasterScoreId);

            let insertValuesScoreByMasterIdPromises = [];

            if (data.data.coreValueScoreByMasterScoreId != null) {
              insertValuesScoreByMasterIdPromises.push(insertValuesScoreByMasterIdPromise(coreValueScoreByMasterScoreId.valuesScoreValues, coreValueScoreByMasterScoreId.valuesScoreComments,
              coreValueScoreByMasterScoreId.masterScoreID));
            }
            else {
              insertValuesScoreByMasterIdPromises.push(insertValuesScoreByMasterIdPromise(null, null, null));
            }

            Promise.all(insertValuesScoreByMasterIdPromises);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        var competencyPromise = function (masterScoreId) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;
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
          .then(function(res) {
            res.json()
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });                
        };

        var dateTotalNameTeamMemberIdEtcPromise = function (
          masterScoreID,
          fullName,
          scoreTeamMemberID,
          scoreUserID,
          scoreInEditState,
          positionTeamMemberID,
          departmentTeamMemberID,
          shiftTeamMemberID,
          scoreStatusID,
          scoreDate,
          totalScore
          ) {
          console.log(masterScoreId);
          // let mstrScoreId = masterScoreId;
          fetch('http://apcc-srvm-01:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              query: `mutation InsertDateTotalNameTeamMemberIDByMasterID(         
                      $masterScoreID: Int!, 
                      $fullName: String!,
                      $scoreTeamMemberID: String!,
                      $scoreUserID: String!,
                      $scoreInEditState: Boolean!,
                      $positionTeamMemberID: String,
                      $departmentTeamMemberID: String,
                      $shiftTeamMemberID: Int!,
                      $scoreStatusID: Int!,
                      $scoreDate: String!,                          
                      $totalScore: Float!  
                    ) {
                        insertDateTotalNameTeamMemberIDByMasterID(      
                          masterScoreID: $masterScoreID, 
                          fullName: $fullName,
                          scoreTeamMemberID: $scoreTeamMemberID,
                          scoreUserID: $scoreUserID,
                          scoreInEditState: $scoreInEditState,
                          positionTeamMemberID: $positionTeamMemberID,
                          departmentTeamMemberID: $departmentTeamMemberID,
                          shiftTeamMemberID: $shiftTeamMemberID,
                          scoreStatusID: $scoreStatusID,
                          scoreDate: $scoreDate, 
                          totalScore: $totalScore
                        ) {
                            masterScoreID,
                            fullName,
                            scoreTeamMemberID,
                            scoreUserID,
                            scoreInEditState,
                            positionTeamMemberID,
                            departmentTeamMemberID,
                            shiftTeamMemberID,
                            scoreStatusID,
                            scoreDate,
                            totalScore
                        }
                  }`, 
              variables: { 
                "masterScoreID": masterScoreID, 
                "scoreDate": scoreDate, 
                "fullName": fullName, 
                "scoreTeamMemberID": scoreTeamMemberID, 
                "scoreUserID": scoreUserID, 
                "scoreInEditState": scoreInEditState, "positionTeamMemberID":   positionTeamMemberID, "departmentTeamMemberID":   departmentTeamMemberID, "shiftTeamMemberID": shiftTeamMemberID,   "scoreStatusID":  scoreStatusID, 
                "totalScore": totalScore 
              }
            })
          })
          .then(function(res) {
            res.json();
          })                  
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ',   error.message);
          });
        };        
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    },
  }
}
</script>     