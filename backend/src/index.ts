import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'

import userRoutes from './Routes/users'
import authRoutes from './Routes/auth'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGO_URI as string)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
