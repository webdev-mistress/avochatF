import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button } from '@material-ui/core';

interface IProps {
    title: string,
    positiveBtnText: string,
    negativeBtnText: string,
    label: string,
    isShow: boolean,
    closeDialog: any,
    onPositiveClick?: (arg: any) => any,
}

export const FormDialog = (props: IProps) => {
    const [fieldValue, setFieldValue] = useState('');

    const onNegativeClick = () => props.closeDialog();

    const onChangeFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFieldValue(event.target.value);
    };
    const _onPositiveClick = () => props.onPositiveClick && props.onPositiveClick(fieldValue);

    return (
        <div>
            <Dialog open={props.isShow} onClose={props.closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={props.label}
                        fullWidth
                        onKeyUp={event => event.key === 'Enter' && _onPositiveClick()}
                        onChange={onChangeFieldValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onNegativeClick} color="primary">
                        {props.negativeBtnText}
                    </Button>
                    <Button
                        disabled={!fieldValue}
                        onClick={_onPositiveClick}
                        color="primary"
                    >
                        {props.positiveBtnText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

FormDialog.defaultProps = {
    title: '',
    negativeBtnText: 'Cancle',
    positiveBtnText: 'Ok',
    label: '',
};
