import React from 'react';
import { Meta, Story } from '@storybook/react';
import ProfileTemplate from '../components/templates/ProfileTemplate';

export default {
  title: 'Templates/ProfileTemplate',
  component: ProfileTemplate,
} as Meta;

const Template: Story = (args) => <ProfileTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarPreview: 'https://example.com/avatar.png',
  profile: 'Sample Profile',
  location: 'Sample Location',
  website: 'https://example.com',
  onProfileChange: () => {},
  onLocationChange: () => {},
  onWebsiteChange: () => {},
  onSave: () => {},
  updating: false,
}; 