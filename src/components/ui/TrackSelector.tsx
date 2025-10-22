import React, { useState, useEffect } from "react";
import { authService } from "../../services/api";
import type { Track } from "../../services/api";
import {
  enhanceTracksWithDefaults,
  TRACK_COLORS,
  TRACK_ICONS,
} from "../../constants/tracks";

interface TrackSelectorProps {
  value?: string;
  onChange: (trackId: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({
  value,
  onChange,
  placeholder = "Selecciona tu track",
  disabled = false,
  error,
  className = "",
}) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadTracks();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Debug: Log cuando cambian los tracks
  useEffect(() => {
    console.log("📊 Estado de tracks actualizado:", {
      tracksCount: tracks.length,
      isLoading,
      usingFallback,
      tracks: tracks.map((t) => ({ id: t._id, name: t.name })),
    });
  }, [tracks, isLoading, usingFallback]);

  useEffect(() => {
    if (value && tracks.length > 0) {
      // Buscar por ID o por nombre (para compatibilidad con fallback)
      const track = tracks.find((t) => t._id === value || t.name === value);
      setSelectedTrack(track || null);
    }
  }, [value, tracks]);

  const getFallbackTracks = (): Track[] => {
    const trackNames = [
      "Ciberseguridad",
      "Fullstack",
      "Robótica Lego",
      "IoT",
      "Cloud Computing",
      "Robótica Kondo",
      "Inteligencia Artificial Aplicada",
      "Metaverso y Realidad Aumentada",
    ];

    const fallbackTracks = trackNames.map((name, index) => ({
      _id: `fallback-${index + 1}`,
      name,
      description: `Track de ${name}`,
      color: TRACK_COLORS[name] || "#6B7280",
      icon: TRACK_ICONS[name] || "📚",
      isActive: true,
      createdAt: "2024-01-01T00:00:00.000Z",
      updatedAt: "2024-01-01T00:00:00.000Z",
    }));

    console.log("🎨 Tracks de fallback creados:", fallbackTracks);
    return fallbackTracks;
  };

  const loadTracks = async () => {
    try {
      setIsLoading(true);
      console.log("🔄 Iniciando carga de tracks desde la API...");

      const response = await authService.getTracks();
      console.log("📡 Respuesta de la API:", response);

      if (response && response.success && response.data) {
        console.log("✅ Datos recibidos desde la API:", response.data);
        const activeTracks = response.data.filter((track) => track.isActive);
        console.log("🎯 Tracks activos:", activeTracks);
        setTracks(enhanceTracksWithDefaults(activeTracks));
        setUsingFallback(false);
        console.log("🚀 Usando tracks reales de la API");
      } else {
        console.warn("⚠️ Respuesta no exitosa, usando fallback");
        console.log("📊 Respuesta recibida:", response);
        setTracks(getFallbackTracks());
        setUsingFallback(true);
        console.log("🔄 Usando tracks de fallback - respuesta no exitosa");
      }
    } catch (error: unknown) {
      console.error("❌ Error loading tracks:", error);
      console.log("🔍 Detalles del error:", {
        status: (error as { response?: { status?: number } })?.response?.status,
        statusText: (error as { response?: { statusText?: string } })?.response
          ?.statusText,
        data: (error as { response?: { data?: unknown } })?.response?.data,
        message: (error as Error)?.message,
      });

      // Para cualquier error, usar tracks de fallback
      console.warn("🔄 Usando tracks de fallback debido a error");
      setTracks(getFallbackTracks());
      setUsingFallback(true);
      console.log("🔄 Usando tracks de fallback - error en la API");
    } finally {
      setIsLoading(false);
      console.log("🏁 Carga de tracks finalizada");
    }
  };

  const handleTrackSelect = (track: Track) => {
    setSelectedTrack(track);
    // Para tracks de fallback, enviar el nombre en lugar del ID
    const trackValue = track._id.startsWith("fallback-")
      ? track.name
      : track._id;
    onChange(trackValue);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled || isLoading}
        className={`
          w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          ${error ? "border-red-500" : "border-gray-300"}
          ${
            disabled || isLoading
              ? "bg-gray-100 cursor-not-allowed"
              : "bg-white cursor-pointer"
          }
          ${isOpen ? "ring-2 ring-blue-500" : ""}
        `}
      >
        <div className="flex items-center justify-between">
          {isLoading ? (
            <span className="text-gray-500">Cargando tracks...</span>
          ) : selectedTrack ? (
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedTrack.color }}
              />
              <span className="text-gray-900">{selectedTrack.name}</span>
            </div>
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isOpen && !isLoading && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {tracks.length === 0 ? (
            <div className="px-3 py-2 text-gray-500 text-sm">
              No hay tracks disponibles
            </div>
          ) : (
            tracks.map((track) => (
              <button
                key={track._id}
                type="button"
                onClick={() => handleTrackSelect(track)}
                className={`
                  w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors
                  ${selectedTrack?._id === track._id ? "bg-blue-50" : ""}
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: track.color }}
                  />
                  <div>
                    <div className="font-medium text-gray-900">
                      {track.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {track.description}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

      {usingFallback && (
        <p className="mt-1 text-xs text-yellow-600">
          ⚠️ Usando tracks de ejemplo. Conecta el backend para ver los tracks
          reales.
        </p>
      )}
    </div>
  );
};

export default TrackSelector;
