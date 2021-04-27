import React from 'react';
import { IMessage } from '@/redux/store/chat/types';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import {
  MessageSettingsIconsBlock,

} from '@/pages/chat/mainChat/components/messageSettingsIconsBlock';
import { EditIcon } from '@/pages/chat/mainChat/components/messageIcons/editIcon';
import {
  useMessageSettings,
} from '@/pages/chat/mainChat/components/messageSettings/hook';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';

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

export const MessageSettings: React.FunctionComponent<IProps> = ({
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
  const messageDateChange = useMessageSettings({ message });

  return userIsAuthor ? (
    <div className={styles.buttonBlock}>
      <MessageSettingsIconsBlock
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
