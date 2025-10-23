import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { API_BASE_URL, API_TIMEOUT } from "../config/env";
import { getAvatarFilename } from "../constants/avatar";

// Interfaces para las respuestas de la API
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface Track {
  _id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "user" | "admin" | "capitan" | "captain";
  isActive: boolean;
  emailVerified: boolean;
  lastLogin: string | null;
  avatar?: string;
  track?: Track | string;
  captainOf?: string | string[];
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Axios config
const createApiInstance = (): AxiosInstance => {
  const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Interceptor para agregar token de autorización
  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Interceptor para manejar respuestas y renovación de tokens
  api.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Si el error es 401 y no es una solicitud de refresh token
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (refreshToken) {
            const response = await axios.post(
              `${API_BASE_URL}/api/auth/refresh-token`,
              {
                refreshToken,
              }
            );

            const { accessToken, refreshToken: newRefreshToken } =
              response.data.data;

            // Actualizar tokens en localStorage
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            // Reintentar la solicitud original
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return api(originalRequest);
          }
        } catch {
          // Si falla la renovación, limpiar tokens y redirigir a login
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("user");

          // Redirigir a login (esto se manejará en el contexto de auth)
          window.location.href = "/login";
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
};

// Instancia de la API
const api = createApiInstance();

// Servicios de autenticación
export const authService = {
  // Registro
  register: async (userData: {
    name: string;
    email: string;
    password: string;
    track: string;
  }): Promise<ApiResponse<RegisterResponse>> => {
    const response = await api.post("/api/auth/register", userData);
    return response.data;
  },

  // Login
  login: async (credentials: {
    email: string;
    password: string;
  }): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post("/api/auth/login", credentials);
    return response.data;
  },

  // Logout
  logout: async (): Promise<ApiResponse> => {
    const response = await api.post("/api/auth/logout");
    return response.data;
  },

  // Obtener perfil
  getProfile: async (): Promise<ApiResponse<User>> => {
    const response = await api.get("/api/auth/profile");
    return response.data;
  },

  // Renovar token
  refreshToken: async (
    refreshToken: string
  ): Promise<ApiResponse<RefreshTokenResponse>> => {
    const response = await api.post("/api/auth/refresh-token", {
      refreshToken,
    });
    return response.data;
  },

  // Subir avatar
  uploadAvatar: async (
    file: File
  ): Promise<ApiResponse<{ avatarUrl: string; filename: string }>> => {
    const formData = new FormData();
    formData.append("avatar", file);

    const response = await api.post("/api/auth/avatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Asegurar que la respuesta incluya tanto la URL completa como el filename
    const responseData = response.data;
    if (responseData.success && responseData.data) {
      const filename = getAvatarFilename(responseData.data.avatarUrl);
      responseData.data.filename = filename;
    }

    return responseData;
  },

  // Eliminar avatar
  deleteAvatar: async (): Promise<ApiResponse> => {
    const response = await api.delete("/api/auth/avatar");
    return response.data;
  },

  // Obtener tracks disponibles
  getTracks: async (): Promise<ApiResponse<Track[]>> => {
    const response = await api.get("/api/auth/tracks", {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
      },
    });
    return response.data;
  },
};

// Utilidades para manejo de tokens
export const tokenUtils = {
  // Guardar tokens
  saveTokens: (tokens: AuthTokens) => {
    localStorage.setItem("accessToken", tokens.accessToken);
    localStorage.setItem("refreshToken", tokens.refreshToken);
  },

  // Obtener tokens
  getTokens: (): AuthTokens | null => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }
    return null;
  },

  // Limpiar tokens
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  },

  // Verificar si hay tokens
  hasTokens: (): boolean => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    return !!(accessToken && refreshToken);
  },

  // Guardar usuario
  saveUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  // Obtener usuario
  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        return null;
      }
    }
    return null;
  },

  // Limpiar usuario
  clearUser: () => {
    localStorage.removeItem("user");
  },
};

// Servicios de administración
export const adminService = {
  // Obtener todos los usuarios (Admin)
  getUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    track?: string;
    search?: string;
  }): Promise<
    ApiResponse<{
      users: User[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
    }>
  > => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.role && params.role !== "todos")
      queryParams.append("role", params.role);
    if (params.track && params.track !== "todos")
      queryParams.append("track", params.track);
    if (params.search) queryParams.append("search", params.search);

    const response = await api.get(
      `/api/admin/users?${queryParams.toString()}`
    );
    return response.data;
  },

  // Actualizar usuario (Admin)
  updateUser: async (
    userId: string,
    userData: {
      name?: string;
      email?: string;
      password?: string;
      track?: string;
      role?: string;
      isActive?: boolean;
    }
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put(`/api/admin/users/${userId}`, userData);
    return response.data;
  },

  // Eliminar usuario (Admin)
  deleteUser: async (userId: string): Promise<ApiResponse> => {
    const response = await api.delete(`/api/admin/users/${userId}`);
    return response.data;
  },

  // Obtener estadísticas (Admin)
  getStats: async (): Promise<
    ApiResponse<{
      totalUsers: number;
      totalAdmins: number;
      totalCaptains: number;
      totalTracks: number;
      usersByTrack: Array<{
        _id: string;
        trackName: string;
        count: number;
      }>;
    }>
  > => {
    const response = await api.get("/api/admin/stats");
    return response.data;
  },
};

// Servicios de capitán
export const captainService = {
  // Obtener usuarios del track (Capitán)
  getUsers: async (params: {
    page?: number;
    limit?: number;
    role?: string;
    search?: string;
  }): Promise<
    ApiResponse<{
      users: User[];
      pagination: {
        total: number;
        page: number;
        limit: number;
        pages: number;
      };
    }>
  > => {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append("page", params.page.toString());
    if (params.limit) queryParams.append("limit", params.limit.toString());
    if (params.role && params.role !== "todos")
      queryParams.append("role", params.role);
    if (params.search) queryParams.append("search", params.search);

    const response = await api.get(
      `/api/captain/users?${queryParams.toString()}`
    );
    return response.data;
  },

  // Actualizar usuario de su track (Capitán)
  updateUser: async (
    userId: string,
    userData: {
      name?: string;
      email?: string;
      password?: string;
      track?: string;
      role?: string;
      isActive?: boolean;
    }
  ): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put(`/api/captain/users/${userId}`, userData);
    return response.data;
  },
};

export default api;
