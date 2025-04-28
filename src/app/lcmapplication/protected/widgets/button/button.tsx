import React from "react";
// import "./button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "link"; // Renamed to avoid conflict
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  ...props
}) => {
  const baseStyle =
    "py-2 px-4 rounded text-sm font-medium focus:outline-none transition duration-200";
  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    link: "bg-transparent text-blue-600 hover:underline",
  };

  return (
    <button
      {...props}
      className={`${baseStyle} ${styles[variant]} ${className}`}
    />
  );
};

export default Button;
