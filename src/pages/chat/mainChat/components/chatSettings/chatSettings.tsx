import React from 'react';
import { IMessage } from '@/redux/store/chat/types';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import {
  SettingsMessage,
} from '@/pages/chat/mainChat/components/settingsMessage/settingsMessage';
import { EditIcon } from '@/pages/chat/mainChat/components/editIcon';
import { IState } from '@/pages/chat/mainChat';
import { useChatSettings } from '@/pages/chat/mainChat/components/chatSettings/hook';
// import { IMessage } from '@/types/store/chatActions';

interface IProps {
  message: IMessage,
  anchorEl: Element | null,
  setAnchorEl: (anchorEl: Element | null) => void,
  userIsAuthor: boolean,
  isEditMessage: boolean,
  state: IState,
  setState: (state: IState) => void,
  onEditClose: () => void;
  onSendEditMessage: (content: string) => void,
}

export const ChatSettings: React.FunctionComponent<IProps> = ({
  message,
  isEditMessage,
  anchorEl,
  setAnchorEl,
  userIsAuthor,
  state,
  setState,
  onEditClose,
  onSendEditMessage,
}) => {
  const messageDateChange = useChatSettings({ message });

  return userIsAuthor ? (
    <div className={styles.buttonBlock}>
      <SettingsMessage
        isEditMessage={isEditMessage}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        state={state}
        setState={setState}
        message={message}
        messageDateChange={messageDateChange}
        onEditClose={onEditClose}
        onSendEditMessage={onSendEditMessage}
      />
    </div>
  ) : message.dateChange ? <EditIcon messageDateChange={messageDateChange} /> : <div />;
};
