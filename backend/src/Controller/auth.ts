import { Request, Response } from 'express'
import { check, validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../Models/user'

export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() })
  }

  const { email, password } = req.body

  try {
    const userCheck = await User.findOne({ email })

    if (!userCheck) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const isPasswordMatch = await bcrypt.compare(password, userCheck.password)

    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' })
    }

    const token = jwt.sign(
      { userId: userCheck.id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: '1d' //Expires in one day
      }
    )

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000
    })

    res.status(200).json({
      userId: userCheck._id
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Server error'
    })
  }
}

export const logoutUser = async (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0)
  })

  res.send()
}
