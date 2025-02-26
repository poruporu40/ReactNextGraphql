import React from 'react';
import { Button as MuiButton } from '@mui/material';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => (
  <MuiButton
    variant="contained"
    color="primary"
    fullWidth
    onClick={onClick}
    disabled={disabled}
    sx={{ mt: 2 }}
  >
    {children}
  </MuiButton>
);

export default Button; 