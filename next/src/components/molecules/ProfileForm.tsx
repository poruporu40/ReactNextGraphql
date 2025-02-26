import React from 'react';
import { TextField, Button } from '@mui/material';

interface ProfileFormProps {
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

const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  location,
  website,
  onProfileChange,
  onLocationChange,
  onWebsiteChange,
  onAvatarChange,
  onSave,
  updating,
}) => (
  <>
    <form method="POST" action="/api/upload-avatar" encType="multipart/form-data">
      <input
        type="file"
        name="avatar"
        data-testid="avatar-input"
        onChange={onAvatarChange}
      />
    </form>
    <TextField label="自己紹介" value={profile} onChange={onProfileChange} variant="outlined" sx={{ bgcolor: '#333', mb: 2, input: { color: 'white' } }}/>
    <TextField label="場所" value={location} onChange={onLocationChange} variant="outlined" sx={{ bgcolor: '#333', mb: 2, input: { color: 'white' } }}/>
    <TextField label="ウェブサイト" value={website} onChange={onWebsiteChange} variant="outlined" sx={{ bgcolor: '#333', mb: 2, input: { color: 'white' } }}/>
    <Button onClick={onSave} disabled={updating} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
      {updating ? '保存中...' : '保存'}
    </Button>
  </>
);

export default ProfileForm;