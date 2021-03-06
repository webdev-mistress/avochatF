import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectActiveChatId } from '@/redux/store/chat/selectors';
import { createChat, getActiveChat, getChatParticipants, requestMessages } from '@/redux/store/chat/actions';
import { getSelectedChat } from '@/redux/store/user/actions';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';

interface IArgs {
    chats: IChat[],
    setDialogMode: (dialogMode: IDialogModeElement) => void,
}

export const useChat = (props: IArgs) => {
    const { chats, setDialogMode } = props;
    const dispatch: Dispatch = useDispatch();
    const activeChatId: number = useSelector(selectActiveChatId);

    const onLoadChat = useCallback((chat) => () => {
        dispatch(getActiveChat(chat));
        dispatch(requestMessages(chat.id));
    }, [dispatch]);

    const onCreateChatDialog = useCallback(() => {
        const onCreateChat = ((chatName: string) => {
            dispatch(createChat(chatName));
            setDialogMode(DIALOG_MODE.EXIT);
        });
        setDialogMode({ ...DIALOG_MODE.CREATE_CHAT, positiveBtnFunc: onCreateChat });
    }, [dispatch, setDialogMode]);

    const onOpenChatSettings = useCallback((chat) => (event: React.MouseEvent<SVGSVGElement>) => {
        event.stopPropagation();
        dispatch(getSelectedChat(chat));
        dispatch(getChatParticipants(chat.id));
        props.setDialogMode(DIALOG_MODE.GET_CHAT_PARTICIPANTS);
    }, [dispatch, props]);

    return {
        chats,
        setDialogMode,
        activeChatId,
        onLoadChat,
        onCreateChatDialog,
        onOpenChatSettings,
    };
};
