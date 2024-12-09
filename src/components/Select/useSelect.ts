import { useState, useCallback } from 'react'
import { User } from '../../types/types'
import { fetchUsers } from '../../api/users'

interface UseSelectReturn {
  isOpen: boolean
  users: User[]
  page: number
  hasMore: boolean
  loading: boolean
  selectedUser: User | null
  setIsOpen: (value: boolean) => void
  loadUsers: (pageNumber: number) => Promise<void>
  handleNextPage: () => void
  handleSelectUser: (user: User) => void
}

export const useSelect = (): UseSelectReturn => {
  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  const loadUsers = async (pageNumber: number) => {
    try {
      setLoading(true)
      setPage(pageNumber)
      const data = await fetchUsers(pageNumber)

      if (pageNumber === 1) {
        setUsers(data.data)
      } else {
        setUsers((prev) => [...prev, ...data.data])
      }

      setHasMore(data.meta.to < data.meta.total)
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleNextPage = useCallback(() => {
    setPage((prev) => prev + 1)
    loadUsers(page + 1)
  }, [loadUsers])

  const handleSelectUser = useCallback((user: User) => {
    setSelectedUser(user)
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    users,
    page,
    hasMore,
    loading,
    selectedUser,
    setIsOpen,
    loadUsers,
    handleNextPage,
    handleSelectUser,
  }
}
