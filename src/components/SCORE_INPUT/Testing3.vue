<template>  
  <div>
      <loading :active.sync="isLoading"></loading>
      <h1 class="is-size-3" style="margin-top: -20px"><b>Auditing</b></h1>
      <fieldset class="box">
          <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Select Dates</b></legend>
          <label class="is-size-5">Start Date:</label>
            <datepicker v-model="ScoreDateStart" class="input" v-on:input="displayScoresInDateRange(ScoresRow, ScoresRows)"></datepicker>   
          <label class="is-size-5">End Date:</label>
            <datepicker v-model="ScoreDateEnd" class="input" v-on:input="displayScoresInDateRange(ScoresRow, ScoresRows)"></datepicker>     
      </fieldset>      
      <fieldset class="box">
          <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Select By</b></legend>
          <fieldset class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -10px"><b>Date</b></legend>
            <div class="select">
              <select v-model="DateToDisplay"   v-on:change="displayScoresOnThisDateBySelectedFilter(ScoresRow,   ScoresRows, DateToDisplay)">
                <option disabled value="">Select Date</option>
                <option v-for="date in Dates" v-bind:value="date"   v-bind:key="date">{{ date }}</option>
              </select>
            </div> 
          </fieldset>
          <div class="is-size-5" style="margin-bottom: 15px"><b>AND</b></div>
          <fieldset class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -10px"><b>Team Member</b></legend>
            <div class="select">
              <select v-model="TeamMemberToDisplay"   v-on:change="setShiftAndDepartmentNull">
                <option disabled value="">Select Team Member</option>
                <option v-for="teamMember in TeamMembers"       v-bind:value="teamMember" v-bind:key="teamMember">{{ teamMember }}  </option>
              </select>
            </div> 
          </fieldset>
          <div class="is-size-5" style="margin-bottom: 15px"><b>OR</b></div>
          <fieldset class="box">
          <legend class="is-size-5" style="background-color:white; margin-bottom: -10px"><b>Shift</b></legend>
          <div class="select">
            <select v-model="ShiftToDisplay" v-on:change="setTeamMemberAndDepartmentNull">
              <option disabled value="">Select Shift</option>
              <option v-for="shift in Shifts" v-bind:value="shift.key"    v-bind:key="shift.value">{{ shift.value }}</option>
            </select>
          </div> 
          </fieldset>
          <div class="is-size-5" style="margin-bottom: 15px"><b>OR</b></div>
          <fieldset class="box">
            <legend class="is-size-5" style="background-color:white; margin-bottom: -10px"><b>Department</b></legend>
            <div class="select">
              <select v-model="DepartmentToDisplay"   v-on:change="setTeamMemberAndShiftNull">
                <option disabled value="">Select Department</option>
                <option v-for="department in Departments"       v-bind:value="department.key" v-bind:key="department.value">{{  department.value }}</option>
              </select>
            </div>  
          </fieldset>                           
      </fieldset>
      <button v-on:click="goToSelectTeamMember()" class="button is-primary is-normal">Go To Team Member Selection Page</button>
      <!-- <button v-on:click="getScoresInDateRange()">Populate "All Scores" DB</button> -->
      <!-- <button v-on:click="displayScoresInDateRange(ScoresRow, ScoresRows)">Display Scores</button> -->      
      <hr>
      <table border="1" class="table" style="overflow: scroll;">
        <thead style="position: sticky">
          <tr>
            <th style="position: sticky">Name</th>
            <th style="position: sticky">Date</th>
            <th style="position: sticky">Score ID</th>
            <th style="position: sticky">Absence Status</th>
            <th style="position: sticky">Absence Scheduled</th>
            <th style="position: sticky">Punctuality Score</th>          
            <th style="position: sticky">Productivity Score</th>
            <th style="position: sticky">Productivity Line Goal</th>
            <th style="position: sticky">Productivity Line Performance</th>
            <th style="position: sticky">Values Score</th>
            <th style="position: sticky">Values Score Calculated</th>
            <th style="position: sticky">Competencies Score</th>
            <th style="position: sticky">Competencies Score Calculated</th>
            <th style="position: sticky">Total</th>
          </tr>
        </thead>
        <tbody>
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
            <td>{{scoreRow.valuesScoreCalc}}</td>
            <td>{{scoreRow.competenciesScore}}</td>
            <td>{{scoreRow.competenciesScoreCalc}}</td>
            <td>{{scoreRow.totalScore}}</td>          
          </tr>
        </tbody>
      </table>
      <button v-on:click="goToSelectTeamMember()" class="button is-primary is-normal">Go To Team Member Selection Page</button>     
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import moment from 'moment'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import TeamMember from '../../models/TeamMember'

import shifts from '../../assets/shifts.json'
import departments from '../../assets/departments.json'

export default {
  data () {
    return {
      isLoading: false,
      ScoreDateStart: '02/04/2019',
      ScoreDateEnd: '02/05/2019',
      ScoresRow (fullName, scoreDate, scoreID, attendance, attendanceScheduled, punctualityScore, productivityScore, productivityLineGoal, productivityLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, totalScore) {
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
        this.valuesScoreCalc = valuesScoreCalc,
        this.competenciesScore = competenciesScore,
        this.competenciesScoreCalc = competenciesScoreCalc,
        this.totalScore = totalScore
      },
      ScoresRows: []
    }
  },
  mounted: function () {
    console.log(moment(this.ScoreDateStart).format());
    console.log(moment(this.ScoreDateEnd).format());
    console.log(this.getDateArray(moment(this.ScoreDateEnd).format(), moment(this.ScoreDateStart).format()));
    this.displayScoresInDateRange(this.ScoresRow, this.ScoresRows);
    // this.Dates = this.getDateArray(this.ScoreDateStart, this.ScoreDateEnd);
  },
  components: {
    Datepicker,
    Loading
  },
  computed: {
    UserId: {
      get () {
        return this.$store.state.UserId;
      }
    },
    DateToDisplay: {
      get () {
        console.log(this.$store.state.DateToDisplay);
        return this.$store.state.DateToDisplay;
      },
      set (value) {
        console.log(value);
        this.$store.commit('setDateToDisplay', value);
        // this.displayScoresInDateRangeByFullName(this.ScoresRow, this.ScoresRows, value);
      }
    },
    TeamMemberToDisplay: {
      get () {
        console.log(this.$store.state.TeamMemberToDisplay);
        return this.$store.state.TeamMemberToDisplay;
      },
      set (value) {
        console.log(value);
        this.$store.commit('setTeamMemberToDisplay', value);
        this.displayScoresInDateRangeByFullName(this.ScoresRow, this.ScoresRows, value);
      }
    },
    ShiftToDisplay: {
      get () {
        console.log(this.$store.state.ShiftToDisplay);
        return this.$store.state.ShiftToDisplay;
      },
      set (value) {
        console.log(value);        
        this.$store.commit('setShiftToDisplay', value);
        if (value != "ALL") {
          this.displayScoresByDateRangeByShiftTeamMemberId(this.ScoresRow, this.ScoresRows, value);
        }
        else {
          this.displayScoresInDateRange(this.ScoresRow, this.ScoresRows);
        }
      }
    },
    DepartmentToDisplay: {
      get () {
        console.log(this.$store.state.DepartmentToDisplay);
        return this.$store.state.DepartmentToDisplay;
      },
      set (value) {
        console.log(value);
        this.$store.commit('setDepartmentToDisplay', value);
        if (value != "ALL") {
          this.displayScoresByDateRangeByDepartmentTeamMemberiId(this.ScoresRow, this.ScoresRows, value);
        }
        else {
          this.displayScoresInDateRange(this.ScoresRow, this.ScoresRows);
        }
      }
    },
    Dates: {
      get () {
        
        return this.getDateArray(this.ScoreDateStart, this.ScoreDateEnd);
      }
    },
    TeamMembers: {
      get () {
        return this.getAllTeamMemberFullNames();
      }
    },
    Shifts: {
      get () {
        return shifts;
      }
    },
    Departments: {
      get () {
        return departments;
      }
    }  
  },
  methods: {
    goToSelectTeamMember () {
      this.$store.commit('setTesting', false);
    },
    getTeamMemberName () {
      this.UserName = TeamMember.find(this.$store.state.UserId).fullName;
    },
    getAllTeamMemberFullNames () {      
      let teamMemberFullNames = [];
      TeamMember.all().forEach(function(teamMember) {      
        console.log(teamMember.fullName);
        teamMemberFullNames.push(teamMember.fullName);
      });
      return teamMemberFullNames;      
    },
    setShiftAndDepartmentNull () {
      this.$store.commit('setShiftToDisplay', "");
      this.$store.commit('setDepartmentToDisplay', "");      
    },
    setTeamMemberAndShiftNull () {
      this.$store.commit('setTeamMemberToDisplay', "");
      this.$store.commit('setShiftToDisplay', "");      
    },
    setTeamMemberAndDepartmentNull () {
      this.$store.commit('setTeamMemberToDisplay', "");
      this.$store.commit('setDepartmentToDisplay', "");      
    },
    getDateArray (start, end) {
      let arr = new Array(),
          de = new Date(end),
          dt = new Date(start);

      console.log(start);
      console.log(end);
      console.log(dt);

      while (dt <= de) {
        arr.push(moment(new Date(dt)).format('L'));
        dt.setDate(dt.getDate() + 1);
      }

      console.log(arr);
      return arr;
    },
    getScoresInDateRange () {      
      let mmDdYyyyDateStart, 
          mmDdYyyyDateEnd,
          requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];              

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');
      
      console.log(mmDdYyyyDateStart);
      console.log(mmDdYyyyDateEnd);
      
      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query scoresByDateRange($ScoreDateStart: String!,                     $ScoreDateEnd: String! ) {
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
                  }`,
          variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd": mmDdYyyyDateEnd  }
        })
      })
      .then(function(res) { 
        return res.json()
      })
      .then(function(data) {
        console.log(data.data.scoresByDateRange);
        var scoreData = data.data.scoresByDateRange;
        
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
            return res.json();
          })
          .then(function(data) {
            return console.log(data.data);
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
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.absenceScoreByMasterScoreId);          
            
            if (data.data.absenceScoreByMasterScoreId != null) {
              return insertAbsenceScoreByMasterScoreIdPromise(data.data.absenceScoreByMasterScoreId.masterScoreID,  data.data.absenceScoreByMasterScoreId.absenceScoreValue, data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue);
            }
            else {
              return insertAbsenceScoreByMasterScoreIdPromise(null, null, null);
            }
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        var insertPunctualityScoreByMasterIdPromise = function (masterScoreID, punctualityScoreValue, punctualityScoreComments) {
          console.log(masterScoreID  + ' ' + punctualityScoreValue + ' ' + punctualityScoreComments);
          fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation insertPunctualityByMasterID(    
                    $masterScoreID: Int, 
                    $punctualityScoreValue: Int, 
                    $punctualityScoreComments: [Int]    
                  ) {
                      insertPunctualityByMasterID(            
                        masterScoreID: $masterScoreID, 
                        punctualityScoreValue: $punctualityScoreValue, 
                        punctualityScoreComments: $punctualityScoreComments 
                      ) {
                          masterScoreID,
                          punctualityScoreValue,
                          punctualityScoreComments
                        }
                }`, 
                    variables: { "masterScoreID": masterScoreID, "punctualityScoreValue": punctualityScoreValue, "punctualityScoreComments": punctualityScoreComments  }
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            return console.log(data.data);
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
              punctualityScoreComments
            }
          }`,
              variables: { "MasterScoreID": masterScoreId }
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.punctualityScoreByMasterScoreId);

            if (data.data.punctualityScoreByMasterScoreId != null) {
              return insertPunctualityScoreByMasterIdPromise(data.data.punctualityScoreByMasterScoreId.masterScoreID,  data.data.punctualityScoreByMasterScoreId.punctualityScoreValue, data.data.punctualityScoreByMasterScoreId.punctualityScoreComments);
            }
            else {
              return insertPunctualityScoreByMasterIdPromise(null, null, null);
            }
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
          productivityScoreComments,
          productivityScoreOverride
        ) {
          fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `mutation  insertProductivityByMasterID(    
                    $masterScoreID: Int, 
                    $productivityScoreValue: Float, 
                    $productionDailyLineID: String,    
                    $productionDailyLinePerformance: Int,
                    $productivityScoreOverride: Boolean,
                    $productivityScoreComments: [Int]    
                  ) {
                       insertProductivityByMasterID(            
                        masterScoreID: $masterScoreID, 
                        productivityScoreValue: $productivityScoreValue, 
                        productionDailyLineID: $productionDailyLineID,
                        productionDailyLinePerformance: $productionDailyLinePerformance,
                        productivityScoreOverride: $productivityScoreOverride,
                        productivityScoreComments: $productivityScoreComments 
                      ) {
                          masterScoreID,
                          productivityScoreValue,
                          productionDailyLineID,
                          productionDailyLinePerformance,
                          productivityScoreOverride,
                          productivityScoreComments
                        }
                }`, 
                    variables: { "masterScoreID": masterScoreID, "productivityScoreValue": productivityScoreValue, "productionDailyLineID": productionDailyLineID, "productionDailyLinePerformance": productionDailyLinePerformance, "productivityScoreOverride": productivityScoreOverride, "productivityScoreComments": productivityScoreComments }
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            return console.log(data.data);
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
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.productivityScoreByMasterScoreId);

            if (data.data.productivityScoreByMasterScoreId != null) {
              return  insertProductivityScoreByMasterIdPromise(
                data.data.productivityScoreByMasterScoreId.masterScoreID,
                data.data.productivityScoreByMasterScoreId.productivityScoreValue,
                data.data.productivityScoreByMasterScoreId.productionDailyLineID,
                data.data.productivityScoreByMasterScoreId.productionDailyLinePerformance,
                data.data.productivityScoreByMasterScoreId.productivityScoreComments,
                data.data.productivityScoreByMasterScoreId.productivityScoreOverride,
              );
            }
            else {
              return  insertProductivityScoreByMasterIdPromise(null, null, null, null, null);
            }
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
                      variables: { "masterScoreID": masterScoreID,  "valuesScoreValues": valuesScoreValues,  "valuesScoreComments": valuesScoreComments }
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              return console.log(data.data);
            })
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ',   error.message);
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
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.coreValueScoreByMasterScoreId);     

            if (data.data.coreValueScoreByMasterScoreId != null) {
              return insertValuesScoreByMasterIdPromise(data.data.coreValueScoreByMasterScoreId.valuesScoreValues, data.data.coreValueScoreByMasterScoreId.valuesScoreComments,
              data.data.coreValueScoreByMasterScoreId.masterScoreID);
            }
            else {
              return insertValuesScoreByMasterIdPromise(null, null, null);
            }
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };

        var insertCompetencyScoresByMasterIdPromise = function (masterscoreID, competencyArrayIDs, competencyScoreValues, competencyScoreComments) {
          console.log(competencyScoreValues);
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
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            return console.log(data.data);
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
            return res.json();
          })
          .then(function(data) {
            console.log(data.data.competencyScoreByMasterScoreId);

            if (data.data.competencyScoreByMasterScoreId != null) {
              console.log(data.data.competencyScoreByMasterScoreId);
              return insertCompetencyScoresByMasterIdPromise(data.data.competencyScoreByMasterScoreId.masterScoreID, data.data.competencyScoreByMasterScoreId.competencyArrayIDs,
              data.data.competencyScoreByMasterScoreId.competencyScoreValues, 
              data.data.competencyScoreByMasterScoreId.competencyScoreComments);
            }
            else {
              return insertCompetencyScoresByMasterIdPromise(null, null, null);
            }
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });                
        };

        var insertDateTotalNameTeamMemberIdEtcPromise = function (
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
          // console.log(masterScoreId);
          
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
                "scoreInEditState": scoreInEditState, "positionTeamMemberID": positionTeamMemberID, "departmentTeamMemberID": departmentTeamMemberID, "shiftTeamMemberID": shiftTeamMemberID, "scoreStatusID":  scoreStatusID, 
                "totalScore": totalScore 
              }
            })
          })
          .then(function(res) {
            return res.json();
          })
          .then(function(data) {
            return console.log(data.data);
          })                 
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
          });
        };
        
        data.data.scoresByDateRange.map(function(score) {
          return absencePromise(score.scoreID);
        });

        data.data.scoresByDateRange.map(function(score) {
          return punctualityPromise(score.scoreID);
        });
        
        data.data.scoresByDateRange.map(function(score) {
          return productivityPromise(score.scoreID);
        });
        
        data.data.scoresByDateRange.map(function(score) {
          return valuesPromise(score.scoreID);
        });
        
        data.data.scoresByDateRange.map(function(score) {
          return competencyPromise(score.scoreID);
        });

        data.data.scoresByDateRange.map(function(score) {
          console.log(score);
          return insertDateTotalNameTeamMemberIdEtcPromise(score.scoreID, TeamMember.find(score.scoreTeamMemberID).fullName, score.scoreTeamMemberID, score.scoreUserID,score.scoreInEditState, score.positionTeamMemberID,score.departmentTeamMemberID, score.shiftTeamMemberID,score.scoreStatusID, score.scoreDate, score.totalScore);          
        });        
                  
      })      
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    },    
    displayScoresInDateRange (ScoreRow, ScoresRows) {
      console.log(this.isLoading);
      this.isLoading = true;
      console.log(this.isLoading);
      ScoresRows.length = 0;
      let mmDdYyyyDateStart, 
          mmDdYyyyDateEnd,
          requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];       

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');     

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query displayScoresByDateRange($ScoreDateStart: String!,              $ScoreDateEnd: String! ) {
                      displayScoresByDateRange(scoreDateStart: $ScoreDateStart,             scoreDateEnd:   $ScoreDateEnd) {
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
                        competencyArrayIDs
                        competencyScoreValues
                        totalScore            
                      }
                    }`,
          variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd":   mmDdYyyyDateEnd  }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        console.log(data.data.displayScoresByDateRange);        

        data.data.displayScoresByDateRange.forEach(function(scores) {
          let valuesScore = 0,
              valuesScoreCalc = 0,
              competenciesScore = 0,
              competenciesScoreCalc = 0              

          console.log(scores);

          scores.valuesScoreValues.forEach(function(value) {
            valuesScore = valuesScore + value;
          });

          console.log(scores.valuesScoreValues);
          if (scores.valuesScoreValues.length != 0) {
            if (scores.valuesScoreValues.includes(0)) {
              valuesScoreCalc = 0; 
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {       
              valuesScoreCalc = 31.5;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
              valuesScoreCalc = 33;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
              valuesScoreCalc = 30;
            }
          }      

          scores.competencyScoreValues.forEach(function(value) {
            competenciesScore = competenciesScore + value;
          });
          
          if (scores.competencyArrayIDs.length != 0) {

            // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
            if (scores.competencyArrayIDs.length === 7) {            
              if (competenciesScore < 13) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 15) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 13:
                  case 14:
                  case 15:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }            
            }

            // if competencyArrayIDs array contains 8 elements => if  compentencyScore     < 15 'setCompetencies' to 0, else if  compentencyScore > 17    'setCompetencies'to 33, else case 15:, case   16:, case 17:   'setCompetencies' to 30
            else {
              if (competenciesScore < 15) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 17) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 15:
                  case 16:
                  case 17:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }     
            }
          }

          let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,   scores.masterScoreID, scores.absenceScoreValue,   scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue,  scores.productivityScoreValue, scores.productionDailyLineID,   scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);
          
          console.log(scoreRow);                   
          ScoresRows.push(scoreRow);          
        });
        
        this.isLoading = false;
        console.log(isLoading);         
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    displayScoresOnThisDateBySelectedFilter (ScoreRow, ScoresRows, date) {
      console.log(date);      

      if (this.TeamMemberToDisplay != "") {
        console.log(this.TeamMemberToDisplay);

        ScoresRows.length = 0;

        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query displayScoresByDateByFullName($ScoreDate: String!, $FullName: String!) {
              displayScoresByDateByFullName(scoreDate: $ScoreDate, fullName: $FullName) {
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
                competencyArrayIDs
                competencyScoreValues
                totalScore            
              }
            }`,
            variables: { "ScoreDate": date, "FullName": this.TeamMemberToDisplay  }
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data.data);
          console.log(data.data.displayScoresByDateByFullName);

          data.data.displayScoresByDateByFullName.forEach(function(scores) {
            let valuesScore = 0,
                valuesScoreCalc = 0,
                competenciesScore = 0,
                competenciesScoreCalc = 0;

            console.log(scores);

            scores.valuesScoreValues.forEach(function(value) {
              valuesScore = valuesScore + value;
            });

            console.log(scores.valuesScoreValues);
            if (scores.valuesScoreValues.length != 0) {
              if (scores.valuesScoreValues.includes(0)) {
                valuesScoreCalc = 0; 
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {         
                valuesScoreCalc = 31.5;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
                valuesScoreCalc = 33;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
                valuesScoreCalc = 30;
              }
            }      

            scores.competencyScoreValues.forEach(function(value) {
              competenciesScore = competenciesScore + value;
            });

            if (scores.competencyArrayIDs.length != 0) {

              // if competencyArrayIDs array contains 7 elements => if  compentencyScore < 13 'setCompetencies' to 0, else if  compentencyScore > 15 'setCompetencies'to 33, else case 13:, case  14:, case 15: 'setCompetencies' to 30
              if (scores.competencyArrayIDs.length === 7) {            
                if (competenciesScore < 13) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 15) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 13:
                    case 14:
                    case 15:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }            
              }

              // if competencyArrayIDs array contains 8 elements => if    compentencyScore     < 15 'setCompetencies' to 0, else if   compentencyScore > 17    'setCompetencies'to 33, else case 15:,  case   16:, case 17:   'setCompetencies' to 30
              else {
                if (competenciesScore < 15) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 17) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 15:
                    case 16:
                    case 17:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }     
              }
            }

            let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,     scores.masterScoreID, scores.absenceScoreValue,     scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue, scores.productivityScoreValue, scores.productionDailyLineID, scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

            console.log(scoreRow);
            ScoresRows.push(scoreRow);
          });         
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ',     error.message);
        });
      }

      else if (this.ShiftToDisplay != "") {
        console.log(this.ShiftToDisplay);

        ScoresRows.length = 0;
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query displayScoresByDateByShiftTeamMemberId($ScoreDate: String!, $ShiftTeamMemberID: Int!) {
              displayScoresByDateByShiftTeamMemberId(scoreDate: $ScoreDate, shiftTeamMemberID: $ShiftTeamMemberID) {
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
                competencyArrayIDs
                competencyScoreValues
                totalScore            
              }
            }`,
            variables: { "ScoreDate": date, "ShiftTeamMemberID": parseInt(this.ShiftToDisplay)  }
          })
        })
        .then(res => {
          return res.json();          
        })
        .then(data => {
          console.log(data.data);
          console.log(data.data.displayScoresByDateByShiftTeamMemberId);

          data.data.displayScoresByDateByShiftTeamMemberId.forEach(function(scores) {
            let valuesScore = 0,
                valuesScoreCalc = 0,
                competenciesScore = 0,
                competenciesScoreCalc = 0;

            console.log(scores);

            scores.valuesScoreValues.forEach(function(value) {
              valuesScore = valuesScore + value;
            });

            console.log(scores.valuesScoreValues);
            if (scores.valuesScoreValues.length != 0) {
              if (scores.valuesScoreValues.includes(0)) {
                valuesScoreCalc = 0; 
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {         
                valuesScoreCalc = 31.5;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
                valuesScoreCalc = 33;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
                valuesScoreCalc = 30;
              }
            }      

            scores.competencyScoreValues.forEach(function(value) {
              competenciesScore = competenciesScore + value;
            });

            if (scores.competencyArrayIDs.length != 0) {

              // if competencyArrayIDs array contains 7 elements => if  compentencyScore < 13 'setCompetencies' to 0, else if  compentencyScore > 15 'setCompetencies'to 33, else case 13:, case  14:, case 15: 'setCompetencies' to 30
              if (scores.competencyArrayIDs.length === 7) {            
                if (competenciesScore < 13) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 15) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 13:
                    case 14:
                    case 15:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }            
              }

              // if competencyArrayIDs array contains 8 elements => if    compentencyScore     < 15 'setCompetencies' to 0, else if   compentencyScore > 17    'setCompetencies'to 33, else case 15:,  case   16:, case 17:   'setCompetencies' to 30
              else {
                if (competenciesScore < 15) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 17) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 15:
                    case 16:
                    case 17:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }     
              }
            }

            let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,     scores.masterScoreID, scores.absenceScoreValue,     scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue, scores.productivityScoreValue, scores.productionDailyLineID, scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

            console.log(scoreRow);
            ScoresRows.push(scoreRow);
          });         
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ',     error.message);
        });
      }
      else if (this.DepartmentToDisplay != "") {
        console.log(this.DepartmentToDisplay);

        ScoresRows.length = 0;
        
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query displayScoresByDateByDepartmentTeamMemberId($ScoreDate: String!, $DepartmentTeamMemberID: String!) {
              displayScoresByDateByDepartmentTeamMemberId(scoreDate: $ScoreDate, departmentTeamMemberID: $DepartmentTeamMemberID) {
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
                competencyArrayIDs
                competencyScoreValues
                totalScore            
              }
            }`,
            variables: { "ScoreDate": date, "DepartmentTeamMemberID": this.DepartmentToDisplay  }
          })
        })
        .then(res => {
          console.log(res);
          return res.json();          
        })
        .then(data => {
          console.log(data.data);
          console.log(data.data.displayScoresByDateByDepartmentTeamMemberId);

          data.data.displayScoresByDateByDepartmentTeamMemberId.forEach(function(scores) {
            let valuesScore = 0,
                valuesScoreCalc = 0,
                competenciesScore = 0,
                competenciesScoreCalc = 0;

            console.log(scores);

            scores.valuesScoreValues.forEach(function(value) {
              valuesScore = valuesScore + value;
            });

            console.log(scores.valuesScoreValues);
            if (scores.valuesScoreValues.length != 0) {
              if (scores.valuesScoreValues.includes(0)) {
                valuesScoreCalc = 0; 
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {         
                valuesScoreCalc = 31.5;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
                valuesScoreCalc = 33;
              } 
              if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
                valuesScoreCalc = 30;
              }
            }      

            scores.competencyScoreValues.forEach(function(value) {
              competenciesScore = competenciesScore + value;
            });

            if (scores.competencyArrayIDs.length != 0) {

              // if competencyArrayIDs array contains 7 elements => if  compentencyScore < 13 'setCompetencies' to 0, else if  compentencyScore > 15 'setCompetencies'to 33, else case 13:, case  14:, case 15: 'setCompetencies' to 30
              if (scores.competencyArrayIDs.length === 7) {            
                if (competenciesScore < 13) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 15) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 13:
                    case 14:
                    case 15:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }            
              }

              // if competencyArrayIDs array contains 8 elements => if    compentencyScore     < 15 'setCompetencies' to 0, else if   compentencyScore > 17    'setCompetencies'to 33, else case 15:,  case   16:, case 17:   'setCompetencies' to 30
              else {
                if (competenciesScore < 15) {
                  competenciesScoreCalc = 0;
                }
                else if (competenciesScore > 17) {
                  competenciesScoreCalc = 33;
                }
                else {
                  switch (competenciesScore) {
                    case 15:
                    case 16:
                    case 17:
                      competenciesScoreCalc = 30;
                    break;
                    default: 
                      alert('MISSSED a Productivity score possibility'); 
                      console.log('MISSSED a possibility');
                      break;
                  }
                }     
              }
            }

            let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,     scores.masterScoreID, scores.absenceScoreValue,     scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue, scores.productivityScoreValue, scores.productionDailyLineID, scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

            console.log(scoreRow);
            ScoresRows.push(scoreRow);
          });         
        })
        .catch(function(error) {
          console.log('There has been a problem with your fetch operation: ',     error.message);
        });
      } 
      else {
        console.log(date);
      }        
    },
    displayScoresInDateRangeByFullName (ScoreRow, ScoresRows, fullName) {
      ScoresRows.length = 0;
      let mmDdYyyyDateStart, 
          mmDdYyyyDateEnd,
          requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];       

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');     

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query displayScoresByDateRangeByFullName($ScoreDateStart: String!, $ScoreDateEnd: String!, $FullName: String!) {
            displayScoresByDateRangeByFullName(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd, fullName: $FullName) {
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
              competencyArrayIDs
              competencyScoreValues
              totalScore            
            }
          }`,
          variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd":   mmDdYyyyDateEnd, "FullName": fullName  }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);
        console.log(data.data.displayScoresByDateRangeByFullName);

        data.data.displayScoresByDateRangeByFullName.forEach(function(scores) {
          let valuesScore = 0,
              valuesScoreCalc = 0,
              competenciesScore = 0,
              competenciesScoreCalc = 0;

          console.log(scores);

          scores.valuesScoreValues.forEach(function(value) {
            valuesScore = valuesScore + value;
          });

          console.log(scores.valuesScoreValues);
          if (scores.valuesScoreValues.length != 0) {
            if (scores.valuesScoreValues.includes(0)) {
              valuesScoreCalc = 0; 
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {       
              valuesScoreCalc = 31.5;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
              valuesScoreCalc = 33;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
              valuesScoreCalc = 30;
            }
          }      

          scores.competencyScoreValues.forEach(function(value) {
            competenciesScore = competenciesScore + value;
          });
          
          if (scores.competencyArrayIDs.length != 0) {

            // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
            if (scores.competencyArrayIDs.length === 7) {            
              if (competenciesScore < 13) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 15) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 13:
                  case 14:
                  case 15:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }            
            }

            // if competencyArrayIDs array contains 8 elements => if  compentencyScore     < 15 'setCompetencies' to 0, else if  compentencyScore > 17    'setCompetencies'to 33, else case 15:, case   16:, case 17:   'setCompetencies' to 30
            else {
              if (competenciesScore < 15) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 17) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 15:
                  case 16:
                  case 17:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }     
            }
          }

          let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,   scores.masterScoreID, scores.absenceScoreValue,   scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue,  scores.productivityScoreValue, scores.productionDailyLineID,   scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

          console.log(scoreRow);
          ScoresRows.push(scoreRow);
        });         
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    displayScoresByDateRangeByShiftTeamMemberId (ScoreRow, ScoresRows, shiftTeamMemberID) {
      ScoresRows.length = 0;
      let mmDdYyyyDateStart, 
          mmDdYyyyDateEnd,
          requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];       

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');     

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query displayScoresByDateRangeByShiftTeamMemberId($ScoreDateStart: String!, $ScoreDateEnd: String!, $ShiftTeamMemberID: Int!) {
            displayScoresByDateRangeByShiftTeamMemberId(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd, shiftTeamMemberID: $ShiftTeamMemberID) {
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
              competencyArrayIDs
              competencyScoreValues
              totalScore            
            }
          }`,
          variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd":   mmDdYyyyDateEnd, "ShiftTeamMemberID": shiftTeamMemberID  }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);        

        data.data.displayScoresByDateRangeByShiftTeamMemberId.forEach(function(scores) {
          let valuesScore = 0,
              valuesScoreCalc = 0,
              competenciesScore = 0,
              competenciesScoreCalc = 0;

          console.log(scores);

          scores.valuesScoreValues.forEach(function(value) {
            valuesScore = valuesScore + value;
          });

          console.log(scores.valuesScoreValues);
          if (scores.valuesScoreValues.length != 0) {
            if (scores.valuesScoreValues.includes(0)) {
              valuesScoreCalc = 0; 
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {       
              valuesScoreCalc = 31.5;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
              valuesScoreCalc = 33;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
              valuesScoreCalc = 30;
            }
          }      

          scores.competencyScoreValues.forEach(function(value) {
            competenciesScore = competenciesScore + value;
          });
          
          if (scores.competencyArrayIDs.length != 0) {

            // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
            if (scores.competencyArrayIDs.length === 7) {            
              if (competenciesScore < 13) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 15) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 13:
                  case 14:
                  case 15:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }            
            }

            // if competencyArrayIDs array contains 8 elements => if  compentencyScore     < 15 'setCompetencies' to 0, else if  compentencyScore > 17    'setCompetencies'to 33, else case 15:, case   16:, case 17:   'setCompetencies' to 30
            else {
              if (competenciesScore < 15) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 17) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 15:
                  case 16:
                  case 17:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }     
            }
          }

          let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,   scores.masterScoreID, scores.absenceScoreValue,   scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue,  scores.productivityScoreValue, scores.productionDailyLineID,   scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

          console.log(scoreRow);
          ScoresRows.push(scoreRow);
        });         
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    },
    displayScoresByDateRangeByDepartmentTeamMemberiId (ScoreRow, ScoresRows, departmentTeamMemberID) {
      ScoresRows.length = 0;
      let mmDdYyyyDateStart, 
          mmDdYyyyDateEnd,
          requests,
          scores = [],
          requestCount = 0,
          ScoresDataArray = [];       

      console.log(this.ScoreDateStart);
      console.log(this.ScoreDateEnd);

      mmDdYyyyDateStart = moment(this.ScoreDateStart).format('L');
      mmDdYyyyDateEnd = moment(this.ScoreDateEnd).format('L');     

      fetch('http://apcc-srvm-01:4000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          query: `query displayScoresByDateRangeByDepartmentTeamMemberId($ScoreDateStart: String!, $ScoreDateEnd: String!, $DepartmentTeamMemberID: String!) {
            displayScoresByDateRangeByDepartmentTeamMemberId(scoreDateStart: $ScoreDateStart, scoreDateEnd: $ScoreDateEnd, departmentTeamMemberID: $DepartmentTeamMemberID) {
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
              competencyArrayIDs
              competencyScoreValues
              totalScore            
            }
          }`,
          variables: { "ScoreDateStart": mmDdYyyyDateStart, "ScoreDateEnd":   mmDdYyyyDateEnd, "DepartmentTeamMemberID": departmentTeamMemberID  }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);        

        data.data.displayScoresByDateRangeByDepartmentTeamMemberId.forEach(function(scores) {
          let valuesScore = 0,
              valuesScoreCalc = 0,
              competenciesScore = 0,
              competenciesScoreCalc = 0;

          console.log(scores);

          scores.valuesScoreValues.forEach(function(value) {
            valuesScore = valuesScore + value;
          });

          console.log(scores.valuesScoreValues);
          if (scores.valuesScoreValues.length != 0) {
            if (scores.valuesScoreValues.includes(0)) {
              valuesScoreCalc = 0; 
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 15) {       
              valuesScoreCalc = 31.5;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) > 15) {
              valuesScoreCalc = 33;
            } 
            if (scores.valuesScoreValues.reduce((a, b) => a + b) === 14){
              valuesScoreCalc = 30;
            }
          }      

          scores.competencyScoreValues.forEach(function(value) {
            competenciesScore = competenciesScore + value;
          });
          
          if (scores.competencyArrayIDs.length != 0) {

            // if competencyArrayIDs array contains 7 elements => if compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15: 'setCompetencies' to 30
            if (scores.competencyArrayIDs.length === 7) {            
              if (competenciesScore < 13) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 15) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 13:
                  case 14:
                  case 15:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }            
            }

            // if competencyArrayIDs array contains 8 elements => if  compentencyScore     < 15 'setCompetencies' to 0, else if  compentencyScore > 17    'setCompetencies'to 33, else case 15:, case   16:, case 17:   'setCompetencies' to 30
            else {
              if (competenciesScore < 15) {
                competenciesScoreCalc = 0;
              }
              else if (competenciesScore > 17) {
                competenciesScoreCalc = 33;
              }
              else {
                switch (competenciesScore) {
                  case 15:
                  case 16:
                  case 17:
                    competenciesScoreCalc = 30;
                  break;
                  default: 
                    alert('MISSSED a Productivity score possibility'); 
                    console.log('MISSSED a possibility');
                    break;
                }
              }     
            }
          }

          let scoreRow = new ScoreRow (scores.fullName, scores.scoreDate,   scores.masterScoreID, scores.absenceScoreValue,   scores.absenceScoreAbsentScheduledValue, scores.punctualityScoreValue,  scores.productivityScoreValue, scores.productionDailyLineID,   scores.productionDailyLinePerformance, valuesScore, valuesScoreCalc, competenciesScore, competenciesScoreCalc, scores.totalScore);

          console.log(scoreRow);
          ScoresRows.push(scoreRow);
        });         
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ',   error.message);
      });
    }
  }  
}
</script>     