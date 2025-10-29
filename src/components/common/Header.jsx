import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Ambulance, LogOut, User } from 'lucide-react'

const Header = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <Ambulance className="logo-icon" />
          <span>Ambulance System</span>
        </Link>

        <nav className="nav">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/booking" className="nav-link">Book Ambulance</Link>
              <Link to="/tracking" className="nav-link">Tracking</Link>
              
              {user.role === 'admin' && (
                <Link to="/admin" className="nav-link">Admin</Link>
              )}

              <div className="user-menu">
                <User size={20} />
                <span>{user.name}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <LogOut size={16} />
                </button>
              </div>
            </>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link primary">Sign Up</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header