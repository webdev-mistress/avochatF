import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { IChat } from '@/redux/store/chat/types';
import { useChat } from '@/pages/chat/leftChat/components/chats/hook';
import { ChatItem } from '@/pages/chat/leftChat/components/chats/chatItem';
// import { IChat } from '@/types/store/chatActions';
import styles from '../../styles.module.scss';

export const Chats: React.FunctionComponent = () => {
  const {
    activeChatId,
    onLoadChat,
    onOpenChatSettings,
    onOpenCreateChatDialog,
    chats,
  } = useChat();

  return (
    <>
      <List className={styles.list}>
        {chats.map((chat: IChat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            activeChatId={activeChatId}
            onLoadChat={onLoadChat}
            onOpenChatSettings={onOpenChatSettings}
          />
        ))}

      </List>
      <Button
        onClick={onOpenCreateChatDialog}
        color="primary"
      >
        Create Chat
      </Button>
    </>
  );
};
