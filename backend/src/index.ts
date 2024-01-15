import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import userRoutes from './Routes/users'
import authRoutes from './Routes/auth'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  })
)

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
