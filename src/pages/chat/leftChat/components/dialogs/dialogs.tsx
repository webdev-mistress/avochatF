import React from 'react';
import {
  ChatSettingsDialog, CreateChatDialog,
  LogoutDialog,
  UserSettingsDialog,
} from '@/components/dialog';

export const Dialogs: React.FunctionComponent = () => {
  return (
    <>
      <LogoutDialog />
      <ChatSettingsDialog />
      <UserSettingsDialog />
      <CreateChatDialog />
    </>
  );
};
