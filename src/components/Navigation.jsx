import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navigation({ currentPage = '', showTitle = true, title = "" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ email: '', password: '' })

  useEffect(() => {
    // Check if user is logged in from localStorage
    const loggedIn = localStorage.getItem('kindsquad_logged_in') === 'true'
    setIsLoggedIn(loggedIn)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple authentication - in production, this would connect to a real auth system
    if (loginForm.email && loginForm.password) {
      localStorage.setItem('kindsquad_logged_in', 'true')
      localStorage.setItem('kindsquad_user_email', loginForm.email)
      setIsLoggedIn(true)
      setShowLoginModal(false)
      setLoginForm({ email: '', password: '' })
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('kindsquad_logged_in')
    localStorage.removeItem('kindsquad_user_email')
    setIsLoggedIn(false)
    setIsMenuOpen(false)
  }

  const menuItems = [
    { path: "/", label: "🏠 Homepage", key: "homepage" },
    { path: "/membership", label: "💎 Membership", key: "membership" },
    ...(isLoggedIn ? [
      { path: "/admin-dashboard", label: "⚙️ Admin Dashboard", key: "admin" },
      { path: "/member", label: "👤 Member Dashboard", key: "member" },
      { path: "/chapter", label: "🏢 Chapter Dashboard", key: "chapter" },
    ] : []),
    { path: "/missions", label: "🎯 Missions", key: "missions" },
    { path: "/request-help", label: "🆘 Request Help", key: "request-help" },
    { path: "/start-chapter", label: "🚀 Start a Chapter", key: "start-chapter" },
    { path: "/events", label: "📅 Events", key: "events" }
  ]

  return (
    <>
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
                {isLoggedIn ? (
                  <button 
                    className="block w-full text-left px-4 py-3 text-red-400 hover:bg-gray-800"
                    onClick={handleLogout}
                  >
                    🚪 Logout
                  </button>
                ) : (
                  <button 
                    className="block w-full text-left px-4 py-3 text-green-400 hover:bg-gray-800"
                    onClick={() => {
                      setShowLoginModal(true)
                      setIsMenuOpen(false)
                    }}
                  >
                    🔑 Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Sign In to Kind Squad</h3>
              <button
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-yellow-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-black px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="flex-1 bg-transparent border border-gray-600 text-gray-300 px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400">
                Demo: Use any email and password to sign in
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

