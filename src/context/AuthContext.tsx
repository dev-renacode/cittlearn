import React, { createContext, useEffect, useState, useCallback } from "react";
import { authService, tokenUtils } from "../services/api";
import type { User } from "../services/api";

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    track: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  refreshUser: () => Promise<void>;
  updateUser: (userData: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const updateUser = useCallback((userData: User | null) => {
    setUser(userData);
    setIsAuthenticated(!!userData);
    if (userData) {
      tokenUtils.saveUser(userData);
    } else {
      tokenUtils.clearUser();
    }
  }, []);
  const handleApiError = useCallback((error: unknown) => {
    console.error("API Error:", error);

    if (error && typeof error === "object" && "response" in error) {
      const apiError = error as {
        response?: { data?: { message?: string }; status?: number };
      };
      if (apiError.response?.data?.message) {
        setError(apiError.response.data.message);
      } else if (apiError.response?.status === 401) {
        setError("Credenciales inválidas");
      } else if (apiError.response?.status === 409) {
        setError("Este email ya está registrado");
      } else if (apiError.response?.status === 400) {
        setError("Datos de validación incorrectos");
      } else if (apiError.response?.status && apiError.response.status >= 500) {
        setError("Error interno del servidor");
      } else {
        setError("Error de conexión. Verifica tu conexión a internet.");
      }
    } else {
      setError("Error de conexión. Verifica tu conexión a internet.");
    }
  }, []);
  const login = useCallback(
    async (email: string, password: string) => {
      try {
        setError(null);
        setIsLoading(true);

        const response = await authService.login({ email, password });

        if (response.success && response.data) {
          const { user: userData, accessToken, refreshToken } = response.data;
          tokenUtils.saveTokens({ accessToken, refreshToken });
          updateUser(userData);
        } else {
          setError(response.message || "Error en el login");
        }
      } catch (error: unknown) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [updateUser, handleApiError]
  );
  const register = useCallback(
    async (name: string, email: string, password: string, track: string) => {
      try {
        setError(null);
        setIsLoading(true);

        console.log("🔗 Enviando a la API:", {
          name,
          email,
          password: "***",
          track,
        });

        const response = await authService.register({
          name,
          email,
          password,
          track,
        });

        if (response.success && response.data) {
          const { user: userData, accessToken, refreshToken } = response.data;
          tokenUtils.saveTokens({ accessToken, refreshToken });
          updateUser(userData);
        } else {
          setError(response.message || "Error en el registro");
        }
      } catch (error: unknown) {
        handleApiError(error);
      } finally {
        setIsLoading(false);
      }
    },
    [updateUser, handleApiError]
  );
  const logout = useCallback(async () => {
    try {
      setError(null);
      await authService.logout();
    } catch (error) {
      console.warn("Error during logout:", error);
    } finally {
      tokenUtils.clearTokens();
      updateUser(null);
      setIsLoading(false);
    }
  }, [updateUser]);
  const refreshUser = useCallback(async () => {
    try {
      if (!tokenUtils.hasTokens()) {
        setIsLoading(false);
        return;
      }

      const response = await authService.getProfile();

      if (response.success && response.data) {
        updateUser(response.data);
      } else {
        await logout();
      }
    } catch (error) {
      console.warn("Error refreshing user:", error);
      await logout();
    } finally {
      setIsLoading(false);
    }
  }, [updateUser, logout]);
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const savedUser = tokenUtils.getUser();
        const tokens = tokenUtils.getTokens();

        if (savedUser && tokens) {
          updateUser(savedUser);
          await refreshUser();
        } else {
          updateUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        updateUser(null);
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [updateUser, refreshUser]);

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
    refreshUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
