import type { Track } from "../services/api";

export const TRACK_COLORS: Record<string, string> = {
  Ciberseguridad: "#EF4444", // Rojo
  Fullstack: "#3B82F6", // Azul
  "Robótica Lego": "#10B981", // Verde
  IoT: "#F59E0B", // Amarillo/Naranja
  "Cloud Computing": "#8B5CF6", // Púrpura
  "Robótica Kondo": "#EC4899", // Rosa
  "Inteligencia Artificial Aplicada": "#06B6D4", // Cian
  "Metaverso y Realidad Aumentada": "#84CC16", // Lima
};

export const TRACK_ICONS: Record<string, string> = {
  Ciberseguridad: "🛡️",
  Fullstack: "💻",
  "Robótica Lego": "🤖",
  IoT: "📡",
  "Cloud Computing": "☁️",
  "Robótica Kondo": "🎎",
  "Inteligencia Artificial Aplicada": "🧠",
  "Metaverso y Realidad Aumentada": "🥽",
};

export const getTrackColor = (trackName: string): string => {
  return TRACK_COLORS[trackName] || "#6B7280"; // Gris por defecto
};

export const getTrackIcon = (trackName: string): string => {
  return TRACK_ICONS[trackName] || "📚"; // Libro por defecto
};

export const enhanceTrackWithDefaults = (track: Track): Track => {
  return {
    ...track,
    color: track.color || getTrackColor(track.name),
    icon: track.icon || getTrackIcon(track.name),
  };
};

export const enhanceTracksWithDefaults = (tracks: Track[]): Track[] => {
  return tracks.map(enhanceTrackWithDefaults);
};
