import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';
import { accessToken } from '@/helpers/localStorage';
import { clearChat } from '@/redux/store/chat/actions';
import { selectIsShowLogout } from '@/redux/store/ui/selectors';
import { requestLogoutUser } from '@/redux/store/user/actions';
import { setShowLogout } from '@/redux/store/ui/actions';

export const LogoutDialog: React.FunctionComponent = () => {
  const isShowLogoutDialog = useSelector(selectIsShowLogout);

  const dispatch = useDispatch();

  const onAuthLogout = useCallback(() => {
    dispatch(requestLogoutUser());
    dispatch(clearChat());
    accessToken.remove();
  }, [dispatch]);

  const onCloseDialog = useCallback(() => {
    dispatch(setShowLogout({ isActive: false }));
  }, [dispatch]);

  return (
    <div>
      <Dialog
        open={isShowLogoutDialog}
        onClose={onCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            No
          </Button>
          <Button onClick={onAuthLogout} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
