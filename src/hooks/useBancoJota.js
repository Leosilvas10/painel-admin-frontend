
import { useState, useEffect } from 'react';
import apiService from '../services/api';

export const useBancoJota = () => {
  const [bancoJotaData, setBancoJotaData] = useState({
    slug: '',
    data: {
      title: '',
      subtitle: '',
      cta: '',
      description: '',
      message: ''
    }
  });
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

  const loadBancoJotaContent = async () => {
    const result = await executeApi(() => apiService.getBancoJotaContent());
    if (result.success && result.data) {
      console.log('Dados recebidos da API:', result.data);
      setBancoJotaData(result.data);
    }
    return result;
  };

  const updateBancoJotaContent = async (data) => {
    const result = await executeApi(() => apiService.updateBancoJotaContent(data));
    if (result.success && result.data) {
      console.log('Dados atualizados:', result.data);
      setBancoJotaData(result.data);
    }
    return result;
  };

  useEffect(() => {
    loadBancoJotaContent();
  }, []);

  return {
    bancoJotaData,
    loading,
    error,
    loadBancoJotaContent,
    updateBancoJotaContent
  };
};

export default useBancoJota;
