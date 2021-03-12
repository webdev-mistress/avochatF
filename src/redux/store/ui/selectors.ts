import _ from 'lodash';
import { IUI } from '@/types/store/uiActions';

export const selectIsShowChatSettings = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.chatSettings.isShowDialog'), false);

export const selectIsShowUserSettings = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowUserSettings'), false);

export const selectIsShowLogout = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowLogout'), false);

export const selectIsShowCreateChat = (state: IUI): boolean =>
  _.get(state, ('ui.dialog.isShowCreateChat'), false);
