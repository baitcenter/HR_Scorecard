<template>
  <div>
      <fieldset>
          <legend><b>Select Date</b></legend>
          <datepicker v-model="DateToScore"></datepicker>                  
      </fieldset>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import moment from 'moment'

  //Imports so that access is granted to component methods
  // import FirstShiftProduction from './FirstShiftProduction.vue'
   
  import TeamMember from '../models/TeamMember';  

  export default {
    data: function () {
      return {
        
      }
    },
    components: {
      Datepicker
    },            
    computed: {
      UserId: {
        get () {
          console.log(this.$store.state.UserId);
          return this.$store.state.UserId;
        }
      },
      ChosenTeamMember: {
        get () {
          console.log(this.$store.state.ChosenTeamMember);
          return this.$store.state.ChosenTeamMember;
        },
        set (value) {
          console.log(value);
          this.$store.commit('setIsTeamMemberChosen', true);
          this.$store.commit('setChosenTeamMember', value);
        }
      },
      DateToScore: {
        get () {
          // console.log /g(this.$store.state.DateToScore);
          return this.$store.state.DateToScore;
        },
        set (value) {
          console.log(this.$store.state.ChosenTeamMember);
          console.log(this.ChosenTeamMember);
          var mmDdYyyyDate = moment(value).format('L');
          console.log(mmDdYyyyDate);
                                  
          this.$store.commit('setDateToScore', mmDdYyyyDate);
          this.getMasterScoreId(); 
        },  
      }      
    },
    methods: {
      // getChosenDatesScore (chosenTeamMember, scoreDate) {
      //   FirstShiftProduction.methods['getMasterScoreId'](chosenTeamMember, scoreDate);
      // }

      getTotal (scoreID) {
        fetch('http://apcc-srvm-01:4000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({            
            query: `query scoreByScoreId($scoreID: Int) {
              scoreByScoreId(scoreID: $scoreID) {
                totalScore
              }
            }`,
            variables: { "scoreID": scoreID }
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log(data.data.scoreByScoreId.totalScore);
          this.$store.commit('setTotal', data.data.scoreByScoreId.totalScore);  
        })
        .catch(e => {
          console.log(e);
        });        
      },

      getAbsenceScores (masterScoreId) {
        if (this.ChosenTeamMember.scoreStatusID != '0' &&   this.ChosenTeamMember.scoreStatusID != "") {      
        var query = `query absenceScoreByMasterScoreId($MasterScoreID: Int!)  {absenceScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            absenceScoreValue
            masterScoreID
            absenceScoreID
            absenceScoreAbsentScheduledValue
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
          this.$store.commit('setAbsence',  data.data.absenceScoreByMasterScoreId.absenceScoreValue);
          this.$store.commit('setScheduled',  data.data.absenceScoreByMasterScoreId.absenceScoreAbsentScheduledValue);
        });
        }
      },

      getPunctualityScores (masterScoreId) {      
        var query = `query punctualityScoreByMasterScoreId($MasterScoreID: Int!)  {punctualityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
            punctualityScoreValue
            masterScoreID
            punctualityScoreID
            punctualityScoreComments
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
          console.log(data.data);
          console.log(data.data.punctualityScoreByMasterScoreId);
          console.log('Punctuality Data: ' +  data.data.punctualityScoreByMasterScoreId.punctualityScoreComments);
          this.$store.commit('setPunctuality',  data.data.punctualityScoreByMasterScoreId.punctualityScoreValue);    
          this.$store.commit('setPunctualityComment',   data.data.punctualityScoreByMasterScoreId.punctualityScoreComments);  
        });      
      },    

      getProductivityScores (masterScoreId) {      
        var query = `query productivityScoreByMasterScoreId($MasterScoreID: Int!)   {productivityScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
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
          console.log(data);
          this.$store.commit('setProductivity',   data.data.productivityScoreByMasterScoreId.productivityScoreValue);  
          this.$store.commit('setProductivityScoreOverride',  data.data.productivityScoreByMasterScoreId.productivityScoreOverride); this.$store.commit('setProductionDailyLinePerformance',  data.data.productivityScoreByMasterScoreId.  productionDailyLinePerformance);
          this.$store.commit('setProductionDailyLineID',  data.data.productivityScoreByMasterScoreId.productionDailyLineID);
          this.$store.commit('setProductivityComment',  data.data.productivityScoreByMasterScoreId.productivityScoreComments);
        });      
      },

      getValuesScores (masterScoreId) {
        var query = `query coreValueScoreByMasterScoreId($MasterScoreID: Int!)  {coreValueScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
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
          this.$store.commit('setValuesArray',  data.data.coreValueScoreByMasterScoreId.valuesScoreValues);

          // console.log /gg  (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b)   => a + b));

          // if valuesScoreValues array contains a 0 setValues to 0, if else  setValues sums to 15 setValues to 31.5, if else setValues sums to  greater than 15 setValues to 33, else setValues to 30
          if (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.includes  (0)) {
            this.$store.commit('setValues', 0); 
          } 
          else if   (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b)   => a + b) === 15) {            
            this.$store.commit('setValues', 31.5);
          } 
          else if   (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.reduce((a, b)   => a + b) > 15) {
            this.$store.commit('setValues', 33);
          } 
          else {
            this.$store.commit('setValues', 30);
          }

          this.$store.commit('setSafety',   data.data.coreValueScoreByMasterScoreId.valuesScoreValues[0]);
          this.$store.commit('setRespect',  data.data.coreValueScoreByMasterScoreId.valuesScoreValues[1]);         this.$store.commit('setIntegrity',   data.data.coreValueScoreByMasterScoreId.valuesScoreValues[2]);          this.$store.commit('setTeamwork',   data.data.coreValueScoreByMasterScoreId.valuesScoreValues[3]);
          this.$store.commit('setInnovation',   data.data.coreValueScoreByMasterScoreId.valuesScoreValues[4]);
          this.$store.commit('setQualityOfWork',  data.data.coreValueScoreByMasterScoreId.valuesScoreValues[5]);
          this.$store.commit('setCustomerFocus',  data.data.coreValueScoreByMasterScoreId.valuesScoreValues[6]);     
        });      
      },

      getCompetenciesScores (masterScoreId) {
        var query = `query competencyScoreByMasterScoreId($MasterScoreID: Int!)   {competencyScoreByMasterScoreId(masterScoreID:$MasterScoreID) {
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
          var compentencyScore =  data.data.competencyScoreByMasterScoreId.competencyScoreValues.reduce( (a, b) => a + b);

          this.$store.commit('setCompetenciesArray',  data.data.competencyScoreByMasterScoreId.competencyScoreValues);
          this.$store.commit('setCompetenciesArrayIDs',   data.data.competencyScoreByMasterScoreId.competencyArrayIDs);

          // this.$store.state.CompetencyScores

          for (let competency in this.$store.state.CompetencyScores) {          
            var competencyScoresIndexKeyValue = {index: '', key: '', value: ''};

            console.log(competency);
            console.log(this.$store.state.CompetencyScores[competency]);       
            console.log (data.data.competencyScoreByMasterScoreId.competencyArrayIDs);
            console.log (data.data.competencyScoreByMasterScoreId.competencyArrayIDs.includes  (parseInt(competency)));

            if  (data.data.competencyScoreByMasterScoreId.competencyArrayIDs.includes  (parseInt(competency))) {
              console.log(`includes( ${competency} )`);
              for (let key in this.$store.state.CompetencyScores[competency]) {
                console.log(key);
                competencyScoresIndexKeyValue.index = competency; 
                competencyScoresIndexKeyValue.key = key;
                competencyScoresIndexKeyValue.value =   this.$store.state.CompetenciesArray[competencyArrayIndex];
                console.log(competencyScoresIndexKeyValue);
                this.$store.commit('setCompetencyScores',   competencyScoresIndexKeyValue);
                competencyArrayIndex++;
              }           
            }                
          }
          console.log(this.$store.state.CompetencyScores);

          // if competencyArrayIDs array contains 7 elements => if  compentencyScore < 13 'setCompetencies' to 0, else if compentencyScore   > 15 'setCompetencies'to 33, else case 13:, case 14:, case 15:  'setCompetencies' to 30
          if (data.data.competencyScoreByMasterScoreId.competencyArrayIDs.length  === 7) {
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

          // if competencyArrayIDs array contains 8 elements => if  compentencyScore < 15 'setCompetencies' to 0, else if compentencyScore   > 17 'setCompetencies'to 33, else case 15:, case 16:, case 17:  'setCompetencies' to 30
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
      },

      getMasterScoreId () {
        console.log(this.ChosenTeamMember.scoreStatusID);

        let currentTeamMemberId = this.ChosenTeamMember.teamMemberID,
            currentScoreStatusId = this.ChosenTeamMember.scoreStatusID,
            chosenTeamMember = this.ChosenTeamMember,
            scoreDate = this.DateToScore,
            scoreUserID = this.UserId,
            store = this.$store,
            getTotal = this.getTotal, 
            getAbsenceScores = this.getAbsenceScores, 
            getPunctualityScores = this.getPunctualityScores, getProductivityScores = this.getProductivityScores, 
            getValuesScores = this.getValuesScores, 
            getCompetenciesScores = this.getCompetenciesScores;        

        let getScoreStatus = fetch('http://apcc-srvm-01:4000/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({            
            query: `query scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!) {
              scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID, scoreDate: $ScoreDate) {
                    scoreTeamMemberID
                    scoreStatusID
                  }
                }`,
            variables: { 
              "ScoreTeamMemberID": this.ChosenTeamMember.teamMemberID,  "ScoreDate": this.DateToScore 
              }
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log(data.data.scoreByTeamMemberIdDate);
            return data.data.scoreByTeamMemberIdDate;
          })
          .catch(e => {
            console.log(e);
          });

        getScoreStatus.then(function (data){
          console.log(currentScoreStatusId);          
          console.log(data);
          if (data == null) {
            currentScoreStatusId = "";
          }
          else {
            currentScoreStatusId = data.scoreStatusID;
          }          
          console.log(currentScoreStatusId);
          console.log(chosenTeamMember);
          callGetMasterScoreId(currentScoreStatusId, chosenTeamMember, scoreDate, scoreUserID, store, getTotal, getAbsenceScores, getPunctualityScores, getProductivityScores, getValuesScores, getCompetenciesScores);
        });

        // console.log(currentScoreStatusId, chosenTeamMember, scoreDate);
        //, getTotal, getAbsenceScores, getPunctualityScores, getProductivityScores, getValuesScores, getCompetenciesScores
        function callGetMasterScoreId (currentScoreStatusId, chosenTeamMember, scoreDate, scoreUserID, store) {
          // DO THIS IF A SCORE EXISTS FOR CHOSEN TEAM MEMBER
          if (currentScoreStatusId != '0' &&  currentScoreStatusId != "") {
            let scoreTeamMemberID = chosenTeamMember.teamMemberID;
                // scoreDate = this.DateToScore;

            console.log(scoreTeamMemberID);
            console.log(scoreDate);
            // console.log(this.DateToScore);

            fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({            
                query: `query scoreByTeamMemberIdDate($ScoreTeamMemberID: String!, $ScoreDate: String!) {
                  scoreByTeamMemberIdDate(scoreTeamMemberID: $ScoreTeamMemberID,scoreDate: $ScoreDate) {
                    scoreID
                  }
                }`,
                variables: { "ScoreTeamMemberID": scoreTeamMemberID, "ScoreDate":     scoreDate.toString() }
              })
            })
            .then(res => res.json())
            .then(data => {
              console.log(data);
              var masterScoreId = data.data.scoreByTeamMemberIdDate.scoreID;
              store.commit('setMasterScoreId', masterScoreId);
              // getTotal(masterScoreId);
              // getAbsenceScores(masterScoreId);
              // getPunctualityScores(masterScoreId);
              // getProductivityScores(masterScoreId);
              // getValuesScores(masterScoreId);
              // getCompetenciesScores(masterScoreId);         
              this.getTotal(masterScoreId);
              this.getAbsenceScores(masterScoreId);
              this.getPunctualityScores(masterScoreId);
              this.getProductivityScores(masterScoreId);
              this.getValuesScores(masterScoreId);
              this.getCompetenciesScores(masterScoreId);         
            })
            .catch(e => {
              console.log(e);
            });        
          } 

          // DO THIS IF A SCORE DOES NOT EXIST FOR CHOSEN TEAM MEMBER
          else {
            console.log(chosenTeamMember.teamMemberID);
            let scoreTeamMemberID = chosenTeamMember.teamMemberID,
                shiftTeamMemberID = chosenTeamMember.teamMemberShiftID,
                positionName = chosenTeamMember.teamMemberPosition,
                fullName = chosenTeamMember.fullName,            
                scoreStatusID = 1,
                // scoreDate = this.DateToScore,
                scoreCreatedDateTime = moment(Date()).format(),
                positionTeamMemberID = chosenTeamMember.teamMemberPosition,    departmentTeamMemberID =  chosenTeamMember.teamMemberDepartmentCode,
                scoreSubmittedDateTime = "",
                // scoreUserID = this.UserId,
                scoreInEditState = false,
                totalScore = 0,           
                cmptncyArrayIDs,           
                newMasterScoreId,
                newAbsenceScoreID,
                newCompetencyScoreID,
                newPunctualityScoreID,
                newProductivityScoreID,
                newValuesScoreID;
                // store = this.$store;

                console.log(fullName);       

            let competencyArrayIDs = fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `query getPositionCompetencyIdByPositionName(
                  $positionName: String
                ) {
                  getPositionCompetencyIdByPositionName(
                    positionName: $positionName,
                  ) {
                    positionCompetencyIDs
                  }
                }`,
                variables: {
                  "positionName": positionName              
                }
              })
            })
            .then(function(res) {
              console.log(res);
              return res.json();
            })
            .then(function(data) {
              console.log   (data.data.getPositionCompetencyIdByPositionName.positionCompetencyIDs );
              return      data.data.getPositionCompetencyIdByPositionName.positionCompetencyIDs;
            })
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ', error.message);
            });         

            let getLastMasterScoresDocument = fetch('http://apcc-srvm-01:4000/graphql',   {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastMasterScoresDocument
                  {
                    scoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              // console.log(data.data.getLastMasterScoresDocument);
              // console.log(data.data.getLastMasterScoresDocument.scoreID);
              return data.data.getLastMasterScoresDocument.scoreID;
            });

            let getLastAbsenceScoresDocument = fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastAbsenceScoresDocument
                  {
                    absenceScoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              console.log(data.data);
              console.log  (data.data.getLastAbsenceScoresDocument.absenceScoreID);
              return data.data.getLastAbsenceScoresDocument.absenceScoreID;
            });

            let getLastCompetencyScoresDocument = fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastCompetencyScoresDocument
                  {
                    competencyScoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              // console.log(data.data);
              // console.log    (data.data.getLastCompetencyScoresDocument.competencyScoreID);
              return data.data.getLastCompetencyScoresDocument.competencyScoreID;
            });

            let getLastPunctualityScoresDocument = fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastPunctualityScoresDocument
                  {
                    punctualityScoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              // console.log(data.data);
              // console.log    (data.data.getLastPunctualityScoresDocument.punctualityScoreID);
              return  data.data.getLastPunctualityScoresDocument.punctualityScoreID;
            });

            let getLastProductivityScoresDocument = fetch('http://apcc-srvm-01:4000/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastProductivityScoresDocument
                  {
                    productivityScoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              // console.log(data.data);
              // console.log    (data.data.getLastProductivityScoresDocument.productivityScoreID);
              return    data.data.getLastProductivityScoresDocument.productivityScoreID;
            });

            let getLastValuesScoresDocument = fetch('http://apcc-srvm-01:4000/graphql',   {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
              },
              body: JSON.stringify({
                query: `{
                  getLastValuesScoresDocument
                  {
                    valuesScoreID                
                  }
                }`
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              // console.log(data.data);
              // console.log(data.data.getLastValuesScoresDocument.valuesScoreID);
              return data.data.getLastValuesScoresDocument.valuesScoreID;
            });      

            getLastMasterScoresDocument.then(function(data) {
              console.log(data);          
              console.log(scoreTeamMemberID);          
              console.log(shiftTeamMemberID);
              console.log(scoreStatusID);
              console.log(scoreDate);
              console.log(scoreCreatedDateTime);
              console.log(positionTeamMemberID);
              console.log(departmentTeamMemberID);
              console.log(scoreUserID);
              console.log(newMasterScoreId);

              newMasterScoreId = data + 1;

              console.log(newMasterScoreId);
              store.commit('setMasterScoreId', newMasterScoreId);
              console.log(store);         

              getLastAbsenceScoresDocument.then(function(data) {

                console.log(data);
                newAbsenceScoreID = data + 1;
                console.log(newAbsenceScoreID);

                fetch('http://apcc-srvm-01:4000/graphql', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                  },
                  body: JSON.stringify({
                    query: `mutation insertNewAbsenceScoreByMasterIdAbsenceId(
                      $absenceScoreID: Int,
                      $absenceScoreValue: Boolean,
                      $absenceScoreAbsentScheduledValue: Boolean,
                      $masterScoreID: Int
                    ) {
                      insertNewAbsenceScoreByMasterIdAbsenceId(
                        absenceScoreID: $absenceScoreID,
                        absenceScoreValue: $absenceScoreValue,
                        absenceScoreAbsentScheduledValue:     $absenceScoreAbsentScheduledValue,
                        masterScoreID: $masterScoreID
                        ) {
                          absenceScoreID                              
                        }
                    }`,
                    variables: {
                      "absenceScoreID": newAbsenceScoreID,
                      "absenceScoreValue": true,
                      "absenceScoreAbsentScheduledValue": null,
                      "masterScoreID": newMasterScoreId
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
                  console.log('There has been a problem with your fetch   operation:    ', error.message);
                });

                competencyArrayIDs.then(function(arrayIds) {

                  console.log(arrayIds);
                  cmptncyArrayIDs = arrayIds;

                  fetch('http://apcc-srvm-01:4000/graphql', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                      query: `mutation insertNewScoresByMasterScoreId(
                        $masterScoreID: Int,
                        $fullName: String,
                        $scoreTeamMemberID: String,
                        $scoreUserID: String,
                        $scoreInEditState: Boolean,
                        $positionTeamMemberID: String,
                        $departmentTeamMemberID: String,
                        $shiftTeamMemberID: Int,
                        $scoreStatusID: Int,
                        $totalScore: Float,
                        $scoreDate: String,
                        $absenceScoreValue: Boolean,
                        $absenceScoreAbsentScheduledValue: Boolean,
                        $punctualityScoreValue: Int,
                        $punctualityScoreComments: [Int],
                        $productivityScoreValue: Float,
                        $productivityScoreComments: [Int],
                        $productivityScoreOverride: Boolean,
                        $productionDailyLineID: String,
                        $productionDailyLinePerformance: Int,
                        $logisticsWeeklyLTOOverride: Boolean,
                        $logisticsWeeklyRR: Int,
                        $logisticsWeeklySC: Int,
                        $logisticsSAPPalletsBackflushed: Int,
                        $logisticsSAPShopOrdersClosed: Int,
                        $logisticsLocationsCounted: Int,
                        $logisticsICPalletsRecieived: Int,
                        $logisticsICPalletsPutAway: Int,
                        $logisticsICAuditsCompleted: Int,
                        $logisticsICAuditsAssigned: Int,
                        $maintenanceHoursWorked: Int,
                        $maintenanceHoursDocumented: Int,
                        $maintenancePMsCompleted: Int,
                        $maintenancePMsAssigned: Int,
                        $maintenanceWOAudits: Int,
                        $maintenanceWOAuditsPassed: Int,
                        $maintenancePartsAudits: Int,
                        $maintenancePartsAuditsPassed: Int,
                        $maintenanceOverduePOs: Int,
                        $maintenanceCountedLocations: Int,
                        $maintenanceCountedLocationsGoal: Int,
                        $maintenanceCompletedWOAudits: Int,
                        $qualityAuditsCompleted: Int,
                        $valuesScoreValues: [Int], 
                        $valuesScoreComments: [[Int]],
                        $competencyArrayIDs: [Int], 
                        $competencyScoreValues: [Int],
                        $competencyScoreComments: [[Int]]
                      ) {
                        insertNewScoresByMasterScoreId(
                          masterScoreID: $masterScoreID,
                          fullName: $fullName,
                          scoreTeamMemberID: $scoreTeamMemberID,
                          scoreUserID: $scoreUserID,
                          scoreInEditState: $scoreInEditState,
                          positionTeamMemberID: $positionTeamMemberID,
                          departmentTeamMemberID: $departmentTeamMemberID,
                          shiftTeamMemberID: $shiftTeamMemberID,
                          scoreStatusID: $scoreStatusID,
                          totalScore: $totalScore,
                          scoreDate: $scoreDate,
                          absenceScoreValue: $absenceScoreValue,
                          absenceScoreAbsentScheduledValue:     $absenceScoreAbsentScheduledValue,
                          punctualityScoreValue: $punctualityScoreValue,
                          punctualityScoreComments: $punctualityScoreComments,
                          productivityScoreValue: $productivityScoreValue,
                          productivityScoreComments: $productivityScoreComments,
                          productivityScoreOverride: $productivityScoreOverride,
                          productionDailyLineID: $productionDailyLineID,
                          productionDailyLinePerformance:     $productionDailyLinePerformance,
                          logisticsWeeklyLTOOverride: $logisticsWeeklyLTOOverride,
                          logisticsWeeklyRR: $logisticsWeeklyRR,
                          logisticsWeeklySC: $logisticsWeeklySC,
                          logisticsSAPPalletsBackflushed:     $logisticsSAPPalletsBackflushed,
                          logisticsSAPShopOrdersClosed:     $logisticsSAPShopOrdersClosed,
                          logisticsLocationsCounted: $logisticsLocationsCounted,
                          logisticsICPalletsRecieived:  $logisticsICPalletsRecieived,
                          logisticsICPalletsPutAway: $logisticsICPalletsPutAway,
                          logisticsICAuditsCompleted: $logisticsICAuditsCompleted,
                          logisticsICAuditsAssigned: $logisticsICAuditsAssigned,
                          maintenanceHoursWorked: $maintenanceHoursWorked,
                          maintenanceHoursDocumented: $maintenanceHoursDocumented,
                          maintenancePMsCompleted: $maintenancePMsCompleted,
                          maintenancePMsAssigned: $maintenancePMsAssigned,
                          maintenanceWOAudits: $maintenanceWOAudits,
                          maintenanceWOAuditsPassed: $maintenanceWOAuditsPassed,
                          maintenancePartsAudits: $maintenancePartsAudits,
                          maintenancePartsAuditsPassed:     $maintenancePartsAuditsPassed,
                          maintenanceOverduePOs: $maintenanceOverduePOs,
                          maintenanceCountedLocations:  $maintenanceCountedLocations,
                          maintenanceCountedLocationsGoal:    $maintenanceCountedLocationsGoal,
                          maintenanceCompletedWOAudits:     $maintenanceCompletedWOAudits,
                          qualityAuditsCompleted: $qualityAuditsCompleted,
                          valuesScoreValues: $valuesScoreValues, 
                          valuesScoreComments: $valuesScoreComments,
                          competencyArrayIDs: $competencyArrayIDs, 
                          competencyScoreValues: $competencyScoreValues,
                          competencyScoreComments: $competencyScoreComments
                        ) {
                            masterScoreID                              
                          }
                      }`,
                      variables: {
                        "masterScoreID": newMasterScoreId,
                        "fullName": fullName,
                        "scoreTeamMemberID": scoreTeamMemberID,
                        "scoreUserID": scoreUserID,
                        "scoreInEditState": false,
                        "positionTeamMemberID": positionTeamMemberID,
                        "departmentTeamMemberID": departmentTeamMemberID,
                        "shiftTeamMemberID": shiftTeamMemberID,
                        "scoreStatusID": scoreStatusID,
                        "totalScore": totalScore,
                        "scoreDate": scoreDate,
                        "absenceScoreValue": false,
                        "absenceScoreAbsentScheduledValue": null,
                        "punctualityScoreValue": 0,
                        "punctualityScoreComments": [],
                        "productivityScoreValue": 0,
                        "productivityScoreComments": [],
                        "productivityScoreOverride": false,
                        "productionDailyLineID": "LN08",
                        "productionDailyLinePerformance": 0,
                        "logisticsWeeklyLTOOverride": null,
                        "logisticsWeeklyRR": null,
                        "logisticsWeeklySC": null,
                        "logisticsSAPPalletsBackflushed": null,
                        "logisticsSAPShopOrdersClosed": null,
                        "logisticsLocationsCounted": null,
                        "logisticsICPalletsRecieived": null,
                        "logisticsICPalletsPutAway": null,
                        "logisticsICAuditsCompleted": null,
                        "maintenanceHoursWorked": null,
                        "maintenanceHoursDocumented": null,
                        "maintenancePMsCompleted": null,
                        "maintenancePMsAssigned": null,
                        "maintenanceWOAudits": null,
                        "maintenanceWOAuditsPassed": null,
                        "maintenancePartsAudits": null,
                        "maintenancePartsAuditsPassed": null,
                        "maintenanceOverduePOs": null,
                        "maintenanceCountedLocations": null,
                        "maintenanceCountedLocationsGoal": null,
                        "maintenanceCompletedWOAudits": null,
                        "qualityAuditsCompleted": null,
                        "valuesScoreValues": [0,0,0,0,0,0,0], 
                        "valuesScoreComments": [[],[],[],[],[],[],[]],
                        "competencyArrayIDs": arrayIds, 
                        "competencyScoreValues": [0,0,0,0,0,0,0,0],
                        "competencyScoreComments": [[],[],[],[],[],[],[],[]]
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
                    console.log('There has been a problem with your fetch     operation:  ', error.message);
                  });

                  getLastCompetencyScoresDocument.then(function(data) {

                    console.log(data);
                    newCompetencyScoreID = data + 1;
                    console.log(newCompetencyScoreID);             

                    fetch('http://apcc-srvm-01:4000/graphql', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                      },
                      body: JSON.stringify({
                        query: `mutation        insertNewCompetencyScoreByMasterIdCompetencyId(
                          $competencyScoreID: Int,
                          $competencyArrayIDs: [Int],
                          $competencyScoreValues: [Int],
                          $competencyScoreComments: [[Int]],
                          $masterScoreID: Int
                        ) {
                          insertNewCompetencyScoreByMasterIdCompetencyId(
                            competencyScoreID: $competencyScoreID,
                            competencyArrayIDs: $competencyArrayIDs,
                            competencyScoreValues: $competencyScoreValues,
                            competencyScoreComments: $competencyScoreComments,
                            masterScoreID: $masterScoreID
                          ) {
                            competencyScoreID
                          }
                        }`,
                        variables: {
                          "competencyScoreID": newCompetencyScoreID,
                          "competencyArrayIDs": cmptncyArrayIDs,
                          "competencyScoreValues": [0,0,0,0,0,0,0,0],
                          "competencyScoreComments": [[],[],[],[],[],[],[],[]],
                          "masterScoreID": newMasterScoreId
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
                      console.log('There has been a problem with your fetch         operation:  ', error.message);
                    });

                    getLastPunctualityScoresDocument.then(function(data) {

                      newPunctualityScoreID = data + 1;

                      fetch('http://apcc-srvm-01:4000/graphql', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                        },
                        body: JSON.stringify({
                          query: `mutation          insertNewPunctualityScoreByMasterIdPunctualityId(
                            $punctualityScoreID: Int,
                            $punctualityScoreValue: Int,
                            $punctualityScoreComments: [Int],
                            $masterScoreID: Int
                          ) {
                            insertNewPunctualityScoreByMasterIdPunctualityId(
                              punctualityScoreID: $punctualityScoreID,
                              punctualityScoreValue: $punctualityScoreValue,
                              punctualityScoreComments: $punctualityScoreComments,
                              masterScoreID: $masterScoreID
                            ) {
                              punctualityScoreID
                            }
                          }`,
                          variables: {
                            "punctualityScoreID": newPunctualityScoreID,
                            "punctualityScoreValue": 0,
                            "punctualityScoreComments": [],
                            "masterScoreID": newMasterScoreId
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
                        console.log('There has been a problem with your fetch           operation:  ', error.message);
                      });

                      getLastProductivityScoresDocument.then(function(data) {

                        newProductivityScoreID = data + 1;

                        fetch('http://apcc-srvm-01:4000/graphql', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                          },
                          body: JSON.stringify({
                            query: `mutation            insertNewProductivityScoreByMasterIdProductivityId(
                              $productivityScoreID: Int,          
                              $productivityScoreValue: Int,
                              $productivityScoreComments: [Int],
                              $productivityScoreOverride: Boolean,
                              $masterScoreID: Int,
                              $productionDailyLineID: String,
                              $productionDailyLinePerformance: Int,
                              $logisticsWeeklyLTOOverride: Boolean,
                              $logisticsWeeklyRR: Int,
                              $logisticsWeeklySC: Int,
                              $logisticsSAPPalletsBackflushed: Int,
                              $logisticsSAPShopOrdersClosed: Int,
                              $logisticsLocationsCounted: Int,
                              $logisticsICPalletsRecieived: Int,
                              $logisticsICPalletsPutAway: Int,
                              $logisticsICAuditsCompleted: Int,
                              $logisticsICAuditsAssigned: Int,
                              $maintenanceHoursWorked: Int,
                              $maintenanceHoursDocumented: Int,
                              $maintenancePMsCompleted: Int,
                              $maintenancePMsAssigned: Int,
                              $maintenanceWOAudits: Int,
                              $maintenanceWOAuditsPassed: Int,
                              $maintenancePartsAudits: Int,
                              $maintenancePartsAuditsPassed: Int,
                              $maintenanceOverduePOs: Int,
                              $maintenanceCountedLocations: Int,
                              $maintenanceCountedLocationsGoal: Int,
                              $maintenanceCompletedWOAudits: Int,
                              $qualityAuditsCompleted: Int
                            ) {
                              insertNewProductivityScoreByMasterIdProductivityId(
                                productivityScoreID: $productivityScoreID,            
                                productivityScoreValue: $productivityScoreValue,
                                productivityScoreComments:    $productivityScoreComments,
                                productivityScoreOverride:    $productivityScoreOverride,
                                masterScoreID: $masterScoreID,
                                productionDailyLineID: $productionDailyLineID,
                                productionDailyLinePerformance:     $productionDailyLinePerformance,
                                logisticsWeeklyLTOOverride:     $logisticsWeeklyLTOOverride,
                                logisticsWeeklyRR: $logisticsWeeklyRR,
                                logisticsWeeklySC: $logisticsWeeklySC,
                                logisticsSAPPalletsBackflushed:     $logisticsSAPPalletsBackflushed,
                                logisticsSAPShopOrdersClosed:     $logisticsSAPShopOrdersClosed,
                                logisticsLocationsCounted:    $logisticsLocationsCounted,
                                logisticsICPalletsRecieived:    $logisticsICPalletsRecieived,
                                logisticsICPalletsPutAway:    $logisticsICPalletsPutAway,
                                logisticsICAuditsCompleted:     $logisticsICAuditsCompleted,
                                logisticsICAuditsAssigned:    $logisticsICAuditsAssigned,
                                maintenanceHoursWorked: $maintenanceHoursWorked,
                                maintenanceHoursDocumented:     $maintenanceHoursDocumented,
                                maintenancePMsCompleted: $maintenancePMsCompleted,
                                maintenancePMsAssigned: $maintenancePMsAssigned,
                                maintenanceWOAudits: $maintenanceWOAudits,
                                maintenanceWOAuditsPassed:    $maintenanceWOAuditsPassed,
                                maintenancePartsAudits: $maintenancePartsAudits,
                                maintenancePartsAuditsPassed:     $maintenancePartsAuditsPassed,
                                maintenanceOverduePOs: $maintenanceOverduePOs,
                                maintenanceCountedLocations:    $maintenanceCountedLocations,
                                maintenanceCountedLocationsGoal:    $maintenanceCountedLocationsGoal,
                                maintenanceCompletedWOAudits:     $maintenanceCompletedWOAudits,
                                qualityAuditsCompleted: $qualityAuditsCompleted
                              ) {
                                productivityScoreID
                              }
                            }`,
                            variables: {
                              "productivityScoreID": newProductivityScoreID,          
                              "productivityScoreValue": 0,
                              "productivityScoreComments": [],
                              "productivityScoreOverride": false,
                              "masterScoreID": newMasterScoreId,
                              "productionDailyLineID": "LN08",
                              "productionDailyLinePerformance": 0,
                              "logisticsWeeklyLTOOverride": null,
                              "logisticsWeeklyRR": null,
                              "logisticsWeeklySC": null,
                              "logisticsSAPPalletsBackflushed": null,
                              "logisticsSAPShopOrdersClosed": null,
                              "logisticsLocationsCounted": null,
                              "logisticsICPalletsRecieived": null,
                              "logisticsICPalletsPutAway": null,
                              "logisticsICAuditsCompleted": null,
                              "logisticsICAuditsAssigned": null,
                              "maintenanceHoursWorked": null,
                              "maintenanceHoursDocumented": null,
                              "maintenancePMsCompleted":null,
                              "maintenancePMsAssigned": null,
                              "maintenanceWOAudits": null,
                              "maintenanceWOAuditsPassed": null,
                              "maintenancePartsAudits": null,
                              "maintenancePartsAuditsPassed": null,
                              "maintenanceOverduePOs": null,
                              "maintenanceCountedLocations": null,
                              "maintenanceCountedLocationsGoal": null,
                              "maintenanceCompletedWOAudits": null,
                              "qualityAuditsCompleted": null
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
                          console.log('There has been a problem with your fetch     operation: ', error.message);
                        });

                        getLastValuesScoresDocument.then(function(data) {

                          newValuesScoreID = data + 1;
                          console.log(newValuesScoreID);
                          console.log(newMasterScoreId);

                          fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `mutation    insertNewValuesScoreByMasterIdValuesId(
                                $valuesScoreID: Int,
                                $valuesScoreValues: [Int],
                                $valuesScoreComments: [[Int]],
                                $masterScoreID: Int
                              ) {
                                insertNewValuesScoreByMasterIdValuesId(
                                  valuesScoreID: $valuesScoreID,
                                  valuesScoreValues: $valuesScoreValues,
                                  valuesScoreComments: $valuesScoreComments,
                                  masterScoreID: $masterScoreID
                                ) {
                                  valuesScoreID
                                }
                              }`,
                              variables: {
                                "valuesScoreID": newValuesScoreID,
                                "valuesScoreValues": [0,0,0,0,0,0,0],
                                "valuesScoreComments": [[],[],[],[],[],[],[]],
                                "masterScoreID": newMasterScoreId
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
                            console.log('There has been a problem with your fetch               operation:  ', error.message);
                          });

                          console.log(data);          
                          console.log(scoreTeamMemberID);          
                          console.log(shiftTeamMemberID);
                          console.log(scoreStatusID);
                          console.log(scoreDate);
                          console.log(scoreCreatedDateTime);
                          console.log(positionTeamMemberID);
                          console.log(departmentTeamMemberID);
                          console.log(scoreUserID);
                          console.log(newMasterScoreId);

                          fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `mutation insertNewMasterScoreByMasterIdDate (  
                                      $scoreID: Int!,
                                      $scoreInEditState: Boolean, 
                                      $scoreTeamMemberID: String,
                                      $scoreUserID: String, 
                                      $shiftTeamMemberID: Int,
                                      $scoreStatusID: Int,
                                      $scoreDate: String, 
                                      $scoreCreatedDateTime: String,
                                      $scoreSubmittedDateTime: String,
                                      $absenceScoreID: Int,
                                      $competencyScoreID: Int,
                                      $productivityScoreID: Int,
                                      $punctualityScoreID: Int,
                                      $valuesScoreID: Int,
                                      $totalScore: Float,
                                      $positionTeamMemberID: String,
                                      $departmentTeamMemberID: String  
                                    ) {
                                        insertNewMasterScoreByMasterIdDate(          
                                          scoreID: $scoreID,
                                          scoreInEditState: $scoreInEditState,
                                          scoreTeamMemberID: $scoreTeamMemberID,
                                          scoreUserID: $scoreUserID,
                                          shiftTeamMemberID: $shiftTeamMemberID,        scoreStatusID: $scoreStatusID,
                                          scoreDate: $scoreDate, 
                                          scoreCreatedDateTime:     $scoreCreatedDateTime,      scoreSubmittedDateTime:       $scoreSubmittedDateTime,
                                          absenceScoreID: $absenceScoreID,
                                          competencyScoreID: $competencyScoreID,
                                          productivityScoreID:  $productivityScoreID,
                                          punctualityScoreID: $punctualityScoreID,
                                          valuesScoreID: $valuesScoreID,
                                          totalScore: $totalScore,
                                          positionTeamMemberID:     $positionTeamMemberID,
                                          departmentTeamMemberID:       $departmentTeamMemberID     
                                        ) {
                                            scoreDate                                 
                                          }
                                  }`, 
                              variables: {          
                                "scoreID": newMasterScoreId,
                                "scoreInEditState": scoreInEditState,      
                                "scoreTeamMemberID": scoreTeamMemberID,
                                "scoreUserID": scoreUserID,             "shiftTeamMemberID": shiftTeamMemberID,
                                "scoreStatusID": scoreStatusID,
                                "scoreDate": scoreDate,
                                "scoreCreatedDateTime": scoreCreatedDateTime,
                                "scoreSubmittedDateTime": scoreSubmittedDateTime,
                                "absenceScoreID": newAbsenceScoreID,
                                "competencyScoreID": newCompetencyScoreID,
                                "productivityScoreID": newProductivityScoreID,
                                "punctualityScoreID": newPunctualityScoreID,
                                "valuesScoreID": newValuesScoreID,
                                "totalScore": totalScore,
                                "positionTeamMemberID": positionTeamMemberID,
                                "departmentTeamMemberID": departmentTeamMemberID
                              }
                            })
                          })
                          .then(function(res) {
                            return res.json();
                          })
                          .then(function(data) {
                            console.log(data.data);                       
                          })
                          .then(function(data) {
                            // getScores(newMasterScoreId);
                          })                    
                          .catch(function(error) {
                            console.log('There has been a problem with your fetch       operation: ', error.message);
                          });

                          let getAbsenceScores = fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `query absenceScoreByMasterScoreId   ($MasterScoreID: Int!)                      {absenceScoreByMasterScoreId   (masterScoreID:$MasterScoreID) {
                                  absenceScoreValue
                                  masterScoreID
                                  absenceScoreID
                                  absenceScoreAbsentScheduledValue
                                }
                              }`,
                              variables: { "MasterScoreID": newMasterScoreId }
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            console.log(data);
                            store.commit('setAbsence',                  data.data.absenceScoreByMasterScoreId.  absenceScoreValue)  ;
                            store.commit('setScheduled',                  data.data.absenceScoreByMasterScoreId.                absenceScoreAbsentScheduledValue);
                          })
                          .catch(function(error) {
                            console.log('There has been a problem with your fetch       operation: ', error.message);
                          });

                          let getPunctualityScores = fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `query punctualityScoreByMasterScoreId   ($MasterScoreID: Int!)                      {punctualityScoreByMasterScoreId   (masterScoreID:$MasterScoreID) {
                                  punctualityScoreValue
                                  masterScoreID
                                  punctualityScoreID
                                  punctualityScoreComments
                                }
                              }`,
                              variables: { "MasterScoreID": newMasterScoreId }
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            console.log(data.data);
                            console.log(data.data.punctualityScoreByMasterScoreId)  ;
                            console.log('Punctuality Data: ' +                  data.data.punctualityScoreByMasterScoreId.    punctualityScoreComments);
                            store.commit('setPunctuality',                  data.data.punctualityScoreByMasterScoreId.    punctualityScoreValue);    
                            store.commit('setPunctualityComment',                   data.data.punctualityScoreByMasterScoreId.    punctualityScoreComments);  
                          });

                          let getProductivityScores = fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `query productivityScoreByMasterScoreId    ($MasterScoreID: Int!)                      {productivityScoreByMasterScoreId   (masterScoreID:$MasterScoreID) {
                                  productionDailyLineID
                                  productivityScoreComments
                                  productionDailyLinePerformance
                                  masterScoreID
                                  productivityScoreID
                                  productivityScoreValue
                                  productivityScoreOverride
                                }
                              }`,
                              variables: { "MasterScoreID": newMasterScoreId }
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            // console.log /gg(data);
                            store.commit('setProductivity',                   data.data.productivityScoreByMasterScoreId.   productivityScoreValue);  
                            store.commit('setProductivityScoreOverride',    data.data.productivityScoreByMasterScoreId.   productivityScoreOverride);            store.commit  ('setProductionDailyLinePerformance',                data.data.productivityScoreByMasterScoreId.              productionDailyLinePerformance);
                            store.commit('setProductionDailyLineID',                  data.data.productivityScoreByMasterScoreId.   productionDailyLineID);
                          })
                          .catch(function(error) {
                            console.log('There has been a problem with your fetch       operation: ', error.message);
                          });

                          let getValuesScores = fetch('http://apcc-srvm-01:4000/graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `query coreValueScoreByMasterScoreId   ($MasterScoreID: Int!)                          {coreValueScoreByMasterScoreId    (masterScoreID:$MasterScoreID) {
                                  valuesScoreID
                                  valuesScoreValues            
                                  valuesScoreComments
                                  masterScoreID            
                                }
                              }`,
                              variables: { "MasterScoreID": newMasterScoreId }
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            // console.log /gg(data);
                            store.commit('setValuesArray',                                            data.data.coreValueScoreByMasterScoreId.  valuesScoreValues);

                            // console.log /gg                                        (data.data.coreValueScoreByMasterScoreId.   valuesScoreValues.reduce((a,                                        b) => a + b));

                            // if valuesScoreValues array contains a 0 setValues  to   0, if else                                      setValues   sums to 15 setValues to 31.5, if else   setValues sums to                                       greater than 15   setValues to 33, else setValues to  30
                            if    (data.data.coreValueScoreByMasterScoreId.valuesScoreValues.includes(0)) {
                              store.commit('setValues', 0); 
                            } 
                            else if                                         (data.data.coreValueScoreByMasterScoreId.   valuesScoreValues.reduce((a,                                        b) => a + b) === 15) {            
                              store.commit('setValues', 31.5);
                            } 
                            else if                                         (data.data.coreValueScoreByMasterScoreId.   valuesScoreValues.reduce((a,                                        b) => a + b) > 15) {
                              store.commit('setValues', 33);
                            } 
                            else {
                              store.commit('setValues', 30);
                            }

                            store.commit('setSafety',                                             data.data.coreValueScoreByMasterScoreId.valuesScoreValues[0]);
                            store.commit('setRespect',                                            data.data.coreValueScoreByMasterScoreId.valuesScoreValues[1]);                                              store.commit('setIntegrity',                                            data.data.coreValueScoreByMasterScoreId.valuesScoreValues[2]);                                              store.commit('setTeamwork',                                           data.data.coreValueScoreByMasterScoreId.valuesScoreValues[3]);
                            store.commit('setInnovation',                                             data.data.coreValueScoreByMasterScoreId.  valuesScoreValues[4]);
                            store.commit('setQualityOfWork',                                            data.data.coreValueScoreByMasterScoreId.  valuesScoreValues[5]);
                            store.commit('setCustomerFocus',                                            data.data.coreValueScoreByMasterScoreId.  valuesScoreValues[6]);
                          })
                          .catch(function(error) {
                            console.log('There has been a problem with your fetch       operation: ', error.message);
                          });

                          let getCompetenciesScores = fetch('http://  apcc-srvm-01:4000/ graphql', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                              'Accept': 'application/json',
                            },
                            body: JSON.stringify({
                              query: `query competencyScoreByMasterScoreId    ($MasterScoreID: Int!)                            {competencyScoreByMasterScoreId                                                 (masterScoreID:$MasterScoreID) {
                                      competencyScoreID
                                      competencyArrayIDs            
                                      competencyScoreValues
                                      competencyScoreComments
                                      masterScoreID            
                                    }
                                  }`,
                              variables: { "MasterScoreID": newMasterScoreId }
                            })
                          })
                          .then(res => res.json())
                          .then(data => {
                            console.log(data);
                            var competencyArrayIndex = 0;
                            var compentencyScore =                    data.data.competencyScoreByMasterScoreId.   competencyScoreValues.reduce( (a, b) => a + b);

                            store.commit('setCompetenciesArray',                    data.data.competencyScoreByMasterScoreId.   competencyScoreValues);
                            store.commit('setCompetenciesArrayIDs',                     data.data.competencyScoreByMasterScoreId.   competencyArrayIDs);

                            // this.$store.state.CompetencyScores

                            for (let competency in store.state.CompetencyScores)  { 
                              var competencyScoresIndexKeyValue = {index: '',   key:  '', value: ''};

                              console.log(competency);
                              console.log(store.state.CompetencyScores[competency]  );         
                              console.log                   (data.data.competencyScoreByMasterScoreId.    competencyArrayIDs);
                              console.log                   (data.data.competencyScoreByMasterScoreId.    competencyArrayIDs.includes(parseInt(competency)));

                              if                    (data.data.competencyScoreByMasterScoreId.    competencyArrayIDs.includes(parseInt(competency))) {
                                console.log(`includes( ${competency} )`);
                                for (let key in store.state.CompetencyScores    [competency]) {
                                  console.log(key);
                                  competencyScoresIndexKeyValue.index =   competency; 
                                  competencyScoresIndexKeyValue.key = key;
                                  competencyScoresIndexKeyValue.value =                     store.state.CompetenciesArray   [competencyArrayIndex];
                                  console.log(competencyScoresIndexKeyValue);
                                  store.commit('setCompetencyScores',                     competencyScoresIndexKeyValue);
                                  competencyArrayIndex++;
                                }           
                              }                
                            }
                            console.log(store.state.CompetencyScores);

                            // if competencyArrayIDs array contains 7 elements =>     if                compentencyScore < 13     'setCompetencies' to 0, else if                   compentencyScore > 15 'setCompetencies'to 33, else  case   13:, case 14:,              case 15:  'setCompetencies'  to 30
                            if                    (data.data.competencyScoreByMasterScoreId.    competencyArrayIDs.length               === 7) {
                              console.log(`Competencies Score: ${compentencyScore}  `)  ;
                              if (compentencyScore < 13) {
                                store.commit('setCompetencies', 0);
                              }
                              else if (compentencyScore > 15) {
                                store.commit('setCompetencies', 33);
                              }
                              else {
                                switch (compentencyScore) {
                                  case 13:
                                  case 14:
                                  case 15:
                                    store.commit('setCompetencies', 30);
                                  break;
                                  default: 
                                    alert('MISSSED a Productivity score     possibility'); 
                                    console.log('MISSSED a possibility');
                                    break;
                                }
                              }            
                            }

                            // if competencyArrayIDs array contains 8 elements =>     if                compentencyScore < 15     'setCompetencies' to 0, else if                   compentencyScore > 17 'setCompetencies'to 33, else  case   15:, case 16:,              case 17:  'setCompetencies'  to 30
                            else {
                              console.log(`Competencies Score: ${compentencyScore}  `)  ;
                              if (compentencyScore < 15) {
                                store.commit('setCompetencies', 0);
                              }
                              else if (compentencyScore > 17) {
                                store.commit('setCompetencies', 33);
                              }
                              else {
                                switch (compentencyScore) {
                                  case 15:
                                  case 16:
                                  case 17:
                                    store.commit('setCompetencies', 30);
                                  break;
                                  default: 
                                    alert('MISSSED a Productivity score     possibility'); 
                                    console.log('MISSSED a possibility');
                                    break;
                                }
                              }     
                            }          
                          })
                          .catch(function(error) {
                            console.log('There has been a problem with your fetch       operation: ', error.message);
                          });                     
                        });
                      });
                    });
                  });
                });
              });         
            });
          }
        }
      }       
    }              
  }
</script>