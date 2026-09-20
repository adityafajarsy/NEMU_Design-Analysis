import { getDeviceFingerprint, getStoredGuestToken, setStoredGuestToken } from './fingerprint';
import { DEMO_REFERENCES } from '../data/demoReferences';

// In dev: uses Vite proxy (/api → localhost:5000)
// In production: uses VITE_API_URL (set in Vercel frontend env vars)
const rawBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, '') : '/api';
export const API_BASE = rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`;

export async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  
  const headers = {
    'X-Device-Fingerprint': getDeviceFingerprint(),
    ...options.headers
  };

  const storedToken = getStoredGuestToken();
  if (storedToken && !headers['X-Guest-Token']) {
    headers['X-Guest-Token'] = storedToken;
  }

  // Dual-Auth: Send Authorization Bearer token for cross-origin mobile support
  const authToken = localStorage.getItem('nemu_auth_token');
  if (authToken && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  // Only set Content-Type if not FormData (FormData sets boundary automatically)
  if (!(options.body instanceof FormData) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json';
  }

  let response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include'
    });
  } catch (networkErr) {
    console.error(`[API Network Error] ${endpoint}:`, networkErr);
    const err = new Error('Gagal menghubungi backend (Failed to fetch). Pastikan server port 5000 sedang berjalan.');
    err.status = 0;
    err.isNetworkError = true;
    throw err;
  }

  // Persist guest token from response header or JSON body to localStorage (Dual-locking)
  const headerToken = response.headers.get('x-guest-token');
  if (headerToken) setStoredGuestToken(headerToken);

  const data = await response.json().catch(() => ({}));
  if (data?.guestSessionToken) {
    setStoredGuestToken(data.guestSessionToken);
  }
  if (data?.analysis?.guestSessionToken) {
    setStoredGuestToken(data.analysis.guestSessionToken);
  }

  // Persist JWT auth token if returned
  if (data?.token) {
    localStorage.setItem('nemu_auth_token', data.token);
  }

  if (!response.ok) {
    const error = new Error(data.error || `HTTP error ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Auth
  sendOtp: (body) => apiRequest('/auth/send-otp', { method: 'POST', body: JSON.stringify(body) }),
  register: async (body) => {
    const res = await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(body) });
    if (res?.token) localStorage.setItem('nemu_auth_token', res.token);
    return res;
  },
  login: async (body) => {
    const res = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(body) });
    if (res?.token) localStorage.setItem('nemu_auth_token', res.token);
    return res;
  },
  clerkSync: async (body) => {
    const res = await apiRequest('/auth/clerk-sync', { method: 'POST', body: JSON.stringify(body) });
    if (res?.token) localStorage.setItem('nemu_auth_token', res.token);
    return res;
  },
  getMe: () => apiRequest('/auth/me', { method: 'GET' }),
  logout: async () => {
    try {
      await apiRequest('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('nemu_auth_token');
    }
  },


  // Analysis
  uploadImage: (formData) => apiRequest('/analysis/upload', { method: 'POST', body: formData }),
  getAnalysis: (id) => {
    const localDemo = DEMO_REFERENCES.find(d => d._id === id || d.slug === id);
    if (localDemo) return Promise.resolve({ analysis: localDemo });
    return apiRequest(`/analysis/${id}`, { method: 'GET' });
  },
  getDemo: (slug) => {
    const localDemo = DEMO_REFERENCES.find(d => d.slug === slug || d._id === slug) || DEMO_REFERENCES[0];
    if (localDemo) return Promise.resolve({ analysis: localDemo });
    return apiRequest(`/analysis/demo/${slug}`, { method: 'GET' });
  },
  getRecent: (params = '') => apiRequest(`/analysis/recent${params ? '?' + params : ''}`, { method: 'GET' }),
  toggleFavorite: (id) => apiRequest(`/analysis/${id}/favorite`, { method: 'PATCH' }),

  // Collections
  getCollections: () => apiRequest('/collections', { method: 'GET' }),
  createCollection: (body) => apiRequest('/collections', { method: 'POST', body: JSON.stringify(body) }),
  addToCollection: (colId, analysisId) => apiRequest(`/collections/${colId}/add`, { method: 'POST', body: JSON.stringify({ analysisId }) })
};
