import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
}) => {
  const baseStyle =
    "px-6 py-2.5 rounded font-semibold text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-transform transform hover:scale-105";

  const styles = {
    primary:
      "bg-brand-yellow hover:bg-brand-orange text-gray-900 focus:ring-brand-yellow",
    secondary:
      "bg-white text-gray-800 border border-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
