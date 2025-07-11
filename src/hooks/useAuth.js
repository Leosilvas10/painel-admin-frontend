import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a aplicação
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');

      if (token) {
        try {
          const userData = await apiService.getMe();
          setIsAuthenticated(true);
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          localStorage.setItem('isAuthenticated', 'true');
        } catch (error) {
          // Token inválido ou expirado
          localStorage.removeItem('authToken');
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('user');
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);

    try {
      const response = await apiService.login(credentials);

      if (response.success) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(response.user));

        setIsAuthenticated(true);
        setUser(response.user);

        return { success: true };
      } else {
        return { success: false, message: response.message };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        message: 'Erro de conexão. Verifique se o backend está rodando.' 
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout
  };
};