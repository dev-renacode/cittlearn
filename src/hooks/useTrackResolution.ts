import { useState, useCallback } from "react";
import { authService } from "../services/api";
import type { Track } from "../services/api";

// Cache para evitar múltiples llamadas a la API
const trackCache = new Map<string, Track>();

export const useTrackResolution = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTracks = useCallback(async () => {
    if (tracks.length > 0) return tracks;

    try {
      setIsLoading(true);
      setError(null);

      const response = await authService.getTracks();
      if (response.success && response.data) {
        setTracks(response.data);
        // Actualizar cache
        response.data.forEach((track: Track) => {
          trackCache.set(track._id, track);
        });
        return response.data;
      }
    } catch (err) {
      console.error("Error loading tracks:", err);
      setError("Error al cargar los tracks");
    } finally {
      setIsLoading(false);
    }

    return [];
  }, [tracks]);

  const resolveTrack = useCallback(
    async (trackId: string): Promise<Track | null> => {
      // Verificar cache primero
      if (trackCache.has(trackId)) {
        return trackCache.get(trackId)!;
      }

      // Cargar tracks si no están cargados
      const loadedTracks = await loadTracks();
      const foundTrack = loadedTracks.find(
        (track: Track) => track._id === trackId
      );

      if (foundTrack) {
        trackCache.set(trackId, foundTrack);
      }

      return foundTrack || null;
    },
    [loadTracks]
  );

  const resolveTrackName = useCallback(
    async (trackId: string): Promise<string> => {
      const track = await resolveTrack(trackId);
      return track?.name || trackId;
    },
    [resolveTrack]
  );

  return {
    tracks,
    isLoading,
    error,
    resolveTrack,
    resolveTrackName,
    loadTracks,
  };
};
