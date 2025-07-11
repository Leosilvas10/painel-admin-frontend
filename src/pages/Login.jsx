import React, { useState, useEffect } from 'react';
import { Lock, User, Eye, EyeOff, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

// Componente para mostrar status do backend
const BackendStatus = () => {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    const checkStatus = () => {
      const backendStatus = localStorage.getItem('backendStatus') || 'checking';
      setStatus(backendStatus);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 2000);
    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    switch (status) {
      case 'online':
        return {
          icon: Wifi,
          text: 'Backend Online',
          className: 'bg-green-900 text-green-200 border-green-700',
          iconColor: 'text-green-400'
        };
      case 'offline':
        return {
          icon: WifiOff,
          text: 'Backend Offline (Modo Demo)',
          className: 'bg-red-900 text-red-200 border-red-700',
          iconColor: 'text-red-400'
        };
      default:
        return {
          icon: AlertTriangle,
          text: 'Verificando Backend...',
          className: 'bg-yellow-900 text-yellow-200 border-yellow-700',
          iconColor: 'text-yellow-400'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-lg text-xs border ${config.className}`}>
      <Icon className={`w-3 h-3 mr-2 ${config.iconColor}`} />
      {config.text}
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await onLogin(formData);

      if (!result.success) {
        setError(result.message || 'Usuário ou senha incorretos');
      }
    } catch (error) {
      setError('Erro interno do servidor. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">JG</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Acesso ao Painel
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            Faça login para acessar o <span className="text-purple-400 font-semibold">JotaGuard</span>
          </p>
          
          {/* Status do Backend */}
          <div className="mt-4 flex justify-center">
            <BackendStatus />
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">
                Usuário
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Nome de usuário"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-3 pl-10 pr-10 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={handleChange}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    className="text-gray-400 hover:text-white focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-600 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verificando...
                </div>
              ) : (
                'Fazer Login'
              )}
            </button>
          </div>

          <div className="text-center space-y-2">
            <button
              type="button"
              onClick={async () => {
                console.log('Testando conectividade...');
                try {
                  // Teste 1: Conexão básica
                  const response1 = await fetch('https://painel-admin-backend-leonardosilva2.replit.app');
                  console.log('✅ Teste 1 - Conexão básica:', response1.status);
                  
                  // Teste 2: Health check
                  const response2 = await fetch('https://painel-admin-backend-leonardosilva2.replit.app/api/health');
                  console.log('✅ Teste 2 - Health check:', response2.status);
                  
                  // Teste 3: CORS preflight
                  const response3 = await fetch('https://painel-admin-backend-leonardosilva2.replit.app/api/auth/login', {
                    method: 'OPTIONS',
                  });
                  console.log('✅ Teste 3 - CORS preflight:', response3.status);
                  
                  alert('✅ Todos os testes passaram! Backend está funcionando.');
                } catch (error) {
                  console.error('❌ Erro nos testes:', error);
                  alert('❌ Erro: ' + error.message);
                }
              }}
              className="text-xs text-blue-400 hover:text-blue-300 underline"
            >
              Testar Conectividade Completa
            </button>
            <div className="space-y-1">
              <p className="text-xs text-gray-500">
                <span className="text-purple-400">Demonstração:</span> admin | admin123
              </p>
              <p className="text-xs text-gray-600">
                (Funciona mesmo com backend offline)
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;