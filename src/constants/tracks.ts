import type { Track } from "../services/api";

export const TRACK_COLORS: Record<string, string> = {
  Ciberseguridad: "#EF4444", // Rojo - Seguridad
  Fullstack: "#3B82F6", // Azul - Desarrollo web
  "Robótica Lego": "#10B981", // Verde - Construcción/creatividad
  IoT: "#F59E0B", // Amarillo/Naranja - Conectividad
  "Cloud Computing": "#8B5CF6", // Púrpura - Tecnología avanzada
  "Robótica Kondo": "#EC4899", // Rosa - Robótica avanzada
  "Inteligencia Artificial Aplicada": "#06B6D4", // Cian - IA/Futuro
  "Metaverso y Realidad Aumentada": "#84CC16", // Lima - Realidad virtual
};

export const getTrackColor = (trackName: string): string => {
  return TRACK_COLORS[trackName] || "#6B7280"; // Gris por defecto
};

export const enhanceTrackWithDefaults = (track: Track): Track => {
  return {
    ...track,
    color: track.color || getTrackColor(track.name),
    // icon se mantiene como está o se puede eliminar si no se usa
  };
};

export const enhanceTracksWithDefaults = (tracks: Track[]): Track[] => {
  return tracks.map(enhanceTrackWithDefaults);
};
