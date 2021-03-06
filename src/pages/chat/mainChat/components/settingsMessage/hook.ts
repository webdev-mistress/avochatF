import React, { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat';

interface IArgs {
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const useSettingsMessage = (props: IArgs) => {
    const { state, setState, setAnchorEl } = props;

    const onOpenMenu = useCallback((message) => (event: React.MouseEvent<SVGSVGElement>) => {
        setState({ ...state, selectedMessage: message });
        setAnchorEl(event.currentTarget);
    }, [setAnchorEl, setState, state]);

return {
        onOpenMenu,
    };
};
