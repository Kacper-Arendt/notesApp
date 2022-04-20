import bcrypt from 'bcrypt'
import express from 'express'
import {User} from "../models/user.js";
import {Note} from "../models/note.js";
import {Team} from "../models/team.js";

const userRouter = express.Router()

userRouter.get('/', async (req, res) => {
    const users = await User.findAll({
        include: [
            {
                model: Note,
                attributes: {exclude: ['userId']}
            },
            {
                model: Team,
                attributes: ['name', 'id'],
                through: {
                    attributes: []
                }
            }
        ],
        attributes: {exclude: ['hash']},
    })

    if (users?.length < 1) {
        return res.status(404).json({error: 'Users not found'})
    } else
        res.json(users)
})

userRouter.get('/:id', async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [
            {
                model: Note,
                attributes: {exclude: ['userId']}
            },
            {
                model: Team,
                attributes: ['name', 'id'],
                through: {
                    attributes: []
                }
            }
        ],
        attributes: {exclude: ['hash']},
    })
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
    const hash = await bcrypt.hash(password, saltRounds)

    const user = await User.create({hash, name, username})

    res.status(201).json({id: user?.dataValues?.id, name, username})
})

export default userRouter
