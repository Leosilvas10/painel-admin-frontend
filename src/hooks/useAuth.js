
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a aplicação
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('user');
      
      if (authStatus === 'true' && userData) {
        setIsAuthenticated(true);
        setUser(JSON.parse(userData));
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (status) => {
    setIsAuthenticated(status);
    if (status) {
      const userData = localStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };
};
