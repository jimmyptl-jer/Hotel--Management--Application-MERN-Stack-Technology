import { SignInFormData } from './Pages/Login'
import { RegisterFormData } from './Pages/Register'

import {
  HotelSearchResponse,
  HotelType,
  UserType,
  paymentIntentResponse
} from '../../backend/src/shared/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/currentUser`, {
    credentials: 'include'
  })

  if (!response) {
    throw new Error('Failed to get current user')
  }

  return response.json()
}

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const responseBody = await response.json()

  if (!response.ok) {
    throw new Error(responseBody.message)
  }
}

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })

  const body = await response.json() // Await the result

  if (!response.ok) {
    throw new Error(body.message || 'Failed to log in') // Check for the 'message' property
  }

  return body
}

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: 'include',
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error('Error during sign out')
  }
}

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Token invalid')
  }

  return response.json()
}

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData
  })

  if (!response.ok) {
    throw new Error('failed to add hotel')
  }

  return response.json()
}

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error('Error fetching hotels')
  }

  return response.json()
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

  if (!response.ok) {
    throw new Error('Error fetching Hotels')
  }

  return response.json()
}

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get('hotelId')}`,
    {
      method: 'PUT',
      body: hotelFormData,
      credentials: 'include'
    }
  )

  if (!response.ok) {
    throw new Error('Failed to update Hotel')
  }

  return response.json()
}

export type SearchParams = {
  destination?: string
  checkIn?: string
  checkOut?: string
  adultCount?: string
  childCount?: string
  page?: string
}

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams()

  queryParams.append('destination', searchParams.destination || '')
  queryParams.append('checkIn', searchParams.checkIn || '')
  queryParams.append('checkOut', searchParams.checkOut || '')
  queryParams.append('adultCount', searchParams.adultCount || '')
  queryParams.append('childCount', searchParams.childCount || '')
  queryParams.append('page', searchParams.page || '')

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  )

  if (!response.ok) {
    throw new Error('Failed while fetching the hotel')
  }

  // Assuming your API returns JSON, parse and return the result
  return response.json()
}
export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<paymentIntentResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/api/hotels/${hotelId}/booking/payment-intent`,
      {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify({ numberOfNights }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (!response.ok) {
      throw new Error('Could not create payment intent')
    }

    // Assuming you want to return some data from the response
    const responseData = await response.json()
    return responseData
  } catch (error) {
    throw new Error('Error creating payment intent')
  }
}
