import express from 'express'
import Note from '../models/note.js'
import { User } from '../models/users.js'
import jwt from 'jsonwebtoken'

const router = express.Router()


const getTokenFrom = request => {
  const authorization = request.get('authorization')

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

// GET
router.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 })
  if (!notes) {
    response.status(404).end()
  } else {
    response.json(notes)
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(400).end()

  const note = await Note.findById(id)
  if (!note) {res.status(404).end()}
  res.json(note)
})

// DELETE
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  if (!id) return res.status(404).end()

  const note = await Note.findByIdAndRemove(id)

  if (!note) {res.status(400).end()}

  res.status(204).end()
})


// POST
router.post('/', async(req, res) => {
  if (!req.body?.content) {
    return res.status(400).json({ error: 'Content Not Found' })
  }

  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  !decodedToken && res.status(401).json({ error: 'Token is missing or invalid' })


  const { content, important } = req.body

  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: content,
    important: important ?? false,
    date: new Date(),
    user: user._id,
  })

  const response = await note.save()

  user.notes = user.notes.concat(response._id)
  await user.save()

  res.status(201).json(response)
})

router.put('/:id', async(req, resp) => {
  const body = req.body
  const note = {
    content: body.content,
    important: body.important,
  }
  const updatedNote = await Note.findByIdAndUpdate(req.params.id, note, { new: true })
  resp.json(updatedNote)

})

export default router
