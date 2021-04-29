import React from 'react';
import _ from 'lodash';
import format from 'date-fns/format';
import cn from 'classnames';
import { IMessage } from '@/redux/store/chat/types';
import { IState } from '@/pages/chat/mainChat';
import { ChatSettings } from '@/pages/chat/mainChat/components/chatSettings/chatSettings';
import {
  MessageContent,
} from '@/pages/chat/mainChat/components/messageContent/messageContent';
import { useChatMessages } from '@/pages/chat/mainChat/components/chatMessages/hook';
// import { IMessage } from '@/types/store/chatActions';
import styles from '../../styles.module.scss';

interface IProps {
  state: IState,
  setState: (state: IState) => void,
  messages: IMessage[],
  userId: number | null,
  anchorEl: Element | null,
  setAnchorEl: (anchorEl: Element | null) => void,
}

export const ChatMessages: React.FunctionComponent<IProps> = ({
  messages,
  state,
  userId,
  setState,
  setAnchorEl,
  anchorEl,
}) => {
  const {
    onEditClose,
    onSendEditMessage,
  } = useChatMessages({ state, setState });

  return (
    <>
      {messages.map(message => {
        const userIsAuthor = userId === message.author.userId;
        const messageDate = format(new Date(message.dateCreate), 'HH:mm:ss dd.MM.yyyy');
        // TODO разобраться с логикой в этом месте
        const isEditMessage = state.isEditMode
          && (_.get(state, 'selectedMessage.messageId', 0) === message.messageId);

        return (
          <div
            key={message.messageId}
            className={cn(
              styles.messageContainer, userIsAuthor && styles.myMessageWrapper,
            )}
          >
            <div className={styles.dateWrapper}>{messageDate}</div>
            <div className={cn(styles.message, userIsAuthor && styles.myMessage)}>
              <div className={styles.messageBlock}>
                <div>{message.author.name}</div>
                <MessageContent
                  message={message}
                  isEditMessage={isEditMessage}
                  state={state}
                  setState={setState}
                  onSendEditMessage={onSendEditMessage}
                  onEditClose={onEditClose}
                />
              </div>
              <ChatSettings
                message={message}
                anchorEl={anchorEl}
                setAnchorEl={setAnchorEl}
                userIsAuthor={userIsAuthor}
                isEditMessage={isEditMessage}
                state={state}
                setState={setState}
                onEditClose={onEditClose}
                onSendEditMessage={onSendEditMessage}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};
