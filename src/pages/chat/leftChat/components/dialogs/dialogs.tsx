import React from 'react';
import {
  LogoutDialog, ChatSettingsDialog, UserSettingsDialog,
} from '@/components/dialog';

export const Dialogs: React.FunctionComponent = () => {
  return (
    <>
      <LogoutDialog />
      <ChatSettingsDialog />
      <UserSettingsDialog />
    </>
  );
};
