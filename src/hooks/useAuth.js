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
      console.log('🔄 Tentando fazer login com:', { username: credentials.username });
      const response = await apiService.login(credentials);
      console.log('📥 Resposta do login:', response);

      if (response.success || response.token) {
        const token = response.token;
        const user = response.user;
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify(user));

        setIsAuthenticated(true);
        setUser(user);

        console.log('✅ Login realizado com sucesso');
        return { success: true };
      } else {
        console.log('❌ Login falhou:', response.message);
        return { success: false, message: response.message || 'Credenciais inválidas' };
      }
    } catch (error) {
      console.error('Login error:', error);
      
      let errorMessage = 'Erro de conexão. Verifique se o backend está rodando.';
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = 'Não foi possível conectar com o servidor. Verifique se o backend está rodando na porta 5000.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Usuário ou senha incorretos.';
      } else if (error.response?.status === 500) {
        errorMessage = 'Erro interno do servidor.';
      }
      
      return { 
        success: false, 
        message: errorMessage 
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