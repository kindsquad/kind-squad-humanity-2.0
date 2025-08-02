import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Admin credentials (in production, this should be more secure)
  const ADMIN_PASSWORD = 'KindSquad2024!'; // Change this to your preferred password

  useEffect(() => {
    // Check if admin is already authenticated in this session
    const adminAuth = sessionStorage.getItem('kindSquadAdminAuth');
    if (adminAuth === 'authenticated') {
      setIsAdmin(true);
      setIsAuthenticated(true);
    }
  }, []);

  const authenticateAdmin = (password) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsAuthenticated(true);
      sessionStorage.setItem('kindSquadAdminAuth', 'authenticated');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setIsAuthenticated(false);
    sessionStorage.removeItem('kindSquadAdminAuth');
  };

  const value = {
    isAdmin,
    isAuthenticated,
    authenticateAdmin,
    logoutAdmin
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;

