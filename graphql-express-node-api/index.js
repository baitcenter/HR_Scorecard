const express = require('express');
const expressgraphql = require('express-graphql');
const cors = require('cors');
const mongoose = require('mongoose');
const {
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLBoolean,    
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
} = require('graphql');

var app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/scorecard', {
  useNewUrlParser: true
});

const mongoDB = mongoose.connection;
mongoDB.on('error', () => console.log("Failed to connect to database"))
  .once('open', () => {
  console.log('MongoDB connected, but is it working!? - Node GraphQL Router...');
});

const MongooseSchema = mongoose.Schema;

const MasterscoreMongooseSchema = new MongooseSchema({
  scoreID: Number,
  scoreInEditState: Boolean,
  scoreTeamMemberID: String,
  scoreUserID: String,
  positionTeamMemberID: String,
  departmentTeamMemberID: String,
  shiftTeamMemberID: Number,
  scoreStatusID: Number,
  scoreDate: String,
  scoreCreatedDateTime: String,
  scoreSubmittedDateTime: String,
  absenceScoreID: Number,
  competencyScoreID: Number,
  productivityScoreID: Number,
  punctualityScoreID: Number,
  valuesScoreID: Number,
  totalScore: Number
}, {collection: 'masterscores'});

const AbsencescoreMongooseSchema = new MongooseSchema({
  absenceScoreID: Number,
  absenceScoreValue: Boolean,
  absenceScoreAbsentScheduledValue: Boolean,
  masterScoreID: Number
}, {collection: 'absencescores'});

const PunctualityscoreMongooseSchema = new MongooseSchema({
  punctualityScoreID: Number,
  punctualityScoreValue: Number,
  punctualityScoreComments: Array,
  masterScoreID: Number
}, {collection: 'punctualityscores'});

const ProductivityscoreMongooseSchema = new mongoose.Schema({
  productivityScoreID: Number,
  productivityScoreValue: Number,
  productivityScoreComments: Array,
  productivityScoreOverride: Boolean,
  masterScoreID: Number,
  productionDailyLineID: { type: String, required: true },
  productionDailyLinePerformance: Number,
  logisticsWeeklyLTOOverride: Boolean,
  logisticsWeeklyRR: Number,
  logisticsWeeklySC: Number,
  logisticsSAPPalletsBackflushed: Number,
  logisticsSAPShopOrdersClosed: Number,
  logisticsLocationsCounted: Number,
  logisticsICPalletsRecieived: Number,
  logisticsICPalletsPutAway: Number,
  logisticsICAuditsCompleted: Number,
  logisticsICAuditsAssigned: Number,
  maintenanceHoursWorked: Number,
  maintenanceHoursDocumented: Number,
  maintenancePMsCompleted: Number,
  maintenancePMsAssigned: Number,
  maintenanceWOAudits: Number,
  maintenanceWOAuditsPassed: Number,
  maintenancePartsAudits: Number,
  maintenancePartsAuditsPassed: Number,
  maintenanceOverduePOs: Number,
  maintenanceCountedLocations: Number,
  maintenanceCountedLocationsGoal: Number,
  maintenanceCompletedWOAudits: Number,
  qualityAuditsCompleted: Number
}, {collection: 'productivityscores'});

const LinegoalMongooseSchema = new MongooseSchema({
  lineID: String,
  lineSpeed: Number,
  lineArea: Number,
  lineGoal: Number,
  partsPerMinute: Number,
  hourlyOutput: Number,
  dailyOutput: Number,
}, {collection: 'linegoals'});

const CorevaluescoreMongooseSchema = new mongoose.Schema({ 
  valuesScoreID: Number,
  valuesScoreValues: Array, 
  valuesScoreComments: Array,
  masterScoreID: Number,
}, {collection: 'corevaluescores'});

const CompetencyscoreMongooseSchema = new mongoose.Schema({ 
  competencyScoreID: Number,
  competencyArrayIDs: Array, 
  competencyScoreValues: Array, 
  competencyScoreComments: Array,
  masterScoreID: Number,
}, {collection: 'competencyscores'});

const UsercommentsMongooseSchema = new mongoose.Schema({
  commentID: Number,
  commentText: String,
  commentUserID: String,
  commentDateTime: String
}, {collection: 'usercomments'});

const JobpositionsMongooseSchema = new mongoose.Schema({
  positionID: Number,
  positionName: String,
  positionDepartmentID: Number,
  positionCompetencyIDs: Array 
}, {collection: 'jobpositions'});

const UseraccessMongooseSchema = new mongoose.Schema({
  teamMemberID: String,
  userAccessLevel: String
}, {collection: 'useraccess'});

const ScoresbymasterscoreidMongooseSchema = new mongoose.Schema({
  masterScoreID: Number,
  fullName: String,
  scoreTeamMemberID: String,
  scoreUserID: String,
  scoreInEditState: Boolean,
  positionTeamMemberID: String,
  departmentTeamMemberID: String,
  shiftTeamMemberID: Number,
  scoreStatusID: Number,
  totalScore: Number,
  scoreDate: String,
  absenceScoreValue: Boolean,
  absenceScoreAbsentScheduledValue: Boolean,
  punctualityScoreValue: Number,
  punctualityScoreComments: Array,
  productivityScoreValue: Number,
  productivityScoreComments: Array,
  productivityScoreOverride: Boolean,
  productionDailyLineID: { type: String, required: true },
  productionDailyLinePerformance: Number,
  logisticsWeeklyLTOOverride: Boolean,
  logisticsWeeklyRR: Number,
  logisticsWeeklySC: Number,
  logisticsSAPPalletsBackflushed: Number,
  logisticsSAPShopOrdersClosed: Number,
  logisticsLocationsCounted: Number,
  logisticsICPalletsRecieived: Number,
  logisticsICPalletsPutAway: Number,
  logisticsICAuditsCompleted: Number,
  logisticsICAuditsAssigned: Number,
  maintenanceHoursWorked: Number,
  maintenanceHoursDocumented: Number,
  maintenancePMsCompleted: Number,
  maintenancePMsAssigned: Number,
  maintenanceWOAudits: Number,
  maintenanceWOAuditsPassed: Number,
  maintenancePartsAudits: Number,
  maintenancePartsAuditsPassed: Number,
  maintenanceOverduePOs: Number,
  maintenanceCountedLocations: Number,
  maintenanceCountedLocationsGoal: Number,
  maintenanceCompletedWOAudits: Number,
  qualityAuditsCompleted: Number,
  valuesScoreValues: Array, 
  valuesScoreComments: Array,
  competencyArrayIDs: Array, 
  competencyScoreValues: Array, 
  competencyScoreComments: Array,
}, {collection: 'scoresbymasterscoreid'});

const MasterscoreModel = mongoose.model('Masterscores', MasterscoreMongooseSchema);

const AbsencescoreModel = mongoose.model('Absencescores', AbsencescoreMongooseSchema);

const PunctualityscoreModel = mongoose.model('Punctualityscores', PunctualityscoreMongooseSchema);

const ProductivityscoreModel = mongoose.model('Productivityscores', ProductivityscoreMongooseSchema);

const LinegoalModel = mongoose.model('Linegoals', LinegoalMongooseSchema);

const CorevaluescoreModel = mongoose.model('Corevaluescores', CorevaluescoreMongooseSchema);

const CompetencyscoreModel = mongoose.model('Competencyscores', CompetencyscoreMongooseSchema);

const UsercommentsModel = mongoose.model('Usercomments', UsercommentsMongooseSchema);

const JobpositionsModel = mongoose.model('Jobpositions', JobpositionsMongooseSchema);

const UseraccessModel = mongoose.model('Useraccess', UseraccessMongooseSchema);

const ScoresbymasterscoreidModel = mongoose.model('Scoresbymasterscoreid', ScoresbymasterscoreidMongooseSchema);

const MasterscoreType = new GraphQLObjectType({
  name: 'Masterscore',
  fields: {
    _id: { type: GraphQLID },
    scoreID: { type: GraphQLInt },
    scoreInEditState: { type: GraphQLBoolean },
    scoreTeamMemberID: { type: GraphQLString },
    scoreUserID: { type: GraphQLString },
    positionTeamMemberID: { type: GraphQLString },
    departmentTeamMemberID: { type: GraphQLString },
    shiftTeamMemberID: { type: GraphQLInt },
    scoreStatusID: { type: GraphQLInt },
    scoreDate: { type: GraphQLString },
    scoreCreatedDateTime: { type: GraphQLString },
    scoreSubmittedDateTime: { type: GraphQLString },
    absenceScoreID: { type: GraphQLInt },
    competencyScoreID: { type: GraphQLInt },
    productivityScoreID: { type: GraphQLInt },
    punctualityScoreID: { type: GraphQLInt },
    valuesScoreID: { type: GraphQLInt },
    totalScore: { type: GraphQLFloat }
  }
});

const AbsencescoreType = new GraphQLObjectType({
  name: 'Absencescore',
  fields: {
    _id: { type: GraphQLID },
    absenceScoreID: { type: GraphQLInt },
    absenceScoreValue: { type: GraphQLBoolean },
    absenceScoreAbsentScheduledValue: { type: GraphQLBoolean },
    masterScoreID: { type: GraphQLInt }
  }
});

const PunctualityscoreType = new GraphQLObjectType({
  name: 'Punctualityscore',
  fields: {
    _id: { type: GraphQLID },
    punctualityScoreID: { type: GraphQLInt },
    punctualityScoreValue: { type: GraphQLInt },
    punctualityScoreComments: { type: new GraphQLList(GraphQLInt) },
    masterScoreID: { type: GraphQLInt }
  }
});

const ProductivityscoreType = new GraphQLObjectType({
  name: 'Productivityscore',
  fields: {
    _id: { type: GraphQLID },
    productivityScoreID: { type: GraphQLInt },
    productivityScoreValue: { type: GraphQLFloat },
    productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
    productivityScoreOverride: { type: GraphQLBoolean },
    masterScoreID: { type: GraphQLInt },
    productionDailyLineID: { type: GraphQLString },
    productionDailyLinePerformance: { type: GraphQLInt },
    logisticsWeeklyLTOOverride: { type: GraphQLBoolean },
    logisticsWeeklyRR: { type: GraphQLInt },
    logisticsWeeklySC: { type: GraphQLInt },
    logisticsSAPPalletsBackflushed: { type: GraphQLInt },
    logisticsSAPShopOrdersClosed: { type: GraphQLInt },
    logisticsLocationsCounted: { type: GraphQLInt },
    logisticsICPalletsRecieived: { type: GraphQLInt },
    logisticsICPalletsPutAway: { type: GraphQLInt },
    logisticsICAuditsCompleted: { type: GraphQLInt },
    logisticsICAuditsAssigned: { type: GraphQLInt },
    maintenanceHoursWorked: { type: GraphQLInt },
    maintenanceHoursDocumented: { type: GraphQLInt },
    maintenancePMsCompleted: { type: GraphQLInt },
    maintenancePMsAssigned: { type: GraphQLInt },
    maintenanceWOAudits: { type: GraphQLInt },
    maintenanceWOAuditsPassed: { type: GraphQLInt },
    maintenancePartsAudits: { type: GraphQLInt },
    maintenancePartsAuditsPassed: { type: GraphQLInt },
    maintenanceOverduePOs: { type: GraphQLInt },
    maintenanceCountedLocations: { type: GraphQLInt },
    maintenanceCountedLocationsGoal: { type: GraphQLInt },
    maintenanceCompletedWOAudits: { type: GraphQLInt },
    qualityAuditsCompleted: { type: GraphQLInt }
  }
});

const LinegoalType = new GraphQLObjectType({
  name: 'Linegoal',
  fields: {
    _id: { type: GraphQLID },
    lineID: { type: GraphQLString },
    lineSpeed: { type: GraphQLInt },
    lineArea: { type: GraphQLInt },
    lineGoal: { type: GraphQLInt },
    partsPerMinute: { type: GraphQLInt },
    hourlyOutput: { type: GraphQLInt },
    dailyOutput: { type: GraphQLInt }
  }
});

const CorevaluescoreType = new GraphQLObjectType({
  name: 'Corevaluescore',
  fields: () => ({
    _id: { type: GraphQLID },
    valuesScoreID: { type: GraphQLInt },
    valuesScoreValues: { type: new GraphQLList(GraphQLInt) }, 
    valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
    masterScoreID: { type: GraphQLInt }
  })
});

const CompetencyscoreType = new GraphQLObjectType({
  name: 'Competencyscore',
  fields: () => ({
    _id: { type: GraphQLID },
    competencyScoreID: { type: GraphQLInt },
    competencyArrayIDs: { type: new GraphQLList(GraphQLInt) }, 
    competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
    competencyScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
    masterScoreID: { type: GraphQLInt }
  })
});

const UsercommentsType = new GraphQLObjectType({
  name: 'Usercomments',
  fields: () => ({
    _id: { type: GraphQLID },
    commentID: { type: GraphQLInt },
    commentText: { type: GraphQLString },
    commentUserID: { type: GraphQLString },
    commentDateTime: { type: GraphQLString }
  })
});

const JobpositionsType = new GraphQLObjectType({
  name: 'Jobpositions',
  fields: () => ({
    _id: { type: GraphQLID },
    positionID: { type: GraphQLInt },
    positionName: { type: GraphQLString },
    positionDepartmentID: { type: GraphQLInt },
    positionCompetencyIDs: { type: new GraphQLList(GraphQLInt) }
  })
});

const UseraccessType = new GraphQLObjectType({
  name: 'Useraccess',
  fields: () => ({
    _id: { type: GraphQLID },
    teamMemberID: { type: GraphQLString },
    userAccessLevel: { type: GraphQLString }    
  })
});

const ScoresbymasterscoreidType = new GraphQLObjectType({
  name: 'Scoresbymasterscoreid',
  fields: () => ({
    _id: { type: GraphQLID },
    masterScoreID: { type: GraphQLInt },
    fullName: { type: GraphQLString },
    scoreTeamMemberID: { type: GraphQLString },
    scoreUserID: {type: GraphQLString},
    scoreInEditState: { type: GraphQLBoolean },
    positionTeamMemberID: {type: GraphQLString},
    departmentTeamMemberID: {type: GraphQLString},
    shiftTeamMemberID: { type: GraphQLInt },
    scoreStatusID: { type: GraphQLInt },
    totalScore: { type: GraphQLFloat },
    scoreDate: { type: GraphQLString },
    absenceScoreValue: { type: GraphQLBoolean },
    absenceScoreAbsentScheduledValue: { type: GraphQLBoolean },
    punctualityScoreValue: { type: GraphQLInt },
    punctualityScoreComments: { type: new GraphQLList(GraphQLInt) },
    productivityScoreValue: { type: GraphQLFloat },
    productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
    productivityScoreOverride: { type: GraphQLBoolean },
    productionDailyLineID: { type: GraphQLString },
    productionDailyLinePerformance: { type: GraphQLInt },
    logisticsWeeklyLTOOverride: { type: GraphQLBoolean },
    logisticsWeeklyRR: { type: GraphQLInt },
    logisticsWeeklySC: { type: GraphQLInt },
    logisticsSAPPalletsBackflushed: { type: GraphQLInt },
    logisticsSAPShopOrdersClosed: { type: GraphQLInt },
    logisticsLocationsCounted: { type: GraphQLInt },
    logisticsICPalletsRecieived: { type: GraphQLInt },
    logisticsICPalletsPutAway: { type: GraphQLInt },
    logisticsICAuditsCompleted: { type: GraphQLInt },
    logisticsICAuditsAssigned: { type: GraphQLInt },
    maintenanceHoursWorked: { type: GraphQLInt },
    maintenanceHoursDocumented: { type: GraphQLInt },
    maintenancePMsCompleted: { type: GraphQLInt },
    maintenancePMsAssigned: { type: GraphQLInt },
    maintenanceWOAudits: { type: GraphQLInt },
    maintenanceWOAuditsPassed: { type: GraphQLInt },
    maintenancePartsAudits: { type: GraphQLInt },
    maintenancePartsAuditsPassed: { type: GraphQLInt },
    maintenanceOverduePOs: { type: GraphQLInt },
    maintenanceCountedLocations: { type: GraphQLInt },
    maintenanceCountedLocationsGoal: { type: GraphQLInt },
    maintenanceCompletedWOAudits: { type: GraphQLInt },
    qualityAuditsCompleted: { type: GraphQLInt },
    valuesScoreValues: { type: new GraphQLList(GraphQLInt) }, 
    valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
    competencyArrayIDs: { type: new GraphQLList(GraphQLInt) }, 
    competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
    competencyScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt))}    
  })  
});

const ScorecardGraphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      scores: {
        type: GraphQLList(MasterscoreType),
        resolve: (root, args, context, info) => {
          return MasterscoreModel.find().exec();
        }
      },
      scoreByScoreId: {
        type: MasterscoreType,
        args: {
          scoreID: { type: GraphQLInt },          
        },
        resolve: (root, args, context, info) => {
          return MasterscoreModel.findOne( {scoreID: args.scoreID} ).exec();
        }
      },
      scoresByTeamMemberId: {
        type: GraphQLList(MasterscoreType),
        args: { 
          scoreTeamMemberID: { type: GraphQLString }
        },
        resolve: (root, args, context, info) => {
          return MasterscoreModel.find( {scoreTeamMemberID: args.scoreTeamMemberID} ).exec();
        }
      },
      scoreByTeamMemberIdDate: {
        type: MasterscoreType,
        args: {
          scoreTeamMemberID: { type: GraphQLString },
          scoreDate: { type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          return MasterscoreModel.findOne( {scoreTeamMemberID: args.scoreTeamMemberID, scoreDate: args.scoreDate} ).exec();
        } 
      },
      scoresByDate: {
        type: GraphQLList(MasterscoreType),
        args: {
          scoreDate: { type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return MasterscoreModel.find( {scoreDate: args.scoreDate} ).exec();
        } 
      },
      scoresByDateRange: {
        type: GraphQLList(MasterscoreType),
        args: {
          scoreDate: { type: GraphQLString},
          scoreDateStart: { type: GraphQLString},
          scoreDateEnd: { type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return MasterscoreModel.find( {scoreDate: {'$gte': args.scoreDateStart, '$lt': args.scoreDateEnd}} ).sort('scoreDate').exec();
        } 
      },      
      userAccessLevelByTeamMemberId: {
        type: UseraccessType,
        args: {
          teamMemberID: { type: GraphQLString},
          userAccessLevel: { type: GraphQLString}, 
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          return UseraccessModel.findOne( { teamMemberID: args.teamMemberID } ).exec();
        } 
      },      
      displayScoresByDateRange: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},
          scoreDateStart: { type: GraphQLString},
          scoreDateEnd: { type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: {'$gte': args.scoreDateStart, '$lte': args.scoreDateEnd}} ).sort('scoreDate').exec();
        } 
      },
      displayScoresByDateByFullName: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},          
          fullName: {type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: args.scoreDate, fullName: args.fullName} ).sort('scoreDate').exec();
        } 
      },      
      displayScoresByDateRangeByFullName: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},
          scoreDateStart: { type: GraphQLString},
          scoreDateEnd: { type: GraphQLString},
          fullName: {type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: {'$gte': args.scoreDateStart, '$lt': args.scoreDateEnd}, fullName: args.fullName} ).sort('scoreDate').exec();
        } 
      },      
      displayScoresByDateByShiftTeamMemberId: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},          
          shiftTeamMemberID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          return ScoresbymasterscoreidModel.find( {scoreDate: args.scoreDate, shiftTeamMemberID: args.shiftTeamMemberID} ).sort('scoreDate').exec();
        } 
      },      
      displayScoresByDateRangeByShiftTeamMemberId: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},
          scoreDateStart: { type: GraphQLString},
          scoreDateEnd: { type: GraphQLString},
          shiftTeamMemberID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: {'$gte': args.scoreDateStart, '$lt': args.scoreDateEnd}, shiftTeamMemberID: args.shiftTeamMemberID} ).sort('scoreDate').exec();
        } 
      },      
      displayScoresByDateByDepartmentTeamMemberId: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},          
          departmentTeamMemberID: {type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: args.scoreDate, departmentTeamMemberID: args.departmentTeamMemberID} ).sort('scoreDate').exec();
        } 
      },      
      displayScoresByDateRangeByDepartmentTeamMemberId: {
        type: GraphQLList(ScoresbymasterscoreidType),
        args: {
          scoreDate: { type: GraphQLString},
          scoreDateStart: { type: GraphQLString},
          scoreDateEnd: { type: GraphQLString},
          departmentTeamMemberID: {type: GraphQLString}
        },
        resolve: (root, args, context, info) => {
          return ScoresbymasterscoreidModel.find( {scoreDate: {'$gte': args.scoreDateStart, '$lt': args.scoreDateEnd}, departmentTeamMemberID: args.departmentTeamMemberID} ).sort('scoreDate').exec();
        } 
      },      
      absenceScoreByMasterScoreId: {
        type: AbsencescoreType,
        args: {
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return AbsencescoreModel.findOne( {masterScoreID: args.masterScoreID} ).exec();
        }
      },     
      punctualityScoreByMasterScoreId: {
        type: PunctualityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return PunctualityscoreModel.findOne( {masterScoreID: args.masterScoreID} ).exec();
        }
      },      
      productivityScoreByMasterScoreId: {
        type: ProductivityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.findOne( {masterScoreID: args.masterScoreID} ).exec();
        }
      },
      coreValueScoreByMasterScoreId: {
        type:  CorevaluescoreType,
        args: {
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return CorevaluescoreModel.findOne( {masterScoreID: args.masterScoreID} ).exec();
        }
      },
      competencyScoreByMasterScoreId: {
        type:  CompetencyscoreType,
        args: {
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return CompetencyscoreModel.findOne( {masterScoreID: args.masterScoreID} ).exec();
        }
      },
      userCommmentsByCommentId: {
        type:  UsercommentsType,
        args: {
          commentID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return UsercommentsModel.findOne( {commentID: args.commentID} ).exec();
        }
      },
      getLastUserCommentsDocument: {
        type:  UsercommentsType,
        resolve: (root, args, context, info) => {
          return UsercommentsModel.findOne().sort({ commentID: -1 });
        }
      },
      getLastMasterScoresDocument: {
        type: MasterscoreType,
        resolve: (root, args, context, info) => {
          return MasterscoreModel.findOne().sort({ scoreID: -1 }).limit(1);
        }
      },
      getLastAbsenceScoresDocument: {
        type: AbsencescoreType,
        resolve: (root, args, context, info) => {
          return AbsencescoreModel.findOne().sort({ absenceScoreID: -1 }).limit(1);
        }
      },
      getLastCompetencyScoresDocument: {
        type: CompetencyscoreType,
        resolve: (root, args, context, info) => {
          return CompetencyscoreModel.findOne().sort({ competencyScoreID: -1 }).limit(1);
        }
      },
      getLastPunctualityScoresDocument: {
        type: PunctualityscoreType,
        resolve: (root, args, context, info) => {
          return PunctualityscoreModel.findOne().sort({ punctualityScoreID: -1 }).limit(1);
        }
      },
      getLastProductivityScoresDocument: {
        type: ProductivityscoreType,
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.findOne().sort({ productivityScoreID: -1 }).limit(1);
        }
      },
      getLastValuesScoresDocument: {
        type: CorevaluescoreType,
        resolve: (root, args, context, info) => {
          return CorevaluescoreModel.findOne().sort({ valuesScoreID: -1 }).limit(1);
        }
      },
      getPositionCompetencyIdByPositionName: {
        type: JobpositionsType,
        args: {
          positionName: { type: GraphQLString }
        },
        resolve: (root, args, context, info) => {          
          return JobpositionsModel.findOne( {positionName: args.positionName} ).exec();
        }
      },
      // valuesScoreByValueScoreId: {
      //   type:  ValuesscoreType,
      //   args: {
      //     valueScoreID: { type: GraphQLInt }
      //   },
      //   resolve: (root, args, context, info) => {
      //     return ValuesscoreModel.findOne( {valueScoreID: args.valueScoreID} ).exec();
      //   }
      // },
      // valuesScores: {
      //   type: GraphQLList(ValuesscoreType),
      //   resolve: (root, args, context, info) => {
      //     return ValuesscoreModel.find().exec();
      //   }
      // },
      lineGoals: {
        type: GraphQLList(LinegoalType),
        resolve: (root, args, context, info) => {
          return LinegoalModel.find().exec();
        }
      }      
    }
  }),

  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      scoreByTeamMemberIdDate: {
        type: MasterscoreType,
        args: {
          scoreTeamMemberID: { type: GraphQLString },
          scoreDate: { type: GraphQLString},
          scoreStatusID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return MasterscoreModel.updateOne( {scoreTeamMemberID: args.scoreTeamMemberID, scoreDate: args.scoreDate}, { $set: {scoreStatusID: args.scoreStatusID}} ).exec();
        } 
      },
      setScoreStatusIdScoresByMasterScoreId: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID: { type: GraphQLInt },          
          scoreStatusID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          return ScoresbymasterscoreidModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {scoreStatusID: args.scoreStatusID}} ).exec();
        } 
      },
      absenceScoreByMasterScoreId: {
        type: AbsencescoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          absenceScoreValue: { type: GraphQLBoolean }
        },
        resolve: (root, args, context, info) => {
          return AbsencescoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {absenceScoreValue: args.absenceScoreValue}} ).exec();
        }
      },
      scheduledScoreByMasterScoreId: {
        type: AbsencescoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          absenceScoreAbsentScheduledValue: { type: GraphQLBoolean }
        },
        resolve: (root, args, context, info) => {
          return AbsencescoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {absenceScoreAbsentScheduledValue: args.absenceScoreAbsentScheduledValue}} ).exec();
        }
      },
      punctualityScoreByMasterScoreId: {
        type: PunctualityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          punctualityScoreValue: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return PunctualityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {punctualityScoreValue: args.punctualityScoreValue}} ).exec();
        }
      },
      punctualityCommentsByMasterScoreId: {
        type: PunctualityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          punctualityScoreComments: { type: new GraphQLList(GraphQLInt) }
        },
        resolve: (root, args, context, info) => {
          return PunctualityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {punctualityScoreComments: args.punctualityScoreComments}} ).exec();
        }
      },
      coreValueScoreByMasterScoreId: {
        type:  CorevaluescoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          valuesScoreValues: { type: new GraphQLList(GraphQLInt) }, 
          valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) }
        },
        resolve: (root, args, context, info) => {
          return CorevaluescoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {valuesScoreValues: args.valuesScoreValues, valuesScoreComments: args.valuesScoreComments}} ).exec();
        }
      },
      productivityScoreByMasterScoreId: {
        type: ProductivityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          productivityScoreValue: { type: GraphQLFloat }
        },
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {productivityScoreValue: args.productivityScoreValue}} ).exec();
        }
      },
      productivityScoreOverrideByMasterScoreId: {
        type: ProductivityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          productivityScoreOverride: { type: GraphQLBoolean }
        },
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {productivityScoreOverride: args.productivityScoreOverride}} ).exec();
        }
      },
      productionDailyLineIDByMasterScoreId: {
        type: ProductivityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          productionDailyLineID: { type: GraphQLString }
        },
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {productionDailyLineID: args.productionDailyLineID}}, {new: true} ).exec();
        }
      },
      productionDailyLinePerformanceByMasterScoreId: {
        type: ProductivityscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          productionDailyLinePerformance: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          return ProductivityscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {productionDailyLinePerformance: args.productionDailyLinePerformance}}, {new: true} ).exec();
        }
      },
      competencyScoreByMasterScoreId: {
        type:  CompetencyscoreType,
        args: {
          masterScoreID: { type: GraphQLInt },
          competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
        },
        resolve: (root, args, context, info) => {
          return CompetencyscoreModel.updateOne( {masterScoreID: args.masterScoreID}, { $set: {competencyScoreValues: args.competencyScoreValues}} ).exec();
        }
      },
      totalByMasterScoreId: {
        type: MasterscoreType,
        args: {
          scoreID: { type: GraphQLInt },
          totalScore: { type: GraphQLFloat },
        },
        resolve: (root, args, context, info) => {
          MasterscoreModel.updateOne( 
            {scoreID: args.scoreID}, 
            { $set:
              {
                totalScore: args.totalScore
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            } 
          );
        }
      },
      totalScoreByMasterScoreId: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID: { type: GraphQLInt },
          totalScore: { type: GraphQLFloat },
        },
        resolve: (root, args, context, info) => {
          ScoresbymasterscoreidModel.updateOne( 
            {masterScoreID: args.masterScoreID}, 
            { $set:
              {
                totalScore: args.totalScore
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            } 
          );
        }
      },
      insertUserCommmentsByCommentId: {
        type:  UsercommentsType,
        args: {
          commentID: { type: GraphQLInt },
          commentText: { type: GraphQLString },
          commentUserID: { type: GraphQLString },
          commentDateTime: { type: GraphQLString }
        },
        resolve: (root, args, context, info) => {
          UsercommentsModel.updateOne({commentID: args.commentID}, { $set: {commentID: args.commentID, commentText: args.commentText, commentUserID: args.commentUserID, commentDateTime: args.commentDateTime}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          });
        }
      },
      insertAbsenceScoreByMasterScoreID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID: { type: GraphQLInt },          
          absenceScoreValue: { type: GraphQLBoolean },
          absenceScoreAbsentScheduledValue: { type: GraphQLBoolean }         
        },
        resolve: (root, args, context, info) => {
          console.log(args);          
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {absenceScoreValue: args.absenceScoreValue, absenceScoreAbsentScheduledValue: args.absenceScoreAbsentScheduledValue}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          });         
        }
      },
      insertPunctualityByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          punctualityScoreValue: { type: GraphQLInt },
          punctualityScoreComments: { type: new GraphQLList(GraphQLInt) }
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {punctualityScoreValue: args.punctualityScoreValue, punctualityScoreComments: args.punctualityScoreComments}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          });      
        }
      },
      insertPunctualityScoreByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          punctualityScoreValue: { type: GraphQLInt }          
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {punctualityScoreValue: args.punctualityScoreValue}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          });      
        }
      },
      insertPunctualityCommentByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },          
          punctualityScoreComments: { type: new GraphQLList(GraphQLInt) }
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {punctualityScoreComments: args.punctualityScoreComments}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          });      
        }
      },
      insertProductivityByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          productivityScoreValue: { type: GraphQLFloat },
          productionDailyLineID: { type: GraphQLString },
          productionDailyLinePerformance: { type: GraphQLInt },
          productivityScoreOverride: { type: GraphQLBoolean },
          productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: { productivityScoreValue: args.productivityScoreValue, productionDailyLineID: args.productionDailyLineID, productionDailyLinePerformance: args.productionDailyLinePerformance, productivityScoreOverride: args.productivityScoreOverride, productivityScoreComments: args.productivityScoreComments } }, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertProductivityScoreValueByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          productivityScoreValue: { type: GraphQLFloat },          
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {productivityScoreValue: args.productivityScoreValue}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertProductionDailyLineIDByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          productionDailyLineID: { type: GraphQLString },          
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {productionDailyLineID: args.productionDailyLineID}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertProductionDailyLinePerformanceByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID: { type: GraphQLInt },          
          productionDailyLinePerformance: { type: GraphQLInt },          
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: { productionDailyLinePerformance: args.productionDailyLinePerformance} }, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertProductivityScoreOverrideByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },          
          productivityScoreOverride: { type: GraphQLBoolean }          
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: { productivityScoreOverride: args.productivityScoreOverride } }, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertProductivityScoreCommentsByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },          
          productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: { productivityScoreComments: args.productivityScoreComments } }, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertValuesScoreByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          valuesScoreValues: { type: new GraphQLList(GraphQLInt) },
          valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {valuesScoreValues: args.valuesScoreValues, valuesScoreComments: args.valuesScoreComments}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertCompetencyScoresByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          competencyArrayIDs: { type: new GraphQLList(GraphQLInt) }, 
          competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
          competencyScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne({masterScoreID: args.masterScoreID}, { $set: {competencyArrayIDs: args.competencyArrayIDs, competencyScoreValues: args.competencyScoreValues, competencyScoreComments: args.competencyScoreComments}}, {upsert: true}, function (err) {
            if (err) {
              return console.log(err);
            }
            return console.log("successfully saved");             
          }); 
        }
      },
      insertDateTotalNameTeamMemberIDByMasterID: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID:{ type: GraphQLInt },
          fullName: {type: GraphQLString},
          scoreTeamMemberID: {type: GraphQLString},
          scoreUserID: {type: GraphQLString},
          scoreInEditState: { type: GraphQLBoolean },
          positionTeamMemberID: {type: GraphQLString},
          departmentTeamMemberID: {type: GraphQLString},
          shiftTeamMemberID: { type: GraphQLInt },
          scoreStatusID: { type: GraphQLInt },
          scoreDate: { type: GraphQLString },
          totalScore: { type: GraphQLFloat }
        },
        resolve: (root, args, context, info) => {
          console.log(args);
          ScoresbymasterscoreidModel.updateOne(
            {masterScoreID: args.masterScoreID}, 
            { $set: 
              {
                fullName: args.fullName, 
                scoreTeamMemberID: args.scoreTeamMemberID, 
                scoreUserID: args.scoreUserID, 
                scoreInEditState: args.scoreInEditState, 
                positionTeamMemberID: args.positionTeamMemberID, departmentTeamMemberID: args.departmentTeamMemberID, shiftTeamMemberID: args.shiftTeamMemberID, 
                scoreStatusID: args.scoreStatusID, 
                scoreDate: args.scoreDate, 
                totalScore: args.totalScore
              } 
            }, 
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          );         
        }
      },
      insertNewMasterScoreByMasterIdDate: {
        type: MasterscoreType,
        args: {
          scoreID: { type: GraphQLInt },
          scoreInEditState: {type: GraphQLBoolean},
          scoreTeamMemberID: { type: GraphQLString },
          scoreUserID: { type: GraphQLString },
          shiftTeamMemberID: { type: GraphQLInt },
          scoreStatusID: { type: GraphQLInt },          
          scoreDate: { type: GraphQLString},
          scoreCreatedDateTime: { type: GraphQLString },
          scoreSubmittedDateTime: { type: GraphQLString },
          absenceScoreID: { type: GraphQLInt },
          competencyScoreID: { type: GraphQLInt },
          productivityScoreID: { type: GraphQLInt },
          punctualityScoreID: { type: GraphQLInt },
          valuesScoreID: { type: GraphQLInt },
          totalScore: { type: GraphQLFloat },
          positionTeamMemberID: {type: GraphQLString},
          departmentTeamMemberID: {type: GraphQLString},
        },
        resolve: (root, args, context, info) => {
          MasterscoreModel.updateOne( 
            {scoreID: args.scoreID}, 
            { $set: 
              {
                scoreInEditState: args.scoreInEditState,
                scoreTeamMemberID: args.scoreTeamMemberID,
                scoreUserID: args.scoreUserID,                     
                shiftTeamMemberID: args.shiftTeamMemberID,               scoreStatusID: args.scoreStatusID,
                scoreDate: args.scoreDate,
                scoreCreatedDateTime: args.scoreCreatedDateTime,
                scoreSubmittedDateTime: args.scoreSubmittedDateTime,
                absenceScoreID: args.absenceScoreID,
                competencyScoreID: args.competencyScoreID,
                productivityScoreID: args.productivityScoreID,
                punctualityScoreID: args.punctualityScoreID,
                valuesScoreID: args.valuesScoreID,
                totalScore: args.totalScore,
                positionTeamMemberID: args.positionTeamMemberID, departmentTeamMemberID: args.departmentTeamMemberID            
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            } 
          );
        }       
      },
      insertNewAbsenceScoreByMasterIdAbsenceId: {
        type: AbsencescoreType,
        args: {
          absenceScoreID: { type: GraphQLInt },
          absenceScoreValue: {type: GraphQLBoolean},
          absenceScoreAbsentScheduledValue: {type: GraphQLBoolean},
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          AbsencescoreModel.updateOne(
            {
              absenceScoreID: args.absenceScoreID,
              masterScoreID: args.masterScoreID              
            },
            { 
              $set: {
                absenceScoreValue: args.absenceScoreValue,
                absenceScoreAbsentScheduledValue:   args.absenceScoreAbsentScheduledValue,               
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            } 
          )        
        },
      },     
      insertNewCompetencyScoreByMasterIdCompetencyId: {
        type: CompetencyscoreType,
        args: {
          competencyScoreID: { type: GraphQLInt },
          competencyArrayIDs: { type: new GraphQLList(GraphQLInt) }, 
          competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
          competencyScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          CompetencyscoreModel.updateOne(
            {
              competencyScoreID: args.competencyScoreID,
              masterScoreID: args.masterScoreID,              
            },
            {
              $set: {
                competencyArrayIDs: args.competencyArrayIDs,
                competencyScoreValues: args.competencyScoreValues,
                competencyScoreComments: args.competencyScoreComments,         
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          )
        }
      },
      insertNewPunctualityScoreByMasterIdPunctualityId: {
        type: PunctualityscoreType,
        args: {
          punctualityScoreID: { type: GraphQLInt },          
          punctualityScoreValue: { type: GraphQLInt },
          punctualityScoreComments: { type: new GraphQLList(GraphQLInt) },
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          PunctualityscoreModel.updateOne(
            {
              punctualityScoreID: args.punctualityScoreID,
              masterScoreID: args.masterScoreID
            },
            {
              $set: {
                punctualityScoreValue: args.punctualityScoreValue,             
                punctualityScoreComments: args.punctualityScoreComments,       
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          )
        }
      },
      insertNewProductivityScoreByMasterIdProductivityId: {
        type: ProductivityscoreType,
        args: {
          productivityScoreID: { type: GraphQLInt },          
          productivityScoreValue: { type: GraphQLInt },
          productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
          productivityScoreOverride: {type: GraphQLBoolean},
          masterScoreID: { type: GraphQLInt },
          productionDailyLineID: {type: GraphQLString},
          productionDailyLinePerformance: { type: GraphQLInt },
          logisticsWeeklyLTOOverride: { type: GraphQLBoolean },
          logisticsWeeklyRR: { type: GraphQLInt },
          logisticsWeeklySC: { type: GraphQLInt },
          logisticsSAPPalletsBackflushed: { type: GraphQLInt },
          logisticsSAPShopOrdersClosed: { type: GraphQLInt },
          logisticsLocationsCounted: { type: GraphQLInt },
          logisticsICPalletsRecieived: { type: GraphQLInt },
          logisticsICPalletsPutAway: { type: GraphQLInt },
          logisticsICAuditsCompleted: { type: GraphQLInt },
          logisticsICAuditsAssigned: { type: GraphQLInt },
          maintenanceHoursWorked: { type: GraphQLInt },
          maintenanceHoursDocumented: { type: GraphQLInt },
          maintenancePMsCompleted: { type: GraphQLInt },
          maintenancePMsAssigned: { type: GraphQLInt },
          maintenanceWOAudits: { type: GraphQLInt },
          maintenanceWOAuditsPassed: { type: GraphQLInt },
          maintenancePartsAudits: { type: GraphQLInt },
          maintenancePartsAuditsPassed: { type: GraphQLInt },
          maintenanceOverduePOs: { type: GraphQLInt },
          maintenanceCountedLocations: { type: GraphQLInt },
          maintenanceCountedLocationsGoal: { type: GraphQLInt },
          maintenanceCompletedWOAudits: { type: GraphQLInt },
          qualityAuditsCompleted: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          ProductivityscoreModel.updateOne(
            {
              productivityScoreID: args.productivityScoreID,
              masterScoreID: args.masterScoreID,
            },
            {
              $set: {
                productivityScoreValue: args.productivityScoreValue,
                productivityScoreComments: args.productivityScoreComments,
                productivityScoreOverride: args.productivityScoreOverride,     
                productionDailyLineID: args.productionDailyLineID,
                productionDailyLinePerformance: args.productionDailyLinePerformance,
                logisticsWeeklyLTOOverride: args.logisticsWeeklyLTOOverride,
                logisticsWeeklyRR: args.logisticsWeeklyRR,
                logisticsWeeklySC: args.logisticsWeeklySC,
                logisticsSAPPalletsBackflushed: args.logisticsSAPPalletsBackflushed,
                logisticsSAPShopOrdersClosed: args.logisticsSAPShopOrdersClosed,
                logisticsLocationsCounted: args.logisticsLocationsCounted,
                logisticsICPalletsRecieived: args.logisticsICPalletsRecieived, 
                logisticsICPalletsPutAway: args.logisticsICPalletsPutAway,
                logisticsICAuditsCompleted: args.logisticsICAuditsCompleted,
                logisticsICAuditsAssigned: args.logisticsICAuditsAssigned,
                maintenanceHoursWorked: args.maintenanceHoursWorked,
                maintenanceHoursDocumented: args.maintenanceHoursDocumented,
                maintenancePMsCompleted: args.maintenancePMsCompleted,
                maintenancePMsAssigned: args.maintenancePMsAssigned,
                maintenanceWOAudits: args.maintenanceWOAudits,
                maintenanceWOAuditsPassed: args.maintenanceWOAuditsPassed,
                maintenancePartsAudits: args.maintenancePartsAudits,
                maintenancePartsAuditsPassed: args.maintenancePartsAuditsPassed,
                maintenanceOverduePOs: args.maintenanceOverduePOs, 
                maintenanceCountedLocations: args.maintenanceCountedLocations,
                maintenanceCountedLocationsGoal: args.maintenanceCountedLocationsGoal,
                maintenanceCompletedWOAudits: args.maintenanceCompletedWOAudits,
                qualityAuditsCompleted: args.qualityAuditsCompleted
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          )
        }
      },
      insertNewValuesScoreByMasterIdValuesId: {
        type: CorevaluescoreType,
        args: {
          valuesScoreID: { type: GraphQLInt },          
          valuesScoreValues: { type: new GraphQLList(GraphQLInt) },
          valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
          masterScoreID: { type: GraphQLInt }
        },
        resolve: (root, args, context, info) => {
          CorevaluescoreModel.updateOne(
            {
              valuesScoreID: args.valuesScoreID,
              masterScoreID: args.masterScoreID
            },
            {
              $set: {
                valuesScoreValues: args.valuesScoreValues,             
                valuesScoreComments: args.valuesScoreComments,                
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          )
        }
      },
      insertNewScoresByMasterScoreId: {
        type: ScoresbymasterscoreidType,
        args: {
          masterScoreID: { type: GraphQLInt },
          fullName: { type: GraphQLString },
          scoreTeamMemberID: { type: GraphQLString },
          scoreUserID: {type: GraphQLString},
          scoreInEditState: { type: GraphQLBoolean },
          positionTeamMemberID: {type: GraphQLString},
          departmentTeamMemberID: {type: GraphQLString},
          shiftTeamMemberID: { type: GraphQLInt },
          scoreStatusID: { type: GraphQLInt },
          totalScore: { type: GraphQLFloat },
          scoreDate: { type: GraphQLString },
          absenceScoreValue: { type: GraphQLBoolean },
          absenceScoreAbsentScheduledValue: { type: GraphQLBoolean },
          punctualityScoreValue: { type: GraphQLInt },
          punctualityScoreComments: { type: new GraphQLList(GraphQLInt) },
          productivityScoreValue: { type: GraphQLFloat },
          productivityScoreComments: { type: new GraphQLList(GraphQLInt) },
          productivityScoreOverride: { type: GraphQLBoolean },
          productionDailyLineID: { type: GraphQLString },
          productionDailyLinePerformance: { type: GraphQLInt },
          logisticsWeeklyLTOOverride: { type: GraphQLBoolean },
          logisticsWeeklyRR: { type: GraphQLInt },
          logisticsWeeklySC: { type: GraphQLInt },
          logisticsSAPPalletsBackflushed: { type: GraphQLInt },
          logisticsSAPShopOrdersClosed: { type: GraphQLInt },
          logisticsLocationsCounted: { type: GraphQLInt },
          logisticsICPalletsRecieived: { type: GraphQLInt },
          logisticsICPalletsPutAway: { type: GraphQLInt },
          logisticsICAuditsCompleted: { type: GraphQLInt },
          logisticsICAuditsAssigned: { type: GraphQLInt },
          maintenanceHoursWorked: { type: GraphQLInt },
          maintenanceHoursDocumented: { type: GraphQLInt },
          maintenancePMsCompleted: { type: GraphQLInt },
          maintenancePMsAssigned: { type: GraphQLInt },
          maintenanceWOAudits: { type: GraphQLInt },
          maintenanceWOAuditsPassed: { type: GraphQLInt },
          maintenancePartsAudits: { type: GraphQLInt },
          maintenancePartsAuditsPassed: { type: GraphQLInt },
          maintenanceOverduePOs: { type: GraphQLInt },
          maintenanceCountedLocations: { type: GraphQLInt },
          maintenanceCountedLocationsGoal: { type: GraphQLInt },
          maintenanceCompletedWOAudits: { type: GraphQLInt },
          qualityAuditsCompleted: { type: GraphQLInt },
          valuesScoreValues: { type: new GraphQLList(GraphQLInt) }, 
          valuesScoreComments: { type: new GraphQLList(new GraphQLList(GraphQLInt)) },
          competencyArrayIDs: { type: new GraphQLList(GraphQLInt) }, 
          competencyScoreValues: { type: new GraphQLList(GraphQLInt) },
          competencyScoreComments: { type: new GraphQLList(new GraphQLList    (GraphQLInt)) }
        },
        resolve: (root, args, context, info) => {
          ScoresbymasterscoreidModel.updateOne(
            {
              masterScoreID: args.masterScoreID
            },
            {
              $set: {
                fullName: args.fullName,
                scoreTeamMemberID: args.scoreTeamMemberID,
                scoreUserID: args.scoreUserID,
                scoreInEditState: args.scoreInEditState,
                positionTeamMemberID: args.positionTeamMemberID,
                departmentTeamMemberID: args.departmentTeamMemberID,
                shiftTeamMemberID: args.shiftTeamMemberID,
                scoreStatusID: args.scoreStatusID,
                totalScore: args.totalScore,
                scoreDate: args.scoreDate,
                absenceScoreValue: args.absenceScoreValue,
                absenceScoreAbsentScheduledValue: args.absenceScoreAbsentScheduledValue,
                punctualityScoreValue: args.punctualityScoreValue,
                punctualityScoreComments: args.punctualityScoreComments,
                productivityScoreValue: args.productivityScoreValue,
                productivityScoreComments: args.productivityScoreComments,
                productivityScoreOverride: args.productivityScoreOverride,
                productionDailyLineID: args.productionDailyLineID,
                productionDailyLinePerformance: args.productionDailyLinePerformance,
                logisticsWeeklyLTOOverride: args.logisticsWeeklyLTOOverride,
                logisticsWeeklyRR: args.logisticsWeeklyRR,
                logisticsWeeklySC: args.logisticsWeeklySC,
                logisticsSAPPalletsBackflushed: args.logisticsSAPPalletsBackflushed,
                logisticsSAPShopOrdersClosed: args.logisticsSAPShopOrdersClosed,
                logisticsLocationsCounted: args.logisticsLocationsCounted,
                logisticsICPalletsRecieived: args.logisticsICPalletsRecieived,
                logisticsICPalletsPutAway: args.logisticsICPalletsPutAway,
                logisticsICAuditsCompleted: args.logisticsICAuditsCompleted,
                logisticsICAuditsAssigned: args.logisticsICAuditsAssigned,
                maintenanceHoursWorked: args.maintenanceHoursWorked,
                maintenanceHoursDocumented: args.maintenanceHoursDocumented,
                maintenancePMsCompleted: args.maintenancePMsCompleted,
                maintenancePMsAssigned: args.maintenancePMsAssigned,
                maintenanceWOAudits: args.maintenanceWOAudits,
                maintenanceWOAuditsPassed: args.maintenanceWOAuditsPassed,
                maintenancePartsAudits: args.maintenancePartsAudits,
                maintenancePartsAuditsPassed: args.maintenancePartsAuditsPassed,
                maintenanceOverduePOs: args.maintenanceOverduePOs,
                maintenanceCountedLocations: args.maintenanceCountedLocations,
                maintenanceCountedLocationsGoal: args.maintenanceCountedLocationsGoal,
                maintenanceCompletedWOAudits: args.maintenanceCompletedWOAudits,
                qualityAuditsCompleted: args.qualityAuditsCompleted,
                valuesScoreValues: args.valuesScoreValues, 
                valuesScoreComments: args.valuesScoreComments,
                competencyArrayIDs: args.competencyArrayIDs, 
                competencyScoreValues: args.competencyScoreValues,
                competencyScoreComments: args.competencyScoreComments
              }
            },
            {upsert: true}, 
            function (err) {
              if (err) {
                return console.log(err);
              }
              return console.log("succesfully saved");             
            }
          )
        }
      }
      // createNewScore: {

      // }   
    }
  })
});

app.use('/graphql', expressgraphql({
  schema: ScorecardGraphQLSchema,
  graphiql: true 
}));

app.listen(4000, () => {
  console.log('Listening at http://localhost:4000');
});