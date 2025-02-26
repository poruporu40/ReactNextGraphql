import React from 'react';
import Avatar from '../atoms/Avatar';
import ProfileForm from '../molecules/ProfileForm';

interface ProfileEditorProps {
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

const ProfileEditor: React.FC<ProfileEditorProps> = ({
  avatarPreview,
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
  <div>
    <Avatar src={avatarPreview} />
    <ProfileForm
      profile={profile}
      location={location}
      website={website}
      onProfileChange={onProfileChange}
      onLocationChange={onLocationChange}
      onWebsiteChange={onWebsiteChange}
      onAvatarChange={onAvatarChange}
      onSave={onSave}
      updating={updating}
    />
  </div>
);

export default ProfileEditor; 