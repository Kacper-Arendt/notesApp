import {DATABASE_URL} from "./config.js";
import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        console.log('connected to the database')
    } catch (err) {
        console.log('failed to connect to the database')
        return process.exit(1)
    }

    return null
}

export default { connectToDatabase, sequelize };
