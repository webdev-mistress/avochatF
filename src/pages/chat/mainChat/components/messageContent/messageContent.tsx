import React from 'react';
import TextField from '@material-ui/core/TextField';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { IState } from '@/pages/chat/mainChat';
import { useMessageContent } from '@/pages/chat/mainChat/components/messageContent/hook';
import { IMessage } from '@/types/store/chatActions';

interface IProps {
  message: IMessage,
  isEditMessage: boolean,
  state: IState,
  setState: (state: IState) => void,
  onEditClose: () => void;
  onSendEditMessage: (content: string) => void,
}

export const MessageContent: React.FunctionComponent<IProps> = (props) => {
  const {
    message,
    isEditMessage,
    state,
    setState,
    onEditClose,
    onSendEditMessage,
  } = props;
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
