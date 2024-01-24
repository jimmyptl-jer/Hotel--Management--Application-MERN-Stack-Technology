import express, { Request, Response } from 'express'
import { check } from 'express-validator'
import { registerUser } from '../Controller/user'
import verifyToken from '../Middleware/auth'
import User from '../Models/user'
const router = express.Router()

router.get('/currentUser', verifyToken, async (req: Request, res: Response) => {
  const userId = req.userId

  try {
    const user = await User.findById(userId).select('-password')
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'something went wrong' })
  }
})

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
