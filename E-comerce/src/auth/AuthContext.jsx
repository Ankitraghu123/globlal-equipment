import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (email, password) => {
    // In a real app, you would call your authentication API here
    if (email === 'admin@example.com' && password === 'admin123') {
      const adminUser = {
        email,
        role: 'admin',
        token: 'fake-admin-token'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      navigate('/admin/dashboard');
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);