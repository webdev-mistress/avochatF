import React, { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';
import { useSelector } from 'react-redux';
import { selectLoaderStatus } from '@/redux/store/ui/selectors';
import { Message } from '@/redux/store/chat/actions';

interface IArgs {
  setAnchorEl: (anchorEl: Element | null) => void,
  state: IState,
  setState: (state: IState) => void,
}

export const useMessageSettingsIconsBlock = (args: IArgs): any => {
  const isEditMessageLoading = useSelector(selectLoaderStatus(Message.EDIT_MESSAGE));
  const { state, setState, setAnchorEl } = args;

  const onOpenMenu = useCallback((message) => (
    event: React.MouseEvent<SVGSVGElement>,
  ) => {
    setState({ ...state, selectedMessage: message });
    setAnchorEl(event.currentTarget);
  }, [setAnchorEl, setState, state]);

  return {
    onOpenMenu,
    isEditMessageLoading,
  };
};
