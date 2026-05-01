import {
  Project,
  CreateProjectInput,
  UpdateProjectInput,
} from '../types/project';

const API_URL = '/api/my-projects';

export const projectService = {
  async getAll(params: { page: number; limit: number; search?: string }) {
    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      search: params.search || '',
    });
    const response = await fetch(`${API_URL}?${query}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل جلب المشاريع');
    }
    return response.json() as Promise<{ data: Project[]; total: number }>;
  },
 
  async getFreelancerProjects(params: { page: number; limit: number; search?: string }) {
    const query = new URLSearchParams({
      page: params.page.toString(),
      limit: params.limit.toString(),
      search: params.search || '',
    });
    const response = await fetch(`/api/project?${query}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل جلب مشاريع المستقل');
    }
    return response.json() as Promise<{ data: Project[]; total: number }>;
  },

  async getById(id: string) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل جلب بيانات المشروع');
    }
    return response.json() as Promise<Project>;
  },

  async create(data: CreateProjectInput) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل إنشاء المشروع');
    }
    return response.json() as Promise<Project>;
  },

  async update(id: string, data: UpdateProjectInput) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل تحديث المشروع');
    }
    return response.json() as Promise<Project>;
  },

  async delete(id: string) {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل حذف المشروع');
    }
    return response.json();
  },

  async cancel(id: string) {
    return this.update(id, { status: 'Cancelled' });
  },

  async freelancerUpdate(id: string, data: { projectUrl?: string; reviewUrl?: string; milestones?: any[] }) {
    const response = await fetch(`/api/project/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل تحديث الروابط');
    }
    return response.json() as Promise<Project>;
  },

  async getRecentProjects() {
    const response = await fetch('/api/home-page-client');
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'فشل جلب المشاريع الأخيرة');
    }
    return response.json() as Promise<{ 
      projects: Project[]; 
      stats: { 
        totalProjects: number; 
        totalSpent?: number; 
        activeDisputes: number;
        pendingBalance?: number;
        withdrawableBalance?: number;
      } 
    }>;
  },
};
