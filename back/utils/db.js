import {DATABASE_URL} from "./config.js";
import {Sequelize} from "sequelize";
import {SequelizeStorage, Umzug} from "umzug";

export const sequelize = new Sequelize(DATABASE_URL, {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

const runMigrations = async () => {
    const migrator = new Umzug({
        migrations: {
            glob: 'migrations/*.cjs',
        },
        storage: new SequelizeStorage({ sequelize }),
        context: sequelize.getQueryInterface(),
        logger: console,
    })

    const migrations = await migrator.up()
    console.log('Migrations up to date', {
        files: migrations.map((mig) => mig.name),
    })
}

export const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        console.log('connected to the database')
    } catch (err) {
        console.log('failed to connect to the database')
        console.log(err)
        return process.exit(1)
    }

    return null
}

export default { connectToDatabase, sequelize };
