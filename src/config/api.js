const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://212.85.10.205:3000';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/verify',

  // Logo
  LOGO_UPLOAD: '/api/logo/upload',
  LOGO_GET: '/api/logo',
  LOGO_DELETE: '/api/logo',

  // Videos
  VIDEOS_UPLOAD: '/api/videos/upload',
  VIDEOS_LIST: '/api/videos',
  VIDEOS_GET: (id) => `/api/videos/${id}`,
  VIDEOS_UPDATE: (id) => `/api/videos/${id}`,
  VIDEOS_DELETE: (id) => `/api/videos/${id}`,

  // Content
  CONTENT_SECTIONS: '/api/content/sections',
  CONTENT_SECTION: (section) => `/api/content/sections/${section}`,

  // Blocks
  BLOCKS_LIST: '/api/blocks',
  BLOCKS_CREATE: '/api/blocks',
  BLOCKS_GET: (id) => `/api/blocks/${id}`,
  BLOCKS_UPDATE: (id) => `/api/blocks/${id}`,
  BLOCKS_DELETE: (id) => `/api/blocks/${id}`,
  BLOCKS_REORDER: '/api/blocks/reorder',

  // Settings
  SETTINGS_GET: '/api/settings',
  SETTINGS_UPDATE: '/api/settings',
  SETTINGS_SEO: '/api/settings/seo',

  // Images
  IMAGES_UPLOAD: '/api/images/upload',
  IMAGES_LIST: '/api/images',
  IMAGES_DELETE: (id) => `/api/images/${id}`,

  // Forms
  FORMS_LIST: '/api/forms',
  FORMS_CREATE: '/api/forms',
  FORMS_GET: (id) => `/api/forms/${id}`,
  FORMS_UPDATE: (id) => `/api/forms/${id}`,
  FORMS_DELETE: (id) => `/api/forms/${id}`,
  FORMS_SUBMIT: (id) => `/api/forms/${id}/submit`,
  FORMS_SUBMISSIONS: (id) => `/api/forms/${id}/submissions`,

  // Users
  USERS_LIST: '/api/users',
  USERS_CREATE: '/api/users',
  USERS_GET: (id) => `/api/users/${id}`,
  USERS_UPDATE: (id) => `/api/users/${id}`,
  USERS_DELETE: (id) => `/api/users/${id}`,
  USERS_STATUS: (id) => `/api/users/${id}/status`,

  // LANDING PAGES
  LANDING_PAGES_LIST: '/api/content/landing',
  LANDING_PAGES_CREATE: '/api/content/landing',
  LANDING_PAGES_GET: (id) => `/api/content/landing/${id}`,
  LANDING_PAGES_UPDATE: (id) => `/api/content/landing/${id}`,
  LANDING_PAGES_DELETE: (id) => `/api/content/landing/${id}`,
  LANDING_PAGES_PUBLISH: (id) => `/api/content/landing/${id}/publish`,
  LANDING_PAGES_DUPLICATE: (id) => `/api/content/landing/${id}/duplicate`,

  // BANCO JOTA CONTENT
  BANCO_JOTA_GET: '/api/content/landing/banco-jota',
  BANCO_JOTA_UPDATE: '/api/content/landing/banco-jota',

  // JOTA SOLUÇÕES CONTENT (NOVO)
  JOTA_SOLUCOES_GET: '/api/content/landing/jota-solucoes',
  JOTA_SOLUCOES_UPDATE: '/api/content/landing/jota-solucoes',

  // LEADS (NOVO)
  LEADS_LIST: '/api/leads',
  LEADS_GET: (id) => `/api/leads/${id}`,
  LEADS_DELETE: (id) => `/api/leads/${id}`,
  LEADS_EXPORT: '/api/leads/export',
  LEADS_STATS: '/api/leads/stats',

  // HEALTH CHECK (NOVO)
  HEALTH: '/api/health',

  // Dashboard
  DASHBOARD_STATS: '/api/dashboard/stats',
  DASHBOARD_ACTIVITIES: '/api/dashboard/activities',
  DASHBOARD_CHARTS: '/api/dashboard/charts',
  DASHBOARD_SYSTEM: '/api/dashboard/system',
};

// Helper functions para facilitar uso
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  const config = { ...defaultOptions, ...options };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return await response.text();
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

// Funções específicas para Jota Soluções
export const jotaSolucoesAPI = {
  // Buscar dados da landing page
  get: () => apiRequest(API_ENDPOINTS.JOTA_SOLUCOES_GET),
  
  // Atualizar dados da landing page
  update: (data) => apiRequest(API_ENDPOINTS.JOTA_SOLUCOES_UPDATE, {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  // Buscar leads capturados
  getLeads: () => apiRequest(API_ENDPOINTS.LEADS_LIST + '?projeto=jota-solucoes'),
  
  // Estatísticas de leads
  getLeadsStats: () => apiRequest(API_ENDPOINTS.LEADS_STATS + '?projeto=jota-solucoes'),
  
  // Exportar leads
  exportLeads: () => apiRequest(API_ENDPOINTS.LEADS_EXPORT + '?projeto=jota-solucoes')
};

// Funções específicas para Banco Jota
export const bancoJotaAPI = {
  get: () => apiRequest(API_ENDPOINTS.BANCO_JOTA_GET),
  update: (data) => apiRequest(API_ENDPOINTS.BANCO_JOTA_UPDATE, {
    method: 'PUT',
    body: JSON.stringify(data)
  })
};

// Função para teste de conectividade
export const healthCheck = () => apiRequest(API_ENDPOINTS.HEALTH);

// Funções de upload
export const uploadAPI = {
  logo: (file) => {
    const formData = new FormData();
    formData.append('logo', file);
    return apiRequest(API_ENDPOINTS.LOGO_UPLOAD, {
      method: 'POST',
      body: formData,
      headers: {} // Remove Content-Type para FormData
    });
  },
  
  image: (file, alt = '') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt', alt);
    return apiRequest(API_ENDPOINTS.IMAGES_UPLOAD, {
      method: 'POST',
      body: formData,
      headers: {}
    });
  },
  
  video: (file, title = '') => {
    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', title);
    return apiRequest(API_ENDPOINTS.VIDEOS_UPLOAD, {
      method: 'POST',
      body: formData,
      headers: {}
    });
  }
};

// Funções de autenticação
export const authAPI = {
  login: (credentials) => apiRequest(API_ENDPOINTS.LOGIN, {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),
  
  logout: () => apiRequest(API_ENDPOINTS.LOGOUT, {
    method: 'POST'
  }),
  
  verify: () => apiRequest(API_ENDPOINTS.ME)
};

// Função para gerenciar landing pages
export const landingPagesAPI = {
  list: () => apiRequest(API_ENDPOINTS.LANDING_PAGES_LIST),
  
  get: (id) => apiRequest(API_ENDPOINTS.LANDING_PAGES_GET(id)),
  
  create: (data) => apiRequest(API_ENDPOINTS.LANDING_PAGES_CREATE, {
    method: 'POST',
    body: JSON.stringify(data)
  }),
  
  update: (id, data) => apiRequest(API_ENDPOINTS.LANDING_PAGES_UPDATE(id), {
    method: 'PUT',
    body: JSON.stringify(data)
  }),
  
  delete: (id) => apiRequest(API_ENDPOINTS.LANDING_PAGES_DELETE(id), {
    method: 'DELETE'
  }),
  
  publish: (id) => apiRequest(API_ENDPOINTS.LANDING_PAGES_PUBLISH(id), {
    method: 'POST'
  }),
  
  duplicate: (id) => apiRequest(API_ENDPOINTS.LANDING_PAGES_DUPLICATE(id), {
    method: 'POST'
  })
};

// Exportações
export { API_BASE_URL };
export default API_BASE_URL;
