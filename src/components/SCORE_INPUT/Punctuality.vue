<template>
  <div>
    <fieldset class="box" style="margin-top: 15px">
      <legend class="is-size-5" style="background-color:white; margin-bottom: -15px"><b>Punctuality</b></legend>
        <div style="margin-bottom: 5px"><b>Score: </b>{{ Punctuality }}</div>  
        <label><b>On Time</b>
        <input v-model="Punctuality" v-bind:value="10" type="radio" name="punctuality" :disabled="ScoreStatusID" style="margin-right: 10px">
        </label>
        <label><b>Not On Time</b>
        <input v-model="Punctuality" v-bind:value="0" type="radio" name="punctuality" :disabled="ScoreStatusID" style="margin-right: 10px">
        </label>
        <button v-on:click="OpenPunctualityComment()" :disabled="ScoreStatusID" class="button is-info is-primary">View Comments</button>
        <fieldset v-bind:class="{ 'comment-container': PunctualityCommentOpen }  " v-if="PunctualityCommentOpen === true">
          <b>Punctuality Comment</b>
          <ul style="list-style: none;">            
            <li v-for="comment in Comments" v-bind:key="comment.comment">
              {{ comment.name }}: {{ comment.comment }}
            </li>
          </ul>
          <input type="text" v-model="DisplayPunctualityComment" class="input">
          <button type="button" v-on:click="AddPunctualityComment" class="button">Add</button>
          <button type="button" v-on:click="ClosePunctualityComment" class="button">Close</button> 
        </fieldset>        
    </fieldset>
  </div>
</template>

<script>
import TeamMember from '../../models/TeamMember';
export default {
  data () {
    return {
      Comments: []
    }
  },
  computed: {
    Punctuality: {
      get () {
        // console.log /g(this.$store.state.Punctuality);
        return this.$store.state.Punctuality;
      },
      set (value) {
        // console.log /g(value);
        this.persistPunctuality(value);        
        this.$store.commit('setPunctuality', value);
      }
    },    
    PunctualityComment: {
      get () {       
        console.log(this.$store.state.PunctualityComment);      
        return this.$store.state.PunctualityComment;
      },
      
      set (value) {
        console.log(value);
        this.$store.commit('setPunctualityComment', value);
      }
    },
    DisplayPunctualityComment: {
      get () {
          console.log(this.$store.state.DisplayPunctualityComment);
          return this.$store.state.DisplayPunctualityComment;
      },
      set (value) {
        this.$store.commit('setDisplayPunctualityComment', value); 
      } 
    },
    UserId: {
      get () {
        return this.$store.state.UserId;
      }
    },
    PunctualityCommentOpen: {
      get () {
        console.log(this.$store.state.PunctualityCommentOpen);
        return this.$store.state.PunctualityCommentOpen;
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
    setUserCommentArray (lastUserCommentId, store, persistPunctuality) {
      let punctualityComment = this.PunctualityComment;
      console.log(lastUserCommentId)
      lastUserCommentId.then(function(data) {
        let commentId = data + 1;
        console.log(commentId);
        punctualityComment.push(commentId);
        console.log(punctualityComment);
        store.commit('setPunctualityComment', punctualityComment);
        persistPunctuality(punctualityComment);
      });      
    },
    
    AddPunctualityComment () {
      console.log(this.$store.state.PunctualityComment.length);

      // if (this.$store.state.PunctualityComment === undefined || this.$store.state.PunctualityComment.length == 0) {
        console.log(this.PunctualityComment);
        
        let dsplyPnctltyCmmnt = this.DisplayPunctualityComment,
            userId = this.UserId,
            punctualityCommentArray = [];

        function insertUserCommmentsByCommentId (commentId) {
          console.log(commentId);
          console.log(dsplyPnctltyCmmnt);
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
                        "commentText": dsplyPnctltyCmmnt,
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
        this.$store.commit('setDisplayPunctualityComment', '');
        this.$store.commit('setCommentOpen', false);
        this.$store.commit('setPunctualityCommentOpen', false);       
      // }     
    },
    
    OpenPunctualityComment () {
      console.log(this.PunctualityComment);
      this.Comments.length = 0;      
      let store = this.$store,
          Cmmnts = this.Comments,
          Comment = function (name, comment) {
            this.name = name;
            this.comment = comment;
          };
      
      if (this.PunctualityComment != '') {       

        this.PunctualityComment.forEach(function(commentID){
          let punctualityComment = fetch('http://apcc-srvm-01:4000/graphql', {
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
                      variables: {"commentID": commentID}
              })
            })
            .then(function(res) {
              return res.json();
            })
            .then(function(data) {
              console.log(data.data.userCommmentsByCommentId);
              return data.data.userCommmentsByCommentId;
            })
            .catch(function(error) {
              console.log('There has been a problem with your fetch operation:  ',   error.message);
          });
          
          punctualityComment.then(function (data){
            console.log(data);
            console.log(TeamMember.find(data.commentUserID).fullName);
            let fullName = TeamMember.find(data.commentUserID).fullName;
            let cmmnt = new Comment(fullName, data.commentText);
            console.log(cmmnt);
            Cmmnts.push(cmmnt);
            console.log(Cmmnts);
            // store.commit('setDisplayPunctualityComment', data);   
          });
        });
      }    

      this.$store.commit('setCommentOpen', true);
      this.$store.commit('setPunctualityCommentOpen', true);
    },
    
    ClosePunctualityComment () {
      this.$store.commit('setDisplayPunctualityComment', '');
      this.$store.commit('setCommentOpen', false);
      this.$store.commit('setPunctualityCommentOpen', false);
    },    
    
    persistPunctuality (punctualityScoreValue) {
      var masterScoreId = this.$store.state.MasterScoreId;
      
      this.insertPunctualityScoreByMasterIdPromise(masterScoreId, punctualityScoreValue);

      var query = `mutation punctualityScoreByMasterScoreId($MasterScoreID: Int!, $PunctualityScoreValue: Int!) {
        punctualityScoreByMasterScoreId(
          masterScoreID:$MasterScoreID, punctualityScoreValue:$PunctualityScoreValue
        ) {
          punctualityScoreValue
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
          variables: { "MasterScoreID": masterScoreId,"PunctualityScoreValue": punctualityScoreValue }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);        
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    },    
    
    insertPunctualityScoreByMasterIdPromise (masterScoreID, punctualityScoreValue) {
      console.log(masterScoreID  + ' ' + punctualityScoreValue);
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation InsertPunctualityScoreByMasterID(    
                $masterScoreID: Int, 
                $punctualityScoreValue: Int                 
              ) {
                  insertPunctualityScoreByMasterID(            
                    masterScoreID: $masterScoreID, 
                    punctualityScoreValue: $punctualityScoreValue              
                  ) {
                      masterScoreID,
                      punctualityScoreValue                     
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID, "punctualityScoreValue": punctualityScoreValue}
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
    },
    
    persistPunctualityComments (punctualityCommentArray) {
      var masterScoreId = this.$store.state.MasterScoreId;
      // console.log /g(masterScoreId);

      this.insertPunctualityCommentByMasterIdPromise(masterScoreId, punctualityCommentArray);

      console.log(masterScoreId);
      console.log(punctualityCommentArray);

      var query = `mutation punctualityCommentsByMasterScoreId(
                    $MasterScoreID: Int!, 
                    $PunctualityCommentArray: [Int!]
                  ) {
                    punctualityCommentsByMasterScoreId(
                      masterScoreID:$MasterScoreID, 
                      punctualityScoreComments:$PunctualityCommentArray) {
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
          variables: { "MasterScoreID": masterScoreId,"PunctualityCommentArray": punctualityCommentArray }
        })
      })
      .then(res => res.json())
      .then(data => {
        console.log(data.data);        
      })
      .catch(function(error) {
        console.log('There has been a problem with your fetch operation: ', error.message);
      });
    },

    insertPunctualityCommentByMasterIdPromise(masterScoreID, punctualityCommentArray) {
      console.log(masterScoreID  + ' ' + punctualityCommentArray);
      fetch('http://apcc-srvm-01:4000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation InsertPunctualityCommentByMasterID(    
                $masterScoreID: Int, 
                $punctualityScoreComments: [Int]                 
              ) {
                  insertPunctualityCommentByMasterID(            
                    masterScoreID: $masterScoreID, 
                    punctualityScoreComments: $punctualityScoreComments        
                  ) {
                      masterScoreID,
                      punctualityScoreComments                     
                    }
            }`, 
                variables: { "masterScoreID": masterScoreID, "punctualityScoreComments": punctualityCommentArray}
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
    },
  }
}
</script>