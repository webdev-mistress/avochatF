import React from 'react';
import TextField from '@material-ui/core/TextField';
import { IMessage } from '@/redux/store/chat/types';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { useMessageContent } from '@/pages/chat/mainChat/components/messageContent/hook';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';

interface IProps {
  message: IMessage,
  isEditMessage: boolean,
  state: IState,
  setState: (state: IState) => void,
  onEditClose: () => void;
  onSendEditMessage: (content: string) => void,
}

export const MessageContent: React.FunctionComponent<IProps> = ({
  message,
  isEditMessage,
  state,
  setState,
  onEditClose,
  onSendEditMessage,
}) => {
  const {
    onPressEditEvent,
    onEditMessageChange,
  } = useMessageContent({ state, setState, onEditClose, onSendEditMessage });

  return isEditMessage ? (
    <TextField
      autoFocus
      className={styles.form}
      onChange={onEditMessageChange}
      onKeyUp={onPressEditEvent(message.message)}
      value={state.messageEdit}
    />
  ) : (<div>{message.message}</div>);
};
