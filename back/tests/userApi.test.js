import bcrypt from 'bcrypt'
import supertest from 'supertest'

// COMPONENTS
import { User } from '../models/users.js'
import app from '../app.js'
import { usersInDb } from './helperTest.js'

const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    User.deleteMany({})

    const passwordHash = bcrypt.hash('sekret', 10)
    const user = new User({ name: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('creation fails with proper status code and message if username already taken', async () => {
  const usersAtStart = await usersInDb()

  const newUser = {
    username: 'root',
    name: 'Superuser',
    password: 'salainen',
  }

  const result = await api
    .post('/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain('username must be unique')

  const usersAtEnd = await usersInDb()
  expect(usersAtEnd).toEqual(usersAtStart)
})