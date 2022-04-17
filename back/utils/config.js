import dotenv from 'dotenv'

dotenv.config()

export const PORT =process.env.PORT
export const DATABASE_URL =process.env.DATABASE_URL
export const SECRET=process.env.SECRET

export const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URL
  : process.env.MONGO_URL
