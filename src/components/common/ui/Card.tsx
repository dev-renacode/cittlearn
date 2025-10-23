// Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "sm" | "md" | "lg";
  shadow?: "sm" | "md" | "lg";
}

const Card = ({
  children,
  className = "",
  padding = "md",
  shadow = "md",
}: CardProps) => {
  const baseClasses = "bg-white rounded-lg";

  const paddingClasses = {
    sm: "p-3",
    md: "p-5",
    lg: "p-8",
  };

  const shadowClasses = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`${baseClasses} ${paddingClasses[padding]} ${shadowClasses[shadow]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
