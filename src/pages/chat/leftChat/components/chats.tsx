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
import { createChat, getActiveChat, requestMessages } from '@/redux/store/chat/actions';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';
import styles from '../styles.module.scss';

interface IProps {
    chats: IChat[],
    setAnchorMenu: (target: Element | null) => void,
    setSelectedChatId: (chatId: number) => void,
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const Chats = (props: IProps) => {
    const { chats, setDialogMode, setAnchorMenu, setSelectedChatId } = props;
    const dispatch: Dispatch = useDispatch();
    const activeChatId = useSelector(selectActiveChatId);

    const onLoadChat = useCallback((event, chat) => {
        const { nodeName } = event.target;
        if (nodeName !== 'path' && nodeName !== 'svg') {
            dispatch(getActiveChat(chat));
            dispatch(requestMessages(chat.chatId));
        }
    }, [dispatch]);

    const onCreateChatDialog = useCallback(() => {
        const onCreateChat = ((chatName: string) => {
            dispatch(createChat(chatName));
            setDialogMode(DIALOG_MODE.EXIT);
        });
        setDialogMode({ ...DIALOG_MODE.CREATE_CHAT, positiveBtnFunc: onCreateChat });
    }, [dispatch, setDialogMode]);

    const onOpenMenu = useCallback((event, chatId) => {
        setAnchorMenu(event.currentTarget);
        setSelectedChatId(chatId);
    }, [setAnchorMenu, setSelectedChatId]);

    return (
        <>
            <List className={styles.list}>
                {chats.map((chat => (
                    <ListItem
                        className={cn(styles.chatItem, chat.chatId === activeChatId && styles.chatItemActive)}
                        key={chat.chatId}
                        onClick={(event) => onLoadChat(event, chat)}
                    >
                        <ListItemAvatar>
                            <Avatar className={styles.avatar} alt={chat.name} src="/static/invalide.path" />
                        </ListItemAvatar>
                        <ListItemText
                            className={styles.chatItemText}
                            primary={chat.name}
                            secondary={'Chat'}
                        />
                        <MoreVertIcon
                            aria-label="more"
                            aria-controls="long-menu"
                            aria-haspopup="true"
                            onClick={(event) => onOpenMenu(event, chat.chatId)}
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
