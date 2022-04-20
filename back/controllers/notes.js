import express from 'express'
import {Note} from "../models/note.js";
import {User} from "../models/user.js";
import {tokenExtractor} from "../utils/middleware.js";

const router = express.Router()

const noteFinder = async (req, res, next) => {
    req.note = await Note.findByPk(req.params.id)
    next()
}

// GET
router.get('/', async (req, res) => {
    const notes = await Note.findAll({
        attributes: {exclude: ['userId']},
        include: {
            model: User,
            attributes: {exclude: ['hash']}
        },
    })
    if (!notes) {
        res.status(404).end()
    } else {
        res.json(notes)
    }
})

router.get('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        res.json(req.note)
    } else {
        res.status(404).end()
    }
})

// DELETE
router.delete('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        await req.note.destroy()
        res.status(204).end()
    } else
        res.status(400).end()
})

// POST
router.post('/', tokenExtractor, async (req, res) => {
    if (!req.body?.content) {
        return res.status(400).json({error: 'Content Not Found'})
    }

    const user = await User.findByPk(req.decodedToken.id)

    const note = await Note.create({...req.body, userId: user.id, date: new Date()})

    res.status(201).json(note)

})

// PUT
router.put('/:id', noteFinder, async (req, res) => {
    if (req.note) {
        const {body, note} = req
        note.important = body.important

        await note.save()
        res.json(note)
    } else {
        res.status(404).end()
    }
})

export default router