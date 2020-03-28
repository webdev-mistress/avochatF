import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export const AlertDialog = ({ isShow, onClose, onPositiveClick,
    nagativeBtnText, positiveBtnText, contentText }) => (
        <div>
            <Dialog
                open={isShow}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{'Are you sure you want to logout?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        {nagativeBtnText}
                    </Button>
                    <Button onClick={onPositiveClick} color="primary" autoFocus>
                        {positiveBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

AlertDialog.defaultProps = {
    negativeBtnText: 'Cancle',
    positiveBtnText: 'Ok',
};
