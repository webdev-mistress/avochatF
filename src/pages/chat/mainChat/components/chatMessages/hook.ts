import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { editMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';

interface IArgs {
    state: IState,
    setState: (state: IState) => void,
}

export const useChatMessages = (props: IArgs) => {
    const dispatch: Dispatch = useDispatch();

    const { state, setState } = props;

    const onEditClose = useCallback(() => {
        setState({ ...state, isEditMode: false, message: null, messageEdit: '' });
    }, [setState, state]);

    const onSendEditMessage = useCallback((content) => {
        const { selectedMessage, messageEdit } = state;
        if(selectedMessage && content !== messageEdit) {
            dispatch(editMessage({ editMessageId: selectedMessage.messageId, messageEdit }));
        }
        onEditClose();
    }, [dispatch, onEditClose, state]);

    return {
        onEditClose,
        onSendEditMessage,
    };
};
