import express, { Request, Response } from 'express'
import multer from 'multer'
import verifyToken from '../Middleware/auth'
import { body } from 'express-validator'
import { myHotels, uploadImages } from '../Controller/my-hotels'
import Hotel from '../Models/hotel'
import { HotelType } from '../shared/types'

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

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId })
    res.json(hotels)
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching hotels'
    })
  }
})

router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    const id = req.params.hotelId.toString()

    try {
      const updatedHotel: HotelType = req.body
      updatedHotel.lastUpdated = new Date()

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId
        },
        updatedHotel,
        { new: true }
      )

      if (!hotel) {
        return res.status(404).json({
          message: 'Hotel not found'
        })
      }

      const files = req.files as Express.Multer.File[]
      const updatedImageUrls = await uploadImages(files)

      hotel.imageUrls = [...updatedImageUrls, ...(updatedImageUrls || [])]

      await hotel.save()

      res.status(201).json(hotel)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching hotels'
      })
    }
  }
)

export default router
