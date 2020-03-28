import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export const AlertDialog = ({ isShow, onClose, onPositiveClick,
    negativeBtnText, positiveBtnText, contentText, title }) => (
        <div>
            <Dialog
                open={isShow}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {contentText}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        {negativeBtnText}
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
    title: '',
    contentText: '',
};
