import React, { useCallback } from 'react';
import _ from 'lodash';
import { AlertDialog, FormDialog, InfoDialog } from '@/components/dialog';
import { Mode } from '@/constants';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IDialogModeElement } from '@/types/components';

interface IProps {
    dialogMode: IDialogModeElement,
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const Dialogs = (props: IProps) => {
    const { dialogMode, setDialogMode } = props;

    const closeDialog = useCallback(() => {
        setDialogMode(DIALOG_MODE.EXIT);
    }, [setDialogMode]);

    return (
        <>
            <AlertDialog
                    isShow={!_.isEmpty(dialogMode) && dialogMode.mode === Mode.ALERT}
                    title={dialogMode.title}
                    positiveBtnText={dialogMode.positiveBtnText}
                    onClose={closeDialog}
                    onPositiveClick={dialogMode.positiveBtnFunc}
                />
            <FormDialog
                    isShow={!_.isEmpty(dialogMode) && dialogMode.mode === Mode.FORM}
                    title={dialogMode.title}
                    label={dialogMode.label}
                    positiveBtnText={dialogMode.positiveBtnText}
                    onPositiveClick={dialogMode.positiveBtnFunc}
                    closeDialog={closeDialog}
                />
            <InfoDialog
                    isShow={!_.isEmpty(dialogMode) && dialogMode.mode === Mode.INFO}
                    title={dialogMode.title}
                    positiveBtnText={dialogMode.positiveBtnText}
                    onClose={closeDialog}
                />
        </>
    );
};
