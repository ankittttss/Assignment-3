import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  label: string;
  type?: "button" | "submit" | "reset"; // Define the type prop
}

const Button: React.FC<ButtonProps> = ({ onClick, label, type = "button" }) => {
  return <button type={type} onClick={onClick}>{label}</button>;
};

export default Button;

// Not Used Here -: Will Used in Future//