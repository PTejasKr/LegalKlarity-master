import type { User } from "firebase/auth";
import api from "../utils/baseApi";

interface RegisterData {
  email: string;
  displayName: string;
  region: string;
  role?: 'USER';
  language?: string;
}

// Mock user data - serializable version
const mockUser = {
  uid: 'mock-user-id',
  email: 'mock@example.com',
  displayName: 'Mock User',
  photoURL: null,
  emailVerified: true,
  isAnonymous: false,
  tenantId: null,
  providerData: [],
  metadata: {
    creationTime: new Date().toISOString(),
    lastSignInTime: new Date().toISOString(),
  },
};

export const authService = {
  async register(data: RegisterData): Promise<any> {
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      // Mock registration
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              user: mockUser,
              message: 'User registered successfully (mock)'
            }
          });
        }, 500);
      });
    }
    
    const response = await api.post('/api/v1/users/register', data);
    return response.data.data; 
  },

  async getCurrentUser(): Promise<any> {
    if (import.meta.env.VITE_USE_MOCK_API === 'true') {
      // Mock current user
      return new Promise((resolve) => {
        setTimeout(() => {
          // Create a mock Firebase User object
          const mockFirebaseUser = {
            ...mockUser,
            reload: async () => {},
            toJSON: () => ({})
          };
          resolve(mockFirebaseUser);
        }, 500);
      });
    }
    
    const response = await api.get('/api/v1/users/user-profile');
    return response.data.data;
  },
};