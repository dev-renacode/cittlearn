// Configuración de variables de entorno
export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  UPLOADS_URL:
    import.meta.env.VITE_UPLOADS_URL || "http://localhost:3000/uploads",
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
  APP_NAME: import.meta.env.VITE_APP_NAME || "CITT Learn",
  APP_VERSION: import.meta.env.VITE_APP_VERSION || "1.0.0",
};

// Para desarrollo, usa localhost por defecto
export const API_BASE_URL = config.API_BASE_URL;
export const UPLOADS_URL = config.UPLOADS_URL;
export const API_TIMEOUT = config.API_TIMEOUT;
