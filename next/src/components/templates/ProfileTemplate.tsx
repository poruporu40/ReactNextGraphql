import React from 'react';
import { Box, Typography, IconButton, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ProfileEditor from '../organisms/ProfileEditor';

interface ProfileTemplateProps {
  avatarPreview: string;
  profile: string;
  location: string;
  website: string;
  onProfileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLocationChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWebsiteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  updating: boolean;
}

const ProfileTemplate: React.FC<ProfileTemplateProps> = (props) => (
  <Box
    sx={{
      width: 400,
      mx: 'auto',
      mt: 4,
      bgcolor: 'black',
      color: 'white',
      p: 3,
      borderRadius: 2,
    }}
  >
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2 }}
    >
      <Typography variant="h6">プロフィールを編集</Typography>
      <IconButton
        sx={{ color: 'white' }}
        onClick={() => console.log('Modal Close')}
      >
        <CloseIcon />
      </IconButton>
    </Box>
    <Divider sx={{ mb: 2, bgcolor: '#444' }} />

    <ProfileEditor {...props} />
  </Box>
);

export default ProfileTemplate; 