import React from 'react';
import { Avatar as MuiAvatar } from '@mui/material';

interface AvatarProps {
  src: string;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => (
  <MuiAvatar src={src} sx={{ width: 64, height: 64, mb: 2 }} />
);

export default Avatar; 