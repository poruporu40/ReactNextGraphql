import React from 'react';
import { TextField as MuiTextField } from '@mui/material';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextField: React.FC<TextFieldProps> = ({ label, value, onChange }) => (
  <MuiTextField
    fullWidth
    label={label}
    variant="outlined"
    value={value}
    onChange={onChange}
    sx={{ bgcolor: '#333', mb: 2, input: { color: 'white' } }}
  />
);

export default TextField; 