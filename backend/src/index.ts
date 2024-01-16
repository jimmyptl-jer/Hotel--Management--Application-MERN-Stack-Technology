import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import path from 'path'
import { v2 as cloudinary } from 'cloudinary'

import userRoutes from './Routes/users'
import authRoutes from './Routes/auth'
import myHotelRoutes from './Routes/my-hotels'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(
  cors({
    origin: 'http://localhost:5173', // Update with your frontend origin
    credentials: true
  })
)

app.use(express.static(path.join(__dirname, '../../frontend/dist')))

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/my-hotels', myHotelRoutes)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB Connected'))

const PORT = 3000

app.listen(`${PORT}`, () => {
  console.log(`Server is running on port ${PORT}`)
})
