import { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat';

interface IProps {
    state: IState,
    setState: (state: IState) => void,
    onEditClose: () => void;
    onSendEditMessage: (content: string) => void,
}

export const useMessageContent = (props: IProps) => {
    const { state, setState, onEditClose, onSendEditMessage } = props;
    const onPressEditEvent = useCallback((event, content) => {
        if(event.key === 'Enter') {
            onSendEditMessage(content);
        }
        if(event.key === 'Escape') {
            onEditClose();
        }
    }, [onEditClose, onSendEditMessage]);

    const onEditMessageChange = useCallback((event) => {
        setState({
            ...state,
            messageEdit: event.target.value,
        });
    }, [setState, state]);

    return {
        onPressEditEvent,
        onEditMessageChange,
    };
};
