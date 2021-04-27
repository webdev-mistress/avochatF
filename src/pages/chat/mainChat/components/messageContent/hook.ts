import React, { useCallback } from 'react';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';

interface IArgs {
  state: IState,
  setState: (state: IState) => void,
  onEditClose: () => void;
  onSendEditMessage: (content: string) => void,
}

export const useMessageContent = (args: IArgs): any => {
  const { state, setState, onEditClose, onSendEditMessage } = args;
  const onPressEditEvent = useCallback((content) => (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (event.key === 'Enter') {
      onSendEditMessage(content);
    }
    if (event.key === 'Escape') {
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
