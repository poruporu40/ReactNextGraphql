// src/components/CustomButton.tsx
import React from 'react';

interface CustomButtonProps {
  label: string;
  onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>
    {label}
  </button>
);

export default CustomButton;