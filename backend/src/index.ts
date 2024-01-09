import express, { Request, Response } from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import 'dotenv/config'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/api/test', async (req: Request, res: Response) => {
  res.json({
    message: 'Hello From Hotel Mang.'
  })
})

mongoose.connect(process.env.MONGO_URI as string)

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
