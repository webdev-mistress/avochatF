import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { clearChat } from '@/redux/store/chat/actions';
import { ChatMenu } from '@/pages/chat/leftChat/components/menu';
import { Dialogs } from '@/pages/chat/leftChat/components/dialogs';
import { SettingsBlock } from '@/pages/chat/leftChat/components/settingsBlock';
import { IDialogModeElement } from '@/types/components';

export const LeftChat = () => {
    const [anchorMenu, setAnchorMenu] = useState<Element | null>(null);
    const [selectedChatId, setSelectedChatId] = useState(0);
    const [dialogMode, setDialogMode] = useState<IDialogModeElement>({});

    // const isCreateChatSpin = useSelector(selectIsCreateChatSpin);
    const dispatch: Dispatch = useDispatch();

    const onClearActiveChat = useCallback(() => {
        dispatch(clearChat());
    }, [dispatch]);

    return (
        <>
            <SettingsBlock
                setDialogMode={setDialogMode}
                setAnchorMenu={setAnchorMenu}
                onClearActiveChat={onClearActiveChat}
                setSelectedChatId={setSelectedChatId}
            />
            <ChatMenu
                setDialogMode={setDialogMode}
                setAnchorMenu={setAnchorMenu}
                onClearActiveChat={onClearActiveChat}
                selectedChatId={selectedChatId}
                anchorMenu={anchorMenu}
            />
            <Dialogs dialogMode={dialogMode} setDialogMode={setDialogMode} />
        </>
    );
};
