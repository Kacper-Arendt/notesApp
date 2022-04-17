import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
const __dirname = path.resolve()

// MIDDLEWARES
import cors from 'cors'

// ROUTES
import notesRoute from './controllers/notes.js'
import usersRoute from './controllers/users.js'
import loginRoute from './controllers/login.js'

// UTILS
import logger from './utils/logger.js'
import { MONGODB_URI } from './utils/config.js'
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware.js'


import expressAsyncErrors from 'express-async-errors'
import {connectToDatabase} from "./utils/db.js";

const app = express()

expressAsyncErrors // try catch block for asyncs

mongoose.connect(MONGODB_URI).then(() => logger.info('connected to MongoDB'))
  .catch(err => {
    logger.error('error connecting to MongoDB:', err.message)
  })

await connectToDatabase()

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())
app.use(requestLogger)

app.use('/users', usersRoute)
app.use('/login', loginRoute)
app.use('/notes', notesRoute)

app.use(unknownEndpoint)
app.use(errorHandler)



export default app
