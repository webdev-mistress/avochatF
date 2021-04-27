import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteMessageRequest, Message } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat/components/mainChatBlock/hook';
import { selectError } from '@/redux/store/ui/selectors';

interface IArgs {
  setAnchorEl: (anchorEl: Element | null) => void,
  state: IState,
  setState: (state: IState) => void,
}

export const useMessageMenu = (args: IArgs): any => {
  const {
    setAnchorEl,
    state,
    setState,
  } = args;
  const deleteMessageErrorInfo = useSelector(selectError(Message.DELETE_MESSAGE));
  const editMessageErrorInfo = useSelector(selectError(Message.EDIT_MESSAGE));

  const dispatch: Dispatch = useDispatch();

  const onCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const onEditMode = useCallback(() => {
    onCloseMenu();

    // TODO разобраться с setTimeout
    setTimeout(() => {
      setState({
        ...state,
        isEditMode: true,
        messageEdit: state.selectedMessage?.message || '',
      });
    }, 0);
  }, [onCloseMenu, setState, state]);

  const onDeleteMessage = useCallback(() => {
    const deletedMessageId = state.selectedMessage?.messageId;
    if (deletedMessageId) {
      dispatch(deleteMessageRequest(deletedMessageId));
    } else {
      throw new Error('deletedMessageId does not exist');
    }
  }, [dispatch, state.selectedMessage]);

  return {
    onCloseMenu,
    onEditMode,
    onDeleteMessage,
    deleteMessageErrorInfo,
    editMessageErrorInfo,
  };
};
