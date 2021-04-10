import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import List from '@material-ui/core/List';
import styles from '@/components/dialog/styles.module.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { checkShowCloseIcon } from '@/components/dialog/helpers';
import CloseIcon from '@material-ui/icons/Close';
import { selectChatMembersList, selectSelectedChat } from '@/redux/store/chat/selectors';
import { selectUserId } from '@/redux/store/user/selectors';
import { deleteUserFromChatRequest } from '@/redux/store/chat/actions';
import { IChat, IMemberInfo } from '@/redux/store/chat/types';

export const MembersList: React.FunctionComponent = () => {
  const dispatch: Dispatch = useDispatch();
  const membersList: IMemberInfo[] = useSelector(selectChatMembersList);
  const selectedChat: IChat = useSelector(selectSelectedChat);
  const selectedUserId: number = useSelector(selectUserId);

  const onDeleteUserFromChatDialog = useCallback((login: string) => () => {
    if(selectedChat) {
      dispatch(deleteUserFromChatRequest({ login, chatId: selectedChat.id }));
    }
  }, [dispatch, selectedChat]);

  return (

    <List className={styles.membersListWrapper}>
      {membersList.map(((member) => (
        <ListItem
          className={styles.infoWrapper}
          key={member.id}
        >
          <ListItemAvatar>
            <Avatar
              className={styles.avatar}
              alt={member.name}
              src="/static/invalide.path"
            />
          </ListItemAvatar>
          <ListItemText
            className={member.isOnline
              ? styles.listItemTextOnline
              : styles.listItemTextOffline
            }
            primary={member.name}
            secondary={member.isOnline ? 'online' : 'offline'}
          />
          {checkShowCloseIcon(selectedChat, member, selectedUserId)
           && (
             <CloseIcon
               onClick={onDeleteUserFromChatDialog(member.login)}
               className={styles.chatSettingsIcon}
             />
           )
          }
        </ListItem>
      )))}
    </List>
  );
};
