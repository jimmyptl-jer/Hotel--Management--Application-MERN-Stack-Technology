import { Request, Response } from 'express'
import cloudinary from 'cloudinary'
import Hotel from '../Models/hotel'
import { HotelType } from '../shared/types'

export const myHotels = async (req: Request, res: Response) => {
  try {
    // Check if req.files is defined and is an array
    const imageFiles = req.files as Express.Multer.File[]

    if (!imageFiles || !Array.isArray(imageFiles)) {
      return res.status(400).json({ message: 'No valid image files provided.' })
    }

    const newHotel: HotelType = req.body

    // 1. Upload the images to Cloudinary
    const imageUrls = await uploadImages(imageFiles)

    // 2. If upload was successful, add the URLs to the new hotel
    newHotel.imageUrls = imageUrls
    newHotel.lastUpdated = new Date()
    newHotel.userId = req.userId

    // 3. Save the new hotel in our database
    const hotel = new Hotel(newHotel)
    await hotel.save()

    // 4. Return 201 status
    res.status(201).json(hotel)
  } catch (error) {
    console.error('Error while creating hotel:', error)
    res.status(500).json({ message: 'Something went wrong', error })
  }
}

export async function uploadImages (imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async image => {
    const b64 = Buffer.from(image.buffer).toString('base64')
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64
    const res = await cloudinary.v2.uploader.upload(dataURI)
    return res.url
  })

  const imageUrls = await Promise.all(uploadPromises)
  return imageUrls
}
