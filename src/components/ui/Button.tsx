import React from "react";

// Componente Button reutilizable - Preparado para implementación futura
interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) => {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200";

  const variantClasses = {
    primary: disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-blue-600 text-white hover:bg-blue-700",
    secondary: disabled
      ? "bg-gray-400 text-white cursor-not-allowed"
      : "bg-gray-600 text-white hover:bg-gray-700",
    outline: disabled
      ? "border-2 border-gray-400 text-gray-400 cursor-not-allowed"
      : "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
