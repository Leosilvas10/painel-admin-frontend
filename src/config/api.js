
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  ME: '/api/auth/me',
  
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
};

export default API_BASE_URL;
