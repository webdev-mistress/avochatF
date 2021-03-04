import { Mode } from '@/constants';

export interface IDialogModeElement {
    mode?: Mode.FORM | Mode.ALERT | Mode.INFO | Mode.USER_INFO,
    title?: string,
    label?: string,
    positiveBtnText?: string,
    positiveBtnFunc?: (arg: any) => any,
}

export interface IDialogMode {
    ADD_TO_CHAT: IDialogModeElement,
    DELETE_FROM_CHAT: IDialogModeElement,
    CREATE_CHAT: IDialogModeElement,
    DELETE_CHAT: IDialogModeElement,
    GET_CHAT_PARTICIPANTS: IDialogModeElement,
    USER_SETTINGS: IDialogModeElement,
    LOGOUT: IDialogModeElement,
    EXIT: {},
}
