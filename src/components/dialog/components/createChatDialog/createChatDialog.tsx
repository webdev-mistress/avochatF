import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChatIcon from '@material-ui/icons/Chat';
import { selectIsShowCreateChat } from '@/redux/store/ui/selectors';
import { setIsShowCreateChat } from '@/redux/store/ui/actions';
import { createChat } from '@/redux/store/chat/actions';
import styles from '../../styles.module.scss';

export const CreateChatDialog: React.FunctionComponent = () => {
  const [chatName, setChatName] = useState('');
  const isShowDialog = useSelector(selectIsShowCreateChat);
  const dispatch = useDispatch();

  useEffect(() => {
    if(!isShowDialog) {
      setChatName('');
    }
  }, [isShowDialog]);

  const onChangeFieldValue = useCallback(() => (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setChatName(value);
  }, []);

  const onCloseDialog = useCallback(() => {
    dispatch(setIsShowCreateChat(false));
  }, [dispatch]);

  const onCreateChat = useCallback((chatName: string) => () => {
    dispatch(createChat(chatName));
  }, [dispatch]);

  return (
    <div>
      <Dialog
        open={isShowDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.chatSettings}>
          <div className={styles.chatSettingsName}>
            <DialogTitle id="alert-dialog-title">
              Create Chat
            </DialogTitle>
            <div className={styles.iconsWrapper}>
              <IconButton
                className={styles.addButton}
                // disabled={!newChatNameValue}
                // onClick={onEditOldChatName(newChatNameValue)}
                color="primary"
              >
              </IconButton>
            </div>
          </div>
          <div
            className={styles.chatSettingsIcon}
            onClick={onCloseDialog}
          >
            <CloseIcon />
          </div>
        </div>
        <DialogContent>
          <DialogContent>
            <div className={styles.inputWrapper}>
              <TextField
                value={chatName}
                autoFocus
                margin="dense"
                id="createChat"
                fullWidth
                // onKeyUp={event => event.key === 'Enter'
                //   && onAddUserToChatDialog(fieldValue)
                // }
                onChange={onChangeFieldValue()}
              />
              <Button
                className={styles.addButton}
                // disabled={!fieldValue}
                onClick={onCreateChat(chatName)}
                variant="contained"
                color="primary"
                endIcon={<ChatIcon>Create</ChatIcon>}
              >
                Create
              </Button>
            </div>
          </DialogContent>
        </DialogContent>
        <DialogActions className={styles.infoWrapper}>
        </DialogActions>
      </Dialog>
    </div>
  );
};
