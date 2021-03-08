import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { selectUserName } from '@/redux/store/user/selectors';
import { clearChat } from '@/redux/store/chat/actions';
import { setIsShowLogout, setIsShowUserSettings } from '@/redux/store/ui/actions';

export const useUserSettingsBlock = (): any => {
  const userName = useSelector(selectUserName);
  const dispatch: Dispatch = useDispatch();

  const onClearActiveChat = useCallback(() => {
    dispatch(clearChat());
  }, [dispatch]);

  const onOpenUserSettings = useCallback(() => {
    dispatch(setIsShowUserSettings(true));
  }, [dispatch]);

  const onOpenLogoutDialog = useCallback(() => {
    dispatch(setIsShowLogout(true));
  }, [dispatch]);

  return {
    userName,
    onOpenUserSettings,
    onClearActiveChat,
    onOpenLogoutDialog,
  };
};
