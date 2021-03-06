import React, { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat';

interface IArgs {
  setAnchorEl: (anchorEl: Element | null) => void,
  state: IState,
  setState: (state: IState) => void,
}

export const useSettingsMessage = (args: IArgs): any => {
  const { state, setState, setAnchorEl } = args;

  const onOpenMenu = useCallback((message) => (
    event: React.MouseEvent<SVGSVGElement>,
  ) => {
    setState({ ...state, selectedMessage: message });
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl, setState, state]);

  return {
    onOpenMenu,
  };
};
