import {
  AuthResponse,
  AuthUser,
  InvitationResponse,
  TemplateResponse,
} from '@/types';

function resolveApiBase(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.startsWith('http')) {
    return envUrl.endsWith('/') ? envUrl.slice(0, -1) : envUrl;
  }
  if (typeof window !== 'undefined') {
    // Hosted environments like Netlify should communicate directly with the Render backend
    if (window.location.hostname.includes('netlify.app') || window.location.hostname.includes('invitedyou.com')) {
      return 'https://invetedyoubackend.onrender.com/api/v1';
    }
  }
  const fallback = envUrl || 'https://invetedyoubackend.onrender.com/api/v1';
  return fallback.endsWith('/') ? fallback.slice(0, -1) : fallback;
}

const API_BASE = resolveApiBase();

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('invitedyou_token');
}

export function setAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('invitedyou_token', token);
}

export function clearAuthToken(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('invitedyou_token');
  localStorage.removeItem('invitedyou_user');
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('invitedyou_user');
  if (!user) return null;
  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('invitedyou_user', JSON.stringify(user));
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!res.ok) {
    let errorData = null;
    try {
      errorData = await res.json();
    } catch {
      // not json
    }
    const message = errorData?.message || `Request failed with status ${res.status}`;
    throw new ApiError(res.status, message, errorData);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

// ========================================================
// Auth APIs
// ========================================================
export const authApi = {
  async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName?: string;
    phoneNumber?: string;
  }): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setAuthToken(res.token);
    setStoredUser({
      id: res.userId,
      publicId: res.publicId,
      email: res.email,
      firstName: res.firstName,
      lastName: res.lastName,
      isVerified: false,
    });
    return res;
  },

  async login(data: { email: string; password: string }): Promise<AuthResponse> {
    const res = await request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    setAuthToken(res.token);
    setStoredUser({
      id: res.userId,
      publicId: res.publicId,
      email: res.email,
      firstName: res.firstName,
      lastName: res.lastName,
      isVerified: true,
    });
    return res;
  },

  async getCurrentUser(): Promise<AuthUser> {
    return request<AuthUser>('/auth/me');
  },

  logout(): void {
    clearAuthToken();
  },
};

// ========================================================
// Templates APIs
// ========================================================
export const templatesApi = {
  async getTemplates(params?: {
    category?: string;
    templateType?: string;
    styleTag?: string;
  }): Promise<TemplateResponse[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.templateType) query.append('templateType', params.templateType);
    if (params?.styleTag) query.append('styleTag', params.styleTag);

    const qs = query.toString();
    return request<TemplateResponse[]>(`/templates${qs ? `?${qs}` : ''}`);
  },

  async getTemplateById(id: string): Promise<TemplateResponse> {
    return request<TemplateResponse>(`/templates/${encodeURIComponent(id)}`);
  },

  async getCategories(): Promise<string[]> {
    return request<string[]>('/templates/categories');
  },
};

// ========================================================
// Invitations APIs
// ========================================================
export const invitationsApi = {
  async createInvitation(data: any): Promise<InvitationResponse> {
    return request<InvitationResponse>('/invitations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async getUserInvitations(): Promise<InvitationResponse[]> {
    return request<InvitationResponse[]>('/invitations');
  },

  async getInvitationById(id: number): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/invitations/${id}`);
  },

  async updateInvitation(id: number, data: any): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/invitations/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async publishInvitation(id: number): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/invitations/${id}/publish`, {
      method: 'POST',
    });
  },

  async unpublishInvitation(id: number): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/invitations/${id}/unpublish`, {
      method: 'POST',
    });
  },

  async duplicateInvitation(id: number): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/invitations/${id}/duplicate`, {
      method: 'POST',
    });
  },

  async deleteInvitation(id: number): Promise<{ deleted: boolean; id: number }> {
    return request<{ deleted: boolean; id: number }>(`/invitations/${id}`, {
      method: 'DELETE',
    });
  },
};

// ========================================================
// Public Invitation API (Zero registration required)
// ========================================================
export const publicApi = {
  async getInvitationBySlug(slug: string): Promise<InvitationResponse> {
    return request<InvitationResponse>(`/public/invitations/${encodeURIComponent(slug)}`);
  },
};

// ========================================================
// Media Upload API
// ========================================================
export const mediaApi = {
  async uploadFile(file: File, mediaType?: 'image' | 'video' | 'audio'): Promise<{
    url: string;
    fileName: string;
    mediaType: string;
    sizeBytes: number;
  }> {
    const formData = new FormData();
    formData.append('file', file);
    if (mediaType) {
      formData.append('mediaType', mediaType);
    }
    return request<{
      url: string;
      fileName: string;
      mediaType: string;
      sizeBytes: number;
    }>('/media/upload', {
      method: 'POST',
      body: formData,
    });
  },
};
