import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { clearChat, deleteChat, deleteUserFromChat } from '@/redux/store/chat/actions';
import { selectSelectedChat, selectUserId } from '@/redux/store/user/selectors';
import { addUserToChat } from '@/redux/store/user/actions';
import { selectChatMembersList } from '@/redux/store/chat/selectors';
import { IDialogModeElement } from '@/types/components';
import { IChat, IMembersData } from '@/types/store';
import { checkShowCloseIcon } from './helpers';
import styles from './styles.module.scss';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    positiveBtnText: string,
    negativeBtnText: string,
    label: string,
    title: string,
    onPositiveClick?: (arg?: any) => any,
    setDialogMode: (dialog: IDialogModeElement) => any,
    closeDialog: () => void,
}

export const InfoDialog = (props: IProps) => {
    const [fieldValue, setFieldValue] = useState('');
    const dispatch: Dispatch = useDispatch();
    const membersList: IMembersData[] = useSelector(selectChatMembersList);
    const selectedUserId: number = useSelector(selectUserId);
    const selectedChat: IChat = useSelector(selectSelectedChat);
    const onDeleteUserFromChatDialog = useCallback((userId: number) => {
            dispatch(deleteUserFromChat(userId, selectedChat.chatId));
    }, [dispatch, selectedChat.chatId]);

    const onNegativeClick = () => props.closeDialog();

    const onChangeFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    };

    const onAddUserToChatDialog = useCallback((fieldValue: string) => {
        dispatch(addUserToChat({ login: fieldValue, selectedChatId: selectedChat.chatId }));
        setFieldValue('');
    }, [dispatch, selectedChat.chatId]);

    const onDeleteChatDialog = useCallback(() => {
        dispatch(deleteChat(selectedChat.chatId));
        dispatch(clearChat());
        props.closeDialog();
    }, [dispatch, props, selectedChat.chatId]);

    const onLeaveChat = useCallback((selectedUserId: number, selectedChat: IChat) => {
        dispatch(deleteUserFromChat(selectedUserId, selectedChat.chatId));
        dispatch(deleteChat(selectedChat.chatId));
        props.closeDialog();
    }, [dispatch, props]);

    const renderMembersList = () => (
        <List className={styles.membersListWrapper}>
            {membersList.map((member => (
                <ListItem
                         className={styles.infoWrapper}
                         key={member.userId}
                    >
                    <ListItemAvatar>
                        <Avatar className={styles.avatar} alt={member.name} src="/static/invalide.path" />
                    </ListItemAvatar>
                    <ListItemText
                            className={member.isOnline ? styles.listItemTextOnline : styles.listItemTextOffline}
                            primary={member.name}
                            secondary={member.isOnline ? 'online' : 'offline'}
                         />
                    {checkShowCloseIcon(selectedChat, member, selectedUserId)
                             && (
                             <CloseIcon
                                        onClick={() => onDeleteUserFromChatDialog(member.userId)}
                                        className={styles.icons}
                                    />
                            )
                        }
                </ListItem>
                 )))}

        </List>
    );

    return (
        <div>
            <Dialog
                open={props.isShow}
                onClose={props.onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className={styles.chatSettings}>
                    <DialogTitle id="alert-dialog-title">
                        {selectedChat && `${selectedChat.name} chat settings`}
                    </DialogTitle>
                    <CloseIcon
                        onClick={onNegativeClick}
                        className={styles.closeIcon}
                    />
                </div>
                <DialogContent>
                    <DialogContent>
                        <div className={styles.inputWrapper}>
                            <TextField
                                value={fieldValue}
                                autoFocus
                                margin="dense"
                                id="name"
                                label={props.label}
                                fullWidth
                                onKeyUp={event => event.key === 'Enter' && onAddUserToChatDialog(fieldValue)}
                                onChange={onChangeFieldValue}
                            />
                            <Button
                                className={styles.addButton}
                                disabled={!fieldValue}
                                onClick={() => onAddUserToChatDialog(fieldValue)}
                                variant="contained"
                                color="primary"
                                endIcon={<PersonAddIcon>add</PersonAddIcon>}
                            >
                                ADD
                            </Button>
                        </div>
                    </DialogContent>
                    {renderMembersList()}
                </DialogContent>
                <DialogActions className={styles.infoWrapper}>
                </DialogActions>
                {selectedUserId === selectedChat?.userOwnerId
                    ? (
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={onDeleteChatDialog}
                        >
                            Delete the chat
                        </Button>
                    )
                    : (
                        <Button
                            color="secondary"
                            variant="contained"
                            onClick={() => onLeaveChat(selectedUserId, selectedChat)}
                        >
                            Leave the chat
                        </Button>
                    )
                }
            </Dialog>
        </div>
    );
};

InfoDialog.defaultProps = {
    contentList: [],
    title: 'Chat Settings',
    positiveBtnText: 'Ok',
    label: '',
    negativeBtnText: 'cancel',
};
