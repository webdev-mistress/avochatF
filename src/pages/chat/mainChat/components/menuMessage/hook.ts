import { useCallback } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { deleteMessage } from '@/redux/store/chat/actions';
import { IState } from '@/pages/chat/mainChat';

interface IProps {
    setAnchorEl: (anchorEl: Element | null) => void,
    state: IState,
    setState: (state: IState) => void,
}

export const useMenuMessage = (props: IProps) => {
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
               messageEdit: _.get(state,'selectedMessage.message', ''),
           });
       }, 0);
   }, [onCloseMenu, setState, state]);

   const onDeleteMessage = () => {
       dispatch(deleteMessage(_.get(state, 'selectedMessage.messageId', 0)));
   };

    return {
        onCloseMenu,
        onEditMode,
        onDeleteMessage,
    };
};
