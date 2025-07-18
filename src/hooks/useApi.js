
import { useState, useEffect } from 'react';
import apiService from '../services/api';

// Hook para gerenciar loading e error states
export const useApiState = () => {
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

  return { loading, error, executeApi };
};

// Hook para vídeos
export const useVideos = () => {
  const [videos, setVideos] = useState([]);
  const { loading, error, executeApi } = useApiState();

  const loadVideos = async () => {
    const result = await executeApi(() => apiService.getVideos());
    if (result.success) {
      setVideos(result.data);
    }
    return result;
  };

  const uploadVideo = async (file) => {
    return await executeApi(() => apiService.uploadVideo(file));
  };

  const deleteVideo = async (id) => {
    const result = await executeApi(() => apiService.deleteVideo(id));
    if (result.success) {
      setVideos(videos.filter(video => video.id !== id));
    }
    return result;
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return {
    videos,
    loading,
    error,
    loadVideos,
    uploadVideo,
    deleteVideo
  };
};

// Hook para imagens
export const useImages = () => {
  const [images, setImages] = useState([]);
  const { loading, error, executeApi } = useApiState();

  const loadImages = async () => {
    const result = await executeApi(() => apiService.getImages());
    if (result.success) {
      setImages(result.data);
    }
    return result;
  };

  const uploadImage = async (file) => {
    const result = await executeApi(() => apiService.uploadImage(file));
    if (result.success) {
      setImages([...images, result.data]);
    }
    return result;
  };

  const deleteImage = async (id) => {
    const result = await executeApi(() => apiService.deleteImage(id));
    if (result.success) {
      setImages(images.filter(img => img.id !== id));
    }
    return result;
  };

  useEffect(() => {
    loadImages();
  }, []);

  return {
    images,
    loading,
    error,
    loadImages,
    uploadImage,
    deleteImage
  };
};

// Hook para blocos
export const useBlocks = () => {
  const [blocks, setBlocks] = useState([]);
  const { loading, error, executeApi } = useApiState();

  const loadBlocks = async () => {
    const result = await executeApi(() => apiService.getBlocks());
    if (result.success) {
      setBlocks(result.data);
    }
    return result;
  };

  const createBlock = async (data) => {
    const result = await executeApi(() => apiService.createBlock(data));
    if (result.success) {
      setBlocks([...blocks, result.data]);
    }
    return result;
  };

  const updateBlock = async (id, data) => {
    const result = await executeApi(() => apiService.updateBlock(id, data));
    if (result.success) {
      setBlocks(blocks.map(block => 
        block.id === id ? { ...block, ...result.data } : block
      ));
    }
    return result;
  };

  const deleteBlock = async (id) => {
    const result = await executeApi(() => apiService.deleteBlock(id));
    if (result.success) {
      setBlocks(blocks.filter(block => block.id !== id));
    }
    return result;
  };

  const reorderBlocks = async (newOrder) => {
    const result = await executeApi(() => apiService.reorderBlocks(newOrder));
    if (result.success) {
      setBlocks(result.data);
    }
    return result;
  };

  useEffect(() => {
    loadBlocks();
  }, []);

  return {
    blocks,
    loading,
    error,
    loadBlocks,
    createBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks
  };
};

// Hook para configurações
export const useSettings = () => {
  const [settings, setSettings] = useState({});
  const { loading, error, executeApi } = useApiState();

  const loadSettings = async () => {
    const result = await executeApi(() => apiService.getSettings());
    if (result.success) {
      setSettings(result.data);
    }
    return result;
  };

  const updateSettings = async (data) => {
    const result = await executeApi(() => apiService.updateSettings(data));
    if (result.success) {
      setSettings({ ...settings, ...result.data });
    }
    return result;
  };

  const updateSeoSettings = async (data) => {
    const result = await executeApi(() => apiService.updateSeoSettings(data));
    if (result.success) {
      setSettings({ ...settings, seo: result.data });
    }
    return result;
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings,
    updateSeoSettings
  };
};

// Hook para logo
export const useLogo = () => {
  const [logo, setLogo] = useState(null);
  const { loading, error, executeApi } = useApiState();

  const loadLogo = async () => {
    const result = await executeApi(() => apiService.getLogo());
    if (result.success) {
      setLogo(result.data);
    }
    return result;
  };

  const uploadLogo = async (file) => {
    const result = await executeApi(() => apiService.uploadLogo(file));
    if (result.success) {
      setLogo(result.data);
    }
    return result;
  };

  const deleteLogo = async () => {
    const result = await executeApi(() => apiService.deleteLogo());
    if (result.success) {
      setLogo(null);
    }
    return result;
  };

  useEffect(() => {
    loadLogo();
  }, []);

  return {
    logo,
    loading,
    error,
    loadLogo,
    uploadLogo,
    deleteLogo
  };
};

// Hook para conteúdo
export const useContent = () => {
  const [content, setContent] = useState({});
  const { loading, error, executeApi } = useApiState();

  const loadContentSections = async () => {
    const result = await executeApi(() => apiService.getContentSections());
    if (result.success) {
      setContent(result.data);
    }
    return result;
  };

  const loadContentSection = async (section) => {
    const result = await executeApi(() => apiService.getContentSection(section));
    if (result.success) {
      setContent({ ...content, [section]: result.data });
    }
    return result;
  };

  const updateContentSection = async (section, data) => {
    const result = await executeApi(() => apiService.updateContentSection(section, data));
    if (result.success) {
      setContent({ ...content, [section]: result.data });
    }
    return result;
  };

  useEffect(() => {
    loadContentSections();
  }, []);

  return {
    content,
    loading,
    error,
    loadContentSections,
    loadContentSection,
    updateContentSection
  };
};

// Hook para formulários
export const useForms = () => {
  const [forms, setForms] = useState([]);
  const { loading, error, executeApi } = useApiState();

  const loadForms = async () => {
    const result = await executeApi(() => apiService.getForms());
    if (result.success) {
      setForms(result.data);
    }
    return result;
  };

  const createForm = async (data) => {
    const result = await executeApi(() => apiService.createForm(data));
    if (result.success) {
      setForms([...forms, result.data]);
    }
    return result;
  };

  const updateForm = async (id, data) => {
    const result = await executeApi(() => apiService.updateForm(id, data));
    if (result.success) {
      setForms(forms.map(form => form.id === id ? result.data : form));
    }
    return result;
  };

  const deleteForm = async (id) => {
    const result = await executeApi(() => apiService.deleteForm(id));
    if (result.success) {
      setForms(forms.filter(form => form.id !== id));
    }
    return result;
  };

  const getFormSubmissions = async (id) => {
    const result = await executeApi(() => apiService.getFormSubmissions(id));
    return result;
  };

  useEffect(() => {
    loadForms();
  }, []);

  return {
    forms,
    loading,
    error,
    loadForms,
    createForm,
    updateForm,
    deleteForm,
    getFormSubmissions
  };
};

// Hook para usuários
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const { loading, error, executeApi } = useApiState();

  const loadUsers = async () => {
    const result = await executeApi(() => apiService.getUsers());
    if (result.success) {
      setUsers(result.data);
    }
    return result;
  };

  const createUser = async (data) => {
    const result = await executeApi(() => apiService.createUser(data));
    if (result.success) {
      setUsers([...users, result.data]);
    }
    return result;
  };

  const updateUser = async (id, data) => {
    const result = await executeApi(() => apiService.updateUser(id, data));
    if (result.success) {
      setUsers(users.map(user => user.id === id ? result.data : user));
    }
    return result;
  };

  const deleteUser = async (id) => {
    const result = await executeApi(() => apiService.deleteUser(id));
    if (result.success) {
      setUsers(users.filter(user => user.id !== id));
    }
    return result;
  };

  const updateUserStatus = async (id, status) => {
    const result = await executeApi(() => apiService.updateUserStatus(id, status));
    if (result.success) {
      setUsers(users.map(user => user.id === id ? { ...user, status } : user));
    }
    return result;
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    loadUsers,
    createUser,
    updateUser,
    deleteUser,
    updateUserStatus
  };
};

// Hook para dashboard
export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    stats: null,
    activities: [],
    charts: null,
    system: null
  });
  const { loading, error, executeApi } = useApiState();

  const loadDashboardStats = async () => {
    const result = await executeApi(() => apiService.getDashboardStats());
    if (result.success) {
      setDashboardData(prev => ({ ...prev, stats: result.data }));
    }
    return result;
  };

  const loadDashboardActivities = async () => {
    const result = await executeApi(() => apiService.getDashboardActivities());
    if (result.success) {
      setDashboardData(prev => ({ ...prev, activities: result.data }));
    }
    return result;
  };

  const loadDashboardCharts = async () => {
    const result = await executeApi(() => apiService.getDashboardCharts());
    if (result.success) {
      setDashboardData(prev => ({ ...prev, charts: result.data }));
    }
    return result;
  };

  const loadDashboardSystem = async () => {
    const result = await executeApi(() => apiService.getDashboardSystem());
    if (result.success) {
      setDashboardData(prev => ({ ...prev, system: result.data }));
    }
    return result;
  };

  const loadAllDashboardData = async () => {
    await Promise.all([
      loadDashboardStats(),
      loadDashboardActivities(),
      loadDashboardCharts(),
      loadDashboardSystem()
    ]);
  };

  useEffect(() => {
    loadAllDashboardData();
  }, []);

  return {
    dashboardData,
    loading,
    error,
    loadDashboardStats,
    loadDashboardActivities,
    loadDashboardCharts,
    loadDashboardSystem,
    loadAllDashboardData
  };
};
