import React from 'react';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { useChat } from '@/pages/chat/leftChat/components/chats/hook';
import { ChatList } from '@/pages/chat/leftChat/components/chats/chatItem';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';
import styles from '../../styles.module.scss';

interface IProps {
    chats: IChat[],
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const Chats = (props: IProps) => {
    const { chats, setDialogMode } = props;
    const {
        activeChatId,
        onLoadChat,
        onCreateChatDialog,
        onOpenChatSettings,
    } = useChat({ chats, setDialogMode });

    return (
        <>
            <List className={styles.list}>
                {chats.map(chat => (
                    <ChatList
                        key={chat.id}
                        chat={chat}
                        activeChatId={activeChatId}
                        onLoadChat={onLoadChat}
                        onOpenChatSettings={onOpenChatSettings}
                    />
                ))}

            </List>
            <Button
                onClick={onCreateChatDialog}
                color="primary"
            >
                {'Create chat'}
            </Button>
        </>
    );
};
