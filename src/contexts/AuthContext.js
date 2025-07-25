import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const userToken = localStorage.getItem('userToken');
    const userData = localStorage.getItem('userData');
    const adminToken = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('adminData');
    
    if (adminToken && adminData) {
      setIsAdmin(true);
      setUser(JSON.parse(adminData));
    } else if (userToken && userData) {
      setIsAdmin(false);
      setUser(JSON.parse(userData));
    }
    
    setLoading(false);
  };

  const login = async (email, password) => {
    // Check if it's admin credentials first
    if (email === 'admin@ybt.com' && password === 'admin123') {
      const adminData = {
        id: 1,
        name: 'Admin User',
        email: 'admin@ybt.com',
        role: 'admin'
      };
      
      localStorage.setItem('adminToken', 'demo-admin-token');
      localStorage.setItem('adminData', JSON.stringify(adminData));
      localStorage.removeItem('userToken');
      localStorage.removeItem('userData');
      
      setIsAdmin(true);
      setUser(adminData);
      return { success: true, isAdmin: true };
    }
    
    // Regular user login (demo credentials)
    if (email === 'user@ybt.com' && password === 'user123') {
      const userData = {
        id: 2,
        name: 'John Doe',
        email: 'user@ybt.com',
        role: 'user'
      };
      
      localStorage.setItem('userToken', 'demo-user-token');
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminData');
      
      setIsAdmin(false);
      setUser(userData);
      return { success: true, isAdmin: false };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setUser(null);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAdmin,
    loading,
    login,
    logout,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 