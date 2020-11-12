import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { clearChat } from '@/redux/store/chat/actions';
import { Dialogs } from '@/pages/chat/leftChat/components/dialogs';
import { SettingsBlock } from '@/pages/chat/leftChat/components/settingsBlock';
import { IDialogModeElement } from '@/types/components';

export const LeftChat = () => {
    const [dialogMode, setDialogMode] = useState<IDialogModeElement>({});

    const dispatch: Dispatch = useDispatch();

    const onClearActiveChat = useCallback(() => {
        dispatch(clearChat());
    }, [dispatch]);

    return (
        <>
            <SettingsBlock
                setDialogMode={setDialogMode}
                onClearActiveChat={onClearActiveChat}
            />
            <Dialogs
                dialogMode={dialogMode}
                setDialogMode={setDialogMode}
            />
        </>
    );
};
