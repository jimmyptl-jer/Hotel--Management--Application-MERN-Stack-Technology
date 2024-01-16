import express from 'express'
import multer from 'multer'
import verifyToken from '../Middleware/auth'
import { body } from 'express-validator'
import { myHotels } from '../Controller/my-hotels'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
})

//api/my-hotels
router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('Name is Required'),
    body('city').notEmpty().withMessage('City is Required'),
    body('country').notEmpty().withMessage('County is Required'),
    body('description').notEmpty().withMessage('Description is Required'),
    body('type').notEmpty().withMessage('Hotel Type is Required'),
    body('pricePerNight')
      .notEmpty()
      .isNumeric()
      .withMessage('Price of hotel is Required and In number'),
    body('facilities')
      .notEmpty()
      .isArray()
      .withMessage('Facilities are Required')
  ],

  upload.array('imageFiles', 6),
  myHotels
)

export default router
