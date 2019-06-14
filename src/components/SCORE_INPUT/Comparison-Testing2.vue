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
        // console.log(`${scoreID} ${fullName} ${scoreDate} ${attendance}  ${attendanceScheduled}  ${punctualityScore} ${productivityScore}  ${productivityLineGoal} ${productivityLinePerformance} ${valuesScore} ${competenciesScore} ${totalScore}`);
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
      .then(res => res.json())
      .then(data => {
        
        this.ScoresRows.length = 0;
        // // console.log(data);
        scores.length = 0;
        // // console.log(data.data.scoresByDateRange);
        var scoresCntr = 0;
        for (let score of data.data.scoresByDateRange) {
          // if (scoresCntr <= 9) {
            scores.push(score);
            scoresCntr++;
          // }                         
        }
        console.log(scoresCntr);               
        
        var absencePromise = function (masterScoreId) {
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
          .then(res => res.json())
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;
        };
        
        var punctualityPromise = function (masterScoreId) {
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
          .then(res => res.json())
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;
        }            

        var productivityPromise = function (masterScoreId) {
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
          .then(res => res.json())
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;
        }

        var valuesPromise = function (masterScoreId) {
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
          .then(res => res.json())
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;
        }

        var competencyPromise = function (masterScoreId) {
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
          .then(res => res.json())
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });;                
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
            // console.log(score);
            for (let promiseFunctionIndex = 0; promiseFunctionIndex <= 8; promiseFunctionIndex++) {
              // console.log(displayRowCount);             

              // console.log(promiseFunctionIndex);

              switch (promiseFunctionIndex) {
                case 0:
                  // console.log('Case 0: ' + score.scoreID);         
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = absencePromise(score.scoreID);                    
                  
                  break;
                case 1:
                  // console.log('Case 1: ' + score.scoreID);
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = punctualityPromise(score.scoreID);
                                      
                  break;
                case 2:
                  // console.log('Case 2: ' + score.scoreID);
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = productivityPromise(score.scoreID);
                                      
                  break;
                case 3:
                  // console.log('Case 3: ' + score.scoreID);
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = valuesPromise(score.scoreID);
                  
                  break;
                case 4:
                  // console.log('Case 4: ' + score.scoreID);
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = competencyPromise(score.scoreID);
                  
                  break;
                case 5:
                  // console.log('Case 5: ' + score.scoreID);

                  promiseArray[displayRowCount][promiseFunctionIndex] = TeamMember.find(score.scoreTeamMemberID).fullName;
                  
                  break;
                case 6:
                  // console.log('Case 6: ' + score.scoreID);

                  promiseArray[displayRowCount][promiseFunctionIndex] = score.scoreDate; 
                  
                  break;
                case 7:
                  // console.log('Case 7: ' + score.scoreID);
                  
                  promiseArray[displayRowCount][promiseFunctionIndex] = score.scoreID;

                  break;
                case 8:
                  // console.log('Case 8: ' + score.scoreID);

                  promiseArray[displayRowCount][promiseFunctionIndex] = score.totalScore;

                  break;
                default:
                  // console.log("no such case in switch statement promiseFunctionIndex");
              }                    
            }
            displayRowCount++;
          }
          // console.log(promiseArray);            
          // console.log(scoresCntr);
          
          for (let promiseArrayIndex = 0; promiseArrayIndex < scoresCntr; promiseArrayIndex++) {
            console.log(scoresCntr);
            for (let index = 0; index <= 5; index++) {
              switch (index) {                        
                case 0:
                  promiseArray[promiseArrayIndex][index].then(data => {
                    // console.log(data.data.absenceScoreByMasterScoreId);
                    let masterscoreID,
                        absenceScoreValue,
                        absenceScoreAbsentScheduledValue;
                        
                    if (data.data.absenceScoreByMasterScoreId != null) {
                      masterscoreID = data.data.absenceScoreByMasterScoreId.masterScoreID;
                      
                      absenceScoreValue = data.data.absenceScoreByMasterScoreId.absenceScoreValue;
                      
                      absenceScoreAbsentScheduledValue =  data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue;
                    }
                    else {
                      masterscoreID = null;
                      absenceScoreValue = null;
                      absenceScoreAbsentScheduledValue = null;
                    }  

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
                              variables: { "masterScoreID": masterscoreID, "absenceScoreValue": absenceScoreValue, "absenceScoreAbsentScheduledValue": absenceScoreAbsentScheduledValue  }
                      })
                    })
                    .then(res => console.log(res.json()))
                    .catch(function(error) {
                      console.log('There has been a problem with your fetch operation: ', error.message);
                    });
                  });
                break;
                case 1:
                  // console.log('Case 1 ' + index);
                  
                  promiseArray[promiseArrayIndex][index].then(data => {
                    // console.log(data.data.punctualityScoreByMasterScoreId);
                    
                    let masterscoreID,
                        punctualityScoreValue,
                        punctualityComments;

                    if (data.data.punctualityScoreByMasterScoreId != null) {
                      masterscoreID = data.data.punctualityScoreByMasterScoreId.masterScoreID;
                      
                      punctualityScoreValue = data.data.punctualityScoreByMasterScoreId.punctualityScoreValue;
                      
                      punctualityComments =  data.data.punctualityScoreByMasterScoreId.punctualityComments;
                    }
                    else {
                      masterscoreID = null;
                      punctualityScoreValue = null;
                      punctualityComments = null;
                    }
                    
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
                              variables: { "masterScoreID": masterscoreID, "punctualityScoreValue": punctualityScoreValue, "punctualityComments": punctualityComments  }
                      })
                    })
                    .then(res => console.log(res.json()))
                    .catch(function(error) {
                      console.log('There has been a problem with your fetch operation: ', error.message);
                    });
                  });
                break;
                case 2:
                  // console.log('Case 2 ' + index);
                  
                  promiseArray[promiseArrayIndex][index].then(data => {
                    // console.log(data.data.productivityScoreByMasterScoreId);                     
                    let masterscoreID,
                        productivityScoreValue,
                        productionDailyLineID,
                        productionDailyLinePerformance,
                        productivityScoreOverride;

                    if (data.data.productivityScoreByMasterScoreId != null) {
                      masterscoreID = data.data.productivityScoreByMasterScoreId.masterScoreID;
                      
                      productivityScoreValue = data.data.productivityScoreByMasterScoreId.productivityScoreValue;
                      
                      productionDailyLineID =  data.data.productivityScoreByMasterScoreId.productionDailyLineID;
                      
                      productionDailyLinePerformance =  data.data.productivityScoreByMasterScoreId.productionDailyLinePerformance;
                      
                      productivityScoreOverride =  data.data.productivityScoreByMasterScoreId.productivityScoreOverride;                         
                    }
                    else {
                      masterscoreID = null;
                      productivityScoreValue = null;
                      productionDailyLineID = null;
                      productionDailyLinePerformance = null;
                      productivityScoreOverride = null;
                    }
                    
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
                              variables: { "masterScoreID": masterscoreID, "productivityScoreValue": productivityScoreValue, "productionDailyLineID": productionDailyLineID, "productionDailyLinePerformance": productionDailyLinePerformance, "productivityScoreOverride": productivityScoreOverride }
                      })
                    })
                    .then(res => console.log(res.json()))
                    .catch(function(error) {
                      console.log('There has been a problem with your fetch operation: ', error.message);
                    });;
                  });
                break;
                case 3:
                  // console.log('Case 3 ' + index);
                  
                  promiseArray[promiseArrayIndex][index].then(data => {
                    // console.log(data.data.coreValueScoreByMasterScoreId);

                    let masterscoreID,
                        valuesScoreValues,
                        valuesScoreComments;

                    if (data.data.coreValueScoreByMasterScoreId != null) {
                      masterscoreID = data.data.coreValueScoreByMasterScoreId.masterScoreID;
                      
                      valuesScoreValues = data.data.coreValueScoreByMasterScoreId.valuesScoreValues;
                      
                      valuesScoreComments =  data.data.coreValueScoreByMasterScoreId.valuesScoreComments;                               
                    }
                    else {
                      masterscoreID = null;
                      valuesScoreValues = null;
                      valuesScoreComments = null;                        
                    }
                    
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
                              variables: { "masterScoreID": masterscoreID, "valuesScoreValues": valuesScoreValues, "valuesScoreComments": valuesScoreComments }
                      })
                    })
                    .then(res => console.log(res.json()))
                    .catch(function(error) {
                      console.log('There has been a problem with your fetch operation: ', error.message);
                    });
                  });
                break;
                case 4:
                  // console.log('Case 4 ' + index);
                  
                  promiseArray[promiseArrayIndex][index].then(data => {
                    // console.log(data.data.competencyScoreByMasterScoreId);

                    let masterscoreID,
                        competencyArrayIDs,
                        competencyScoreValues,
                        competencyScoreComments;

                    if (data.data.competencyScoreByMasterScoreId != null) {
                      masterscoreID = data.data.competencyScoreByMasterScoreId.masterScoreID;
                      
                      competencyArrayIDs = data.data.competencyScoreByMasterScoreId.competencyArrayIDs;
                      
                      competencyScoreValues =  data.data.competencyScoreByMasterScoreId.competencyScoreValues;                               
                      
                      competencyScoreComments =  data.data.competencyScoreByMasterScoreId.competencyScoreComments;                               
                    }
                    else {
                      masterscoreID = null;
                      competencyArrayIDs = null;
                      competencyScoreValues = null;                        
                      competencyScoreComments = null;                        
                    }
                    
                    fetch('http://apcc-srvm-01:4000/graphql', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      query: `mutation InsertCompetencyScoresByMasterID(    
                              $masterScoreID: Int, 
                              $competencyArrayIDs: [Int], 
                              $competencyScoreValues: [Int],                 
                              $competencyScoreComments: [[Int]],              
                            ) {
                                insertCompetencyScoresByMasterID(            
                                  masterScoreID: $masterScoreID, 
                                  competencyArrayIDs: $competencyArrayIDs, 
                                  competencyScoreValues: $competencyScoreValues,
                                  competencyScoreComments: $competencyScoreComments 
                                ) {
                                    masterScoreID,
                                    competencyArrayIDs,
                                    competencyScoreValues,
                                    competencyScoreComments                  
                                  }
                          }`, 
                              variables: { "masterScoreID": masterscoreID, "competencyArrayIDs": competencyArrayIDs, "competencyScoreValues": competencyScoreValues,
                              "competencyScoreComments": competencyScoreComments }
                      })
                    })
                    .then(res => console.log(res.json()))
                    .catch(function(error) {
                      console.log('There has been a problem with your fetch operation: ', error.message);
                    });
                  });
                break;
                case 5: 
                  // console.log('Case 5 ' + index);
                  
                  let masterscoreID = promiseArray[promiseArrayIndex][7];
                  let scoreDate = promiseArray[promiseArrayIndex][6];    
                  let fullName = promiseArray[promiseArrayIndex][5];
                  let totalScore = promiseArray[promiseArrayIndex][8];

                  fetch('http://apcc-srvm-01:4000/graphql', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      query: `mutation InsertDateTotalNameByMasterID(         
                              $masterScoreID: Int!, 
                              $fullName: String!, 
                              $scoreDate: String!,                          
                              $totalScore: Float!  
                            ) {
                                insertDateTotalNameByMasterID(            
                                  masterScoreID: $masterScoreID, 
                                  fullName: $fullName, 
                                  scoreDate: $scoreDate, 
                                  totalScore: $totalScore
                                ) {
                                    masterScoreID,
                                    fullName,
                                    scoreDate,
                                    totalScore
                                }
                          }`, 
                              variables: { "masterScoreID": masterscoreID, "scoreDate": scoreDate, "fullName": fullName,"totalScore": totalScore  }
                    })
                  })
                  .then(res => console.log(res.json()))
                  .catch(function(error) {
                    console.log('There has been a problem with your fetch operation: ', error.message);
                  });
                  break;
                default:
                  console.log('Unhandled case');
              }              
            }
          }
        };
        getScoresByMasterScoreIdLoop(scores);             
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });        
    },
    setScoreRows (scores, scoresRow, scoresRows) {
      console.log(scores);
      let localScores = scores;
      // var displayScores = function() {
        let valuesScoreValues = scores.valuesScoreValues.reduce((a,b) => a + b);
        let competencyScoreValues = scores.competencyScoreValues.reduce((a,b) => a + b);

        let scoreRow = new scoresRow (localScores.fullName, localScores.scoreDate, localScores.masterScoreID, localScores.absenceScoreValue, localScores.absenceScoreAbsentScheduledValue, localScores.punctualityScoreValue, localScores.productivityScoreValue, localScores.productionDailyLineID, localScores.productionDailyLinePerformance, valuesScoreValues, competencyScoreValues, localScores.totalScore);

        console.log(scoreRow);
      // };
      
      // return displayScores(scores);
    },
    
    displayScoresInDateRange (ScoreRow, ScoresRows) {
      ScoresRows.length = 0;
      var mmDdYyyyDateStart, mmDdYyyyDateEnd;

      var query = `query displayScoresByDateRange($ScoreDateStart: String!, $ScoreDateEnd: String! ) {
          displayScoresByDateRange(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd) {
            fullName
            scoreDate
            masterScoreID
            absenceScoreValue
            absenceScoreAbsentScheduledValue
            punctualityScoreValue
            productivityScoreValue
            productionDailyLineID           
            productionDailyLinePerformance
            valuesScoreValues
            competencyScoreValues
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
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        console.log(data.data.displayScoresByDateRange);
        
        data.data.displayScoresByDateRange.forEach(function(scores) {
          let valuesScore = 0,
              competenciesScore = 0;
          scores.valuesScoreValues.forEach(function(value) {
            valuesScore = valuesScore + value;
          });
          scores.competencyScoreValues.forEach(function(value) {
            competenciesScore = competenciesScore + value;
          });

          let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate, scores.masterScoreID, scores.absenceScoreValue, scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue, scores.productivityScoreValue, scores.productionDailyLineID, scores.productionDailyLinePerformance, valuesScore, competenciesScore, scores.totalScore);

          console.log(scoreRow);
          ScoresRows.push(scoreRow);
        });

        // for (scores of data.data.displayScoresByDateRange) {
        //   console.log(scores, this.ScoresRow, this.ScoresRows);
        //   this.setScoreRows(scores, this.ScoresRow, this.ScoresRows);
        // }          
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    }
  }
}
</script>
