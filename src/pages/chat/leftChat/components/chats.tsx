import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import cn from 'classnames';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { getChatParticipants, createChat, getActiveChat, requestMessages } from '@/redux/store/chat/actions';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import { getSelectedChat } from '@/redux/store/user/actions';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';
import styles from '../styles.module.scss';

interface IProps {
    chats: IChat[],
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const Chats = (props: IProps) => {
    const { chats, setDialogMode } = props;
    const dispatch: Dispatch = useDispatch();
    const activeChatId: number = useSelector(selectActiveChatId);

    const onLoadChat = useCallback((event, chat) => {
        const { nodeName } = event.target;
        if (nodeName !== 'path' && nodeName !== 'svg') {
            dispatch(getActiveChat(chat));
            dispatch(requestMessages(chat.id));
        }
    }, [dispatch]);

    const onCreateChatDialog = useCallback(() => {
        const onCreateChat = ((chatName: string) => {
            dispatch(createChat(chatName));
            setDialogMode(DIALOG_MODE.EXIT);
        });
        setDialogMode({ ...DIALOG_MODE.CREATE_CHAT, positiveBtnFunc: onCreateChat });
    }, [dispatch, setDialogMode]);

    const onOpenChatSettings = useCallback((chat) => {
        dispatch(getSelectedChat(chat));
        dispatch(getChatParticipants(chat.id));
        props.setDialogMode(DIALOG_MODE.GET_CHAT_PARTICIPANTS);
    }, [dispatch, props]);

    return (
        <>
            <List className={styles.list}>
                {chats.map((chat => (
                    <ListItem
                        className={cn(styles.chatItem, chat.id === activeChatId && styles.chatItemActive)}
                        key={chat.id}
                        onClick={(event) => onLoadChat(event, chat)}
                    >
                        <ListItemAvatar>
                            <Avatar className={styles.avatar} alt={chat.name} src="/static/invalide.path" />
                        </ListItemAvatar>
                        <ListItemText
                            className={styles.chatItemText}
                            primary={chat.name}
                            secondary={chat.lastMessage || 'Chat'}
                        />
                        <MoreVertIcon
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={() => onOpenChatSettings(chat)}
                            className={styles.icons}
                        />
                    </ListItem>
                )))}
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
