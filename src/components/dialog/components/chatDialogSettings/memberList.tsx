import React from 'react';
import List from '@material-ui/core/List';
import styles from '@/components/dialog/styles.module.scss';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import { checkShowCloseIcon } from '@/components/dialog/helpers';
import CloseIcon from '@material-ui/icons/Close';
import { CircularProgress } from '@material-ui/core';
import {
  useChatDialogSettings,
} from '@/components/dialog/components/chatDialogSettings/hook';
import { IMemberInfo } from '@/redux/store/chat/types';

export const MembersList: React.FunctionComponent = () => {
  const {
    isGetParticipantsLoading,
    membersList,
    selectedUserOwnerId,
    selectedUserId,
    isDeleteUserFromChatLoading,
    onDeleteUserFromChatDialog,
  } = useChatDialogSettings();

  return (
    <>
      {isGetParticipantsLoading ? (<CircularProgress size={30} />)
        : (
          <List className={styles.membersListWrapper}>
            {membersList.map(((member: IMemberInfo) => (
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
                {checkShowCloseIcon(selectedUserOwnerId, member, selectedUserId)
                  ? isDeleteUserFromChatLoading ? (<CircularProgress size={30} />)
                    : (
                      <>
                        <CloseIcon
                          onClick={onDeleteUserFromChatDialog(member.login)}
                          className={styles.chatSettingsIcon}
                        />
                      </>
                    )
                  : null
                }
              </ListItem>
            )))}
          </List>
        )
      }
    </>
  );
};
