
import httpService from './http';
import { API_ENDPOINTS } from '../config/api';

class ApiService {
  // AUTHENTICATION
  async login(credentials) {
    const response = await httpService.post(API_ENDPOINTS.LOGIN, credentials);
    return response.data;
  }

  async logout() {
    const response = await httpService.post(API_ENDPOINTS.LOGOUT);
    return response.data;
  }

  async getMe() {
    const response = await httpService.get(API_ENDPOINTS.ME);
    return response.data;
  }

  // LOGO
  async uploadLogo(logoFile) {
    const formData = new FormData();
    formData.append('logo', logoFile);
    const response = await httpService.post(API_ENDPOINTS.LOGO_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getLogo() {
    const response = await httpService.get(API_ENDPOINTS.LOGO_GET);
    return response.data;
  }

  async deleteLogo() {
    const response = await httpService.delete(API_ENDPOINTS.LOGO_DELETE);
    return response.data;
  }

  // VIDEOS
  async uploadVideo(videoFile) {
    const formData = new FormData();
    formData.append('video', videoFile);
    const response = await httpService.post(API_ENDPOINTS.VIDEOS_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getVideos() {
    const response = await httpService.get(API_ENDPOINTS.VIDEOS_LIST);
    return response.data;
  }

  async getVideo(id) {
    const response = await httpService.get(API_ENDPOINTS.VIDEOS_GET(id));
    return response.data;
  }

  async updateVideo(id, data) {
    const response = await httpService.put(API_ENDPOINTS.VIDEOS_UPDATE(id), data);
    return response.data;
  }

  async deleteVideo(id) {
    const response = await httpService.delete(API_ENDPOINTS.VIDEOS_DELETE(id));
    return response.data;
  }

  // CONTENT
  async getContentSections() {
    const response = await httpService.get(API_ENDPOINTS.CONTENT_SECTIONS);
    return response.data;
  }

  async getContentSection(section) {
    const response = await httpService.get(API_ENDPOINTS.CONTENT_SECTION(section));
    return response.data;
  }

  async updateContentSection(section, data) {
    const response = await httpService.put(API_ENDPOINTS.CONTENT_SECTION(section), data);
    return response.data;
  }

  // BLOCKS
  async getBlocks() {
    const response = await httpService.get(API_ENDPOINTS.BLOCKS_LIST);
    return response.data;
  }

  async createBlock(data) {
    const response = await httpService.post(API_ENDPOINTS.BLOCKS_CREATE, data);
    return response.data;
  }

  async getBlock(id) {
    const response = await httpService.get(API_ENDPOINTS.BLOCKS_GET(id));
    return response.data;
  }

  async updateBlock(id, data) {
    const response = await httpService.put(API_ENDPOINTS.BLOCKS_UPDATE(id), data);
    return response.data;
  }

  async deleteBlock(id) {
    const response = await httpService.delete(API_ENDPOINTS.BLOCKS_DELETE(id));
    return response.data;
  }

  async reorderBlocks(data) {
    const response = await httpService.put(API_ENDPOINTS.BLOCKS_REORDER, data);
    return response.data;
  }

  // SETTINGS
  async getSettings() {
    const response = await httpService.get(API_ENDPOINTS.SETTINGS_GET);
    return response.data;
  }

  async updateSettings(data) {
    const response = await httpService.put(API_ENDPOINTS.SETTINGS_UPDATE, data);
    return response.data;
  }

  async updateSeoSettings(data) {
    const response = await httpService.put(API_ENDPOINTS.SETTINGS_SEO, data);
    return response.data;
  }

  // IMAGES
  async uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);
    const response = await httpService.post(API_ENDPOINTS.IMAGES_UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }

  async getImages() {
    const response = await httpService.get(API_ENDPOINTS.IMAGES_LIST);
    return response.data;
  }

  async deleteImage(id) {
    const response = await httpService.delete(API_ENDPOINTS.IMAGES_DELETE(id));
    return response.data;
  }
}

export default new ApiService();
