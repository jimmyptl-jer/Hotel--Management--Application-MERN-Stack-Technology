import express from 'express'
import { check } from 'express-validator'
import { loginUser } from '../Controller/auth'

const router = express.Router()

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').isLength({
      min: 6
    })
  ],
  loginUser
)

export default router
