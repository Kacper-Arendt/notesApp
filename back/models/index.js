import {User} from "./user.js";
import {Note} from "./note.js";
import {Team} from "./team.js";
import {Membership} from "./membership.js";

const syncHandler = () => {
    Note.belongsTo(User)
    User.hasMany(Note)

    User.belongsToMany(Team, {through: Membership})
    Team.belongsToMany(User, {through: Membership})
}

export default syncHandler;

