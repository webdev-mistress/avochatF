import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
// import { editMessage } from '@/redux/store/oldChat/actions';
import { editMessageRequest } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';

interface IArgs {
  state: IState,
  setState: (state: IState) => void,
}

export const useChatMessages = (args: IArgs): any => {
  const dispatch: Dispatch = useDispatch();
  const { state, setState } = args;

  const onEditClose = useCallback(() => {
    setState({ ...state, isEditMode: false, message: null, messageEdit: '' });
  }, [setState, state]);

  const onSendEditMessage = useCallback((content) => () => {
    const { selectedMessage, messageEdit } = state;
    if (selectedMessage && content !== messageEdit) {
      dispatch(editMessageRequest(
        { editMessageId: selectedMessage.messageId, messageEdit },
      ));
    }
    onEditClose();
  }, [dispatch, onEditClose, state]);

  return {
    onEditClose,
    onSendEditMessage,
  };
};
