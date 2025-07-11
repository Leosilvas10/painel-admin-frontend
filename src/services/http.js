
import axios from 'axios';
import API_BASE_URL from '../config/api';

// Debug: Log da URL base
console.log('API Base URL:', API_BASE_URL);

// Função para testar conectividade
const testConnection = async () => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const response = await fetch(API_BASE_URL + '/api/health', { 
      method: 'GET',
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      console.log('✅ Backend connection test: Connected');
      localStorage.setItem('backendStatus', 'online');
    } else {
      console.log('⚠️ Backend connection test: Server responded but not healthy');
      localStorage.setItem('backendStatus', 'unhealthy');
    }
  } catch (error) {
    console.error('❌ Backend connection test failed:', error.message);
    localStorage.setItem('backendStatus', 'offline');
    
    // Tentar teste básico sem CORS
    try {
      const basicResponse = await fetch(API_BASE_URL, { 
        method: 'HEAD',
        mode: 'no-cors' 
      });
      console.log('📡 Basic connectivity test:', response.type === 'opaque' ? 'Server reachable' : 'Server unreachable');
    } catch (basicError) {
      console.error('📡 Basic connectivity failed:', basicError.message);
    }
  }
};

// Testar conexão ao inicializar
testConnection();

// Re-testar a cada 30 segundos
setInterval(testConnection, 30000);

// Criar instância do axios
const httpService = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // Aumentado para 30s
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false, // Importante para CORS
});

// Interceptor para adicionar token automaticamente
httpService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
      code: error.code
    });

    // Verificar se é erro de CORS ou rede
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.error('🚨 CORS ou conectividade: Verifique se o backend está rodando e configurado para aceitar requisições do frontend');
      
      // Tentar uma requisição de teste
      fetch(API_BASE_URL)
        .then(() => console.log('✅ Backend acessível via fetch'))
        .catch(() => console.log('❌ Backend não acessível'));
    }
    
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default httpService;
