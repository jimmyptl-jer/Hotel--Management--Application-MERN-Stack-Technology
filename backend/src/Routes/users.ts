import express, { Request, Response } from 'express'
import { check } from 'express-validator'
import { registerUser } from '../Controller/user'
const router = express.Router()

router.post(
  '/register',
  [
    check('firstName', 'FirstName is required').isString(),
    check('lastName', 'LastName is required').isString(),
    check('email', 'Email is required').isString(),
    check('password', 'Password must be at least 6 characters long').isLength({
      min: 6
    })
  ],
  registerUser
)
export default router
