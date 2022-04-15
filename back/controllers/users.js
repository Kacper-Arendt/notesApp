import bcrypt from 'bcrypt'
import express from 'express'
import { User } from '../models/users.js'

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 })

  if (users?.length < 1){
    return  res.status(404).json({ error: 'Users not found' })
  }
  else res.json(users)
})

userRouter.post('/', async (req, res) => {
  const { password, name, username } = req.body

  const existingUser = await User.findOne({ username })

  if (existingUser){
    return  res.status(400).json({ error: 'Username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({ passwordHash, name, username })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

export default userRouter
