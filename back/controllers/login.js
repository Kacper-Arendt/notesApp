import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/users.js'

const loginRouter = express.Router()

loginRouter.post('/', async(req, res) => {
  const credentials = req.body

  const user = await User.findOne({ username: credentials.username })

  const passwordCorrect = user === null ? false : await bcrypt.compare(credentials.password, user?.passwordHash)

  if (!(passwordCorrect && user)){
    return res.status(401).json({ error: 'Invalid password or username' })
  }
  const { username, _id, name } = user

  const token = jwt.sign(
    { username, id: _id },
    process.env.SECRET,
    { expires: 60*60 }
  )

  res.status(200).send({ token, username, name })

})

export default loginRouter