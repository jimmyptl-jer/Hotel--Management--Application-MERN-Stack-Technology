import express from 'express'
import { check } from 'express-validator'

import { loginUser, logoutUser } from '../Controller/auth'
import verifyToken from '../Middleware/auth'
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

// Define the /validate-token route
router.get('/validate-token', verifyToken, (req, res) => {
  // Respond with a status of 200 and send the user ID extracted from the token
  res.status(200).send({
    userId: req.userId
  })
})

router.post('/logout', logoutUser)

export default router
