import Vue from 'vue'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import moment from 'moment'
import database from './database'

console.log(database);

Vue.use(Vuex)

VuexORM.use(VuexORMAxios, {
  database,
  http: {
    //use 3000/scorecard for production 3001/scorecard-sandbox for development
    baseURL: 'http://apcc-srvm-01:3000/scorecard/',
    url: '/',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }    
  }
});

console.log(database);

const store = new Vuex.Store({  
  // strict: true,  
  state: {
    UserId: '',    
    LoggedIn: false,
    CommentOpen: false,
    UserAccessLevel: '',
    ShiftToScore: '1ST',
    DepartmentToScore: 'PRODUCTION',
    DateToScore: moment(new Date()).format('L'),       
    FrstShftPrdctnTmMmbrs: '',
    FrstShftLgstcsTmMmbrs: '',
    FrstShftMntncTmMmbrs: '',
    FrstShftQltyTmMmbrs: '',
    ScndShftPrdctnTmMmbrs: '',
    ScndShftLgstcsTmMmbrs: '',
    ScndShftMntncTmMmbrs: '',
    ScndShftQltyTmMmbrs: '',
    ThrdShftPrdctnTmMmbrs: '',
    ThrdShftLgstcsTmMmbrs: '',
    ThrdShftMntncTmMmbrs: '',
    ThrdShftQltyTmMmbrs: '',
    TeamMembers: '',
    ChosenTeamMember: '',
    ScoreStatusID: '',    
    IsTeamMemberChosen: false,
    DateToDisplay: '',
    Dates: '',
    TeamMemberToDisplay: '',
    ShiftToDisplay: '',
    DepartmentToDisplay: '',
    Total: '',
    Absence: '',
    Scheduled: '',
    Punctuality: '',
    PunctualityComment: '',
    DisplayPunctualityComment: '',
    PunctualityCommentOpen: false,
    Productivity: '',
    ProductivityScoreOverride: false,
    ProductionDailyLinePerformance: '',
    ProductionDailyLineID: '',
    ProductivityComment: '',
    DisplayProductivityComment: '',
    ProductivityCommentOpen: false,
    ValuesArray: '',
    Values: '',
    Safety: '',
    Respect:'',
    Integrity: '',
    Teamwork: '',
    Innovation: '',
    QualityOfWork: '',
    CustomerFocus: '',    
    MasterScoreId: '',
    CompetenciesArray: '',
    CompetenciesArrayIDs: '',
    Competencies: '',
    CompetencyScores: [
      {Approachability: ''},
      {ActionOriented: ''},
      {BuildingEffectiveTeams: ''},
      {BusinessAcumen: ''},
      {Composure: ''},
      {ConflictManagement: ''},
      {CustomerFocus: ''},
      {DealingWithAmbiguity: ''},
      {DealingWithParadox: ''},
      {Delegation: ''},
      {DevelopingDirectReports: ''},
      {DirectingOthers: ''},
      {DriveForResults: ''},
      {FunctionalTechnicalSkills: ''},
      {Informing: ''},
      {InterpersonalSavvy: ''},
      {LearningOnTheFly: ''},
      {Listening: ''},
      {ManagingVisionAndPurpose: ''},
      {MotivatingOthers: ''},
      {Organization: ''},
      {Patience: ''},
      {PeerRelationships: ''},
      {Perserverance: ''},
      {Perspective: ''},
      {Planning: ''},
      {PresentationSkills: ''},
      {PrioritySetting: ''},
      {ProblemSolving: ''},
      {ProcessManagement: ''},
      {StrategicAgility: ''},
      {TechnicalLearning: ''},
      {TimeManagement: ''},
      {TimelyDecisionMaking: ''},
      {WrittenCommunication: ''}
    ],
    Testing: false,
    LoggingIn: true  
  },
  mutations: {
    setUserId (state, UserId) {
      state.UserId = UserId;
      console.log(state.UserId);
    },    
    setLoggedIn (state, LoggedIn) {
      state.LoggedIn = LoggedIn;
      console.log(state.LoggedIn);
    },
    setCommentOpen (state, CommentOpen) {
      state.CommentOpen = CommentOpen;
      console.log(state.CommentOpen);
    },
    setUserAccessLevel (state, UserAccessLevel) {
      state.UserAccessLevel = UserAccessLevel;
      console.log(state.UserAccessLevel);
    },    
    setShiftToScore (state, ShiftToScore) {
      state.ShiftToScore = ShiftToScore;
      console.log(state.ShiftToScore);
    },
    setDepartmentToScore (state, DepartmentToScore) {
      state.DepartmentToScore = DepartmentToScore;
      console.log(state.DepartmentToScore);
    },
    setDateToScore (state, DateToScore) {
      state.DateToScore = DateToScore;
      console.log(state.DateToScore);
    },
    setDates (state, Dates) {
      state.Dates = Dates;
      console.log(state.Dates);
    },   
    setFrstShftPrdctnTmMmbrs (state, FrstShftPrdctnTmMmbrs) {
      state.FrstShftPrdctnTmMmbrs = FrstShftPrdctnTmMmbrs;
      console.log(state.FrstShftPrdctnTmMmbrs);
    },
    setFrstShftLgstcsTmMmbrs (state, FrstShftLgstcsTmMmbrs) {
      state.FrstShftLgstcsTmMmbrs = FrstShftLgstcsTmMmbrs;
      console.log(state.FrstShftLgstcsTmMmbrs);
    },
    setFrstShftMntncTmMmbrs (state, FrstShftMntncTmMmbrs) {
      state.FrstShftMntncTmMmbrs = FrstShftMntncTmMmbrs;
      console.log(state.FrstShftMntncTmMmbrs);
    },
    setFrstShftQltyTmMmbrs (state, FrstShftQltyTmMmbrs) {
      state.FrstShftQltyTmMmbrs = FrstShftQltyTmMmbrs;
      console.log(state.FrstShftQltyTmMmbrs);
    },
    setScndShftPrdctnTmMmbrs (state, ScndShftPrdctnTmMmbrs) {
      state.ScndShftPrdctnTmMmbrs = ScndShftPrdctnTmMmbrs;
      console.log(state.ScndShftPrdctnTmMmbrs);
    },
    setScndShftLgstcsTmMmbrs (state, ScndShftLgstcsTmMmbrs) {
      state.ScndShftLgstcsTmMmbrs = ScndShftLgstcsTmMmbrs;
      console.log(state.ScndShftLgstcsTmMmbrs);
    },
    setScndShftMntncTmMmbrs (state, ScndShftMntncTmMmbrs) {
      state.ScndShftMntncTmMmbrs = ScndShftMntncTmMmbrs;
      console.log(state.ScndShftMntncTmMmbrs);
    },
    setScndShftQltyTmMmbrs (state, ScndShftQltyTmMmbrs) {
      state.ScndShftQltyTmMmbrs = ScndShftQltyTmMmbrs;
      console.log(state.ScndShftQltyTmMmbrs);
    },
    setThrdShftPrdctnTmMmbrs (state, ThrdShftPrdctnTmMmbrs) {
      state.ThrdShftPrdctnTmMmbrs = ThrdShftPrdctnTmMmbrs;
      console.log(state.ThrdShftPrdctnTmMmbrs);
    },
    setThrdShftLgstcsTmMmbrs (state, ThrdShftLgstcsTmMmbrs) {
      state.ThrdShftLgstcsTmMmbrs = ThrdShftLgstcsTmMmbrs;
      console.log(state.ThrdShftLgstcsTmMmbrs);
    },
    setThrdShftMntncTmMmbrs (state, ThrdShftMntncTmMmbrs) {
      state.ThrdShftMntncTmMmbrs = ThrdShftMntncTmMmbrs;
      console.log(state.ScndShftMntncTmMmbrs);
    },
    setThrdShftQltyTmMmbrs (state, ThrdShftQltyTmMmbrs) {
      state.ThrdShftQltyTmMmbrs = ThrdShftQltyTmMmbrs;
      console.log(state.ThrdShftQltyTmMmbrs);
    },
    setTeamMembers (state, TeamMembers) {
      state.teamMembers = TeamMembers;
      console.log(state.teamMembers);
    },
    setChosenTeamMember (state, ChosenTeamMember) {
      state.ChosenTeamMember = ChosenTeamMember;
      console.log(state.ChosenTeamMember);
    },
    setScoreStatusID (state, ScoreStatusID) {
      state.ScoreStatusID = ScoreStatusID;
      console.log(state.ScoreStatusID);
    },
    setDateToDisplay (state, DateToDisplay) {
      state.DateToDisplay = DateToDisplay;
      console.log(state.DateToDisplay);
    },
    setTeamMemberToDisplay (state, TeamMemberToDisplay) {
      state.TeamMemberToDisplay = TeamMemberToDisplay;
      console.log(state.TeamMemberToDisplay);
    },
    setShiftToDisplay (state, ShiftToDisplay) {
      state.ShiftToDisplay = ShiftToDisplay;
      console.log(state.ShiftToDisplay);
    },
    setDepartmentToDisplay (state, DepartmentToDisplay) {
      state.DepartmentToDisplay = DepartmentToDisplay;
      console.log(state.DepartmentToDisplay);
    },
    setIsTeamMemberChosen (state, IsTeamMemberChosen) {
      state.IsTeamMemberChosen = IsTeamMemberChosen;
      console.log(state.IsTeamMemberChosen);
    },
    setTotal (state, Total) {
      state.Total = Total;
      console.log(state.Total);
    },
    setAbsence (state, Absence) {
      state.Absence = Absence;
      console.log(state.Absence);
    },
    setScheduled (state, Scheduled) {
      state.Scheduled = Scheduled;
      console.log(state.Scheduled);
    },
    setPunctuality (state, Punctuality) {
      state.Punctuality = Punctuality;
      console.log(state.Punctuality);
    },
    setPunctualityComment (state, PunctualityCommentArray) {
      state.PunctualityComment = PunctualityCommentArray;
      console.log(state.PunctualityComment);
    },
    setDisplayPunctualityComment (state, DisplayPunctualityComment) {
      state.DisplayPunctualityComment = DisplayPunctualityComment;
      console.log(state.DisplayPunctualityComment);
    },
    setPunctualityCommentOpen (state, PunctualityCommentOpen) {
      state.PunctualityCommentOpen = PunctualityCommentOpen;
      console.log(state.PunctualityCommentOpen);
    },
    setProductivity (state, Productivity) {
      state.Productivity = Productivity;
      console.log(state.Productivity);
    },
    setProductivityScoreOverride (state, ProductivityScoreOverride) {
      state.ProductivityScoreOverride = ProductivityScoreOverride;
      console.log(state.ProductivityScoreOverride);
    },
    setProductionDailyLinePerformance (state, ProductionDailyLinePerformance) {
      state.ProductionDailyLinePerformance = ProductionDailyLinePerformance;
      console.log(state.ProductionDailyLinePerformance);
    },
    setProductionDailyLineID (state, ProductionDailyLineID) {
      state.ProductionDailyLineID = ProductionDailyLineID;
      console.log(state.ProductionDailyLineID);
    },
    setProductivityComment (state, ProductivityComment) {
      state.ProductivityComment = ProductivityComment;
      console.log(state.ProductivityComment);
    },
    setDisplayProductivityComment (state, DisplayProductivityComment) {
      state.DisplayProductivityComment = DisplayProductivityComment;
      console.log(state.DisplayProductivityComment);
    },
    setProductivityCommentOpen (state, ProductivityCommentOpen) {
      state.ProductivityCommentOpen = ProductivityCommentOpen;
      console.log(state.ProductivityCommentOpen);
    },
    setValuesArray (state, ValuesArray) {
      state.ValuesArray = ValuesArray;
      console.log(state.ValuesArray);
    },
    setValues (state, Values) {
      state.Values = Values;
      console.log(state.Values);
    },
    setSafety (state, Safety) {
      state.Safety = Safety;
      console.log(state.Safety);
    },
    setRespect (state, Respect) {
      state.Respect = Respect;
      console.log(state.Respect);
    },
    setIntegrity (state, Integrity) {
      state.Integrity = Integrity;
      console.log(state.Integrity);
    },
    setTeamwork (state, Teamwork) {
      state.Teamwork = Teamwork;
      console.log(state.Teamwork);
    },
    setInnovation (state, Innovation) {
      state.Innovation = Innovation;
      console.log(state.Innovation);
    },
    setQualityOfWork (state, QualityOfWork) {
      state.QualityOfWork = QualityOfWork;
      console.log(state.QualityOfWork);
    },
    setCustomerFocus (state, CustomerFocus) {
      state.CustomerFocus = CustomerFocus;
      console.log(state.CustomerFocus);
    },
    setCompetenciesArray (state, CompetenciesArray) {
      state.CompetenciesArray = CompetenciesArray;
      console.log(state.CompetenciesArray);
    },
    setCompetenciesArrayValue (state, CompetenciesIndexValue) {
      state.CompetenciesArray[CompetenciesIndexValue.index] = CompetenciesIndexValue.value;
      console.log(state.CompetenciesArray);
    },
    setCompetenciesArrayIDs (state, CompetenciesArrayIDs) {
      state.CompetenciesArrayIDs = CompetenciesArrayIDs;
      console.log(state.CompetenciesArrayIDs);
    },
    setCompetencies (state, Competencies) {
      state.Competencies = Competencies;
      console.log(state.Competencies);
    },
    setCompetencyScores (state, CompetencyScoresIndexKeyValue) {
      console.log(CompetencyScoresIndexKeyValue);
      state.CompetencyScores[CompetencyScoresIndexKeyValue.index][CompetencyScoresIndexKeyValue.key] = CompetencyScoresIndexKeyValue.value;
      console.log(state.CompetencyScores);
    },
    setMasterScoreId (state, MasterScoreId) {
      state.MasterScoreId = MasterScoreId;
      console.log(`MaterScoreID: ${state.MasterScoreId}`);
    }, 
    setTesting (state, Testing) {
      state.Testing = Testing;
      console.log(`Testing: ${state.Testing}`);
    },
    setLoggingIn (state, LoggingIn) {
      state.LoggingIn = LoggingIn;
      console.log(`Logging In: ${state.LoggingIn}`);
    },
  },
  // getters: {
  //   getCompetencyScoreByIndexAndName (state, {index, competencyName}) {
  //     return state.CompetencyScores[index][competencyName];
  //   }
  // },
  actions: {
    getScorecard (context) {

    },
  },
  plugins: [VuexORM.install(database)]  
})

export default store;