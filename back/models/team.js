import {sequelize} from "../utils/db.js";
import {DataTypes, Model} from "sequelize";

export class Team extends Model {
}

Team.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'team'
})
