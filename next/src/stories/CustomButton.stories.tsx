import React from 'react';
import { Meta, Story } from '@storybook/react';
import CustomButton from '../components/CustomButton';

export default {
  title: 'Example/CustomButton',
  component: CustomButton,
} as Meta;

const Template: Story<{ label: string; onClick?: () => void }> = (args) => <CustomButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Primary Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Secondary Button',
};
