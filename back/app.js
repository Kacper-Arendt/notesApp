import express from 'express'
import path from 'path'
const __dirname = path.resolve()

// MIDDLEWARES
import cors from 'cors'

// ROUTES
import notesRoute from './controllers/notes.js'
import usersRoute from './controllers/users.js'
import loginRoute from './controllers/login.js'

// UTILS
import { unknownEndpoint, errorHandler, requestLogger } from './utils/middleware.js'


import expressAsyncErrors from 'express-async-errors'
import {connectToDatabase} from "./utils/db.js";
import syncHandler from "./models/index.js";

const app = express()

expressAsyncErrors // try catch block for asyncs
await connectToDatabase()
syncHandler()

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
