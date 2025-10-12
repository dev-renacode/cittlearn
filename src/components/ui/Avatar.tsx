import React, { useMemo } from "react";
import { getAvatarUrl, isDefaultAvatar } from "../../constants/avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fallback?: string;
  className?: string;
  onClick?: () => void;
  key?: string | number;
  forceRefresh?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = "Avatar",
  size = "md",
  fallback,
  className = "",
  onClick,
  forceRefresh = false,
}) => {
  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
    xl: "w-16 h-16 text-xl",
  };

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getBackgroundColor = (initials: string): string => {
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-red-500",
      "bg-yellow-500",
      "bg-indigo-500",
      "bg-pink-500",
      "bg-teal-500",
    ];

    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const avatarUrl = getAvatarUrl(src);

  const finalUrl = useMemo(() => {
    if (forceRefresh && avatarUrl) {
      return avatarUrl.includes("?")
        ? `${avatarUrl}&t=${Date.now()}`
        : `${avatarUrl}?t=${Date.now()}`;
    }
    return avatarUrl;
  }, [avatarUrl, forceRefresh]);

  return (
    <div
      className={`
        ${sizeClasses[size]}
        rounded-full
        flex
        items-center
        justify-center
        overflow-hidden
        cursor-pointer
        transition-all
        duration-200
        hover:opacity-80
        ${className}
      `}
      onClick={onClick}
      title={alt}
    >
      <img
        src={finalUrl}
        alt={alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          // Si la imagen falla al cargar, intentar con la imagen por defecto del backend
          const target = e.target as HTMLImageElement;

          // Si no es ya la imagen por defecto, intentar cargarla
          if (!isDefaultAvatar(src)) {
            target.src = getAvatarUrl() + `?t=${Date.now()}`;
            return;
          }

          // Si también falla la imagen por defecto, mostrar iniciales
          const container = target.parentElement;
          if (container) {
            const initials = fallback ? getInitials(fallback) : "?";
            const backgroundColor = getBackgroundColor(initials);

            container.innerHTML = `
              <span class="select-none text-white font-semibold flex items-center justify-center w-full h-full ${backgroundColor}">
                ${initials}
              </span>
            `;
          }
        }}
      />
    </div>
  );
};

export default Avatar;
