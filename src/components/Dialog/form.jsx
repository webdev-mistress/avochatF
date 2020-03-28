import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button } from '@material-ui/core';

export const FormDialog = ({ title, positiveBtnText, negativeBtnText, label,
    isShow, closeDialog, onPositiveClick }) => {
    const [fieldValue, setFieldValue] = useState('');

    const onNegativeClick = () => closeDialog();

    const onChangeFieldValue = (event) => setFieldValue(event.target.value);

    const _onPositiveClick = () => onPositiveClick(fieldValue);

    return (
        <div>
            <Dialog open={isShow} onClose={closeDialog} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label={label}
                        fullWidth
                        onKeyUp={event => event.key === 'Enter' && _onPositiveClick()}
                        onChange={onChangeFieldValue}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onNegativeClick} color="primary">
                        {negativeBtnText}
                    </Button>
                    <Button onClick={_onPositiveClick} color="primary">
                        {positiveBtnText}
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
