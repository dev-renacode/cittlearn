import React, { useState, useEffect } from "react";
import type { Track } from "../../../services/api";
import {
  enhanceTrackWithDefaults,
  getTrackColor,
} from "../../../constants/tracks";
import { getTrackSVG } from "./TrackIcons";
import { useTrackResolution } from "../../../hooks/useTrackResolution";

interface TrackBadgeProps {
  track?: Track | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
  className?: string;
}

const TrackBadge: React.FC<TrackBadgeProps> = ({
  track,
  size = "md",
  showIcon = true,
  className = "",
}) => {
  const [resolvedTrack, setResolvedTrack] = useState<Track | null>(null);
  const { resolveTrack, isLoading } = useTrackResolution();

  useEffect(() => {
    const resolveTrackData = async () => {
      if (typeof track === "string" && track.length > 20) {
        // Si es un string largo (probablemente un ID), intentar resolverlo
        const resolved = await resolveTrack(track);
        setResolvedTrack(resolved);
      } else {
        setResolvedTrack(null);
      }
    };

    resolveTrackData();
  }, [track, resolveTrack]);

  if (!track) {
    return (
      <span
        className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          bg-gray-100 text-gray-800
          ${className}
        `}
      >
        Sin track
      </span>
    );
  }

  // Determinar qué datos de track usar
  let trackData: Track | { name: string; color: string };

  if (typeof track === "string") {
    if (track.length > 20 && resolvedTrack) {
      // Es un ID resuelto
      trackData = enhanceTrackWithDefaults(resolvedTrack);
    } else if (track.length > 20 && isLoading) {
      // Es un ID pero aún se está cargando
      trackData = {
        name: "Cargando...",
        color: getTrackColor("Ciberseguridad"),
      };
    } else {
      // Es un string corto (nombre del track)
      trackData = { name: track, color: getTrackColor(track) };
    }
  } else {
    // Es un objeto Track
    trackData = enhanceTrackWithDefaults(track);
  }

  // Obtener el SVG específico del track
  const TrackIcon = getTrackSVG(trackData.name);

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  return (
    <span
      className={`
        inline-flex items-center rounded-full font-medium border
        ${sizeClasses[size]}
        ${className}
      `}
      style={{
        backgroundColor: `${trackData.color}20`,
        color: trackData.color,
        borderColor: trackData.color,
      }}
    >
      {showIcon && (
        <TrackIcon size={size === "sm" ? 12 : size === "lg" ? 20 : 16} />
      )}
      {trackData.name}
    </span>
  );
};

export default TrackBadge;
