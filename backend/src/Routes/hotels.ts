import express, { Request, Response } from 'express'
import Hotel from '../Models/hotel'
import { param, validationResult } from 'express-validator'
import Stripe from 'stripe'
import verifyToken from '../Middleware/auth'
import { BookingType } from '../shared/types'

/**
 * GET /search - Endpoint for searching hotels with pagination.
 * @route GET /search
 * @group Hotel - Hotel-related endpoints
 * @returns {object} 200 - An object containing hotels and pagination information.
 * @throws {object} 500 - An internal server error response.
 */

const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

router.get('/search', async (req: Request, res: Response) => {
  try {
    // Define the number of items per page
    const ITEM_PER_PAGE = 5

    // Parse the page number from the query parameter or default to 1
    const pageNumber = parseInt(
      req.query.page ? req.query.page.toString() : '1'
    )

    // Calculate the number of documents to skip based on the current page
    const skip = (pageNumber - 1) * ITEM_PER_PAGE

    // Query MongoDB to fetch hotels with pagination
    const hotels = await Hotel.find().skip(skip).limit(ITEM_PER_PAGE)

    // Calculate the total number of documents (total hotels) in the collection
    const total = await Hotel.countDocuments()

    // Prepare the response object
    const response = {
      data: hotels, // Array of hotels
      pagination: {
        total: total, // Total number of hotels
        page: pageNumber, // Current page number
        pages: Math.ceil(total / ITEM_PER_PAGE) // Total number of pages
      }
    }

    // Send the response as JSON to the client
    res.json(response)
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
})

router.get(
  '/:id',
  [param('id').notEmpty().withMessage('Hotel ID is Required')],
  async (req: Request, res: Response) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const id = req.params.id.toString()

    try {
      const hotel = await Hotel.findById({
        _id: id
      })
      res.json(hotel)
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching hotel'
      })
    }
  }
)

router.post(
  '/:hotelId/booking/payment-intent',
  verifyToken,
  async (req: Request, res: Response) => {
    //1. Total Cost
    //2. HotelId
    //3. UserId

    const { numberOfNights } = req.body
    const hotelId = req.params.hotelId

    const hotel = await Hotel.findById(hotelId)
    if (!hotel) {
      return res.status(400).json({
        message: 'The hotel does not exist'
      })
    }

    const totalCost = hotel.pricePerNight * numberOfNights

    const paymentIntent = stripe.paymentIntents.create({
      amount: totalCost,
      currency: 'cad',
      metadata: {
        hotelId: hotelId,
        userId: req.userId
      }
    })

    if (!(await paymentIntent).client_secret) {
      return res.status(500).json({
        message: 'The hotel does not exist'
      })
    }

    const response = {
      paymentIntent: (await paymentIntent).id,
      clientSecret: (await paymentIntent).client_secret?.toString(),
      totalCost: totalCost
    }

    res.send(response)
  }
)

router.post(
  '/:hotelId/bookings',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const paymentIntentId = req.body.paymentIntentId

      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId as string
      )

      if (!paymentIntent) {
        return res.status(400).json({ message: 'Payment Intent is invalid' })
      }

      if (
        paymentIntent.metadata.hotelId !== req.params.hotelId ||
        paymentIntent.metadata.userId !== req.params.userId
      ) {
        return res.status(400).json({ message: 'Payment Intent miss match' })
      }

      if (paymentIntent.status !== 'succeeded') {
        return res
          .status(400)
          .json({ message: 'Payment has not been completed' })
      }

      const newBooking: BookingType = {
        ...req.body,
        userId: req.userId
      }

      const hotel = await Hotel.findByIdAndUpdate(
        {
          _id: req.params.hotelId
        },
        {
          $push: { bookings: newBooking }
        }
      )

      if (!hotel) {
        return res.status(400).json({ message: 'Hotel Not found' })
      }

      await hotel.save()
      res.status(200).json({ message: 'Payment has been completed' })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: 'Something went wrong'
      })
    }
  }
)
export default router
