
import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useLandingPages = () => {
  const [landingPages, setLandingPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const executeApi = async (apiCall) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiCall();
      setLoading(false);
      return { success: true, data: result };
    } catch (err) {
      console.error('API Error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Erro na requisição';
      setError(errorMessage);
      setLoading(false);
      return { success: false, error: errorMessage };
    }
  };

  const loadLandingPages = async () => {
    try {
      const result = await executeApi(() => apiService.getLandingPages());
      if (result.success && Array.isArray(result.data)) {
        setLandingPages(result.data);
      } else {
        // Fallback para array vazio se a API falhar
        setLandingPages([]);
      }
      return result;
    } catch (err) {
      console.error('Erro ao carregar landing pages:', err);
      setLandingPages([]);
      return { success: false, error: err.message };
    }
  };

  const createLandingPage = async (data) => {
    const result = await executeApi(() => apiService.createLandingPage(data));
    if (result.success) {
      setLandingPages([...landingPages, result.data]);
    }
    return result;
  };

  const updateLandingPage = async (id, data) => {
    const result = await executeApi(() => apiService.updateLandingPage(id, data));
    if (result.success) {
      setLandingPages(landingPages.map(page => 
        page.id === id ? { ...page, ...result.data } : page
      ));
    }
    return result;
  };

  const deleteLandingPage = async (id) => {
    try {
      const result = await executeApi(() => apiService.deleteLandingPage(id));
      if (result.success) {
        setLandingPages(landingPages.filter(page => page.id !== id));
        return { success: true, message: 'Landing page deletada com sucesso!' };
      } else {
        console.error('Erro ao deletar landing page:', result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      console.error('Erro inesperado ao deletar:', err);
      return { success: false, error: 'Erro inesperado ao deletar landing page' };
    }
  };

  const getLandingPage = async (id) => {
    const result = await executeApi(() => apiService.getLandingPage(id));
    return result;
  };

  const publishLandingPage = async (id) => {
    const result = await executeApi(() => apiService.publishLandingPage(id));
    if (result.success) {
      setLandingPages(landingPages.map(page => 
        page.id === id ? { ...page, status: 'published' } : page
      ));
    }
    return result;
  };

  const duplicateLandingPage = async (id) => {
    const result = await executeApi(() => apiService.duplicateLandingPage(id));
    if (result.success) {
      setLandingPages([...landingPages, result.data]);
    }
    return result;
  };

  useEffect(() => {
    loadLandingPages();
  }, []);

  return {
    landingPages,
    loading,
    error,
    loadLandingPages,
    createLandingPage,
    updateLandingPage,
    deleteLandingPage,
    getLandingPage,
    publishLandingPage,
    duplicateLandingPage
  };
};

export default useLandingPages;
