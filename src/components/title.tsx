import React from "react";

interface TitleProps {
  children: React.ReactNode;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export const Title: React.FC<TitleProps> = ({
  children,
  size = "lg",
  className = "",
}) => {
  const sizeStyles = {
    md: "text-2xl font-semibold",
    lg: "text-3xl font-semibold",
    xl: "text-4xl font-bold",
  };

  return (
    <h1
      className={`
        ${sizeStyles[size]}
        text-gray-900 dark:text-gray-100
        tracking-tight leading-tight mt-4
        ${className}
      `}
    >
      {children}
    </h1>
  );
};
