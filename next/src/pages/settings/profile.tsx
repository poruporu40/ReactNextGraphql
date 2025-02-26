import React, { useEffect, useState } from 'react';
import withAuth from '../../lib/withAuth';
import {
  useUserProfileQuery,
  useUpdateUserProfileMutation,
} from '@local/graphql';
import ProfileTemplate from '../../components/templates/ProfileTemplate';
import { Typography } from '@mui/material';

const ProfilePage: React.FC = () => {
  const { data, loading, error } = useUserProfileQuery();
  const [profile, setProfile] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  useEffect(() => {
    if (data && data.user) {
      setProfile(data.user.profile || '');
      setLocation(data.user.location || '');
      setWebsite(data.user.website || '');
      const domain = process.env.NEXT_PUBLIC_APP_BASE_URL || '';
      const avatarUrl = `${domain}${process.env.NEXT_PUBLIC_AVATAR_PATH}${data.user.avatarPath || ''}`;
      setAvatarPreview(avatarUrl);
    }
  }, [data]);

  const [updateUserProfile, { loading: updating, error: updateError }] =
    useUpdateUserProfileMutation();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append('avatar', avatar);

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_APP_API_UPLOAD_AVATAR_PATH}`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        console.log('Upload result:', result);

        if (result.fileName) {
          const domain = process.env.NEXT_PUBLIC_DOMAIN || '';
          const avatarUrl = `${domain}${process.env.NEXT_PUBLIC_AVATAR_PATH}${result.fileName}`;

          await updateUserProfile({
            variables: {
              profile,
              location,
              website,
              avatarPath: result.fileName,
            },
          });

          setAvatarPreview(avatarUrl);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  if (loading) {
    return <Typography>読み込み中...</Typography>;
  }

  if (error) {
    return (
      <Typography color="error">
        エラーが発生しました: {error.message}
      </Typography>
    );
  }

  return (
    <ProfileTemplate
      avatarPreview={avatarPreview}
      profile={profile}
      location={location}
      website={website}
      onProfileChange={(e) => setProfile(e.target.value)}
      onLocationChange={(e) => setLocation(e.target.value)}
      onWebsiteChange={(e) => setWebsite(e.target.value)}
      onAvatarChange={handleAvatarChange}
      onSave={handleSave}
      updating={updating}
    />
  );
};

export default withAuth(ProfilePage);
