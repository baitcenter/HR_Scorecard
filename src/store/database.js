import { Database } from '@vuex-orm/core'
import User from '../models/User'
import TeamMember from '../models/TeamMember'
import Score from '../models/Score'
import Competency from '../models/Competency'

const database = new Database()

database.register(User)
database.register(TeamMember)
database.register(Score)
database.register(Competency)

console.log(database);

export default database