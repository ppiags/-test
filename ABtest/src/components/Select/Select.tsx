import { useEffect, useRef } from 'react'
import { useSelect } from './useSelect'
import './Select.css'
import { User } from '../../types/types'

export const Select = () => {
  const {
    isOpen,
    users,
    loading,
    hasMore,
    selectedUser,
    setIsOpen,
    loadUsers,
    handleNextPage,
    handleSelectUser,
  } = useSelect()

  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current || loading || !hasMore) return

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      handleNextPage()
    }
  }

  useEffect(() => {
    if (isOpen && users.length === 0) {
      loadUsers(1)
    }
  }, [isOpen, users.length])

  const getText = (user: User) =>
    `${user.last_name} ${user.first_name}${user.job ? `, ${user.job}` : ''}`

  const getHeaderText = () => {
    if (selectedUser) {
      return getText(selectedUser)
    }
    return 'Select user'
  }

  return (
    <div className="select-container">
      <h2>Users</h2>
      <div
        className={`select-header  ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="user-header-name">{getHeaderText()}</span>
        <span className={`arrow ${isOpen ? 'up' : 'down'}`}></span>
      </div>

      {isOpen && (
        <div
          className="select-dropdown"
          ref={containerRef}
          onScroll={handleScroll}
        >
          {users.map((user) => (
            <div
              key={user.id}
              className={`user-item ${
                selectedUser?.id === user.id ? 'selected' : ''
              }`}
              onClick={() => handleSelectUser(user)}
            >
              <div className="user-avatar">{user.last_name[0]}</div>
              <div className="user-info">
                <div className="user-name">{getText(user)}</div>
              </div>
            </div>
          ))}
          {loading && <div className="loading">Загрузка...</div>}
        </div>
      )}
    </div>
  )
}
