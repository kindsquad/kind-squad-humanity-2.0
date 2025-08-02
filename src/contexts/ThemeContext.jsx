import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, default to dark mode if not found
    const savedTheme = localStorage.getItem('kind-squad-theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    // Apply theme to document root immediately
    if (isDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
      document.documentElement.style.setProperty('--mission-spotlight-bg', '#0c0c0c')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      document.documentElement.style.setProperty('--mission-spotlight-bg', '#f3f4f6')
    }
    
    // Save theme preference to localStorage
    localStorage.setItem('kind-squad-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

