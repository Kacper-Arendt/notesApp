import bcrypt from 'bcrypt'
import express from 'express'
import {User} from "../models/user.js";

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    const users = await User.findAll()

    if (users?.length < 1) {
        return res.status(404).json({error: 'Users not found'})
    } else res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if (user) {
        res.json(user)
    } else {
        res.status(404).end()
    }
})

userRouter.post('/', async (req, res) => {
    const {password, name, username} = req.body

    const existingUser = false

    if (existingUser) {
        return res.status(400).json({error: 'Username must be unique'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userData = {passwordHash, name, username}
    const user = await User.create(userData)

    res.status(201).json(user)
})

export default userRouter
