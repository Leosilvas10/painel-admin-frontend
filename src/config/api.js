const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

  // Dashboard
  DASHBOARD_STATS: '/api/dashboard/stats',
  DASHBOARD_ACTIVITIES: '/api/dashboard/activities',
  DASHBOARD_CHARTS: '/api/dashboard/charts',
  DASHBOARD_SYSTEM: '/api/dashboard/system',
};

export { API_BASE_URL };
export default API_BASE_URL;