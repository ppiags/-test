import { ApiResponse } from '../types/types'

export const fetchUsers = async (pageNumber: number): Promise<ApiResponse> => {
  const response = await fetch(
    `https://frontend-test-middle.vercel.app/api/users?page=${pageNumber}&limit=50`
  )

  if (!response.ok) {
    throw new Error('Error loading users')
  }

  return response.json()
}
