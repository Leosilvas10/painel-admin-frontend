
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
      setError(err.response?.data?.message || 'Erro na requisição');
      setLoading(false);
      return { success: false, error: err };
    }
  };

  const loadLandingPages = async () => {
    const result = await executeApi(() => apiService.getLandingPages());
    if (result.success) {
      setLandingPages(result.data);
    }
    return result;
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
    const result = await executeApi(() => apiService.deleteLandingPage(id));
    if (result.success) {
      setLandingPages(landingPages.filter(page => page.id !== id));
    }
    return result;
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
