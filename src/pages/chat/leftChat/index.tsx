import React from 'react';
import { Dialogs } from '@/pages/chat/leftChat/components/dialogs/dialogs';
import {
  TopSettingsBlock,
} from '@/pages/chat/leftChat/components/topSettingsBlock/topSettingsBlock';

export const LeftChat: React.FunctionComponent = () => {
  return (
    <>
      <TopSettingsBlock />
      <Dialogs />
    </>
  );
};
