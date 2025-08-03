import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navigation({ currentPage = '', showTitle = true, title = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { path: "/", label: "🏠 Homepage", key: "homepage" },
    { path: "/membership", label: "💎 Membership", key: "membership" },
    { path: "/admin-dashboard", label: "⚙️ Admin Dashboard", key: "admin" },
    { path: "/member", label: "👤 Member Dashboard", key: "member" },
    { path: "/chapter", label: "🏢 Chapter Dashboard", key: "chapter" },
    { path: "/missions", label: "🎯 Missions", key: "missions" },
    { path: "/request-help", label: "🆘 Request Help", key: "request-help" },
    { path: "/start-chapter", label: "🚀 Start a Chapter", key: "start-chapter" },
    { path: "/events", label: "📅 Events", key: "events" }
  ]

  return (
    <header className="bg-black border-b border-gray-800 px-6 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/lighthouse-logo-final.png" 
              alt="Kind Squad Logo" 
              className="h-10 w-10"
            />
            <div>
              <h1 className="text-xl font-bold text-white">KIND SQUAD®</h1>
              <p className="text-sm text-yellow-400">HUMANITY 2.0</p>
            </div>
          </div>
          {showTitle && title && (
            <h2 className="text-xl font-semibold text-gray-300 ml-8">{title}</h2>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggleMenu}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 right-6 bg-black border border-gray-700 rounded-lg shadow-lg z-50 min-w-64">
          <div className="py-2">
            {menuItems.map((item) => (
              <Link 
                key={item.key}
                to={item.path} 
                className={`block px-4 py-3 hover:bg-gray-800 border-b border-gray-700 ${
                  currentPage === item.key ? 'text-yellow-400' : 'text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-gray-700 mt-2 pt-2">
              <button 
                className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

