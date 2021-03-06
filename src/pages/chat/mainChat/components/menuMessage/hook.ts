import { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';

interface IArgs {
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const useMenuMessage = (props: IArgs) => {
    const {
        setAnchorEl,
        state,
        setState,
    } = props;
    const dispatch: Dispatch = useDispatch();

    const onCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, [setAnchorEl]);

    const onEditMode = useCallback(() => {
        onCloseMenu();

        setTimeout(() => {
            setState({
                ...state,
                isEditMode: true,
                messageEdit: _.get(state, 'selectedMessage.message', ''),
            });
        }, 0);
    }, [onCloseMenu, setState, state]);

    const onDeleteMessage = useCallback(() => {
        const deletedMessageId = state.selectedMessage?.messageId;
        if (deletedMessageId) {
            dispatch(deleteMessage(deletedMessageId));
        } else {
            throw new Error('deletedMessageId does not exist');
        }
    }, [dispatch, state.selectedMessage]);

    return {
        onCloseMenu,
        onEditMode,
        onDeleteMessage,
    };
};
