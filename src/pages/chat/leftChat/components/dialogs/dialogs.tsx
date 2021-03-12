import React from 'react';
import _ from 'lodash';
import { AlertDialog, FormDialog, ChatSettingsDialog, UserSettingsDialog } from '@/components/dialog';
import { Mode } from '@/constants';
import { useDialog } from '@/pages/chat/leftChat/components/dialogs/hook';
import { IDialogModeElement } from '@/types/components';

interface IProps {
    dialogMode: IDialogModeElement,
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

// TODO change dialogs logic AV-134
export const Dialogs = (props: IProps) => {
    const { dialogMode, setDialogMode } = props;
    const { closeDialog } = useDialog({ setDialogMode });

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
            <ChatSettingsDialog
                isShow={!_.isEmpty(dialogMode) && dialogMode.mode === Mode.INFO}
                // title={dialogMode.title}
                label={dialogMode.label}
                onClose={closeDialog}
                // setDialogMode={setDialogMode}
                closeDialog={closeDialog}
            />
            <UserSettingsDialog
                isShow={!_.isEmpty(dialogMode) && dialogMode.mode === Mode.USER_INFO}
                title={dialogMode.title}
                label={dialogMode.label}
                positiveBtnText={dialogMode.positiveBtnText}
                onPositiveClick={dialogMode.positiveBtnFunc}
                onClose={closeDialog}
                setDialogMode={setDialogMode}
                closeDialog={closeDialog}
            />
        </>
    );
};
