import { Mode } from '@/constants';
import { IDialogMode } from '@/types/components';

export const DIALOG_MODE: IDialogMode = {
    ADD_TO_CHAT: {
        mode: Mode.FORM,
        title: `IChat`,
        label: 'Login',
        positiveBtnText: 'Add user to chat',
    },
    DELETE_FROM_CHAT: {
        mode: Mode.FORM,
        title: `Write user's login here`,
        label: 'Login',
        positiveBtnText: 'Delete user from chat',
    },
    CREATE_CHAT: {
        mode: Mode.FORM,
        title: `Write chat name here`,
        label: 'Chat name',
        positiveBtnText: 'Create chat',
    },
    DELETE_CHAT: {
        mode: Mode.ALERT,
        title: 'Are you sure?',
        positiveBtnText: 'Delete chat',
    },
    LOGOUT: {
        mode: Mode.ALERT,
        title: 'Are you sure?',
        positiveBtnText: 'Logout',
    },
    CHECK_MEMBERS: {
        mode: Mode.INFO,
        title: `Chat Members`,
    },
    USER_SETTINGS: {
        mode: Mode.USER_INFO,
        title: 'User settings',
    },
    EXIT: {},
};

