import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LandingPages from './pages/LandingPages';
import Media from './pages/Media';
import Forms from './pages/Forms';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';

// Debug: Teste de conectividade básica
const testBackendConnection = async () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  console.log('🔍 Testando conexão com backend:', apiUrl);

  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ test: true })
    });
    console.log('✅ Backend respondeu:', response.status);
  } catch (error) {
    console.error('❌ Backend connection test failed:', error.message);
  }

  // Teste básico de conectividade
  try {
    const basicResponse = await fetch(apiUrl);
    console.log('📡 Basic connectivity:', basicResponse.status);
  } catch (error) {
    console.error('📡 Basic connectivity failed:', error.message);
  }
};

// Executar teste na inicialização
testBackendConnection();

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, isLoading, login } = useAuth();

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  // Mostrar tela de login se não estiver autenticado
  if (!isAuthenticated) {
    return <Login onLogin={login} />;
  }

  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
          <Header setSidebarOpen={setSidebarOpen} />

          <main className="flex-1 overflow-y-auto bg-gray-900 p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/landing-pages" element={<LandingPages />} />
              <Route path="/media" element={<Media />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}