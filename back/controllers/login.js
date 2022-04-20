import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import express from 'express'
import {User} from '../models/user.js'
import {SECRET} from "../utils/config.js";

const loginRouter = express.Router()

loginRouter.post('/', async(req, res) => {
  const credentials = req.body

  const user = await User.findOne({
    where: {
      username: credentials.username
    }
  })

  const passwordCorrect = user === null ? false : await bcrypt.compare(credentials.password, user?.hash)

  if (!(passwordCorrect && user)){
    return res.status(401).json({ error: 'Invalid password or username' })
  }
  if (user.disabled) {
    return res.status(401).json({
      error: 'account disabled, please contact admin'
    })
  }

  const token = jwt.sign(
      {username: user.username, id: user.id,},
      SECRET,
      {expiresIn: '1h'}
  )

  res.status(200)
      .send({token, username: user.username, name: user.name})
})

export default loginRouter