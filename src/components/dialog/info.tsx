/* eslint-disable */
import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { IMembersData } from '@/types/store';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import { selectChatMembersList } from '@/redux/store/chat/selectors';
import styles from './styles.module.scss';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    positiveBtnText: string,
    title: string,
    onPositiveClick?: (arg?: any) => any,
}

export const InfoDialog = (props: IProps) => {
    const membersList: IMembersData[] = useSelector(selectChatMembersList);
    const renderMembersList = () => (
        <List className={styles.membersListWrapper}>
            <ListItem className={styles.membersList}>
                 {membersList.map((member => (
                    <div
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
                    </div>
                 )))}
            </ListItem>
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
                <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    {renderMembersList()}
                </DialogContent>
                <DialogActions className={styles.infoWrapper}>
                    <Button
                        onClick={props.onClose}
                        color="primary"
                        className={styles.infoButton}
                    >
                        {props.positiveBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

InfoDialog.defaultProps = {
    contentList: [],
    title: 'Chat Members',
    positiveBtnText: 'Ok',
};
