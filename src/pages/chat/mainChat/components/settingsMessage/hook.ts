import { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat';

interface IProps {
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const useSettingsMessage = (props: IProps) => {
    const { state, setState, setAnchorEl } = props;

    const onOpenMenu = useCallback((event, message) => {
        setState({ ...state, selectedMessage: message });
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl, setState, state]);

return {
        onOpenMenu,
    };
};
