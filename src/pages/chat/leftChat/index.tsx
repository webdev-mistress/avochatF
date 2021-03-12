import React from 'react';
import { Dialogs } from '@/pages/chat/leftChat/components/dialogs/dialogs';
import {
  UserSettingsBlock,
} from '@/pages/chat/leftChat/components/userSettingsBlock/userSettingsBlock';

export const LeftChat: React.FunctionComponent = () => {
  return (
    <>
      <UserSettingsBlock />
      <Dialogs />
    </>
  );
};
