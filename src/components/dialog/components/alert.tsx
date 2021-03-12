import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

interface IProps {
    isShow: boolean,
    onClose: () => any,
    onPositiveClick?: (arg?: any) => any,
    negativeBtnText: string,
    positiveBtnText: string,
    contentText: string,
    title: string,
}

export const AlertDialog = (props: IProps) => (
    <div>
        <Dialog
            open={props.isShow}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.contentText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    {props.negativeBtnText}
                </Button>
                <Button onClick={props.onPositiveClick} color="primary" autoFocus>
                    {props.positiveBtnText}
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
