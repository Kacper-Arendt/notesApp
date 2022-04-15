import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../app.js'
import { initialNotes, nonExistingId, notesInDb } from './helperTest.js'
import Note from '../models/note.js'

const api = supertest(app)

beforeEach(async () => {
  await Note.deleteMany({})
  await Note.insertMany(initialNotes)
})

describe('when there is initially some notes saved', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 1000)

  test('all notes are returned', async () => {
    const response = await api.get('/notes')

    expect(response.body).toHaveLength(initialNotes.length)
  })

  test('a specific note is returned with notes', async () => {
    const response = await notesInDb()

    const content = response.map(note => note.content)
    expect(content).toContain('HTML is easy')
  })
})


describe('viewing a specific notes', () => {
  test('a specific note is returned', async () => {
    const notes = await notesInDb()
    const note = notes[0]

    const request  = await  api
      .get(`/notes/${note.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedNoteToView = JSON.parse(JSON.stringify(note))

    expect(request.body).toEqual(processedNoteToView)
  })


  test('fails with 404 when id does not exist', async () => {
    const validNoneExistingId = await nonExistingId()

    await  api
      .get(`/notes/${validNoneExistingId}`)
      .expect(404)
  })

  test('fails with 400 when id is invalid', async () => {
    const id = '12sdaslkdm2312'
    await  api
      .get(`/notes/${id}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {
  test('a valid note can be added', async () => {
    const newNote = {
      content: 'New valid note',
      important: true,
    }

    await api
      .post('/notes', newNote)
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initialNotes.length + 1)

    const contents = notesAtEnd?.map(r => r.content)
    expect(contents).toContain('New valid note')
  })

  test('without content note can\'t be added to notes', async () => {
    const newNote = {
      important: true,
    }

    await api
      .post('/notes')
      .send(newNote)
      .expect(400)

    const notesAtEnd = await notesInDb()
    expect(notesAtEnd).toHaveLength(initialNotes.length)
  })
})


describe('deletion of a note', () => {
  test('Note can be deleted if id is valid ', async () => {
    const notes = await notesInDb()
    const noteToDelete = notes[0]

    await api
      .delete(`/notes/${noteToDelete.id}`)
      .expect(204)

    const notesAtEnd = await notesInDb()

    expect(notesAtEnd).toHaveLength(initialNotes.length - 1)

    const contents = notesAtEnd.map(note => note.content)
    expect(contents).not.toContain(noteToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})