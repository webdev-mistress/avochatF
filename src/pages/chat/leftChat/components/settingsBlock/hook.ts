import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { accessToken } from '@/helpers/localStorage';
import { selectUserChats, selectUserName } from '@/redux/store/user/selectors';
import { logoutUser } from '@/redux/store/user/actions';
import { clearChat } from '@/redux/store/chat/actions';
import { DIALOG_MODE } from '@/pages/chat/leftChat/constants';
import { IChat } from '@/types/store';
import { IDialogModeElement } from '@/types/components';

interface IArgs {
    setDialogMode: (dialog: IDialogModeElement) => void,
}

export const useSettingsBlock = (props: IArgs) => {
   const { setDialogMode } = props;
   const userName = useSelector(selectUserName);
   const chats: IChat[] = useSelector(selectUserChats);
   const dispatch: Dispatch = useDispatch();

   const onAuthLogout = useCallback(() => {
       dispatch(logoutUser());
       dispatch(clearChat());
       accessToken.remove();
   }, [dispatch]);

   const onCheckUserSettings = useCallback(() => {
       setDialogMode(DIALOG_MODE.USER_SETTINGS);
   }, [setDialogMode]);

    return {
        userName,
        chats,
        onAuthLogout,
        onCheckUserSettings,
    };
};
