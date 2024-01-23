import express, { Request, Response } from 'express'
import Hotel from '../Models/hotel'

/**
 * GET /search - Endpoint for searching hotels with pagination.
 * @route GET /search
 * @group Hotel - Hotel-related endpoints
 * @returns {object} 200 - An object containing hotels and pagination information.
 * @throws {object} 500 - An internal server error response.
 */

const router = express.Router()

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
    // Handle errors and send an internal server error response
    console.error('Error:', error)
    res.status(500).json({
      message: 'Something went wrong'
    })
  }
})

export default router
