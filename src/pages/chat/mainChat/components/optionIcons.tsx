import React from 'react';
import SendIcon from '@material-ui/icons/Send';
import CloseIcon from '@material-ui/icons/Close';
import { IMessage } from '@/redux/store/chat/types';
import styles from '@/pages/chat/mainChat/styles.module.scss';
import { IState } from '@/pages/chat/mainChat';
// import { IMessage } from '@/types/store/chatActions';

interface IProps {
  state: IState,
  message: IMessage,
  onEditClose: () => void,
  onSendEditMessage: (content: string) => any,
}

export const OptionIcons: React.FunctionComponent<IProps> = ({
  state,
  message,
  onEditClose,
  onSendEditMessage,
}) => {
  return (
    <>
      <CloseIcon
        onClick={onEditClose}
        className={styles.icons}
      />
      {message.message !== state.messageEdit && (
        <SendIcon
          onClick={onSendEditMessage(message.message)}
          className={styles.icons}
        />
      )}
    </>
  );
};
