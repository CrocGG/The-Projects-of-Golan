import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className='Navbar'>
      <h2 className='logo'>
        <NavLink to="/">
          ShopEase
        </NavLink>
      </h2>

      <button
        className={`mobile-menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/home"
          className={({ isActive }) => isActive ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Home
        </NavLink>
        <NavLink to="/products"
          className={({ isActive }) => isActive ? 'active' : ''}
          onClick={closeMobileMenu}
        >
          Products
        </NavLink>
      </div>
    </div>
  )
}
